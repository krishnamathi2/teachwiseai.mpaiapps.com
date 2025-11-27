import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { buildGradeLabel } from "../../lib/gradeUtils";

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

  try {
    const gradeLabel = buildGradeLabel(grade);
    const prompt = buildHandoutPrompt(subject, topic, gradeLabel);
    const rawContent = await requestModelContent(prompt);

    if (!rawContent) {
      res.status(500).json({ message: "Unable to generate PDF content" });
      return;
    }

    const handout = parseHandout(rawContent, subject, topic, gradeLabel);
    const pdfBytes = await createHandoutPdf(handout);
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64 });
  } catch (error) {
    res.status(500).json({ message: "Unable to generate PDF" });
  }
}

function buildHandoutPrompt(subject, topic, gradeLabel) {
  return `Create a printable ${gradeLabel} ${subject} study handout about ${topic}.

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
- Provide 3-5 sections.
- Keep bullet sentences concise and classroom-ready.
- Prefer standard math symbols like ∪, ∩, ⊆ rather than commands.`;
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

async function createHandoutPdf(handout) {
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
