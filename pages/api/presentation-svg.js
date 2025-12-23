/* eslint-disable */

import PptxGenJS from "pptxgenjs";
import { buildGradeLabel } from "../../lib/gradeUtils";
import { buildLessonWithAI } from "../../lib/openaiLesson";
import { generateTopicSpecificSvg } from "../../lib/svgGenerator";

const MAX_PRESENTATION_SLIDES = 100;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    subject,
    topic,
    grade,
    board = "CBSE",
    periodMinutes = 40,
    slideCount,
    useGPTI = false, // image AI optional
  } = req.body || {};

  if (!subject || !topic) {
    return res.status(400).json({
      message: "Subject and topic are required",
    });
  }

  const gradeLabel = buildGradeLabel(grade);
  const requestedSlideCount = slideCount
    ? Math.min(Number(slideCount), MAX_PRESENTATION_SLIDES)
    : null;

  try {
    console.log("[presentation-svg] Generating lesson:", topic);

    const lesson = await buildLessonWithAI({
      board,
      classLevel: gradeLabel,
      subject,
      topic,
      periodMinutes,
      language: "English",
      requestedSlideCount,
    });

    const pptBuffer = await createSvgPresentationDeck({
      subject,
      topic,
      gradeLabel,
      lesson,
      useGPTI,
    });

    res.status(200).json({
      base64: pptBuffer.toString("base64"),
      filename: `${subject}-${topic}.pptx`,
      slideCount: lesson.slides?.length || 0,
    });
  } catch (error) {
    console.error("Presentation generation failed:", error);
    res.status(500).json({
      message: error.message || "Failed to generate presentation",
    });
  }
}

/* ========================================================= */
/* ================= PPT GENERATION ======================== */
/* ========================================================= */

async function createSvgPresentationDeck({
  subject,
  topic,
  gradeLabel,
  lesson,
  useGPTI,
}) {
  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "TeachWiseAI";
  pptx.subject = `${gradeLabel} ${subject}`;
  pptx.title = `${topic} - ${subject}`;

  const slides = lesson.slides || [];

  for (const [index, slideData] of slides.entries()) {
    const slide = pptx.addSlide();

    /* ---------- TITLE ---------- */
    slide.addText(slideData.title || topic, {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.7,
      fontSize: 36,
      bold: true,
      color: "1E3A8A",
      fontFace: "Arial",
    });

    /* ---------- SUBTITLE ---------- */
    slide.addText(
      slideData.type
        ? slideData.type.replace(/_/g, " ").toUpperCase()
        : "OVERVIEW",
      {
        x: 0.5,
        y: 1.1,
        w: "90%",
        h: 0.4,
        fontSize: 22,
        bold: true,
        color: "3B82F6",
        fontFace: "Arial",
      }
    );

    /* ---------- DIAGRAM PROMPT (SAFE SCOPE) ---------- */
    const diagramPrompt =
      slideData.content?.diagramPrompt || `${topic} concept diagram`;

    /* ---------- IMAGE / SVG (SVG IS DEFAULT) ---------- */
    await addDiagramToSlide({
      slide,
      index,
      subject,
      topic,
      slideData,
      diagramPrompt,
      useGPTI,
    });

    /* ---------- RIGHT PANEL ---------- */
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.2,
      y: 1.7,
      w: 6.2,
      h: 5,
      fill: { color: "F1F5F9" },
      line: { color: "CBD5E1", width: 1 },
    });

    const bullets =
      slideData.content?.bullets && slideData.content.bullets.length
        ? slideData.content.bullets
        : ["Key concept explained visually"];

    slide.addText(
      bullets.map((b, i) => `${i + 1}. ${b}`).join("\n\n"),
      {
        x: 6.5,
        y: 2,
        w: 5.6,
        h: 4.4,
        fontSize: 14,
        color: "0F172A",
        fontFace: "Arial",
        valign: "top",
        lineSpacing: 22,
      }
    );

    /* ---------- FOOTER ---------- */
    slide.addText(
      `${gradeLabel} ${subject} | Slide ${index + 1} of ${slides.length}`,
      {
        x: 0.5,
        y: 6.9,
        w: "90%",
        h: 0.3,
        fontSize: 11,
        color: "64748B",
        fontFace: "Arial",
        align: "center",
      }
    );
  }

  return pptx.write({ outputType: "nodebuffer" });
}

/* ========================================================= */
/* ================= DIAGRAM HANDLER ======================= */
/* ========================================================= */

async function addDiagramToSlide({
  slide,
  index,
  subject,
  topic,
  slideData,
  diagramPrompt,
  useGPTI,
}) {
  // SVG is DEFAULT and SAFE
  async function addSvg() {
    const svgContent = generateTopicSpecificSvg(
      topic,
      diagramPrompt,
      subject,
      index,
      slideData.title,
      slideData.type
    );

    slide.addImage({
      data: `data:image/svg+xml;base64,${Buffer.from(svgContent).toString(
        "base64"
      )}`,
      x: 0.5,
      y: 1.7,
      w: 5.5,
      h: 5,
      sizing: { type: "contain", w: 5.5, h: 5 },
    });
  }

  // Optional GPT image (kept safe)
  if (useGPTI) {
    try {
      const { generateSlideImageGPT4o } = await import(
        "../../lib/gpt4oImageApi"
      );

      const base64Image = await generateSlideImageGPT4o(
        topic,
        subject,
        slideData.title,
        index
      );

      slide.addImage({
        data: `data:image/png;base64,${base64Image}`,
        x: 0.5,
        y: 1.7,
        w: 5.5,
        h: 5,
        sizing: { type: "contain", w: 5.5, h: 5 },
      });
      return;
    } catch (err) {
      console.warn("[presentation-svg] GPTI failed, using SVG", err);
    }
  }

  await addSvg();
}
