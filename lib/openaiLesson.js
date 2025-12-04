import OpenAI from "openai";
import PptxGenJS from "pptxgenjs";

let cachedClient = null;

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }
  return cachedClient;
};

// PPT Generation helpers
const sanitizeList = (items = []) =>
  items
    .map((item) => (typeof item === "string" ? item.trim() : String(item || "").trim()))
    .filter((text) => text.length > 0);

const splitTextToBullets = (text = "") =>
  text
    .split(/\r?\n|(?<![A-Z])[•\-]\s+/i)
    .map((line) => line.replace(/^[-•\s]+/, "").trim())
    .filter((line) => line.length > 0);

const deriveBulletLines = (content = {}) => {
  if (!content) {
    return [];
  }

  const direct = Array.isArray(content.bullets) ? sanitizeList(content.bullets) : [];
  if (direct.length > 0) {
    return direct;
  }

  const fallbacks = [
    content.summaryPoints,
    content.points,
    content.examples,
  ].find((candidate) => Array.isArray(candidate) && sanitizeList(candidate).length > 0);

  if (fallbacks) {
    return sanitizeList(fallbacks);
  }

  if (typeof content.notes === "string" && content.notes.trim()) {
    return splitTextToBullets(content.notes);
  }

  const textFallbacks = [content.subtitle, content.description, content.content];
  if (Array.isArray(content.bullets) && content.bullets.length === 1 && typeof content.bullets[0] === "string") {
    const split = splitTextToBullets(content.bullets[0]);
    if (split.length > 0) {
      return split;
    }
  }

  for (const snippet of textFallbacks) {
    if (typeof snippet === "string" && snippet.trim()) {
      const split = splitTextToBullets(snippet);
      if (split.length > 0) {
        return split;
      }
    }
  }

  if (typeof content.activity?.prompt === "string" && content.activity.prompt.trim()) {
    return splitTextToBullets(content.activity.prompt);
  }

  return [];
};

const formatBullets = (items = []) => sanitizeList(items).map((item) => `• ${item}`).join("\n");

const renderQuestionSet = (questions = []) => {
  const rows = [];
  questions.forEach((question, index) => {
    if (!question?.stem) {
      return;
    }
    let row = `${index + 1}. ${question.stem}`;
    if (Array.isArray(question.options) && question.options.length > 0) {
      question.options.forEach((option, optionIndex) => {
        const label = String.fromCharCode(65 + optionIndex);
        row += `\n   ${label}) ${option}`;
      });
    }
    rows.push(row);
  });
  return rows;
};

const addSlideFromLesson = (ppt, slideData) => {
  if (!slideData) {
    return;
  }
  const slide = ppt.addSlide();
  const { type, title, content = {} } = slideData;

  slide.addText(title || "Lesson", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
  });

  switch (type) {
    case "title_hook": {
      if (content.subtitle) {
        slide.addText(content.subtitle, {
          x: 0.5,
          y: 1.1,
          w: 9,
          fontSize: 20,
        });
      }
      if (content.hookQuestion) {
        slide.addText(`Think: ${content.hookQuestion}`, {
          x: 0.5,
          y: 2,
          w: 9,
          fontSize: 22,
          bold: true,
        });
      }
      if (content.imagePrompt) {
        slide.addText(`[Image: ${content.imagePrompt}]`, {
          x: 0.5,
          y: 3,
          w: 9,
          fontSize: 16,
          italic: true,
        });
      }
      break;
    }
    case "objectives":
    case "concept":
    case "examples": {
      const bulletLines = deriveBulletLines(content);
      if (bulletLines.length > 0) {
        slide.addText(formatBullets(bulletLines), {
          x: 0.7,
          y: 1.2,
          w: 8.5,
          fontSize: 20,
        });
      }
      if (content.imagePrompt) {
        slide.addText(`[Image: ${content.imagePrompt}]`, {
          x: 0.7,
          y: 4,
          w: 8.5,
          fontSize: 14,
          italic: true,
        });
      }
      break;
    }
    case "worked_example": {
      const example = content.workedExample;
      if (example) {
        const givenLines = (example.given || []).map((item) => `• ${item}`);
        const solutionLines = (example.solutionSteps || []).map((item) => `• ${item}`);
        const text = [
          `Question: ${example.question}`,
          "",
          "Given:",
          ...givenLines,
          "",
          "Solution:",
          ...solutionLines,
          "",
          `Answer: ${example.finalAnswer}`,
        ]
          .filter(Boolean)
          .join("\n");

        slide.addText(text, {
          x: 0.7,
          y: 1.2,
          w: 8.5,
          fontSize: 18,
        });
      }
      break;
    }
    case "questions_quick_check":
    case "questions_exam_corner": {
      const rows = renderQuestionSet(content.questionSet);
      let y = 1.2;
      rows.forEach((row) => {
        slide.addText(row, {
          x: 0.7,
          y,
          w: 8.5,
          fontSize: 18,
        });
        y += 1.8;
      });
      break;
    }
    case "summary_exit_ticket": {
      if (Array.isArray(content.summaryPoints) && content.summaryPoints.length > 0) {
        slide.addText(formatBullets(content.summaryPoints), {
          x: 0.7,
          y: 1.2,
          w: 8.5,
          fontSize: 18,
        });
      }
      if (content.activity?.prompt) {
        slide.addText("Exit Ticket:", {
          x: 0.7,
          y: 3.8,
          w: 8.5,
          fontSize: 20,
          bold: true,
        });
        slide.addText(content.activity.prompt, {
          x: 0.7,
          y: 4.3,
          w: 8.5,
          fontSize: 18,
        });
      }
      break;
    }
    default: {
      const bulletLines = deriveBulletLines(content);
      if (bulletLines.length > 0) {
        slide.addText(formatBullets(bulletLines), {
          x: 0.7,
          y: 1.2,
          w: 8.5,
          fontSize: 20,
        });
      }
    }
  }

  if (content.notes) {
    slide.addNotes(content.notes);
  }
};

export async function generatePptBuffer(lesson) {
  const ppt = new PptxGenJS();
  ppt.author = "TeachWise AI";
  ppt.company = "TeachWise";
  ppt.title = `${lesson?.meta?.subject || "Lesson"} - ${lesson?.meta?.topic || "Topic"}`;
  ppt.subject = `${lesson?.meta?.board || "Board"} Class ${lesson?.meta?.classLevel || ""}`.trim();

  if (Array.isArray(lesson?.slides)) {
    lesson.slides.forEach((slide) => addSlideFromLesson(ppt, slide));
  }

  const nodeBuffer = await ppt.write("nodebuffer");
  if (Buffer.isBuffer(nodeBuffer)) {
    return nodeBuffer;
  }
  return Buffer.from(nodeBuffer);
}

const lessonSchema = {
  type: "object",
  properties: {
    meta: {
      type: "object",
      properties: {
        board: { type: "string" },
        classLevel: { type: "string" },
        subject: { type: "string" },
        topic: { type: "string" },
        periodMinutes: { type: "number" },
        language: { type: "string" },
        focus: { type: "array", items: { type: "string" } },
      },
      required: [
        "board",
        "classLevel",
        "subject",
        "topic",
        "periodMinutes",
        "language",
        "focus",
      ],
    },
    slides: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: {
            type: "string",
            enum: [
              "title_hook",
              "objectives",
              "concept",
              "examples",
              "activity",
              "worked_example",
              "questions_quick_check",
              "questions_exam_corner",
              "summary_exit_ticket",
            ],
          },
          title: { type: "string" },
          content: {
            type: "object",
            properties: {
              subtitle: { type: "string" },
              hookQuestion: { type: "string" },
              imagePrompt: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
              notes: { type: "string" },
              summaryPoints: { type: "array", items: { type: "string" } },
              activity: {
                type: "object",
                properties: {
                  prompt: { type: "string" },
                  expectedTimeMinutes: { type: "number" },
                },
                required: ["prompt"],
              },
              workedExample: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  given: { type: "array", items: { type: "string" } },
                  solutionSteps: { type: "array", items: { type: "string" } },
                  finalAnswer: { type: "string" },
                },
                required: ["question", "given", "solutionSteps", "finalAnswer"],
              },
              questionSet: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    stem: { type: "string" },
                    options: { type: "array", items: { type: "string" } },
                    correctOptionIndex: { type: "number" },
                    explanation: { type: "string" },
                  },
                  required: ["type", "stem"],
                },
              },
            },
          },
        },
        required: ["id", "type", "title", "content"],
      },
    },
  },
  required: ["meta", "slides"],
};

const extractLessonFromResponse = (response) => {
  const blocks = Array.isArray(response?.output) ? response.output : [];
  for (const block of blocks) {
    const contentItems = Array.isArray(block?.content) ? block.content : [];
    for (const item of contentItems) {
      if (item?.parsed) {
        return item.parsed;
      }
      if (typeof item?.text === "string") {
        try {
          return JSON.parse(item.text);
        } catch (error) {
          // ignore and continue searching
        }
      }
    }
  }
  return null;
};

export async function buildLessonWithAI({
  board,
  classLevel,
  subject,
  topic,
  periodMinutes,
  language = "English",
}) {
  const client = getClient();
  const systemPrompt = `You are an expert school teacher and lesson designer for ${board} board.

Design a PPT lesson as JSON for a ${periodMinutes}-minute class.
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Language: ${language}
Focus: conceptual understanding, real-life examples, board-style questions.

CRITICAL RULES:
1. Use a mix of slide types: title_hook, objectives, concept, examples, worked_example, questions_quick_check, summary_exit_ticket.
2. For EVERY slide (except worked_example and questions slides), the content object MUST include a "bullets" array with 3-5 clear, concise bullet points.
3. Example of correct slide structure:
   {
     "id": "slide-1",
     "type": "concept",
     "title": "What is Photosynthesis?",
     "content": {
       "bullets": [
         "Process by which plants make food using sunlight",
         "Takes place in chloroplasts containing chlorophyll",
         "Converts CO2 and water into glucose and oxygen",
         "Essential for life on Earth as it produces oxygen"
       ]
     }
   }
4. At most 12 slides total.
5. Use only content appropriate for Indian school students.
6. Do NOT include any markdown formatting, only plain text in all fields.
7. Never leave the bullets array empty unless the slide type is worked_example, questions_quick_check, or questions_exam_corner.`;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Return a JSON object containing the complete lesson structure with meta and slides arrays. EVERY slide's content object must have a populated "bullets" array (except for worked_example and question slides). Do not wrap the response in markdown code blocks. Start your response with the opening brace {`,
      },
    ],
  });

  const rawData = extractLessonFromResponse(response);
  let lesson = rawData?.lesson || rawData;
  
  // Ensure bullets arrays exist for slides that should have them
  if (lesson?.slides) {
    lesson.slides = lesson.slides.map((slide) => {
      const needsBullets = !["worked_example", "questions_quick_check", "questions_exam_corner"].includes(slide.type);
      if (needsBullets && (!slide.content?.bullets || slide.content.bullets.length === 0)) {
        // Generate fallback bullets from title or type
        const fallbackBullets = [
          `Key concepts related to ${slide.title || "this topic"}`,
          `Important points to understand`,
          `Real-world applications and examples`
        ];
        return {
          ...slide,
          content: {
            ...slide.content,
            bullets: fallbackBullets
          }
        };
      }
      return slide;
    });
  }
  
  lesson = rawData?.lesson || rawData;
  
  if (!lesson) {
    console.error("[openaiLesson] Failed to extract lesson from response:", JSON.stringify(response, null, 2));
    throw new Error("Failed to parse lesson output from OpenAI");
  }
  
  // Debug: log the first slide to verify bullets are populated
  if (lesson.slides && lesson.slides[0]) {
    console.log("[openaiLesson] First slide sample:", JSON.stringify(lesson.slides[0], null, 2));
  }
  
  return lesson;
}
