import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
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
    const prompt = buildConceptMapPrompt(subject, topic, gradeLabel);
    const rawContent = await requestModelContent(prompt);

    if (!rawContent) {
      res.status(500).json({ message: "Unable to generate concept map content" });
      return;
    }

    const conceptMap = parseConceptMap(rawContent, subject, topic, gradeLabel);
    const pdfBytes = await createConceptMapPdf(conceptMap, subject, topic, gradeLabel);
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64, gradeNumber });
  } catch (error) {
    res.status(500).json({ message: "Unable to generate concept map" });
  }
}

function buildConceptMapPrompt(subject, topic, gradeLabel) {
  return `You are designing a concept map for ${gradeLabel} ${subject} on ${topic}.
Respond with valid JSON (no markdown) using this schema:
{
  "centralIdea": string,
  "themes": [
    {
      "title": string,
      "ideas": [string]
    }
  ],
  "keyConnections": [string]
}
Provide 4-6 themes. Keep each idea short (max 18 words). Avoid LaTeX or markdown.`;
}

function parseConceptMap(rawContent, subject, topic, gradeLabel) {
  const cleaned = rawContent
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    return buildFallbackMap(subject, topic, cleaned, gradeLabel);
  }

  const centralIdea = cleanText(parsed?.centralIdea) || `${subject}: ${topic}`;
  const themes = Array.isArray(parsed?.themes)
    ? parsed.themes
        .map((theme) => ({
          title: cleanText(theme?.title) || "Key Idea",
          ideas: normalizeList(theme?.ideas),
        }))
        .filter((theme) => theme.ideas.length > 0)
    : [];

  if (themes.length === 0) {
    themes.push({
      title: "Core Concepts",
      ideas: [
        `Define ${topic} in context of ${subject}.`,
        "Highlight one central property, example, and application.",
      ],
    });
  }

  const keyConnections = normalizeList(parsed?.keyConnections);

  return {
    centralIdea,
    themes,
    keyConnections,
  };
}

async function createConceptMapPdf(conceptMap, subject, topic, gradeLabel) {
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  };

  const pageState = {
    page: pdfDoc.addPage([612, 792]),
    margin: 48,
    cursorY: 792 - 48,
  };

  const contentWidth = () => pageState.page.getWidth() - pageState.margin * 2;

  const ensureSpace = (height) => {
    if (pageState.cursorY - height <= pageState.margin) {
      pageState.page = pdfDoc.addPage([612, 792]);
      pageState.cursorY = pageState.page.getHeight() - pageState.margin;
    }
  };

  const drawWrappedText = ({
    text,
    font,
    size,
    color,
    indent = 0,
    lineGap = 4,
  }) => {
    const lines = wrapText(text, font, size, contentWidth() - indent);
    const heightNeeded = lines.length * (size + lineGap);
    ensureSpace(heightNeeded);

    let currentY = pageState.cursorY;
    lines.forEach((line, index) => {
      pageState.page.drawText(line, {
        x: pageState.margin + indent,
        y: currentY - size,
        font,
        size,
        color,
      });
      currentY -= size + lineGap;
    });

    pageState.cursorY = currentY + lineGap;
    return lines.length;
  };

  const drawSectionTitle = (label) => {
    ensureSpace(30);
    pageState.page.drawText(label, {
      x: pageState.margin,
      y: pageState.cursorY - 18,
      font: fonts.bold,
      size: 16,
      color: rgb(0.08, 0.18, 0.42),
    });
    pageState.cursorY -= 26;
  };

  // Header
  drawWrappedText({
    text: `${gradeLabel} ${subject} Concept Map`,
    font: fonts.bold,
    size: 24,
    color: rgb(0.05, 0.14, 0.36),
    lineGap: 6,
  });
  drawWrappedText({
    text: `Topic: ${topic}`,
    font: fonts.regular,
    size: 14,
    color: rgb(0.23, 0.33, 0.54),
    lineGap: 6,
  });

  // Central idea block
  const centralPadding = 12;
  const centralLines = wrapText(
    conceptMap.centralIdea,
    fonts.bold,
    14,
    contentWidth() - centralPadding * 2,
  );
  const centralHeight = centralLines.length * 18 + centralPadding * 2;
  ensureSpace(centralHeight + 12);

  const boxY = pageState.cursorY - centralHeight;
  pageState.page.drawRectangle({
    x: pageState.margin,
    y: boxY,
    width: contentWidth(),
    height: centralHeight,
    color: rgb(0.9, 0.96, 1),
    borderColor: rgb(0.23, 0.52, 0.87),
    borderWidth: 1.2,
  });

  let lineY = pageState.cursorY - centralPadding - 14;
  centralLines.forEach((line) => {
    pageState.page.drawText(line, {
      x: pageState.margin + centralPadding,
      y: lineY,
      font: fonts.bold,
      size: 14,
      color: rgb(0.08, 0.18, 0.42),
    });
    lineY -= 18;
  });

  pageState.cursorY = boxY - 24;

  // Themes
  drawSectionTitle("Key Themes");
  conceptMap.themes.forEach((theme, themeIndex) => {
    drawWrappedText({
      text: `${themeIndex + 1}. ${theme.title}`,
      font: fonts.bold,
      size: 13,
      color: rgb(0.12, 0.27, 0.48),
      lineGap: 4,
    });

    theme.ideas.forEach((idea) => {
      const bullet = "-";
      const lines = wrapText(idea, fonts.regular, 11, contentWidth() - 20);
      const heightNeeded = lines.length * 15 + 6;
      ensureSpace(heightNeeded);

      const ideaY = pageState.cursorY;
      pageState.page.drawText(bullet, {
        x: pageState.margin + 4,
        y: ideaY - 11,
        font: fonts.bold,
        size: 11,
        color: rgb(0.09, 0.22, 0.41),
      });

      lines.forEach((line, index) => {
        pageState.page.drawText(line, {
          x: pageState.margin + 18,
          y: ideaY - 11 - index * 15,
          font: fonts.regular,
          size: 11,
          color: rgb(0.1, 0.1, 0.1),
        });
      });

      pageState.cursorY = ideaY - heightNeeded + 6;
    });

    pageState.cursorY -= 10;
  });

  if (conceptMap.keyConnections.length > 0) {
    drawSectionTitle("Key Connections");
    conceptMap.keyConnections.forEach((connection) => {
      const bullet = "-";
      const lines = wrapText(connection, fonts.regular, 11, contentWidth() - 12);
      const heightNeeded = lines.length * 15 + 6;
      ensureSpace(heightNeeded);

      const connY = pageState.cursorY;
      pageState.page.drawText(bullet, {
        x: pageState.margin + 2,
        y: connY - 11,
        font: fonts.bold,
        size: 11,
        color: rgb(0.09, 0.22, 0.41),
      });

      lines.forEach((line, index) => {
        pageState.page.drawText(line, {
          x: pageState.margin + 14,
          y: connY - 11 - index * 15,
          font: fonts.regular,
          size: 11,
          color: rgb(0.12, 0.12, 0.12),
        });
      });

      pageState.cursorY = connY - heightNeeded + 6;
    });
  }

  return pdfDoc.save();
}

function wrapText(text, font, size, maxWidth) {
  const safeText = cleanText(text);
  const words = safeText.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [""];
  }

  const lines = [];
  let buffer = "";

  words.forEach((word) => {
    const candidate = buffer ? `${buffer} ${word}` : word;
    const width = font.widthOfTextAtSize(candidate, size);
    if (width <= maxWidth) {
      buffer = candidate;
    } else {
      if (buffer) {
        lines.push(buffer);
      }
      buffer = word;
    }
  });

  if (buffer) {
    lines.push(buffer);
  }

  return lines;
}

function normalizeList(candidate) {
  if (!candidate) {
    return [];
  }

  if (Array.isArray(candidate)) {
    return candidate
      .map((item) => cleanText(typeof item === "string" ? item : ""))
      .filter(Boolean);
  }

  if (typeof candidate === "string") {
    return cleanText(candidate)
      .split(/\n|\u2022|-|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n/g, " ")
    .replace(/\n/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function buildFallbackMap(subject, topic, rawContent, gradeLabel) {
  const summary = cleanText(rawContent).slice(0, 160);

  return {
    centralIdea: `${gradeLabel} ${subject}: ${topic}`,
    themes: [
      {
        title: "Overview",
        ideas: [
          summary || `Introduce ${topic} within ${subject}.`,
          `List key definitions, properties, and one application of ${topic}.`,
        ],
      },
      {
        title: "Next Steps",
        ideas: [
          `Explore real-world examples of ${topic}.`,
          `Highlight related concepts learners should connect with ${topic}.`,
        ],
      },
    ],
    keyConnections: [
      `Explain how ${topic} supports future units in ${gradeLabel.toLowerCase()}.`,
      `Encourage learners to compare ${topic} with related ideas in ${subject}.`,
    ],
  };
}