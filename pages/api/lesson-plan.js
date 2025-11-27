import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { parseGrade, buildGradeLabel } from "../../lib/gradeUtils";

const DEFAULT_SECTION = {
  name: "Learning Segment",
  durationMinutes: 10,
  activities: [
    "Introduce the core concept with a short explanation.",
    "Guide students through an example and check for understanding.",
  ],
};

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
    const prompt = buildLessonPlanPrompt(subject, topic, gradeLabel);

    let rawPlan = null;
    try {
      rawPlan = await requestModelContent(prompt);
    } catch (modelError) {
      console.error("Lesson plan model request failed", modelError);
    }

    const lessonPlan = rawPlan
      ? parseLessonPlan(rawPlan, subject, topic, gradeLabel)
      : buildTemplateLessonPlan(subject, topic, gradeLabel);

    const pdfBytes = await createLessonPlanPdf(lessonPlan, { subject, topic, gradeLabel });
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64, gradeNumber });
  } catch (error) {
    console.error("Lesson plan generation failed", error);
    res.status(500).json({ message: "Unable to generate lesson plan" });
  }
}

function buildLessonPlanPrompt(subject, topic, gradeLabel) {
  return `You are an experienced ${gradeLabel} ${subject} teacher. Create a 45-minute lesson plan about ${topic}.
Return ONLY valid JSON (no markdown) following this schema:
{
  "title": string,
  "durationMinutes": number,
  "objectives": [string],
  "materials": [string],
  "sections": [
    {
      "name": string,
      "durationMinutes": number,
      "activities": [string]
    }
  ],
  "assessment": [string],
  "homework": [string]
}
Use clear classroom-ready sentences. Each section should focus on a different part of the lesson (warm-up, instruction, practice, wrap-up).`;
}

function parseLessonPlan(rawContent, subject, topic, gradeLabel) {
  const cleaned = rawContent
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const safeString = cleaned.replace(/[\r]+/g, "");

  let parsed;
  try {
    parsed = JSON.parse(safeString);
  } catch (error) {
    return buildFallbackPlan(subject, topic, cleaned, gradeLabel);
  }

  const objectives = normalizeList(parsed.objectives);
  const materials = normalizeList(parsed.materials);
  const assessment = normalizeList(parsed.assessment);
  const homework = normalizeList(parsed.homework);

  const sections = Array.isArray(parsed.sections)
    ? parsed.sections
        .map((section) => ({
          name: sanitizeText(section?.name) || DEFAULT_SECTION.name,
          durationMinutes: normalizeDuration(section?.durationMinutes),
          activities: normalizeList(section?.activities),
        }))
        .filter((section) => section.activities.length > 0)
    : [];

  if (sections.length === 0) {
    sections.push({ ...DEFAULT_SECTION, activities: [...DEFAULT_SECTION.activities] });
  }

  return {
    title: sanitizeText(parsed.title) || `${gradeLabel} ${subject} Lesson Plan: ${topic}`,
    durationMinutes: normalizeDuration(parsed.durationMinutes) || 45,
    objectives:
      objectives.length > 0
        ? objectives
        : [
            "Clarify prior knowledge related to the topic.",
            "Develop conceptual understanding through guided practice.",
            "Check for understanding and assign meaningful follow-up work.",
          ],
    materials,
    sections,
    assessment,
    homework,
  };
}

function buildTemplateLessonPlan(subject, topic, gradeLabel) {
  const title = `${gradeLabel} ${subject} Lesson Plan: ${topic}`;
  const cleanedTopic = sanitizeText(topic) || "the topic";

  return {
    title,
    durationMinutes: 45,
    objectives: [
      `Connect prior knowledge to ${cleanedTopic}.`,
      `Develop conceptual understanding of ${cleanedTopic} through guided discussion and examples.`,
      `Provide structured practice so students apply ${cleanedTopic} independently.`,
    ],
    materials: [
      `${gradeLabel} ${subject} textbook`,
      "Whiteboard and markers",
      "Student notebooks or digital devices",
    ],
    sections: [
      {
        name: "Warm-Up",
        durationMinutes: 10,
        activities: [
          `Review the previous lesson and ask a quick question that links to ${cleanedTopic}.`,
          "Invite students to share what they already know using a short think-pair-share.",
        ],
      },
      {
        name: "Direct Instruction",
        durationMinutes: 15,
        activities: [
          `Introduce the key ideas and vocabulary for ${cleanedTopic}.`,
          "Model a worked example, pointing out common misconceptions.",
          "Check for understanding with a few quick formative questions.",
        ],
      },
      {
        name: "Guided Practice",
        durationMinutes: 12,
        activities: [
          "Students work in pairs or small groups on two scaffolded tasks.",
          "Circulate, offer feedback, and prompt students to explain their thinking.",
        ],
      },
      {
        name: "Independent Practice & Wrap-Up",
        durationMinutes: 8,
        activities: [
          "Assign a short independent task to demonstrate mastery.",
          `Summarize the key learning points about ${cleanedTopic} and preview the next lesson.`,
        ],
      },
    ],
    assessment: [
      `Exit ticket with three targeted questions on ${cleanedTopic}.`,
      "Collect guided practice work to review misconceptions.",
    ],
    homework: [
      `Assign textbook practice problems related to ${cleanedTopic}.`,
      "Ask students to write a brief reflection on how they can apply the concept in real life.",
    ],
  };
}

function buildFallbackPlan(subject, topic, cleaned, gradeLabel) {
  const lines = cleaned
    .split("\n")
    .map((line) => sanitizeText(line))
    .filter(Boolean);

  return {
    title: `${gradeLabel} ${subject} Lesson Plan: ${topic}`,
    durationMinutes: 45,
    objectives: lines.slice(0, 3),
    materials: [],
    sections: [
      {
        name: DEFAULT_SECTION.name,
        durationMinutes: DEFAULT_SECTION.durationMinutes,
        activities:
          lines.slice(3, 8).length > 0
            ? lines.slice(3, 8)
            : [...DEFAULT_SECTION.activities],
      },
    ],
    assessment: lines.slice(8, 10),
    homework: lines.slice(10, 12),
  };
}

function normalizeList(value) {
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
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001F]/g, "")
    .trim();
}

function normalizeDuration(value) {
  const numberValue = Number.parseInt(value, 10);
  if (Number.isNaN(numberValue) || numberValue <= 0) {
    return null;
  }
  return numberValue;
}

async function createLessonPlanPdf(plan, { subject, topic, gradeLabel }) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const margin = 56;
  let { width, height } = page.getSize();
  let cursorY = height - margin;

  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const titleSize = 20;
  const headingSize = 14;
  const subheadingSize = 12;
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
    if (words.length === 0) {
      return [];
    }

    const lines = [];
    let current = words[0];

    for (let index = 1; index < words.length; index += 1) {
      const candidate = `${current} ${words[index]}`;
      if (font.widthOfTextAtSize(candidate, size) <= availableWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[index];
      }
    }

    if (current) {
      lines.push(current);
    }

    return lines;
  };

  const drawSectionHeading = (text) => {
    ensureSpace(headingSize * 1.6);
    page.drawText(text, {
      x: margin,
      y: cursorY,
      size: headingSize,
      font: boldFont,
      color: rgb(30 / 255, 58 / 255, 138 / 255),
    });
    cursorY -= headingSize * 1.4;
  };

  const drawBulletList = (items) => {
    items.forEach((item) => {
      const lines = wrapText(item, regularFont, bodySize, maxWidth - 20);
      if (lines.length === 0) {
        return;
      }
      ensureSpace(lineHeight);
      page.drawText("•", {
        x: margin,
        y: cursorY,
        size: bodySize,
        font: boldFont,
        color: rgb(15 / 255, 23 / 255, 42 / 255),
      });
      page.drawText(lines[0], {
        x: margin + 18,
        y: cursorY,
        size: bodySize,
        font: regularFont,
        color: rgb(15 / 255, 23 / 255, 42 / 255),
      });
      cursorY -= lineHeight;

      for (let index = 1; index < lines.length; index += 1) {
        ensureSpace(lineHeight);
        page.drawText(lines[index], {
          x: margin + 18,
          y: cursorY,
          size: bodySize,
          font: regularFont,
          color: rgb(15 / 255, 23 / 255, 42 / 255),
        });
        cursorY -= lineHeight;
      }

      cursorY -= bodySize * 0.4;
    });
    cursorY -= bodySize * 0.6;
  };

  const drawMetadata = () => {
    const subtitle = `${gradeLabel} ${subject} - ${topic}`;
    ensureSpace(titleSize * 1.6);
    page.drawText(plan.title, {
      x: margin,
      y: cursorY,
      size: titleSize,
      font: boldFont,
      color: rgb(14 / 255, 31 / 255, 133 / 255),
    });
    cursorY -= titleSize * 1.8;

    ensureSpace(subheadingSize * 1.4);
    page.drawText(subtitle, {
      x: margin,
      y: cursorY,
      size: subheadingSize,
      font: italicFont,
      color: rgb(51 / 255, 65 / 255, 85 / 255),
    });
    cursorY -= subheadingSize * 1.6;

    const durationLabel = `Duration: ${plan.durationMinutes || 45} minutes`;
    ensureSpace(bodySize * 1.4);
    page.drawText(durationLabel, {
      x: margin,
      y: cursorY,
      size: bodySize,
      font: boldFont,
      color: rgb(30 / 255, 64 / 255, 175 / 255),
    });
    cursorY -= bodySize * 1.8;
  };

  drawMetadata();

  if (plan.objectives.length > 0) {
    drawSectionHeading("Objectives");
    drawBulletList(plan.objectives);
  }

  if (plan.materials.length > 0) {
    drawSectionHeading("Materials");
    drawBulletList(plan.materials);
  }

  plan.sections.forEach((section) => {
    const durationLabel = section.durationMinutes ? ` (${section.durationMinutes} min)` : "";
    drawSectionHeading(`${section.name}${durationLabel}`);
    drawBulletList(section.activities);
  });

  if (plan.assessment.length > 0) {
    drawSectionHeading("Assessment");
    drawBulletList(plan.assessment);
  }

  if (plan.homework.length > 0) {
    drawSectionHeading("Homework");
    drawBulletList(plan.homework);
  }

  return pdfDoc.save();
}
