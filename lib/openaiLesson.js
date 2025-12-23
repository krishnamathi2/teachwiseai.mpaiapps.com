import OpenAI from "openai";

let cachedOpenAIClient = null;

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!cachedOpenAIClient) {
    cachedOpenAIClient = new OpenAI({ apiKey });
  }
  return cachedOpenAIClient;
};

// Quality validation function for lesson content
const validateLessonQuality = (lesson) => {
  const issues = [];

  if (!lesson?.slides || lesson.slides.length === 0) {
    issues.push("No slides generated");
    return { isValid: false, issues };
  }

  // Check each slide for quality
  lesson.slides.forEach((slide, index) => {
    const slideNum = index + 1;

    if (!slide.title || slide.title.trim().length < 3) {
      issues.push(`Slide ${slideNum}: Title is missing or too short`);
    }

    const needsBullets = !["worked_example", "questions_quick_check", "questions_exam_corner"].includes(slide.type);
    if (needsBullets && (!slide.content?.bullets || slide.content.bullets.length === 0)) {
      issues.push(`Slide ${slideNum}: Missing bullet points for ${slide.type} slide`);
    }

    if (["concept", "examples", "worked_example"].includes(slide.type)) {
      if (!slide.content?.diagramPrompt || slide.content.diagramPrompt.length < 20) {
        issues.push(`Slide ${slideNum}: Diagram prompt missing or too short`);
      }
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
};

const extractLessonFromResponse = (response) => {
  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    console.error("[extractLessonFromResponse] No content in response");
    return null;
  }

  try {
    let cleanedContent = content.trim();
    cleanedContent = cleanedContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error("[extractLessonFromResponse] Failed to parse JSON:", error.message);
    console.error("[extractLessonFromResponse] Content:", content.substring(0, 500));
    return null;
  }
};

export async function buildLessonWithAI({
  board,
  classLevel,
  subject,
  topic,
  periodMinutes,
  language = "English",
  requestedSlideCount = null,
}) {
  let client;
  
  // Try to get OpenAI client first
  try {
    client = getOpenAIClient();
  } catch (error) {
    console.error("[buildLessonWithAI] OpenAI client unavailable:", error.message);
    throw error;
  }

  // Determine content depth and slide count based on period length or user request
  let slideCount;
  let contentDepth;
  let paceGuidance;
  
  // If user requested a specific slide count, use it (allow 2-20 slides)
  if (requestedSlideCount && requestedSlideCount >= 2 && requestedSlideCount <= 20) {
    slideCount = String(requestedSlideCount);
    if (requestedSlideCount <= 3) {
      contentDepth = "highly concise";
      paceGuidance = "Keep content extremely brief and essential. Only cover the absolute core concepts. Maximum 2-3 bullet points per slide. No separate examples or practice questions - integrate everything into concept slides.";
    } else if (requestedSlideCount <= 6) {
      contentDepth = "concise and focused";
      paceGuidance = "Keep content brief and essential. Focus on core concepts only. Limit examples to 1-2 per concept.";
    } else if (requestedSlideCount <= 10) {
      contentDepth = "moderate detail";
      paceGuidance = "Include core concepts with examples. Add 2-3 examples per major concept. Include quick practice questions.";
    } else {
      contentDepth = "comprehensive";
      paceGuidance = "Cover concepts thoroughly with multiple examples. Include detailed worked examples and practice questions. Add activities where appropriate.";
    }
  } else if (periodMinutes <= 30) {
    slideCount = "6-8";
    contentDepth = "concise and focused";
    paceGuidance = "Keep content brief and essential. Focus on core concepts only. Limit examples to 1-2 per concept.";
  } else if (periodMinutes <= 45) {
    slideCount = "8-10";
    contentDepth = "moderate detail";
    paceGuidance = "Include core concepts with some examples. Add 2-3 examples per major concept. Include quick practice questions.";
  } else if (periodMinutes <= 60) {
    slideCount = "10-12";
    contentDepth = "comprehensive";
    paceGuidance = "Cover concepts thoroughly with multiple examples. Include detailed worked examples and practice questions. Add activities where appropriate.";
  } else {
    slideCount = "12-15";
    contentDepth = "in-depth and extensive";
    paceGuidance = "Provide comprehensive coverage with extensive examples, multiple worked problems, practice questions, and interactive activities. Include advanced applications.";
  }

  const isCBSE = board && board.toUpperCase().includes("CBSE");
  const ncertReference = isCBSE
    ? `\n\nIMPORTANT - NCERT ALIGNMENT:
- Base all content on NCERT ${subject} textbook for ${classLevel}
- Follow NCERT's teaching methodology and progression
- Use examples, definitions, and explanations similar to NCERT style
- Include concepts, formulas, and terminology as presented in NCERT books
- For Math: Follow NCERT's step-by-step problem-solving approach
- For Science: Use NCERT's experimental and conceptual explanations
- Ensure content matches NCERT chapter structure and learning outcomes`
    : "";

  // Define subjectLower before using it in the template
  const subjectLower = (subject || "").toLowerCase();

  const systemPrompt = `You are an expert school teacher and lesson designer for ${board} board.

Design a PPT lesson as JSON for a ${periodMinutes}-minute class.
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Language: ${language}
Focus: conceptual understanding, real-life examples, board-style questions.${ncertReference}

⚠️ CRITICAL - TOPIC RELEVANCE & SUBJECT ALIGNMENT:
- VERIFY that "${topic}" is actually taught in ${subject} for ${classLevel}
- If "${topic}" seems mismatched with ${subject}, acknowledge the mismatch in slide content and teach the topic correctly based on its actual subject area
- EVERY piece of content MUST be specifically about "${topic}" as taught in its proper academic context
- ALL examples, diagrams, questions, and explanations MUST directly relate to the actual meaning of "${topic}"
- DO NOT include generic content, placeholders, or content from unrelated topics
- DO NOT force-fit the topic into the wrong subject - teach it accurately
- If the slide title mentions "${topic}", the content MUST explain the actual academic concept of "${topic}" in detail
- Diagrams must visualize the authentic concepts related to "${topic}"
- Questions must test understanding of the real "${topic}" only

EXAMPLES OF PROPER TOPIC-SUBJECT ALIGNMENT:
- Verner's Law → Linguistics/Historical Linguistics (NOT Chemistry)
- Werner's Theory → Chemistry/Coordination Compounds (NOT Linguistics)
- Photosynthesis → Biology (NOT Physics)
- Quadratic Equations → Mathematics (NOT Chemistry)
- If topic seems misaligned, use the first slide to clarify and then teach accurately

${subjectLower.includes("chemistry") && (topic.toLowerCase().includes("werner") || topic.toLowerCase().includes("coordination")) ? `
WERNER'S THEORY CONTENT STRUCTURE (MANDATORY):
For Werner's Theory of Coordination Compounds, follow this STRICT format:

A. Concept Overview (2-3 bullets)
   - What Werner's Theory explains
   - Why the theory was important historically

B. Core Idea of Werner's Theory
   - Explain primary valency
   - Explain secondary valency
   - Clearly distinguish between them

C. Valency Characteristics (Step-wise)
   - Nature of primary valency (ionizable, non-directional)
   - Nature of secondary valency (non-ionizable, fixed, directional)
   - Relationship between secondary valency and geometry

D. Experimental Evidence (Very Important)
   - Explain how ionization of chloride ions supports the theory
   - Use examples like: [Co(NH3)6]Cl3, [Co(NH3)5Cl]Cl2, [Co(NH3)4Cl2]Cl

E. Exam-Oriented Keywords
   - Primary valency, Secondary valency, Ionizable, Coordination number, Complex ion, Bracket notation

F. Common Student Mistakes
   - Confusing primary valency with coordination number
   - Assuming Werner's Theory explains electron bonding
   - Thinking all ions inside brackets are ionizable

G. Teacher Prompt (Question Mode)
   - One question the teacher can ask while revealing the SVG diagram

WERNER'S THEORY STYLE RULES:
- Do NOT mention electron sharing, covalent bonds, VBT, or CFT
- Emphasize experimental observations, not modern bonding theories
- Assume an SVG diagram will show brackets, ligands, and ionizable ions
- Keep explanations short, stepwise, and teacher-friendly
- Content must support visual explanation, not replace it
` : subjectLower.includes("chemistry") ? `
CHEMISTRY CONTENT STRUCTURE (MANDATORY):
For Chemistry topics, follow this strict format designed to work with SVG diagrams:

A. Concept Focus (2-3 bullets)
   - What this topic explains, in simple terms
   - Why this concept is important

B. Core Chemical Idea
   - One central idea students must understand from the diagram

C. Visual Explanation Flow (Step-wise)
   - 3-5 short steps
   - Each step should correspond to a visual change or highlight in the SVG

D. Exam-Oriented Keywords
   - 5-8 important terms (no sentences)

E. Common Student Confusions
   - 2-3 typical mistakes or misconceptions

F. Teacher Question (Question Mode)
   - One question the teacher can ask while revealing the SVG step-by-step

CHEMISTRY STYLE RULES:
- Write for classroom explanation, not textbook reading
- Use short, clear bullet points only
- Assume the diagram already shows the structure, process, or arrangement
- Text must SUPPORT what is seen in the SVG, not duplicate it
- Avoid modern theories unless the topic explicitly requires them
- Use NCERT-consistent terminology only
- Present tense only
- No long paragraphs
- No numerical problems or calculations
- No lab procedures unless explicitly required
` : ""}

PERIOD-SPECIFIC GUIDANCE:
- Lesson Duration: ${periodMinutes} minutes
- REQUIRED EXACT SLIDE COUNT: ${slideCount} slides (THIS IS MANDATORY - DO NOT GENERATE MORE OR FEWER)
- Content Depth: ${contentDepth}
- Pacing: ${paceGuidance}

CRITICAL RULES:
1. Use a mix of slide types: title_hook, objectives, concept, examples, worked_example, questions_quick_check, summary_exit_ticket.
2. For EVERY slide (except worked_example and questions slides), the content object MUST include a "bullets" array with 3-5 clear, concise bullet points.
3. For concept, examples, and worked_example slides, ALWAYS include a "diagramPrompt" field describing a relevant diagram, flowchart, graph, or visual aid that would help students understand the content better.
4. Example of correct slide structure:
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
       ],
       "diagramPrompt": "Labeled diagram showing: Sun → Chloroplast with CO2 and H2O inputs → Glucose and O2 outputs, with arrows showing the flow of photosynthesis process"
     }
   }
5. For questions_quick_check slides, MANDATORY: Include a "questionSet" array with 3-4 multiple choice questions. Example:
   {
     "id": "slide-7",
     "type": "questions_quick_check",
     "title": "Quick Check Questions",
     "content": {
       "questionSet": [
         {
           "type": "mcq",
           "stem": "What is the powerhouse of the cell?",
           "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
           "correctOptionIndex": 1,
           "explanation": "Mitochondria produce ATP through cellular respiration"
         }
       ]
     }
   }
6. Adjust slide count based on period length: ${slideCount} slides for ${periodMinutes} minutes.
7. For shorter periods (≤30 min): Focus on essential concepts only, minimal examples.
8. For medium periods (30-45 min): Include core concepts + examples + quick checks.
9. For longer periods (45-60 min): Add worked examples, detailed practice, activities.
10. For extended periods (>60 min): Include comprehensive coverage, multiple examples, varied question types, and group activities.
11. Use only content appropriate for Indian school students.
12. Do NOT include any markdown formatting, only plain text in all fields.
13. Never leave the bullets array empty unless the slide type is worked_example, questions_quick_check, or questions_exam_corner.
14. Make diagram descriptions specific and educational - describe what should be shown, labeled, and how elements relate to each other.
15. CRITICAL: For questions_quick_check slides, you MUST generate 3-4 meaningful MCQs in the questionSet array.

MANDATORY LOGICAL FLOW - Follow this teaching sequence strictly:
Step 1: START WITH FUNDAMENTALS - Begin with "What is..." slides
Step 2: BUILD ON BASICS - Add structural/compositional details
Step 3: EXPLAIN FUNCTIONS - Then show how it works
Step 4: APPLY KNOWLEDGE - Examples and applications
Step 5: ASSESS UNDERSTANDING - Questions and summary`;

  const userPrompt = `Create a complete lesson presentation about "${topic}" for ${classLevel} ${subject} students.

CRITICAL: You MUST generate EXACTLY ${slideCount} slides - no more, no less.

Return a complete JSON object with this exact structure:
{
  "meta": { "board": "${board}", "classLevel": "${classLevel}", "subject": "${subject}", "topic": "${topic}", "periodMinutes": ${periodMinutes}, "language": "${language}", "focus": ["understanding", "practice"] },
  "slides": [ ]
}

CRITICAL REQUIREMENTS:
1. Generate EXACTLY ${slideCount} slides (not 6, not 8, but exactly ${slideCount})
2. ALL content must be specifically about "${topic}" in the context of ${subject}
3. Every diagram, example, and question must relate directly to "${topic}"
4. Do NOT use generic placeholders or content from other topics
5. Every slide must have a "content" object with appropriate fields
6. For concept slides: bullets must explain "${topic}" specifically
7. For question slides: all questions must test understanding of "${topic}"

Start your response with the opening brace {`;

  let response;
  let rawData;
  
  // Generate lesson content with OpenAI
  try {
    response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });
    rawData = extractLessonFromResponse(response);
  } catch (error) {
    console.error("[buildLessonWithAI] Primary AI failed:", error.message);
    console.error("[buildLessonWithAI] Error details:", JSON.stringify(error, null, 2));
    throw error;
  }

  let lesson = rawData?.lesson || rawData;

  console.log(`[buildLessonWithAI] Generated ${lesson?.slides?.length || 0} slides`);
  if (lesson?.slides) {
    lesson.slides.forEach((slide, idx) => {
      console.log(
        `[buildLessonWithAI] Slide ${idx + 1}: ${slide.type} - "${slide.title}" - content keys: ${Object.keys(slide.content || {}).join(", ")}`,
      );
    });
  }

  const validation = validateLessonQuality(lesson);
  if (!validation.isValid) {
    console.warn("[buildLessonWithAI] Quality issues detected:", validation.issues);
    console.log("[buildLessonWithAI] Attempting regeneration with stricter requirements...");

    const retrySystemPrompt = `${systemPrompt}\n\nIMPORTANT: Previous attempt had these issues: ${validation.issues.join(
      "; ",
    )}. Please ensure all requirements are met. REMEMBER: All content must be specifically about "${topic}" in ${subject}.`;
    
    const retryUserPrompt = `Return a complete, high-quality JSON object about "${topic}" with ALL required fields populated. Every slide must have proper content that is SPECIFICALLY about "${topic}". No generic content allowed. Start your response with the opening brace {`;

    let retryData;
    try {
      const retryResponse = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: retrySystemPrompt },
          { role: "user", content: retryUserPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });
      retryData = extractLessonFromResponse(retryResponse);
    } catch (retryError) {
      console.warn("[buildLessonWithAI] Retry failed:", retryError.message);
      retryData = null;
    }

    if (retryData) {
      const retryLesson = retryData?.lesson || retryData;
      const retryValidation = validateLessonQuality(retryLesson);
      if (retryValidation.isValid || retryValidation.issues.length < validation.issues.length) {
        lesson = retryLesson;
        console.log("[buildLessonWithAI] Regeneration successful, quality improved");
      } else {
        console.log("[buildLessonWithAI] Regeneration did not improve quality, using fallbacks");
      }
    }
  }

  const disallowedSlideTypes = new Set([
    "worked_example",
    "questions_quick_check",
    "questions_exam_corner",
    "summary_exit_ticket",
  ]);
  if (Array.isArray(lesson?.slides)) {
    lesson.slides = lesson.slides.filter((slide) => !disallowedSlideTypes.has(slide.type));
  }

  if (lesson?.slides) {
    lesson.slides = lesson.slides.map((slide) => {
      const needsBullets = !["worked_example", "questions_quick_check", "questions_exam_corner"].includes(slide.type);
      const needsQuestions = ["questions_quick_check", "questions_exam_corner"].includes(slide.type);
      const needsWorkedExample = slide.type === "worked_example";
      const needsSummary = slide.type === "summary_exit_ticket";

      if (!slide.content) {
        slide.content = {};
      }

      if (needsBullets && (!slide.content.bullets || slide.content.bullets.length === 0)) {
        slide.content.bullets = [
          `Key concepts related to ${slide.title || "this topic"}`,
          "Important points to understand and remember",
          "Real-world applications and examples",
          "Common misconceptions to avoid",
        ];
      }

      if (needsQuestions && (!slide.content.questionSet || slide.content.questionSet.length === 0)) {
        console.warn(`[buildLessonWithAI] Question slide "${slide.title}" missing questionSet, adding fallback questions`);
        slide.content.questionSet = [
          {
            type: "mcq",
            stem: `What is the main concept discussed in ${slide.title || "this topic"}?`,
            options: [
              "The basic definition and characteristics",
              "Only the historical background",
              "Advanced applications only",
              "None of the above",
            ],
            correctOptionIndex: 0,
            explanation: "The main focus is on understanding core concepts and definitions",
          },
          {
            type: "mcq",
            stem: `Which statement about ${slide.title || "this topic"} is most accurate?`,
            options: [
              "It requires understanding of fundamental principles",
              "It can be learned without any prerequisites",
              "It has no practical applications",
              "It contradicts established scientific knowledge",
            ],
            correctOptionIndex: 0,
            explanation: "Understanding basic principles is essential for mastering the topic",
          },
          {
            type: "mcq",
            stem: `How should you approach learning ${slide.title || "this topic"}?`,
            options: [
              "Start with definitions, then examples, then practice",
              "Memorize everything without understanding",
              "Skip the basics and go to advanced topics",
              "Ignore practical applications",
            ],
            correctOptionIndex: 0,
            explanation: "A structured approach from basics to practice ensures better understanding",
          },
        ];
      }

      if (needsWorkedExample) {
        const existingExample = slide.content.workedExample || {};
        const sanitizeList = (items, fallback) => {
          if (Array.isArray(items)) {
            const cleaned = items
              .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
              .filter(Boolean);
            if (cleaned.length > 0) {
              return cleaned;
            }
          }
          return fallback;
        };

        const questionText =
          typeof existingExample.question === "string" && existingExample.question.trim().length > 0
            ? existingExample.question.trim()
            : `Sample problem related to ${slide.title || "the concept"}`;

        const finalAnswerText =
          typeof existingExample.finalAnswer === "string" && existingExample.finalAnswer.trim().length > 0
            ? existingExample.finalAnswer.trim()
            : "Answer will be demonstrated";

        const givenList = sanitizeList(existingExample.given, ["Given information will be provided"]);
        const stepsList = sanitizeList(existingExample.solutionSteps, [
          "Step 1: Analyze the problem",
          "Step 2: Apply relevant concepts",
          "Step 3: Calculate the result",
        ]);

        slide.content.workedExample = {
          question: questionText,
          given: givenList,
          solutionSteps: stepsList,
          finalAnswer: finalAnswerText,
        };
      }

      if (needsSummary && (!slide.content.summaryPoints || slide.content.summaryPoints.length === 0)) {
        slide.content.summaryPoints = [
          `Key takeaways from ${slide.title || "this lesson"}`,
          "Important concepts covered",
          "Points to remember",
        ];
      }

      return slide;
    });
  }

  if (!lesson) {
    console.error("[openaiLesson] Failed to extract lesson from response:", JSON.stringify(response, null, 2));
    throw new Error("Failed to parse lesson output from OpenAI");
  }

  if (lesson.slides && lesson.slides[0]) {
    console.log("[openaiLesson] First slide sample:", JSON.stringify(lesson.slides[0], null, 2));
  }

  return lesson;
}
