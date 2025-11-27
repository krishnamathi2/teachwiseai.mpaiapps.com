import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { parseGrade, buildGradeLabel } from "../../lib/gradeUtils";

export default async function handler(req, res) {
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

function buildWebPagePrompt(subject, topic, gradeLabel) {
  return `You are preparing a simple educational landing page for ${gradeLabel} ${subject} students about ${topic}.
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
Keep sentences concise, classroom friendly, and avoid markdown or LaTeX commands. Provide 2-4 sections, each with 3-5 bullet sentences.`;
}

function parseWebPagePlan(rawContent, subject, topic, gradeLabel) {
  const cleaned = rawContent
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
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
  const lines = rawContent
    .split("\n")
    .map((line) => sanitizeText(line))
    .filter(Boolean);

  const bullets = lines.slice(0, 5).map((line) => line.replace(/^[-•]\s*/, ""));

  return {
    title: `${subject}: ${topic}`,
    intro: lines[0] || `Explore the essentials of ${topic} in ${gradeLabel} ${subject}.`,
    sections: [
      {
        heading: "Key Takeaways",
        bullets: bullets.length > 0 ? bullets : [
          `Introduce the concept of ${topic}.`,
          "Explain the main properties with one example.",
        ],
      },
    ],
    keyTerms: [],
    conclusion: lines[5] || `Keep revisiting the concept to build mastery in ${gradeLabel.toLowerCase()}.`,
    callToAction: lines[6] || "Discuss this topic with your classmates and teacher.",
  };
}

function buildHtmlDocument(plan, subject, topic, gradeLabel) {
  const safeTitle = escapeHtml(plan.title || `${subject}: ${topic}`);
  const intro = escapeHtml(plan.intro);
  const conclusion = escapeHtml(plan.conclusion);
  const cta = escapeHtml(plan.callToAction);
  const gradeSubtitle = escapeHtml(`${gradeLabel} ${subject}`);

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
        <div class="cta" role="button">${cta}</div>
      </footer>
    </main>
  </body>
</html>`;
}

function normalizeStrings(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeText(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[;\n]/)
      .map((item) => sanitizeText(item))
      .filter(Boolean);
  }

  return [];
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
