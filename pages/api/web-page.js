import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { parseGrade, buildGradeLabel } from "../../lib/gradeUtils";
import { withAuth, checkRateLimit } from "../../lib/authMiddleware";

async function handler(req, res) {
  // Rate limiting
  const rateLimitKey = req.auth.user?.id || req.auth.isGuest ? req.headers["x-forwarded-for"] || "guest" : "anonymous";
  const rateLimit = checkRateLimit(rateLimitKey, 10, 60000);

  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: "Too many requests",
      message: "Rate limit exceeded. Please try again later.",
      resetTime: rateLimit.resetTime,
    });
  }
  const { subject, topic, grade } = req.query;

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!subject) {
    res.status(400).json({ message: "Subject is required" });
    return;
  }

  if (!topic) {
    res.status(400).json({ message: "Topic is required" });
    return;
  }

  const subjectKey = subject.toLowerCase();
  const subjectEntry = SUBJECT_FILES[subjectKey];

  if (!subjectEntry) {
    res.status(404).json({ message: "Subject not supported" });
    return;
  }

  const gradeNumber = parseGrade(grade) ?? 12;
  const gradeLabel = buildGradeLabel(gradeNumber);

  try {
    const prompt = buildWebPagePrompt(subject, topic, gradeLabel);
    const rawPlan = await requestModelContent(prompt);

    if (!rawPlan) {
      res.status(500).json({ message: "Unable to generate web page content" });
      return;
    }

    const plan = parseWebPagePlan(rawPlan, subject, topic, gradeLabel);
    const html = buildHtmlDocument(plan, subject, topic, gradeLabel);
    const base64 = Buffer.from(html, "utf8").toString("base64");

    res.status(200).json({ base64, gradeNumber });
  } catch (error) {
    res.status(500).json({ message: "Unable to generate web page" });
  }
}

export default withAuth(handler, { allowGuest: true });

function buildWebPagePrompt(subject, topic, gradeLabel) {
  return `You are preparing a simple educational landing page for ${gradeLabel} ${subject} students about ${topic}.

IMPORTANT - CONTENT EXTRACTION:
- If this is for CBSE board, base your content on NCERT ${subject} textbook for ${gradeLabel}
- Focus specifically on the "${topic}" section/chapter from the NCERT curriculum
- Extract and summarize the most relevant concepts, definitions, formulas, and examples related to "${topic}"
- For topics like "Maxima and Minima", "Differentiation", "Integration", etc., extract the specific theory, formulas, and worked examples from the relevant NCERT chapter
- Present the content in a clear, student-friendly format suitable for a web page
- Include key definitions, theorems, formulas, and important points as they appear in NCERT

Respond ONLY with valid JSON (no markdown) following this schema:
{
  "title": string,
  "intro": string,
  "sections": [
    {
      "heading": string,
      "bullets": [string]
    }
  ],
  "keyTerms": [
    {
      "term": string,
      "definition": string
    }
  ],
  "conclusion": string,
  "callToAction": string
}
Keep sentences concise, classroom friendly, and avoid markdown or LaTeX commands. Provide 3-5 sections, each with 3-6 bullet sentences covering different aspects of the topic.`;
}

function parseWebPagePlan(rawContent, subject, topic, gradeLabel) {
  let cleaned = rawContent
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Try to extract JSON from text if it's embedded
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }

  cleaned = cleaned.normalize("NFKC");

  let parsed;
  try {
    parsed = safeParseJson(cleaned);
  } catch (error) {
    console.error("Failed to parse web page JSON:", error.message);
    console.log("Raw content:", cleaned.substring(0, 200));
    return buildFallbackPlan(subject, topic, cleaned, gradeLabel);
  }

  const title = sanitizeText(parsed?.title) || `${subject}: ${topic}`;
  const intro = sanitizeText(parsed?.intro) || `Explore the core concepts of ${topic} in ${gradeLabel} ${subject}.`;
  const sections = Array.isArray(parsed?.sections)
    ? parsed.sections
        .map((section) => ({
          heading: sanitizeText(section?.heading) || "Key Ideas",
          bullets: normalizeStrings(section?.bullets),
        }))
        .filter((section) => section.bullets.length > 0)
    : [];

  if (sections.length === 0) {
    sections.push({
      heading: "Key Ideas",
      bullets: [
        `Understand the fundamental meaning of ${topic}.`,
        "Review an illustrative example and reinforce core terminology.",
      ],
    });
  }

  const keyTerms = Array.isArray(parsed?.keyTerms)
    ? parsed.keyTerms
        .map((entry) => ({
          term: sanitizeText(entry?.term),
          definition: sanitizeText(entry?.definition),
        }))
        .filter((entry) => entry.term && entry.definition)
    : [];

  const conclusion = sanitizeText(parsed?.conclusion) || `Summarize how ${topic} connects to everyday thinking for ${gradeLabel} learners.`;
  const callToAction = sanitizeText(parsed?.callToAction) || "Try solving practice problems to deepen understanding.";

  return {
    title,
    intro,
    sections,
    keyTerms,
    conclusion,
    callToAction,
  };
}

function buildFallbackPlan(subject, topic, rawContent, gradeLabel) {
  // Try one more time to parse if it looks like JSON
  if (rawContent.includes('"title"') && rawContent.includes('"intro"')) {
    try {
      // Try to fix common JSON issues
      let fixedContent = rawContent
        .replace(/[\u0000-\u001F]/g, '') // Remove control characters
        .replace(/,(\s*[}\]])/g, '$1')    // Remove trailing commas
        .trim();
      
      const parsed = JSON.parse(fixedContent);
      if (parsed.title || parsed.intro) {
        // Successfully parsed, return properly formatted
        return {
          title: sanitizeText(parsed?.title) || `${subject}: ${topic}`,
          intro: sanitizeText(parsed?.intro) || `Explore the essentials of ${topic} in ${gradeLabel} ${subject}.`,
          sections: Array.isArray(parsed?.sections) ? parsed.sections.map((section) => ({
            heading: sanitizeText(section?.heading) || "Key Ideas",
            bullets: normalizeStrings(section?.bullets),
          })).filter((section) => section.bullets.length > 0) : [{
            heading: "Key Concepts",
            bullets: [
              `Understanding ${topic} in ${subject}`,
              "Key definitions and formulas",
              "Practical applications and examples"
            ]
          }],
          keyTerms: Array.isArray(parsed?.keyTerms) ? parsed.keyTerms.map((entry) => ({
            term: sanitizeText(entry?.term),
            definition: sanitizeText(entry?.definition),
          })).filter((entry) => entry.term && entry.definition) : [],
          conclusion: sanitizeText(parsed?.conclusion) || `Master ${topic} through regular practice.`,
          callToAction: sanitizeText(parsed?.callToAction) || "Practice more problems to strengthen understanding.",
        };
      }
    } catch (e) {
      // Continue to text-based fallback
    }
  }
  
  // Extract meaningful content from malformed JSON
  const contentLines = rawContent
    .split("\n")
    .map((line) => sanitizeText(line))
    .filter(Boolean)
    .filter(line => {
      // Skip pure JSON structural elements
      const stripped = line.trim();
      return !(/^[\[{\]},]*$/.test(stripped)) && 
             !(stripped === '"sections": [') &&
             !(stripped === '"bullets": [') &&
             !(stripped === '"keyTerms": [') &&
             !stripped.startsWith('"title":') &&
             !stripped.startsWith('"intro":') &&
             !stripped.startsWith('"heading":') &&
             !stripped.startsWith('"conclusion":') &&
             !stripped.startsWith('"callToAction":');
    });

  const bullets = contentLines
    .map((line) => stripJsonLine(line.replace(/^[-•]\s*/, "")))
    .filter(line => line && line.length > 10) // Only keep substantial content
    .slice(0, 6);

  return {
    title: `${gradeLabel} ${subject}: ${topic}`,
    intro: `Explore the important concepts of ${topic} from the NCERT ${gradeLabel} ${subject} curriculum.`,
    sections: [
      {
        heading: "Key Concepts",
        bullets: bullets.length > 0 ? bullets : [
          `Understanding the fundamentals of ${topic}`,
          "Key definitions and theorems",
          "Important formulas and their applications",
          "Step-by-step problem-solving techniques"
        ],
      },
    ],
    keyTerms: [],
    conclusion: `Master ${topic} through consistent practice and revision of NCERT concepts.`,
    callToAction: "Solve NCERT exercises to strengthen your understanding.",
  };
}

function buildHtmlDocument(plan, subject, topic, gradeLabel) {
  const safeTitle = escapeHtml(plan.title || `${subject}: ${topic}`);
  const intro = escapeHtml(plan.intro);
  const conclusion = escapeHtml(plan.conclusion);
  const cta = escapeHtml(plan.callToAction);
  const gradeSubtitle = escapeHtml(`${gradeLabel} ${subject}`);
  
  // Generate NCERT link based on subject and grade
  const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-');
  const topicSlug = topic.toLowerCase().replace(/\s+/g, '-');
  const gradeNum = gradeLabel.toLowerCase().replace('grade ', '').replace('class ', '');
  const ncertLink = `https://ncert.nic.in/textbook.php?ke${gradeNum}=${subjectSlug}`;

  const sectionHtml = plan.sections
    .map((section) => {
      const heading = escapeHtml(section.heading);
      const bulletHtml = section.bullets
        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
        .join("");
      return `<section class="card"><h2>${heading}</h2><ul>${bulletHtml}</ul></section>`;
    })
    .join("");

  const termHtml = plan.keyTerms.length
    ? `<section class="card"><h2>Key Terms</h2><dl>${plan.keyTerms
        .map((entry) => `<dt>${escapeHtml(entry.term)}</dt><dd>${escapeHtml(entry.definition)}</dd>`)
        .join("")}</dl></section>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
        background: #f8fafc;
        color: #0f172a;
      }
      body {
        margin: 0;
        padding: 32px 16px 64px;
        display: flex;
        justify-content: center;
        background: linear-gradient(145deg, #eef2ff 0%, #e0f2fe 100%);
      }
      main {
        width: min(960px, 100%);
      }
      header {
        text-align: center;
        margin-bottom: 32px;
      }
      .grade-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 14px;
        border-radius: 9999px;
        background: rgba(37, 99, 235, 0.12);
        color: #1d4ed8;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-size: 0.76rem;
        margin-bottom: 16px;
      }
      h1 {
        font-size: clamp(2rem, 5vw, 3rem);
        margin-bottom: 12px;
        color: #1e3a8a;
      }
      p.lead {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        margin: 0 auto 24px;
        max-width: 680px;
        line-height: 1.55;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 18px;
      }
      .card {
        background: rgba(255, 255, 255, 0.85);
        border-radius: 16px;
        padding: 20px 22px;
        box-shadow: 0 18px 30px rgba(15, 23, 42, 0.12);
        backdrop-filter: blur(4px);
      }
      h2 {
        margin-top: 0;
        color: #1d4ed8;
      }
      ul {
        padding-left: 20px;
        margin: 12px 0 0;
        line-height: 1.55;
      }
      dl {
        margin: 0;
      }
      dt {
        font-weight: 600;
        color: #0f172a;
        margin-top: 12px;
      }
      dd {
        margin: 4px 0 0 0;
        line-height: 1.5;
      }
      footer {
        margin-top: 36px;
        text-align: center;
      }
      .cta {
        display: inline-block;
        margin-top: 12px;
        padding: 12px 24px;
        border-radius: 9999px;
        background: #2563eb;
        color: #ffffff;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.2s ease;
        cursor: pointer;
      }
      .cta:hover {
        background: #1d4ed8;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="grade-tag">${gradeSubtitle}</p>
        <h1>${safeTitle}</h1>
        <p class="lead">${intro}</p>
      </header>
      <div class="grid">
        ${sectionHtml}
        ${termHtml}
      </div>
      <footer>
        <p>${conclusion}</p>
        <a href="${ncertLink}" class="cta" target="_blank" rel="noopener noreferrer">${cta}</a>
      </footer>
    </main>
  </body>
</html>`;
}

const VALUE_ONLY_KEYS = new Set(["text", "description", "detail", "content", "point", "note", "summary", "explanation", "example"]);

function normalizeStrings(value) {
  const results = [];

  const collect = (item) => {
    if (item == null) {
      return;
    }

    if (typeof item === "string") {
      const trimmed = item.trim();

      if (looksLikeJson(trimmed)) {
        try {
          const parsed = JSON.parse(trimmed);
          collect(parsed);
          return;
        } catch (error) {
          // Fall through to treat as plain text
        }
      }

      trimmed
        .split(/[;\n]/)
        .map((part) => sanitizeText(part))
        .filter(Boolean)
        .forEach((text) => {
          results.push(text);
        });
      return;
    }

    if (typeof item === "number" || typeof item === "boolean") {
      const text = sanitizeText(String(item));
      if (text) {
        results.push(text);
      }
      return;
    }

    if (Array.isArray(item)) {
      item.forEach(collect);
      return;
    }

    if (typeof item === "object") {
      Object.entries(item).forEach(([key, val]) => {
        if (val == null) {
          return;
        }

        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
          const keyText = sanitizeText(key);
          const valueText = sanitizeText(String(val));

          if (valueText) {
            const normalizedKey = typeof key === "string" ? key.trim().toLowerCase() : "";
            if (keyText && VALUE_ONLY_KEYS.has(normalizedKey)) {
              results.push(valueText);
            } else {
              results.push(keyText ? `${keyText}: ${valueText}` : valueText);
            }
          }
          return;
        }

        collect(val);
      });
    }
  };

  collect(value);
  return results;
}

function looksLikeJson(value) {
  const trimmed = value.trim();
  return (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  );
}

function sanitizeText(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  if (!value) {
    return "";
  }

  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeParseJson(text) {
  const candidates = Array.from(
    new Set([
      text,
      normalizeJsonQuotes(text),
      removeTrailingCommas(normalizeJsonQuotes(text)),
    ])
  ).filter(Boolean);

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (error) {
      // Try next candidate
    }
  }

  throw new Error("Invalid JSON structure");
}

function normalizeJsonQuotes(value) {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .normalize("NFKC");
}

function removeTrailingCommas(value) {
  return value.replace(/,(\s*[}\]])/g, "$1");
}

function stripJsonLine(line) {
  let cleaned = line
    .replace(/^"[^"]+"\s*:\s*/, "")
    .replace(/^'[^']+'\s*:\s*/, "")
    .replace(/[",]$/g, "")
    .trim();

  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  if (/^[\[\]{}]*$/.test(cleaned)) {
    return "";
  }

  return cleaned;
}
