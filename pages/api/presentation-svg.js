/* eslint-disable */

import PptxGenJS from "pptxgenjs";
import { buildGradeLabel } from "../../lib/gradeUtils";
import { buildLessonWithAI } from "../../lib/openaiLesson";
import { generateTopicSpecificSvg } from "../../lib/svgGenerator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    subject,
    topic,
    grade,
    slideCount = 8,
    imageCount = 0,
    useGPTI = false,
    board = "CBSE",
  } = req.body;

  try {
    const gradeLabel = buildGradeLabel(grade);

    const lesson = await buildLessonWithAI({
      board,
      classLevel: gradeLabel,
      subject,
      topic,
      requestedSlideCount: slideCount,
      language: "English",
    });

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";

    const slides = lesson.slides || [];
    const maxImages = Math.min(imageCount, slides.length);

    for (let i = 0; i < slides.length; i++) {
      const slideData = slides[i];
      const slide = pptx.addSlide();

      // TITLE
      slide.addText(slideData.title || topic, {
        x: 0.5,
        y: 0.3,
        w: "90%",
        fontSize: 36,
        bold: true,
      });

      // SUBTITLE
      slide.addText(
        slideData.type
          ? slideData.type.replace(/_/g, " ").toUpperCase()
          : "CONCEPT",
        {
          x: 0.5,
          y: 1.1,
          w: "90%",
          fontSize: 22,
          color: "3B82F6",
        }
      );

      const diagramPrompt =
        slideData.content?.diagramPrompt || `${topic} diagram`;

      const shouldUseGPTI = useGPTI && i < maxImages;

      if (shouldUseGPTI) {
        try {
          const { generateSlideImageGPT4o } = await import(
            "../../lib/gpt4oImageApi"
          );

          const base64 = await generateSlideImageGPT4o({
            subject,
            topic,
            slideTitle: slideData.title,
            slideType: slideData.type,
            index: i,
          });

          slide.addImage({
            data: `data:image/png;base64,${base64}`,
            x: 0.5,
            y: 1.7,
            w: 5.5,
            h: 5,
          });
        } catch (err) {
          addSvg(slide, i);
        }
      } else {
        addSvg(slide, i);
      }

      function addSvg(slideRef, slideIndex) {
        const svg = generateTopicSpecificSvg(
          topic,
          diagramPrompt,
          subject,
          slideIndex,
          slideData.title,
          slideData.type
        );

        slideRef.addImage({
          data: `data:image/svg+xml;base64,${Buffer.from(svg).toString(
            "base64"
          )}`,
          x: 0.5,
          y: 1.7,
          w: 5.5,
          h: 5,
        });
      }

      slide.addText(
        (slideData.content?.bullets || []).join("\n\n"),
        {
          x: 6.5,
          y: 1.7,
          w: 5.5,
          h: 5,
          fontSize: 14,
        }
      );
    }

    const buffer = await pptx.write({ outputType: "nodebuffer" });

    res.status(200).json({
      base64: buffer.toString("base64"),
      filename: `${subject}-${topic}.pptx`,
    });
  } catch (err) {
    console.error("PPT generation failed:", err);
    res.status(500).json({ message: err.message });
  }
}
