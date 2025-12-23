import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { requestModelContent } from "../../lib/modelProvider";
import { buildGradeLabel } from "../../lib/gradeUtils";

const STABILITY_API_KEY = process.env.STABILITY_AI_KEY;
const STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image";
const MAX_STABILITY_SLIDES = 3;

const latexCleanupPatterns = [
  { regex: /\\textbf\{([^}]*)\}/g, replacement: "$1" },
  { regex: /\\textit\{([^}]*)\}/g, replacement: "$1" },
  { regex: /\\\(/g, replacement: "(" },
  { regex: /\\\)/g, replacement: ")" },
  { regex: /\\\[/g, replacement: "[" },
  { regex: /\\\]/g, replacement: "]" },
  { regex: /\\cup/g, replacement: "∪" },
  { regex: /\\cap/g, replacement: "∩" },
  { regex: /\\subseteq/g, replacement: "⊆" },
  { regex: /\\subset/g, replacement: "⊂" },
  { regex: /\\supseteq/g, replacement: "⊇" },
  { regex: /\\supset/g, replacement: "⊃" },
  { regex: /\\in/g, replacement: "∈" },
  { regex: /\\notin/g, replacement: "∉" },
  { regex: /\\emptyset/g, replacement: "∅" },
];

export default async function handler(req, res) {
  const { subject, topic, grade, contentOnly: contentOnlyParam, withImages: withImagesParam } = req.query;
  const optionFlags = {
    contentOnly: contentOnlyParam === "true",
    withImages: withImagesParam === "true",
  };

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

  const gradeLabel = buildGradeLabel(grade);
  const shouldIncludeSlides = Boolean(!optionFlags.contentOnly && optionFlags.withImages);
  let stabilitySlides = [];

  try {
    const prompt = buildHandoutPrompt(subject, topic, gradeLabel, optionFlags);

    let rawContent;
    try {
      rawContent = await requestModelContent(prompt);
    } catch (modelError) {
      // eslint-disable-next-line no-console
      console.warn("Falling back to template handout generation", modelError);
      rawContent = buildFallbackHandoutContent(subject, topic, gradeLabel, optionFlags);
    }

    if (!rawContent) {
      rawContent = buildFallbackHandoutContent(subject, topic, gradeLabel, optionFlags);
    }

    const handout = parseHandout(rawContent, subject, topic, gradeLabel);

    if (shouldIncludeSlides) {
      const imageDescriptors = buildImagePromptDescriptors(subject, topic, gradeLabel, handout);
      stabilitySlides = await generateSlideImages(subject, topic, gradeLabel, imageDescriptors);
    }

    const pdfBytes = await createHandoutPdf(handout, stabilitySlides);
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Primary PDF generation failed", error);
    try {
      const fallbackContent = buildFallbackHandoutContent(subject, topic, gradeLabel, optionFlags);
      const fallbackHandout = parseHandout(fallbackContent, subject, topic, gradeLabel);

      if (shouldIncludeSlides && stabilitySlides.length === 0) {
        const fallbackDescriptors = buildImagePromptDescriptors(subject, topic, gradeLabel, fallbackHandout);
        stabilitySlides = await generateSlideImages(subject, topic, gradeLabel, fallbackDescriptors);
      }

      const pdfBytes = await createHandoutPdf(fallbackHandout, stabilitySlides);
      const base64 = Buffer.from(pdfBytes).toString("base64");
      res.status(200).json({ base64, providerFallback: true });
    } catch (fallbackError) {
      // eslint-disable-next-line no-console
      console.error("Fallback PDF generation failed", fallbackError);
      res.status(500).json({ message: fallbackError.message || "Unable to generate PDF" });
    }
  }
}

function buildHandoutPrompt(subject, topic, gradeLabel, options = {}) {
  const extraGuidance = [];
  if (options.contentOnly) {
    extraGuidance.push("- Provide textual explanations only; exclude any placeholders for images or diagrams.");
  }
  if (options.withImages) {
    extraGuidance.push("- Suggest 2-3 short cues for simple diagrams or maps that teachers can recreate (e.g., 'Sketch a labeled map of ...').");
  }

  const extras = extraGuidance.length
    ? `\nAdditional formatting guidance:\n${extraGuidance.join("\n")}`
    : "";

  return `Create a printable ${gradeLabel} ${subject} study handout about ${topic}.

IMPORTANT - NCERT CONTENT EXTRACTION:
- For CBSE board, extract content directly from NCERT ${subject} textbook for ${gradeLabel}
- Focus specifically on "${topic}" - include definitions, formulas, theorems, and key points as they appear in NCERT
- Extract important examples, practice problems, and summary points related to this specific topic
- Organize the content in a student-friendly format suitable for quick revision
- Include all relevant formulas, properties, and important notes from the NCERT chapter

Respond using the exact structure below:
TITLE: <short title>
SECTION: <heading one>
- bullet sentence one
- bullet sentence two
- bullet sentence three

SECTION: <heading two>
- bullet sentence one
- bullet sentence two

SECTION: <heading three>
- bullet sentence one
- bullet sentence two

Requirements:
- Use plain text only; no Markdown or LaTeX commands.
- Provide 3-5 sections covering different aspects of the topic.
- Keep bullet sentences concise and classroom-ready.
- Prefer standard math symbols like ∪, ∩, ⊆ rather than commands.
${extras}`;
}

function parseHandout(content, subject, topic, gradeLabel) {
  const lines = content
    .split("\n")
    .map((line) => cleanLine(line))
    .filter(Boolean);

  let title = `${gradeLabel} ${subject} – ${topic}`;
  const sections = [];
  let currentSection = null;

  lines.forEach((line) => {
    if (line.startsWith("TITLE:")) {
      const value = line.replace(/^TITLE:\s*/i, "").trim();
      if (value) {
        title = value;
      }
      return;
    }

    if (line.startsWith("SECTION:")) {
      if (currentSection && currentSection.bullets.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        heading: line.replace(/^SECTION:\s*/i, "").trim() || "Key Points",
        bullets: [],
      };
      return;
    }

    if (line.startsWith("-")) {
      const bullet = line.replace(/^[-•]\s*/, "").trim();
      if (!currentSection) {
        currentSection = { heading: "Key Ideas", bullets: [] };
      }
      if (bullet) {
        currentSection.bullets.push(bullet);
      }
      return;
    }

    if (currentSection) {
      const fallback = line.trim();
      if (fallback) {
        const lastIndex = currentSection.bullets.length - 1;
        if (lastIndex >= 0) {
          currentSection.bullets[lastIndex] = `${currentSection.bullets[lastIndex]} ${fallback}`.trim();
        } else {
          currentSection.bullets.push(fallback);
        }
      }
    }
  });

  if (currentSection && currentSection.bullets.length > 0) {
    sections.push(currentSection);
  }

  if (sections.length === 0) {
    sections.push({
      heading: "Key Ideas",
      bullets: ["This topic explores fundamental ideas and examples.", "Consult your textbook for detailed practice."],
    });
  }

  return { title, sections };
}

function buildFallbackHandoutContent(subject, topic, gradeLabel, options = {}) {
  const safeTopic = topic || "Key Concepts";
  const normalizedSubject = subject || "Subject";
  const contentGuidance = options.contentOnly
    ? "- Focus purely on textual explanations; do not reference images or diagrams"
    : "- Encourage students to describe visuals or maps that support understanding";
  const practiceLine = options.withImages
    ? "- Suggest a simple diagram or map idea to accompany practice"
    : "- Provide at least two quick problems or prompts";

  return `TITLE: ${gradeLabel} ${normalizedSubject} – ${safeTopic}
SECTION: Core Ideas
- Overview of ${safeTopic.toLowerCase()} within ${normalizedSubject}
- Important definitions teachers should review
- Everyday examples students can relate to
- Clarify how this topic connects to prior knowledge
SECTION: Classroom Discussion
- Ask students to explain ${safeTopic.toLowerCase()} in their own words
- Encourage connections to prior knowledge and real-life use cases
- ${contentGuidance}
SECTION: Practice and Reflection
- ${practiceLine}
- Close with an exit ticket summarizing one learning takeaway`;
}

async function createHandoutPdf(handout, slideImages = []) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const margin = 56;
  let { width, height } = page.getSize();
  let cursorY = height - margin;

  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const titleSize = 20;
  const headingSize = 14;
  const bodySize = 11;
  const lineHeight = bodySize * 1.5;
  const maxWidth = width - margin * 2;

  const ensureSpace = (needed) => {
    if (cursorY - needed < margin) {
      page = pdfDoc.addPage();
      ({ width, height } = page.getSize());
      cursorY = height - margin;
    }
  };

  const wrapText = (text, font, size, availableWidth) => {
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";

    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= availableWidth) {
        current = candidate;
      } else {
        if (current) {
          lines.push(current);
        }
        current = word;
      }
    });

    if (current) {
      lines.push(current);
    }

    return lines.length > 0 ? lines : [text];
  };

  const drawTitle = () => {
    ensureSpace(titleSize * 1.6);
    page.drawText(handout.title, {
      x: margin,
      y: cursorY,
      size: titleSize,
      font: boldFont,
      color: rgb(14 / 255, 31 / 255, 133 / 255),
    });
    cursorY -= titleSize * 1.8;
  };

  const drawSection = (section) => {
    ensureSpace(headingSize * 1.5);
    page.drawText(section.heading, {
      x: margin,
      y: cursorY,
      size: headingSize,
      font: boldFont,
      color: rgb(30 / 255, 58 / 255, 138 / 255),
    });
    cursorY -= headingSize * 1.3;

    section.bullets.forEach((bullet) => {
      const lines = wrapText(bullet, regularFont, bodySize, maxWidth - 20);
      ensureSpace(lineHeight);
      page.drawText("•", {
        x: margin,
        y: cursorY,
        size: bodySize,
        font: boldFont,
        color: rgb(15 / 255, 23 / 255, 42 / 255),
      });
      const [first, ...rest] = lines;
      page.drawText(first, {
        x: margin + 18,
        y: cursorY,
        size: bodySize,
        font: regularFont,
        color: rgb(15 / 255, 23 / 255, 42 / 255),
      });
      cursorY -= lineHeight;
      rest.forEach((line) => {
        ensureSpace(lineHeight);
        page.drawText(line, {
          x: margin + 18,
          y: cursorY,
          size: bodySize,
          font: regularFont,
          color: rgb(15 / 255, 23 / 255, 42 / 255),
        });
        cursorY -= lineHeight;
      });
      cursorY -= bodySize * 0.4;
    });

    cursorY -= bodySize * 0.6;
  };

  drawTitle();
  handout.sections.forEach(drawSection);

  if (Array.isArray(slideImages) && slideImages.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, slideBuffer] of slideImages.entries()) {
      if (!slideBuffer) {
        // eslint-disable-next-line no-continue
        continue;
      }

      page = pdfDoc.addPage();
      ({ width, height } = page.getSize());
      cursorY = height - margin;

      const slideHeading = `Slide ${index + 1}`;
      ensureSpace(headingSize * 1.5);
      page.drawText(slideHeading, {
        x: margin,
        y: cursorY,
        size: headingSize,
        font: boldFont,
        color: rgb(30 / 255, 58 / 255, 138 / 255),
      });
      cursorY -= headingSize * 1.5;

      try {
        const embedded = await pdfDoc.embedPng(slideBuffer);
        const availableWidth = width - margin * 2;
        const availableHeight = cursorY - margin;
        const imageDims = embedded.scaleToFit(availableWidth, availableHeight);
        const imageX = margin + (availableWidth - imageDims.width) / 2;
        const imageY = cursorY - imageDims.height;

        page.drawImage(embedded, {
          x: imageX,
          y: imageY,
          width: imageDims.width,
          height: imageDims.height,
        });
      } catch (imageError) {
        // eslint-disable-next-line no-console
        console.error("Failed to embed slide image", imageError);
      }
    }
  }

  return pdfDoc.save();
}

function cleanLine(line) {
  if (!line) {
    return "";
  }

  let sanitized = line.normalize("NFKC").replace(/\*\*/g, "").trim();

  latexCleanupPatterns.forEach(({ regex, replacement }) => {
    sanitized = sanitized.replace(regex, replacement);
  });

  sanitized = sanitized.replace(/\s+/g, " ");

  return sanitized;
}

async function generateSlideImages(subject, topic, gradeLabel, descriptors = []) {
  if (!STABILITY_API_KEY || !Array.isArray(descriptors) || descriptors.length === 0) {
    return [];
  }

  const limitedDescriptors = descriptors.slice(0, MAX_STABILITY_SLIDES);
  const slideBuffers = [];

  // Sequential generation helps avoid hitting rate limits quickly
  // eslint-disable-next-line no-restricted-syntax
  for (const descriptor of limitedDescriptors) {
    try {
      const response = await fetch(STABILITY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: buildStabilityPrompt(subject, topic, gradeLabel, descriptor),
            },
          ],
          cfg_scale: 7,
          height: 768,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      });

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error("Stability AI request failed", await response.text());
        // eslint-disable-next-line no-continue
        continue;
      }

      const payload = await response.json();
      const artifact = payload?.artifacts?.[0];
      if (artifact?.base64) {
        slideBuffers.push(Buffer.from(artifact.base64, "base64"));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Stability AI slide generation error", error);
    }
  }

  return slideBuffers;
}

function buildStabilityPrompt(subject, topic, gradeLabel, descriptor = {}) {
  const { heading, summary } = descriptor;
  const safeHeading = heading || `Key idea from ${topic}`;
  const safeSummary = summary || `Explain ${topic} simply for ${gradeLabel} ${subject}`;
  return `High-resolution classroom presentation slide.
Board: ${gradeLabel} ${subject}.
Topic: ${topic}.
Slide title: ${safeHeading}.
Content focus: ${safeSummary}.
Style: clean infographic, minimal text, friendly icons, consistent colors, no watermark, no brand logos, ready for classroom use.`;
}

function buildImagePromptDescriptors(subject, topic, gradeLabel, handout) {
  if (!handout?.sections || handout.sections.length === 0) {
    return [];
  }

  return handout.sections.map((section) => ({
    heading: section.heading,
    summary: section.bullets?.slice(0, 2).join("; ") || `${topic} core ideas`,
    subject,
    topic,
    gradeLabel,
  }));
}
