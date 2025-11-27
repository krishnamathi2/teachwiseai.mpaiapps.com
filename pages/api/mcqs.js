import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
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

  if (typeof subjectEntry === "undefined") {
    res.status(404).json({ message: "Subject not supported" });
    return;
  }

  const gradeNumber = parseGrade(grade) ?? 12;
  const gradeLabel = buildGradeLabel(gradeNumber);

  try {
    const prompt = buildMcqPrompt(subject, topic, gradeLabel);
    const rawContent = await requestModelContent(prompt);
    const mcqSet = parseMcqSet(rawContent || "", subject, topic, gradeLabel);
    const pdfBytes = await createMcqPdf(mcqSet, subject, topic, gradeLabel);
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64, gradeNumber });
  } catch (error) {
    console.error("MCQ generation failed", error);
    res.status(500).json({ message: "Unable to generate MCQs" });
  }
}

function buildMcqPrompt(subject, topic, gradeLabel) {
  return `You are creating ${gradeLabel} ${subject} practice for ${topic}.\nReturn ONLY valid JSON (no markdown) that matches this schema:\n{\n  "questions": [\n    {\n      "stem": string,\n      "options": [string, string, string, string],\n      "answer": string,\n      "explanation": string\n    }\n  ]\n}\n- Provide 6 to 8 questions.\n- Make each option concise (max 18 words).\n- Use answer letters A, B, C, or D.\n- Keep language classroom friendly and avoid LaTeX.`;
}

function parseMcqSet(rawContent, subject, topic, gradeLabel) {
  const cleaned = rawContent
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    return buildFallbackSet(subject, topic, cleaned, gradeLabel);
  }

  const questions = Array.isArray(parsed?.questions)
    ? parsed.questions
        .map((question) => normalizeQuestion(question, subject, topic, gradeLabel))
        .filter(Boolean)
    : [];

  if (questions.length === 0) {
    return buildFallbackSet(subject, topic, cleaned, gradeLabel);
  }

  return { questions };
}

function normalizeQuestion(candidate, subject, topic, gradeLabel) {
  if (!candidate) {
    return null;
  }

  const stem = cleanText(candidate.stem);
  const options = normalizeOptions(candidate.options);
  if (!stem || options.length === 0) {
    return null;
  }

  if (!options.some(Boolean)) {
    return null;
  }

  const answerInfo = normalizeAnswer(candidate.answer, options.length);
  const explanation = cleanText(candidate.explanation);

  return {
    stem,
    options,
    answer: answerInfo.letter,
    answerIndex: answerInfo.index,
    explanation:
      explanation || buildDefaultExplanation(subject, topic, gradeLabel, stem, options[answerInfo.index]),
  };
}

function normalizeOptions(options) {
  if (Array.isArray(options)) {
    const normalized = options
      .map((option) => cleanText(typeof option === "string" ? option : ""))
      .filter(Boolean);
    return ensureOptionCount(normalized);
  }

  if (typeof options === "string") {
    const split = cleanText(options)
      .split(/\n|;|\||,/)
      .map((item) => item.trim())
      .filter(Boolean);
    return ensureOptionCount(split);
  }

  return ensureOptionCount([]);
}

function ensureOptionCount(list) {
  const result = [...list];
  const fallbacks = [
    "Apply the definition directly.",
    "Use a contrasting example to test understanding.",
    "Select the property that matches the scenario.",
    "Choose the option that best fits this topic.",
  ];

  while (result.length < 4) {
    result.push(fallbacks[result.length] || `Option ${result.length + 1}`);
  }

  return result.slice(0, 4).map((entry) => (entry && entry.trim() ? entry : "Select the statement that aligns."));
}

function normalizeAnswer(rawAnswer, optionCount) {
  const letters = ["A", "B", "C", "D"];
  const cleaned = cleanText(rawAnswer).toUpperCase();
  const letter = letters.includes(cleaned.charAt(0)) ? cleaned.charAt(0) : letters[0];
  const index = Math.max(0, Math.min(optionCount - 1, letters.indexOf(letter)));
  return { letter: letters[index] ?? "A", index };
}

async function createMcqPdf(mcqSet, subject, topic, gradeLabel) {
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    italic: await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
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

  const wrapText = (text, font, size, maxWidth = contentWidth()) => {
    const safeText = cleanText(typeof text === "string" ? text : String(text ?? ""));
    const words = safeText.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return [""];
    }

    const lines = [];
    let buffer = words[0];

    for (let index = 1; index < words.length; index += 1) {
      const candidate = `${buffer} ${words[index]}`;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        buffer = candidate;
      } else {
        lines.push(buffer);
        buffer = words[index];
      }
    }

    if (buffer) {
      lines.push(buffer);
    }

    return lines;
  };

  const drawHeading = (label, font, size, color, gap) => {
    ensureSpace(size + gap);
    pageState.page.drawText(label, {
      x: pageState.margin,
      y: pageState.cursorY - size,
      font,
      size,
      color,
    });
    pageState.cursorY -= size + gap;
  };

  drawHeading(`${gradeLabel} ${subject} MCQs`, fonts.bold, 22, rgb(0.08, 0.18, 0.42), 12);
  drawHeading(`Topic: ${topic}`, fonts.italic, 13, rgb(0.24, 0.33, 0.52), 24);

  const answerKey = [];

  mcqSet.questions.forEach((question, index) => {
    const questionNumber = index + 1;
    const questionLines = wrapText(`${questionNumber}. ${question.stem}`, fonts.bold, 12);
    const optionBlocks = (question.options || []).map((option, optionIndex) => {
      const label = String.fromCharCode(65 + optionIndex);
      return wrapText(`${label}. ${option ?? ""}`, fonts.regular, 11, contentWidth() - 24);
    });

    const questionHeight = questionLines.length * 16;
    const optionsHeight = optionBlocks.reduce((total, lines) => total + lines.length * 14, 0);
    ensureSpace(questionHeight + optionsHeight + 22);

    let lineY = pageState.cursorY;
    questionLines.forEach((line) => {
      pageState.page.drawText(line, {
        x: pageState.margin,
        y: lineY - 12,
        font: fonts.bold,
        size: 12,
        color: rgb(0.1, 0.22, 0.41),
      });
      lineY -= 16;
    });

    optionBlocks.forEach((lines) => {
      lines.forEach((line) => {
        pageState.page.drawText(line, {
          x: pageState.margin + 14,
          y: lineY - 11,
          font: fonts.regular,
          size: 11,
          color: rgb(0.12, 0.12, 0.12),
        });
        lineY -= 14;
      });
    });

    pageState.cursorY = lineY - 8;
    answerKey.push({
      number: questionNumber,
      answer: question.answer,
      explanation: question.explanation,
    });
  });

  drawHeading("Answer Key", fonts.bold, 16, rgb(0.08, 0.18, 0.42), 16);

  answerKey.forEach((entry) => {
    const answerLines = wrapText(`${entry.number}. ${entry.answer}`, fonts.bold, 11);
    const explanationLines = wrapText(`Explanation: ${entry.explanation}`, fonts.regular, 10, contentWidth() - 18);
    const heightNeeded = answerLines.length * 14 + explanationLines.length * 13 + 10;
    ensureSpace(heightNeeded);

    let lineY = pageState.cursorY;
    answerLines.forEach((line) => {
      pageState.page.drawText(line, {
        x: pageState.margin,
        y: lineY - 11,
        font: fonts.bold,
        size: 11,
        color: rgb(0.1, 0.22, 0.41),
      });
      lineY -= 14;
    });

    explanationLines.forEach((line) => {
      pageState.page.drawText(line, {
        x: pageState.margin + 12,
        y: lineY - 10,
        font: fonts.regular,
        size: 10,
        color: rgb(0.15, 0.15, 0.15),
      });
      lineY -= 13;
    });

    pageState.cursorY = lineY - 8;
  });

  return pdfDoc.save();
}

function buildDefaultExplanation(subject, topic, gradeLabel, stem, answerText) {
  return `Relate the idea in "${stem}" to ${topic} in ${gradeLabel} ${subject} and highlight why "${answerText}" is correct.`;
}

function buildFallbackSet(subject, topic, rawContent, gradeLabel) {
  const stemBase = cleanText(rawContent).slice(0, 120) || `${topic} fundamentals in ${subject}`;
  const templates = [
    `${stemBase}: identify the correct definition.`,
    `${stemBase}: choose the property that applies.`,
    `${stemBase}: select the accurate example.`,
    `${stemBase}: find the statement that is true.`,
    `${stemBase}: determine the best application.`,
    `${stemBase}: evaluate which idea aligns with theory.`,
  ];

  const questions = templates.slice(0, 6).map((stem) => ({
    stem,
    options: ensureOptionCount([]),
    answer: "A",
    answerIndex: 0,
    explanation: `Option A captures the essential point for ${topic} in ${gradeLabel}.`,
  }));

  return { questions };
}

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n/g, " ")
    .replace(/\n/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[∪∩⊆⊂⊇⊃∈∉∅≈≤≥±÷×√∞]/g, mapSymbolToAscii)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001F]/g, "")
    .trim();
}

function mapSymbolToAscii(symbol) {
  switch (symbol) {
    case "∪":
      return "U";
    case "∩":
      return "n";
    case "⊆":
      return "subseteq";
    case "⊂":
      return "subset";
    case "⊇":
      return "supseteq";
    case "⊃":
      return "supset";
    case "∈":
      return "in";
    case "∉":
      return "not in";
    case "∅":
      return "empty";
    case "≈":
      return "approx";
    case "≤":
      return "<=";
    case "≥":
      return ">=";
    case "±":
      return "+/-";
    case "÷":
      return "/";
    case "×":
      return "x";
    case "√":
      return "sqrt";
    case "∞":
      return "infinity";
    default:
      return symbol;
  }
}
