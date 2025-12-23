/* eslint-disable */

import PptxGenJS from "pptxgenjs";
import { buildGradeLabel } from "../../lib/gradeUtils";
import { buildLessonWithAI } from "../../lib/openaiLesson";

const MAX_PRESENTATION_SLIDES = 100;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const {
    subject,
    topic,
    grade,
    board = "CBSE",
    periodMinutes = 40,
    slideCount,
    imageCount,
    useGPTI = false,
    useCG = false,
  } = req.body || {};

  console.log("[presentation-svg] Request received:", {
    subject,
    topic,
    grade,
    board,
    slideCount,
    imageCount,
    useGPTI,
    useCG
  });

  if (!subject || !topic) {
    console.error("[presentation-svg] Missing required fields:", { subject, topic });
    res.status(400).json({ message: "Subject and topic are required" });
    return;
  }

  const gradeLabel = buildGradeLabel(grade);
  const requestedSlideCount = slideCount
    ? Number.parseInt(slideCount, 10)
    : null;
  
  const requestedImageCount = imageCount !== undefined
    ? Number.parseInt(imageCount, 10)
    : requestedSlideCount; // Default to all slides having images

  try {
    console.log("[presentation-svg] Generating lesson:", topic, "useGPTI:", useGPTI, "useCG:", useCG, "imageCount:", requestedImageCount);

    const lesson = await buildLessonWithAI({
      board,
      classLevel: gradeLabel,
      subject,
      topic,
      periodMinutes,
      language: "English",
      requestedSlideCount,
    });

    const deckBytes = await createSvgPresentationDeck(
      subject,
      topic,
      gradeLabel,
      lesson,
      useGPTI,
      useCG,
      requestedImageCount
    );

    const base64 = deckBytes.toString("base64");

    res.status(200).json({
      base64,
      filename: `${subject}-${topic}.pptx`,
      slideCount: lesson.slides?.length || 0,
    });
  } catch (error) {
    console.error("SVG presentation generation failed:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      cause: error.cause
    });
    res.status(500).json({
      message: error.message || "Failed to generate presentation",
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

async function createSvgPresentationDeck(
  subject,
  topic,
  gradeLabel,
  lesson,
  useGPTI = false,
  useCG = false,
  imageCount = null
) {
  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "TeachWiseAI";
  pptx.subject = `${gradeLabel} ${subject}`;
  pptx.title = `${topic} - ${subject}`;

  const slides = lesson.slides || [];
  const totalSlides = slides.length;
  const slidesWithImages = imageCount !== null ? Math.min(imageCount, totalSlides) : totalSlides;
  
  console.log(`[Presentation] Creating deck with ${slides.length} slides, ${slidesWithImages} will have images`);
  slides.forEach((s, i) => {
    console.log(`[Presentation] Slide ${i + 1}: "${s.title}" type=${s.type} bullets=${s.content?.bullets?.length || 0}`);
  });

  for (const [index, slideData] of slides.entries()) {
    const slide = pptx.addSlide();

    // Title
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

    // Subtitle
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

    // Only add images to the first N slides based on imageCount
    const shouldAddImage = index < slidesWithImages;
    
    if (shouldAddImage) {
      // Generate diagram based on mode
      const diagramPrompt =
        slideData.content?.diagramPrompt || `${topic} concept diagram`;

      if (useGPTI) {
      // Use GPT-4o to generate image
      try {
        const { generateSlideImageGPT4o } = await import("../../lib/gpt4oImageApi");
        console.log(`[GPTI] Generating image for slide ${index + 1}: ${slideData.title}`);
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
      } catch (error) {
        console.error(`[GPTI] Failed to generate image for slide ${index + 1}:`, error);
        // Fallback to SVG
        const svgContent = generateTopicSpecificSvg(
          topic,
          diagramPrompt,
          subject,
          index,
          slideData.title,
          slideData.type
        );
        slide.addImage({
          data: `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`,
          x: 0.5,
          y: 1.7,
          w: 5.5,
          h: 5,
          sizing: { type: "contain", w: 5.5, h: 5 },
        });
      }
    } else {
      // Use SVG generation (default)
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
    }

    // Right content panel - adjust position based on whether image exists
    const contentX = shouldAddImage ? 6.2 : 0.5;
    const contentW = shouldAddImage ? 6.2 : 11.5;
    
    slide.addShape(pptx.ShapeType.rect, {
      x: contentX,
      y: 1.7,
      w: contentW,
      h: 5,
      fill: { color: "F1F5F9" },
      line: { color: "CBD5E1", width: 1 },
    });

    let contentText = "Key concepts";
    const isQuestionSlide = slideData.type === "questions_quick_check" || slideData.type === "questions_exam_corner";

    // Handle question slides
    if (isQuestionSlide && slideData.content?.questionSet && slideData.content.questionSet.length > 0) {
      contentText = slideData.content.questionSet
        .map((q, i) => {
          const questionNum = i + 1;
          const correctAnswer = q.options?.[q.correctOptionIndex] || "N/A";
          return `Q${questionNum}. ${q.stem}\n\nAnswer: ${correctAnswer}`;
        })
        .join("\n\n");
    } 
    // Handle regular slides with bullets
    else if (slideData.content?.bullets && slideData.content.bullets.length > 0) {
      contentText = slideData.content.bullets
        .map((b, i) => `${i + 1}. ${b}`)
        .join("\n\n");
    } 
    // Fallback for slides with no content
    else {
      console.warn(`[Presentation] Slide ${index + 1} "${slideData.title}" has no ${isQuestionSlide ? 'questions' : 'bullets'}, using default text`);
      contentText = `Content for ${slideData.title || topic}:\n\n• Key concepts and principles\n• Important points to remember\n• Applications and examples`;
    }

    slide.addText(contentText, {
      x: contentX + 0.3,
      y: 2,
      w: contentW - 0.6,
      h: 4.4,
      fontSize: 14,
      color: "0F172A",
      fontFace: "Arial",
      valign: "top",
      lineSpacing: 22,
    });

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

  return await pptx.write({ outputType: "nodebuffer" });
}

/* 
  NOTE:
  generateTopicSpecificSvg(...) is unchanged.
  Keep your existing SVG generator exactly as-is.
*/


function generateTopicSpecificSvg(topic, diagramPrompt, subject, index, slideTitle = "", slideType = "") {
  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#06B6D4", "#6366F1", "#EF4444"];
  const color = colors[index % colors.length];
  const secondaryColor = colors[(index + 2) % colors.length];
  const tertiaryColor = colors[(index + 4) % colors.length];
  
  const topicLower = topic.toLowerCase();
  const promptLower = diagramPrompt.toLowerCase();
  const subjectLower = subject.toLowerCase();
  const titleLower = slideTitle.toLowerCase();

  // Linguistics - Verner's Law / Verner's Theory
  if (topicLower.includes("verner") || promptLower.includes("verner")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
      <defs>
        <marker id="arr${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
        </marker>
      </defs>
      <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Verner's Law: Consonant Shift</text>
      
      <!-- Proto-Indo-European -->
      <g transform="translate(70, 100)">
        <rect x="-55" y="-30" width="110" height="60" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
        <text x="0" y="-8" text-anchor="middle" font-size="14" font-weight="bold" fill="#01579b">PIE</text>
        <text x="0" y="10" text-anchor="middle" font-size="12" fill="#01579b">*p, *t, *k</text>
      </g>
      
      <!-- Grimm's Law -->
      <line x1="125" y1="130" x2="175" y2="130" stroke="${color}" stroke-width="3" marker-end="url(#arr${index})"/>
      <text x="150" y="120" text-anchor="middle" font-size="12" fill="${color}" font-weight="bold">Grimm's Law</text>
      
      <g transform="translate(250, 100)">
        <rect x="-55" y="-30" width="110" height="60" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3"/>
        <text x="0" y="-8" text-anchor="middle" font-size="14" font-weight="bold" fill="#6a1b9a">Germanic</text>
        <text x="0" y="10" text-anchor="middle" font-size="12" fill="#6a1b9a">*f, *θ, *x</text>
      </g>
      
      <!-- Verner's Law -->
      <line x1="305" y1="130" x2="355" y2="130" stroke="${secondaryColor}" stroke-width="3" marker-end="url(#arr${index})"/>
      <text x="330" y="120" text-anchor="middle" font-size="12" fill="${secondaryColor}" font-weight="bold">Verner's Law</text>
      
      <g transform="translate(430, 100)">
        <rect x="-55" y="-30" width="110" height="60" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
        <text x="0" y="-8" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Voiced</text>
        <text x="0" y="10" text-anchor="middle" font-size="12" fill="#2e7d32">*b, *d, *g</text>
      </g>
      
      <!-- Condition Box -->
      <g transform="translate(250, 230)">
        <rect x="-140" y="-50" width="280" height="100" rx="10" fill="#fff3e0" stroke="#e65100" stroke-width="3"/>
        <text x="0" y="-25" text-anchor="middle" font-size="16" font-weight="bold" fill="#e65100">Conditions for Voicing</text>
        <text x="0" y="0" text-anchor="middle" font-size="13" fill="#e65100">1. Voiceless fricative follows vowel</text>
        <text x="0" y="20" text-anchor="middle" font-size="13" fill="#e65100">2. Preceding syllable is unstressed</text>
      </g>
      
      <!-- Examples -->
      <g transform="translate(120, 350)">
        <text x="0" y="0" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">*faþēr → *faðēr</text>
        <text x="0" y="18" text-anchor="middle" font-size="11" fill="#666">(father)</text>
      </g>
      
      <g transform="translate(380, 350)">
        <text x="0" y="0" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">*maþēr → *maðēr</text>
        <text x="0" y="18" text-anchor="middle" font-size="11" fill="#666">(mother)</text>
      </g>
      
      <text x="250" y="390" font-family="Arial" font-size="14" fill="${color}" text-anchor="middle" font-style="italic">Sound change in Proto-Germanic based on accent position</text>
    </svg>`;
  }

  // Mathematics - Relations and Functions
  if ((subjectLower.includes("math") || subjectLower.includes("algebra")) && 
      (topicLower.includes("relation") || topicLower.includes("function") || topicLower.includes("mapping"))) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
      <defs>
        <marker id="arr${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="${color}"/>
        </marker>
      </defs>
      <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Relations: Set A to Set B</text>
      
      <!-- Set A -->
      <ellipse cx="130" cy="200" rx="70" ry="120" fill="${color}" opacity="0.2" stroke="${color}" stroke-width="3"/>
      <text x="130" y="100" text-anchor="middle" font-size="16" fill="${color}" font-weight="bold">Set A</text>
      <circle cx="130" cy="150" r="10" fill="${color}"/>
      <text x="100" y="155" text-anchor="end" font-size="14" fill="#333">1</text>
      <circle cx="130" cy="200" r="10" fill="${color}"/>
      <text x="100" y="205" text-anchor="end" font-size="14" fill="#333">2</text>
      <circle cx="130" cy="250" r="10" fill="${color}"/>
      <text x="100" y="255" text-anchor="end" font-size="14" fill="#333">3</text>
      
      <!-- Set B -->
      <ellipse cx="370" cy="200" rx="70" ry="120" fill="${secondaryColor}" opacity="0.2" stroke="${secondaryColor}" stroke-width="3"/>
      <text x="370" y="100" text-anchor="middle" font-size="16" fill="${secondaryColor}" font-weight="bold">Set B</text>
      <circle cx="370" cy="150" r="10" fill="${secondaryColor}"/>
      <text x="400" y="155" text-anchor="start" font-size="14" fill="#333">a</text>
      <circle cx="370" cy="190" r="10" fill="${secondaryColor}"/>
      <text x="400" y="195" text-anchor="start" font-size="14" fill="#333">b</text>
      <circle cx="370" cy="230" r="10" fill="${secondaryColor}"/>
      <text x="400" y="235" text-anchor="start" font-size="14" fill="#333">c</text>
      <circle cx="370" cy="270" r="10" fill="${secondaryColor}"/>
      <text x="400" y="275" text-anchor="start" font-size="14" fill="#333">d</text>
      
      <!-- Mapping arrows -->
      <line x1="140" y1="150" x2="360" y2="150" stroke="${color}" stroke-width="2" marker-end="url(#arr${index})"/>
      <line x1="140" y1="200" x2="360" y2="190" stroke="${color}" stroke-width="2" marker-end="url(#arr${index})"/>
      <line x1="140" y1="200" x2="360" y2="270" stroke="${color}" stroke-width="2" marker-end="url(#arr${index})" opacity="0.5"/>
      <line x1="140" y1="250" x2="360" y2="230" stroke="${color}" stroke-width="2" marker-end="url(#arr${index})"/>
      
      <!-- Relation notation -->
      <text x="250" y="340" text-anchor="middle" font-size="14" fill="#333" font-weight="bold">R = {(1,a), (2,b), (2,d), (3,c)}</text>
      <text x="250" y="365" text-anchor="middle" font-size="12" fill="#666">Ordered pairs showing relation from A to B</text>
      <text x="250" y="390" text-anchor="middle" font-size="16" fill="${color}" font-weight="bold">${topic}</text>
    </svg>`;
  }

  // Mathematics - Sets
  if ((subjectLower.includes("math") || subjectLower.includes("algebra")) && topicLower.includes("set")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
      <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Set Operations</text>
      
      <!-- Union -->
      <g transform="translate(100, 120)">
        <circle cx="30" cy="0" r="40" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="2"/>
        <circle cx="50" cy="0" r="40" fill="${secondaryColor}" opacity="0.3" stroke="${secondaryColor}" stroke-width="2"/>
        <text x="40" y="60" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">A ∪ B</text>
        <text x="40" y="78" text-anchor="middle" font-size="11" fill="#666">Union</text>
      </g>
      
      <!-- Intersection -->
      <g transform="translate(230, 120)">
        <circle cx="30" cy="0" r="40" fill="${color}" opacity="0.2" stroke="${color}" stroke-width="2"/>
        <circle cx="50" cy="0" r="40" fill="${secondaryColor}" opacity="0.2" stroke="${secondaryColor}" stroke-width="2"/>
        <ellipse cx="40" cy="0" rx="10" ry="35" fill="${tertiaryColor}" opacity="0.6"/>
        <text x="40" y="60" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">A ∩ B</text>
        <text x="40" y="78" text-anchor="middle" font-size="11" fill="#666">Intersection</text>
      </g>
      
      <!-- Difference -->
      <g transform="translate(360, 120)">
        <circle cx="30" cy="0" r="40" fill="${color}" opacity="0.5" stroke="${color}" stroke-width="2"/>
        <circle cx="50" cy="0" r="40" fill="white" opacity="0.8" stroke="${secondaryColor}" stroke-width="2"/>
        <text x="40" y="60" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">A - B</text>
        <text x="40" y="78" text-anchor="middle" font-size="11" fill="#666">Difference</text>
      </g>
      
      <!-- Set notation examples -->
      <g transform="translate(250, 240)">
        <rect x="-180" y="-20" width="360" height="100" rx="10" fill="#f0f9ff" stroke="${color}" stroke-width="2"/>
        <text x="0" y="5" text-anchor="middle" font-size="13" fill="#333" font-weight="bold">Set Notation</text>
        <text x="0" y="28" text-anchor="middle" font-size="12" fill="#333">A = {1, 2, 3, 4}</text>
        <text x="0" y="48" text-anchor="middle" font-size="12" fill="#333">B = {3, 4, 5, 6}</text>
        <text x="0" y="68" text-anchor="middle" font-size="12" fill="${color}">A ∪ B = {1, 2, 3, 4, 5, 6}</text>
      </g>
      
      <text x="250" y="375" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
    </svg>`;
  }

  // Chemistry-specific diagrams
  if (subjectLower.includes("chemistry")) {
    // Werner's Theory of Coordination Compounds
    if (topicLower.includes("werner") || topicLower.includes("coordination compound")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <marker id="arr${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
          </marker>
        </defs>
        <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Werner's Theory: Primary & Secondary Valency</text>
        
        <!-- Complex example: [Co(NH3)6]Cl3 -->
        <g transform="translate(120, 100)">
          <rect x="-80" y="-20" width="160" height="180" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
          <text x="0" y="-30" text-anchor="middle" font-size="14" fill="#01579b" font-weight="bold">[Co(NH₃)₆]Cl₃</text>
          
          <!-- Square bracket -->
          <path d="M -60 10 L -70 10 L -70 140 L -60 140" stroke="#333" stroke-width="4" fill="none"/>
          <path d="M 60 10 L 70 10 L 70 140 L 60 140" stroke="#333" stroke-width="4" fill="none"/>
          
          <!-- Central metal ion -->
          <circle cx="0" cy="75" r="25" fill="${color}" stroke="${color}" stroke-width="3"/>
          <text x="0" y="82" text-anchor="middle" font-size="16" fill="white" font-weight="bold">Co³⁺</text>
          
          <!-- 6 ligands around (secondary valency) -->
          <circle cx="0" cy="20" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="0" y="25" text-anchor="middle" font-size="10" fill="white" font-weight="bold">NH₃</text>
          <line x1="0" y1="32" x2="0" y2="50" stroke="#666" stroke-width="2"/>
          
          <circle cx="0" cy="130" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="0" y="135" text-anchor="middle" font-size="10" fill="white" font-weight="bold">NH₃</text>
          <line x1="0" y1="118" x2="0" y2="100" stroke="#666" stroke-width="2"/>
          
          <circle cx="-45" cy="75" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="-45" y="80" text-anchor="middle" font-size="9" fill="white" font-weight="bold">NH₃</text>
          <line x1="-33" y1="75" x2="-25" y2="75" stroke="#666" stroke-width="2"/>
          
          <circle cx="45" cy="75" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="45" y="80" text-anchor="middle" font-size="9" fill="white" font-weight="bold">NH₃</text>
          <line x1="33" y1="75" x2="25" y2="75" stroke="#666" stroke-width="2"/>
          
          <circle cx="-30" cy="40" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="-30" y="45" text-anchor="middle" font-size="9" fill="white" font-weight="bold">NH₃</text>
          <line x1="-20" y1="48" x2="-12" y2="60" stroke="#666" stroke-width="2"/>
          
          <circle cx="30" cy="40" r="12" fill="${secondaryColor}" opacity="0.8"/>
          <text x="30" y="45" text-anchor="middle" font-size="9" fill="white" font-weight="bold">NH₃</text>
          <line x1="20" y1="48" x2="12" y2="60" stroke="#666" stroke-width="2"/>
          
          <!-- Outside bracket: 3 Cl- (primary valency) -->
          <circle cx="90" cy="40" r="10" fill="#10B981" opacity="0.8"/>
          <text x="90" y="45" text-anchor="middle" font-size="11" fill="white" font-weight="bold">Cl⁻</text>
          
          <circle cx="90" cy="75" r="10" fill="#10B981" opacity="0.8"/>
          <text x="90" y="80" text-anchor="middle" font-size="11" fill="white" font-weight="bold">Cl⁻</text>
          
          <circle cx="90" cy="110" r="10" fill="#10B981" opacity="0.8"/>
          <text x="90" y="115" text-anchor="middle" font-size="11" fill="white" font-weight="bold">Cl⁻</text>
        </g>
        
        <!-- Labels -->
        <g transform="translate(340, 120)">
          <rect x="-90" y="0" width="180" height="140" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
          <text x="0" y="25" text-anchor="middle" font-size="14" fill="#e65100" font-weight="bold">Primary Valency</text>
          <text x="0" y="45" text-anchor="middle" font-size="11" fill="#333">3 Cl⁻ ions</text>
          <text x="0" y="60" text-anchor="middle" font-size="11" fill="#333">Ionizable</text>
          <text x="0" y="75" text-anchor="middle" font-size="11" fill="#333">Outside [ ]</text>
          
          <text x="0" y="100" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Secondary Valency</text>
          <text x="0" y="120" text-anchor="middle" font-size="11" fill="#333">6 NH₃ ligands</text>
          <text x="0" y="135" text-anchor="middle" font-size="11" fill="#333">Inside [ ]</text>
        </g>
        
        <text x="250" y="320" text-anchor="middle" font-size="13" fill="#666" font-style="italic">Coordination Number = 6 (Secondary Valency)</text>
        <text x="250" y="340" text-anchor="middle" font-size="13" fill="#666" font-style="italic">3 Cl⁻ precipitate with AgNO₃ (Primary Valency)</text>
        <text x="250" y="375" font-family="Arial" font-size="18" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
    
    // Solutions topic - show different aspects based on slide content
    if (topicLower.includes("solution")) {
      // Variation 1: Types of solutions (for index 1, 5, 9... or keywords)
      if (titleLower.includes("type") || titleLower.includes("example") || titleLower.includes("classif") || 
          promptLower.includes("type") || index === 1) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
          <defs>
            <marker id="arr${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
            </marker>
          </defs>
          <!-- Title -->
          <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Types of Solutions</text>
          <!-- Solid in Liquid -->
          <g transform="translate(80, 80)">
            <rect x="-60" y="-20" width="120" height="200" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
            <text x="0" y="0" text-anchor="middle" font-size="16" font-weight="bold" fill="#01579b">Solid → Liquid</text>
            <circle cx="0" cy="60" r="30" fill="${color}" opacity="0.4"/>
            <circle cx="-10" cy="70" r="5" fill="${secondaryColor}"/>
            <circle cx="10" cy="65" r="5" fill="${secondaryColor}"/>
            <circle cx="0" cy="80" r="5" fill="${secondaryColor}"/>
            <circle cx="-8" cy="55" r="5" fill="${secondaryColor}"/>
            <circle cx="8" cy="75" r="5" fill="${secondaryColor}"/>
            <text x="0" y="130" text-anchor="middle" font-size="14" fill="#01579b">Salt in Water</text>
          </g>
          <!-- Gas in Liquid -->
          <g transform="translate(250, 80)">
            <rect x="-60" y="-20" width="120" height="200" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3"/>
            <text x="0" y="0" text-anchor="middle" font-size="16" font-weight="bold" fill="#6a1b9a">Gas → Liquid</text>
            <ellipse cx="0" cy="70" rx="25" ry="35" fill="${color}" opacity="0.3"/>
            <circle cx="-8" cy="60" r="4" fill="${secondaryColor}" opacity="0.7"/>
            <circle cx="8" cy="65" r="4" fill="${secondaryColor}" opacity="0.7"/>
            <circle cx="0" cy="75" r="4" fill="${secondaryColor}" opacity="0.7"/>
            <circle cx="-5" cy="82" r="4" fill="${secondaryColor}" opacity="0.7"/>
            <circle cx="5" cy="58" r="4" fill="${secondaryColor}" opacity="0.7"/>
            <text x="0" y="130" text-anchor="middle" font-size="14" fill="#6a1b9a">CO₂ in Soda</text>
          </g>
          <!-- Liquid in Liquid -->
          <g transform="translate(420, 80)">
            <rect x="-60" y="-20" width="120" height="200" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
            <text x="0" y="0" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">Liquid → Liquid</text>
            <circle cx="0" cy="70" r="28" fill="${color}" opacity="0.3"/>
            <path d="M -15 60 Q 0 70 15 60" fill="${secondaryColor}" opacity="0.6"/>
            <path d="M -15 80 Q 0 70 15 80" fill="${secondaryColor}" opacity="0.6"/>
            <path d="M -10 70 Q 0 75 10 70" fill="${tertiaryColor}" opacity="0.5"/>
            <text x="0" y="130" text-anchor="middle" font-size="14" fill="#2e7d32">Alcohol + Water</text>
          </g>
          <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
        </svg>`;
      }
      
      // Variation 2: Concentration levels (for index 2, 6, 10... or keywords)
      if (titleLower.includes("concentr") || titleLower.includes("propert") || titleLower.includes("strength") ||
          promptLower.includes("concentr") || index === 2) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
          <defs>
            <linearGradient id="conc1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.2" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.9" />
            </linearGradient>
            <linearGradient id="conc2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
            </linearGradient>
            <linearGradient id="conc3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.4" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
            </linearGradient>
          </defs>
          <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Concentration Levels</text>
          <!-- Concentrated -->
          <g transform="translate(100, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#conc1)" stroke="${color}" stroke-width="3"/>
            <circle cx="50" cy="140" r="4" fill="${secondaryColor}"/>
            <circle cx="42" cy="160" r="4" fill="${secondaryColor}"/>
            <circle cx="58" cy="155" r="4" fill="${secondaryColor}"/>
            <circle cx="48" cy="175" r="4" fill="${secondaryColor}"/>
            <circle cx="55" cy="190" r="4" fill="${secondaryColor}"/>
            <circle cx="45" cy="200" r="4" fill="${secondaryColor}"/>
            <circle cx="52" cy="165" r="4" fill="${secondaryColor}"/>
            <circle cx="47" cy="185" r="4" fill="${secondaryColor}"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Concentrated</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">High Solute</text>
          </g>
          <!-- Dilute -->
          <g transform="translate(220, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#conc2)" stroke="${color}" stroke-width="3"/>
            <circle cx="45" cy="150" r="4" fill="${secondaryColor}"/>
            <circle cx="55" cy="170" r="4" fill="${secondaryColor}"/>
            <circle cx="50" cy="190" r="4" fill="${secondaryColor}"/>
            <circle cx="48" cy="210" r="4" fill="${secondaryColor}"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Dilute</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">Medium Solute</text>
          </g>
          <!-- Very Dilute -->
          <g transform="translate(340, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#conc3)" stroke="${color}" stroke-width="3"/>
            <circle cx="48" cy="180" r="4" fill="${secondaryColor}"/>
            <circle cx="52" cy="200" r="4" fill="${secondaryColor}"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Very Dilute</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">Low Solute</text>
          </g>
          <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
        </svg>`;
      }
      
      // Variation 3: Factors affecting solubility (for index 3, 7... or keywords)
      if (titleLower.includes("factor") || titleLower.includes("solubil") || titleLower.includes("affect") ||
          titleLower.includes("influence") || promptLower.includes("factor") || index === 3) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
          <defs>
            <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
            </marker>
          </defs>
          <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Factors Affecting Solubility</text>
          <!-- Central concept -->
          <ellipse cx="250" cy="200" rx="70" ry="50" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="4"/>
          <text x="250" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Solubility</text>
          <!-- Temperature -->
          <g transform="translate(100, 100)">
            <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="3"/>
            <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">Temperature</text>
            <text x="0" y="15" text-anchor="middle" font-size="12" fill="#e65100">↑ Temp = ↑ Solute</text>
          </g>
          <line x1="140" y1="120" x2="200" y2="170" stroke="${color}" stroke-width="3" marker-end="url(#arr)"/>
          <!-- Pressure -->
          <g transform="translate(400, 100)">
            <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
            <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#01579b">Pressure</text>
            <text x="0" y="15" text-anchor="middle" font-size="12" fill="#01579b">↑ P = ↑ Gas</text>
          </g>
          <line x1="360" y1="120" x2="300" y2="170" stroke="${color}" stroke-width="3" marker-end="url(#arr)"/>
          <!-- Nature of Solute -->
          <g transform="translate(120, 300)">
            <rect x="-55" y="-30" width="110" height="60" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3"/>
            <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#6a1b9a">Polarity</text>
            <text x="0" y="15" text-anchor="middle" font-size="12" fill="#6a1b9a">Like dissolves Like</text>
          </g>
          <line x1="160" y1="280" x2="200" y2="230" stroke="${color}" stroke-width="3" marker-end="url(#arr)"/>
          <!-- Stirring -->
          <g transform="translate(380, 300)">
            <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
            <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Agitation</text>
            <text x="0" y="15" text-anchor="middle" font-size="12" fill="#2e7d32">↑ Rate</text>
          </g>
          <line x1="340" y1="280" x2="300" y2="230" stroke="${color}" stroke-width="3" marker-end="url(#arr)"/>
          <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
        </svg>`;
      }
      
      // Variation 4: Saturation states (for index 4, 8...)
      if (titleLower.includes("saturat") || titleLower.includes("unsaturat") || titleLower.includes("supersat") ||
          promptLower.includes("saturat") || index === 4) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
          <defs>
            <linearGradient id="sat1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
            </linearGradient>
            <linearGradient id="sat2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.4" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.9" />
            </linearGradient>
            <linearGradient id="sat3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${secondaryColor};stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Saturation States</text>
          <!-- Unsaturated -->
          <g transform="translate(100, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#sat1)" stroke="${color}" stroke-width="3"/>
            <circle cx="45" cy="180" r="4" fill="${secondaryColor}"/>
            <circle cx="55" cy="195" r="4" fill="${secondaryColor}"/>
            <circle cx="50" cy="210" r="4" fill="${secondaryColor}"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Unsaturated</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">Can dissolve more</text>
          </g>
          <!-- Saturated -->
          <g transform="translate(220, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#sat2)" stroke="${color}" stroke-width="3"/>
            <circle cx="42" cy="150" r="4" fill="${secondaryColor}"/>
            <circle cx="58" cy="160" r="4" fill="${secondaryColor}"/>
            <circle cx="48" cy="175" r="4" fill="${secondaryColor}"/>
            <circle cx="52" cy="190" r="4" fill="${secondaryColor}"/>
            <circle cx="45" cy="205" r="4" fill="${secondaryColor}"/>
            <circle cx="55" cy="215" r="4" fill="${secondaryColor}"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Saturated</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">Maximum capacity</text>
          </g>
          <!-- Supersaturated -->
          <g transform="translate(340, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 200 Q 65 230 50 230 Q 35 230 35 200 L 30 70 Z" 
                  fill="url(#sat3)" stroke="${secondaryColor}" stroke-width="3"/>
            <circle cx="42" cy="140" r="4" fill="${tertiaryColor}"/>
            <circle cx="58" cy="148" r="4" fill="${tertiaryColor}"/>
            <circle cx="48" cy="160" r="4" fill="${tertiaryColor}"/>
            <circle cx="52" cy="175" r="4" fill="${tertiaryColor}"/>
            <circle cx="45" cy="190" r="4" fill="${tertiaryColor}"/>
            <circle cx="55" cy="203" r="4" fill="${tertiaryColor}"/>
            <circle cx="50" cy="218" r="4" fill="${tertiaryColor}"/>
            <!-- Crystals forming -->
            <rect x="40" y="225" width="5" height="5" fill="${tertiaryColor}" opacity="0.9" transform="rotate(45 42.5 227.5)"/>
            <rect x="55" y="225" width="5" height="5" fill="${tertiaryColor}" opacity="0.9" transform="rotate(45 57.5 227.5)"/>
            <text x="50" y="260" text-anchor="middle" font-size="14" fill="${secondaryColor}" font-weight="bold">Supersaturated</text>
            <text x="50" y="278" text-anchor="middle" font-size="12" fill="#666">Crystals form</text>
          </g>
          <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
        </svg>`;
      }
      
      // Variation 5: Suspension vs Colloid vs Solution (for index 5...)
      if (titleLower.includes("suspension") || titleLower.includes("colloid") || titleLower.includes("mixture") ||
          promptLower.includes("suspension") || index === 5) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
          <text x="250" y="30" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle" font-weight="bold">Types of Mixtures</text>
          <!-- Solution -->
          <g transform="translate(80, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 180 Q 65 210 50 210 Q 35 210 35 180 L 30 70 Z" 
                  fill="${color}" opacity="0.3" stroke="${color}" stroke-width="3"/>
            <circle cx="45" cy="150" r="2" fill="${secondaryColor}"/>
            <circle cx="55" cy="160" r="2" fill="${secondaryColor}"/>
            <circle cx="50" cy="170" r="2" fill="${secondaryColor}"/>
            <circle cx="48" cy="180" r="2" fill="${secondaryColor}"/>
            <text x="50" y="240" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Solution</text>
            <text x="50" y="258" text-anchor="middle" font-size="11" fill="#666">Homogeneous</text>
            <text x="50" y="272" text-anchor="middle" font-size="11" fill="#666">Transparent</text>
          </g>
          <!-- Colloid -->
          <g transform="translate(220, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 180 Q 65 210 50 210 Q 35 210 35 180 L 30 70 Z" 
                  fill="${color}" opacity="0.5" stroke="${color}" stroke-width="3"/>
            <circle cx="42" cy="145" r="3" fill="${secondaryColor}" opacity="0.9"/>
            <circle cx="58" cy="155" r="3" fill="${secondaryColor}" opacity="0.9"/>
            <circle cx="48" cy="170" r="3" fill="${secondaryColor}" opacity="0.9"/>
            <circle cx="52" cy="185" r="3" fill="${secondaryColor}" opacity="0.9"/>
            <text x="50" y="240" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Colloid</text>
            <text x="50" y="258" text-anchor="middle" font-size="11" fill="#666">Intermediate</text>
            <text x="50" y="272" text-anchor="middle" font-size="11" fill="#666">Tyndall Effect</text>
          </g>
          <!-- Suspension -->
          <g transform="translate(360, 100)">
            <path d="M 30 50 L 70 50 L 70 70 L 65 180 Q 65 210 50 210 Q 35 210 35 180 L 30 70 Z" 
                  fill="${color}" opacity="0.7" stroke="${color}" stroke-width="3"/>
            <circle cx="42" cy="140" r="5" fill="${secondaryColor}"/>
            <circle cx="58" cy="155" r="5" fill="${secondaryColor}"/>
            <circle cx="48" cy="175" r="5" fill="${secondaryColor}"/>
            <circle cx="50" cy="195" r="5" fill="${secondaryColor}"/>
            <text x="50" y="240" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold">Suspension</text>
            <text x="50" y="258" text-anchor="middle" font-size="11" fill="#666">Heterogeneous</text>
            <text x="50" y="272" text-anchor="middle" font-size="11" fill="#666">Settles down</text>
          </g>
          <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
        </svg>`;
      }
      
      // Default: Dissolution process (for index 0, 6... and all others)
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>
          <marker id="arrow${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
          </marker>
        </defs>
        <!-- Beaker with gradient fill -->
        <path d="M 120 80 L 280 80 L 280 100 L 270 280 Q 270 330 200 330 Q 130 330 130 280 L 120 100 Z" 
              fill="url(#grad${index})" stroke="${color}" stroke-width="4" opacity="0.9"/>
        <!-- Water level line -->
        <line x1="130" y1="120" x2="270" y2="120" stroke="${secondaryColor}" stroke-width="2" stroke-dasharray="5,5"/>
        <!-- Solvent molecules (H2O) -->
        <g opacity="0.6">
          <circle cx="160" cy="200" r="8" fill="${secondaryColor}" stroke="${secondaryColor}" stroke-width="1"/>
          <circle cx="172" cy="206" r="5" fill="${secondaryColor}" opacity="0.8"/>
          <circle cx="172" cy="194" r="5" fill="${secondaryColor}" opacity="0.8"/>
          <circle cx="220" cy="220" r="8" fill="${secondaryColor}" stroke="${secondaryColor}" stroke-width="1"/>
          <circle cx="232" cy="226" r="5" fill="${secondaryColor}" opacity="0.8"/>
          <circle cx="232" cy="214" r="5" fill="${secondaryColor}" opacity="0.8"/>
        </g>
        <!-- Solute particles -->
        <circle cx="165" cy="170" r="7" fill="${color}" opacity="0.95" stroke="${color}" stroke-width="2"/>
        <circle cx="210" cy="195" r="7" fill="${color}" opacity="0.95" stroke="${color}" stroke-width="2"/>
        <circle cx="175" cy="230" r="7" fill="${color}" opacity="0.95" stroke="${color}" stroke-width="2"/>
        <!-- Process flow -->
        <g transform="translate(320, 150)">
          <rect x="0" y="0" width="160" height="50" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="2"/>
          <text x="80" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#01579b">Solute + Solvent</text>
        </g>
        <line x1="400" y1="185" x2="400" y2="215" stroke="#333" stroke-width="3" marker-end="url(#arrow${index})"/>
        <g transform="translate(320, 225)">
          <rect x="0" y="0" width="160" height="50" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
          <text x="80" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Solution Formed</text>
        </g>
        <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
    } // End of Solutions topic if block
    
    // Acids and Bases - enhanced pH scale
    if (topicLower.includes("acid") || topicLower.includes("base") || topicLower.includes("ph")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
            <stop offset="14%" style="stop-color:#FF6B00;stop-opacity:1" />
            <stop offset="28%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="42%" style="stop-color:#90EE90;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#00FF00;stop-opacity:1" />
            <stop offset="64%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="78%" style="stop-color:#4169E1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0000FF;stop-opacity:1" />
          </linearGradient>
          <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
          </marker>
        </defs>
        <!-- pH scale bar -->
        <rect x="50" y="150" width="400" height="60" fill="url(#phGrad)" stroke="#333" stroke-width="3" rx="5"/>
        <!-- pH value markers -->
        <text x="70" y="190" font-family="Arial" font-size="20" fill="white" font-weight="bold" stroke="#000" stroke-width="0.5">0</text>
        <text x="150" y="190" font-family="Arial" font-size="20" fill="white" font-weight="bold" stroke="#000" stroke-width="0.5">3</text>
        <text x="230" y="190" font-family="Arial" font-size="20" fill="white" font-weight="bold" stroke="#000" stroke-width="0.5">7</text>
        <text x="310" y="190" font-family="Arial" font-size="20" fill="white" font-weight="bold" stroke="#000" stroke-width="0.5">10</text>
        <text x="420" y="190" font-family="Arial" font-size="20" fill="white" font-weight="bold" stroke="#000" stroke-width="0.5">14</text>
        <!-- Labels -->
        <text x="100" y="130" font-family="Arial" font-size="22" fill="#FF0000" font-weight="bold">ACIDIC</text>
        <text x="210" y="130" font-family="Arial" font-size="22" fill="#00AA00" font-weight="bold">NEUTRAL</text>
        <text x="360" y="130" font-family="Arial" font-size="22" fill="#0000FF" font-weight="bold">BASIC</text>
        <!-- Ion indicators -->
        <g transform="translate(70, 250)">
          <circle cx="0" cy="0" r="35" fill="#FF6B6B" stroke="#CC0000" stroke-width="3"/>
          <text x="0" y="10" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">H⁺</text>
          <text x="0" y="60" font-family="Arial" font-size="14" fill="#CC0000" text-anchor="middle" font-weight="bold">High [H⁺]</text>
        </g>
        <g transform="translate(250, 250)">
          <circle cx="0" cy="0" r="35" fill="#90EE90" stroke="#00AA00" stroke-width="3"/>
          <text x="-8" y="6" font-family="Arial" font-size="20" fill="#006600" text-anchor="middle" font-weight="bold">H⁺</text>
          <text x="8" y="6" font-family="Arial" font-size="20" fill="#006600" text-anchor="middle" font-weight="bold">=</text>
          <text x="-8" y="16" font-family="Arial" font-size="20" fill="#006600" text-anchor="middle" font-weight="bold">OH⁻</text>
          <text x="0" y="60" font-family="Arial" font-size="14" fill="#00AA00" text-anchor="middle" font-weight="bold">Equal</text>
        </g>
        <g transform="translate(380, 250)">
          <circle cx="0" cy="0" r="35" fill="#4ECDC4" stroke="#0066CC" stroke-width="3"/>
          <text x="0" y="10" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">OH⁻</text>
          <text x="0" y="60" font-family="Arial" font-size="14" fill="#0066CC" text-anchor="middle" font-weight="bold">High [OH⁻]</text>
        </g>
        <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
    
    // Chemical Reactions - enhanced with energy diagram
    if (topicLower.includes("reaction") || promptLower.includes("reaction")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#333"/>
          </marker>
        </defs>
        <!-- Reaction equation area -->
        <rect x="30" y="30" width="440" height="120" rx="10" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3"/>
        <!-- Reactants -->
        <g transform="translate(80, 80)">
          <circle cx="0" cy="0" r="30" fill="${color}" opacity="0.8" stroke="${color}" stroke-width="3"/>
          <text x="0" y="8" font-family="Arial" font-size="22" fill="white" text-anchor="middle" font-weight="bold">A</text>
        </g>
        <text x="145" y="90" font-family="Arial" font-size="28" fill="#333" font-weight="bold">+</text>
        <g transform="translate(190, 80)">
          <circle cx="0" cy="0" r="25" fill="${secondaryColor}" opacity="0.8" stroke="${secondaryColor}" stroke-width="3"/>
          <text x="0" y="8" font-family="Arial" font-size="22" fill="white" text-anchor="middle" font-weight="bold">B</text>
        </g>
        <!-- Arrow with energy -->
        <line x1="230" y1="90" x2="300" y2="90" stroke="#333" stroke-width="4" marker-end="url(#arrow)"/>
        <text x="265" y="75" font-family="Arial" font-size="14" fill="#d32f2f" text-anchor="middle" font-weight="bold">Energy</text>
        <!-- Products -->
        <g transform="translate(350, 80)">
          <circle cx="-15" cy="-10" r="20" fill="${color}" opacity="0.9" stroke="${color}" stroke-width="3"/>
          <circle cx="10" cy="5" r="18" fill="${secondaryColor}" opacity="0.9" stroke="${secondaryColor}" stroke-width="3"/>
          <line x1="-5" y1="-5" x2="5" y2="0" stroke="#333" stroke-width="3"/>
          <text x="0" y="50" font-family="Arial" font-size="20" fill="#333" text-anchor="middle" font-weight="bold">AB</text>
        </g>
        <!-- Energy diagram -->
        <text x="250" y="190" font-family="Arial" font-size="18" fill="#333" text-anchor="middle" font-weight="bold">Energy Profile</text>
        <!-- Energy curve -->
        <path d="M 50 320 L 100 280 Q 150 220 200 240 L 250 250 L 450 290" 
              fill="none" stroke="${tertiaryColor}" stroke-width="4"/>
        <!-- Labels -->
        <text x="75" y="340" font-family="Arial" font-size="14" fill="#1976d2" font-weight="bold">Reactants</text>
        <text x="180" y="210" font-family="Arial" font-size="14" fill="#d32f2f" font-weight="bold">Activation</text>
        <text x="180" y="225" font-family="Arial" font-size="14" fill="#d32f2f" font-weight="bold">Energy</text>
        <text x="400" y="310" font-family="Arial" font-size="14" fill="#1976d2" font-weight="bold">Products</text>
        <!-- Axes -->
        <line x1="50" y1="220" x2="50" y2="340" stroke="#666" stroke-width="2"/>
        <line x1="50" y1="340" x2="460" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="20" y="280" font-family="Arial" font-size="12" fill="#666" font-weight="bold">E</text>
        <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
  
  // Biology-specific diagrams
  if (subjectLower.includes("biology") || subjectLower.includes("science")) {
    if (topicLower.includes("cell") || promptLower.includes("cell")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <linearGradient id="cellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.1" />
          </linearGradient>
          <marker id="pointer" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#333"/>
          </marker>
        </defs>
        <!-- Cell membrane (double layer) -->
        <ellipse cx="250" cy="200" rx="180" ry="150" fill="url(#cellGrad)" stroke="${color}" stroke-width="5" opacity="0.8"/>
        <ellipse cx="250" cy="200" rx="175" ry="145" fill="none" stroke="${color}" stroke-width="2" opacity="0.6" stroke-dasharray="5,3"/>
        <!-- Nucleus -->
        <circle cx="250" cy="200" r="60" fill="${secondaryColor}" opacity="0.4" stroke="${secondaryColor}" stroke-width="4"/>
        <circle cx="250" cy="200" r="40" fill="${secondaryColor}" opacity="0.6" stroke="${secondaryColor}" stroke-width="3"/>
        <text x="250" y="145" font-family="Arial" font-size="12" fill="#333" text-anchor="middle" font-weight="bold">Nucleus</text>
        <line x1="250" y1="150" x2="250" y2="155" stroke="#333" stroke-width="1.5" marker-end="url(#pointer)"/>
        <!-- Mitochondria -->
        <g transform="translate(340, 160)">
          <ellipse cx="0" cy="0" rx="35" ry="20" fill="#F59E0B" opacity="0.7" stroke="#F59E0B" stroke-width="3"/>
          <path d="M -25 -5 Q -15 0 -5 -5" fill="none" stroke="#F59E0B" stroke-width="2"/>
          <path d="M -25 5 Q -15 0 -5 5" fill="none" stroke="#F59E0B" stroke-width="2"/>
          <path d="M 5 -5 Q 15 0 25 -5" fill="none" stroke="#F59E0B" stroke-width="2"/>
          <path d="M 5 5 Q 15 0 25 5" fill="none" stroke="#F59E0B" stroke-width="2"/>
        </g>
        <text x="390" y="150" font-family="Arial" font-size="11" fill="#333" font-weight="bold">Mitochondria</text>
        <line x1="378" y1="152" x2="365" y2="158" stroke="#333" stroke-width="1.5"/>
        <!-- Ribosomes -->
        <circle cx="160" cy="240" r="8" fill="#10B981" opacity="0.8" stroke="#10B981" stroke-width="2"/>
        <circle cx="180" cy="250" r="8" fill="#10B981" opacity="0.8" stroke="#10B981" stroke-width="2"/>
        <circle cx="170" cy="265" r="8" fill="#10B981" opacity="0.8" stroke="#10B981" stroke-width="2"/>
        <text x="130" y="290" font-family="Arial" font-size="11" fill="#333" font-weight="bold">Ribosomes</text>
        <line x1="150" y1="285" x2="165" y2="268" stroke="#333" stroke-width="1.5"/>
        <!-- Endoplasmic Reticulum -->
        <path d="M 140 180 Q 130 170 140 160 Q 150 150 160 160 Q 170 170 160 180 Z" 
              fill="#EC4899" opacity="0.4" stroke="#EC4899" stroke-width="2"/>
        <text x="100" y="165" font-family="Arial" font-size="11" fill="#333" font-weight="bold">ER</text>
        <line x1="118" y1="168" x2="138" y2="172" stroke="#333" stroke-width="1.5"/>
        <!-- Golgi Apparatus -->
        <g transform="translate(320, 240)">
          <path d="M -20 -10 Q 0 -15 20 -10" fill="none" stroke="#8B5CF6" stroke-width="3" opacity="0.7"/>
          <path d="M -20 0 Q 0 -5 20 0" fill="none" stroke="#8B5CF6" stroke-width="3" opacity="0.7"/>
          <path d="M -20 10 Q 0 5 20 10" fill="none" stroke="#8B5CF6" stroke-width="3" opacity="0.7"/>
        </g>
        <text x="360" y="255" font-family="Arial" font-size="11" fill="#333" font-weight="bold">Golgi</text>
        <line x1="355" y1="252" x2="343" y2="245" stroke="#333" stroke-width="1.5"/>
        <!-- Cell Wall (if plant cell) -->
        <rect x="60" y="45" width="380" height="310" rx="10" fill="none" stroke="#2e7d32" stroke-width="4" stroke-dasharray="8,4" opacity="0.5"/>
        <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
    
    if (topicLower.includes("photosynthesis") || promptLower.includes("photosynthesis")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
        <defs>
          <marker id="sunArr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#F59E0B"/>
          </marker>
          <marker id="inArr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#06B6D4"/>
          </marker>
          <marker id="outArr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10B981"/>
          </marker>
        </defs>
        <!-- Sun with rays -->
        <circle cx="100" cy="80" r="40" fill="#F59E0B" opacity="0.9" stroke="#F57F17" stroke-width="3"/>
        <line x1="100" y1="30" x2="100" y2="50" stroke="#F59E0B" stroke-width="4"/>
        <line x1="100" y1="110" x2="100" y2="130" stroke="#F59E0B" stroke-width="4"/>
        <line x1="50" y1="80" x2="70" y2="80" stroke="#F59E0B" stroke-width="4"/>
        <line x1="130" y1="80" x2="150" y2="80" stroke="#F59E0B" stroke-width="4"/>
        <line x1="65" y1="45" x2="80" y2="60" stroke="#F59E0B" stroke-width="4"/>
        <line x1="120" y1="100" x2="135" y2="115" stroke="#F59E0B" stroke-width="4"/>
        <line x1="65" y1="115" x2="80" y2="100" stroke="#F59E0B" stroke-width="4"/>
        <line x1="120" y1="60" x2="135" y2="45" stroke="#F59E0B" stroke-width="4"/>
        <text x="100" y="90" font-family="Arial" font-size="20" fill="white" text-anchor="middle" font-weight="bold">☀</text>
        <!-- Light arrows -->
        <line x1="130" y1="100" x2="180" y2="140" stroke="#F59E0B" stroke-width="4" marker-end="url(#sunArr)"/>
        <text x="140" y="110" font-family="Arial" font-size="14" fill="#F57F17" font-weight="bold">Light</text>
        <!-- Chloroplast -->
        <ellipse cx="280" cy="200" rx="110" ry="70" fill="#10B981" opacity="0.3" stroke="#2e7d32" stroke-width="4"/>
        <ellipse cx="280" cy="200" rx="100" ry="60" fill="#10B981" opacity="0.2"/>
        <!-- Thylakoid stacks -->
        <g opacity="0.6">
          <rect x="240" y="180" width="30" height="5" rx="2" fill="#1b5e20"/>
          <rect x="240" y="187" width="30" height="5" rx="2" fill="#1b5e20"/>
          <rect x="240" y="194" width="30" height="5" rx="2" fill="#1b5e20"/>
          <rect x="280" y="180" width="30" height="5" rx="2" fill="#1b5e20"/>
          <rect x="280" y="187" width="30" height="5" rx="2" fill="#1b5e20"/>
          <rect x="280" y="194" width="30" height="5" rx="2" fill="#1b5e20"/>
        </g>
        <text x="280" y="150" font-family="Arial" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Chloroplast</text>
        <!-- Inputs -->
        <g transform="translate(70, 200)">
          <rect x="0" y="0" width="100" height="40" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="2"/>
          <text x="50" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#01579b">CO₂ + H₂O</text>
        </g>
        <line x1="175" y1="220" x2="200" y2="220" stroke="#06B6D4" stroke-width="3" marker-end="url(#inArr)"/>
        <!-- Outputs -->
        <g transform="translate(360, 200)">
          <rect x="0" y="0" width="110" height="40" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
          <text x="55" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">C₆H₁₂O₆ + O₂</text>
        </g>
        <line x1="360" y1="220" x2="385" y2="220" stroke="#10B981" stroke-width="3" marker-end="url(#outArr)"/>
        <!-- Equation below -->
        <text x="250" y="310" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂</text>
        <text x="250" y="330" font-family="Arial" font-size="12" fill="#666" text-anchor="middle">Carbon dioxide + Water + Sunlight → Glucose + Oxygen</text>
        <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
      </svg>`;
    }
  }

  // Default: Enhanced conceptual network diagram
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
    <defs>
      <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
      </linearGradient>
      <marker id="arrDef" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="${color}"/>
      </marker>
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>
    <!-- Central concept -->
    <circle cx="250" cy="200" r="60" fill="url(#grad${index})" stroke="${color}" stroke-width="4" filter="url(#shadow)"/>
    <text x="250" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Core</text>
    <text x="250" y="218" font-family="Arial" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Concept</text>
    <!-- Supporting concepts -->
    <g transform="translate(120, 100)">
      <rect x="-40" y="-25" width="80" height="50" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="3" filter="url(#shadow)"/>
      <text x="0" y="5" text-anchor="middle" font-size="13" font-weight="bold" fill="#01579b">Definition</text>
    </g>
    <line x1="158" y1="118" x2="205" y2="170" stroke="${color}" stroke-width="3" marker-end="url(#arrDef)"/>
    
    <g transform="translate(380, 100)">
      <rect x="-40" y="-25" width="80" height="50" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3" filter="url(#shadow)"/>
      <text x="0" y="5" text-anchor="middle" font-size="13" font-weight="bold" fill="#6a1b9a">Examples</text>
    </g>
    <line x1="342" y1="118" x2="295" y2="170" stroke="${color}" stroke-width="3" marker-end="url(#arrDef)"/>
    
    <g transform="translate(120, 300)">
      <rect x="-40" y="-25" width="80" height="50" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3" filter="url(#shadow)"/>
      <text x="0" y="5" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">Properties</text>
    </g>
    <line x1="158" y1="282" x2="205" y2="230" stroke="${color}" stroke-width="3" marker-end="url(#arrDef)"/>
    
    <g transform="translate(380, 300)">
      <rect x="-40" y="-25" width="80" height="50" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="3" filter="url(#shadow)"/>
      <text x="0" y="-2" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Applications</text>
    </g>
    <line x1="342" y1="282" x2="295" y2="230" stroke="${color}" stroke-width="3" marker-end="url(#arrDef)"/>
    
    <text x="250" y="375" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">${topic}</text>
  </svg>`;
}

function generateSvgGraphic(subject, subtitle, index) {
  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#06B6D4", "#6366F1", "#EF4444"];
  const color = colors[index % colors.length];
  
  const subjectLower = (subject || "").toLowerCase();
  
  // Generate subject-specific SVG icons
  if (subjectLower.includes("biology") || subjectLower.includes("science")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.2"/>
      <circle cx="200" cy="200" r="80" fill="${color}" opacity="0.3"/>
      <circle cx="150" cy="150" r="40" fill="${color}" opacity="0.5"/>
      <circle cx="250" cy="150" r="35" fill="${color}" opacity="0.5"/>
      <circle cx="200" cy="250" r="45" fill="${color}" opacity="0.5"/>
      <path d="M 200 120 Q 220 140 200 160 Q 180 140 200 120 Z" fill="${color}" opacity="0.7"/>
      <text x="200" y="320" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Biology</text>
    </svg>`;
  } else if (subjectLower.includes("chemistry")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.1"/>
      <ellipse cx="200" cy="180" rx="60" ry="100" fill="none" stroke="${color}" stroke-width="4" opacity="0.6"/>
      <circle cx="200" cy="120" r="20" fill="${color}" opacity="0.7"/>
      <circle cx="170" cy="200" r="15" fill="${color}" opacity="0.7"/>
      <circle cx="230" cy="200" r="15" fill="${color}" opacity="0.7"/>
      <rect x="180" y="250" width="40" height="80" rx="5" fill="${color}" opacity="0.4"/>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Chemistry</text>
    </svg>`;
  } else if (subjectLower.includes("physics")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.1"/>
      <circle cx="200" cy="200" r="100" fill="none" stroke="${color}" stroke-width="3" opacity="0.6"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="${color}" stroke-width="2" opacity="0.5"/>
      <line x1="200" y1="100" x2="200" y2="300" stroke="${color}" stroke-width="2" opacity="0.5"/>
      <circle cx="200" cy="200" r="15" fill="${color}" opacity="0.8"/>
      <path d="M 200 100 L 300 200 L 200 300 L 100 200 Z" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Physics</text>
    </svg>`;
  } else if (subjectLower.includes("math")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.1"/>
      <rect x="100" y="100" width="200" height="200" fill="none" stroke="${color}" stroke-width="3" opacity="0.6"/>
      <line x1="150" y1="100" x2="150" y2="300" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="200" y1="100" x2="200" y2="300" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="250" y1="100" x2="250" y2="300" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="100" y1="150" x2="300" y2="150" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="100" y1="250" x2="300" y2="250" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Mathematics</text>
    </svg>`;
  } else if (subjectLower.includes("history")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.1"/>
      <rect x="120" y="80" width="160" height="240" rx="10" fill="none" stroke="${color}" stroke-width="4" opacity="0.6"/>
      <line x1="120" y1="130" x2="280" y2="130" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <line x1="120" y1="180" x2="280" y2="180" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <line x1="120" y1="230" x2="280" y2="230" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <line x1="120" y1="280" x2="280" y2="280" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <circle cx="200" cy="200" r="40" fill="${color}" opacity="0.3"/>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">History</text>
    </svg>`;
  } else if (subjectLower.includes("geography")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.1"/>
      <circle cx="200" cy="200" r="100" fill="none" stroke="${color}" stroke-width="4" opacity="0.6"/>
      <ellipse cx="200" cy="200" rx="100" ry="50" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <ellipse cx="200" cy="200" rx="50" ry="100" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>
      <path d="M 120 180 Q 150 150 180 180 Q 200 200 220 180 Q 250 150 280 180" fill="none" stroke="${color}" stroke-width="3" opacity="0.5"/>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Geography</text>
    </svg>`;
  } else {
    // Generic educational icon
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#grad${index})" opacity="0.2"/>
      <circle cx="200" cy="200" r="100" fill="none" stroke="${color}" stroke-width="5" opacity="0.6"/>
      <circle cx="200" cy="200" r="50" fill="${color}" opacity="0.4"/>
      <text x="200" y="215" font-family="Arial" font-size="48" fill="white" text-anchor="middle" font-weight="bold">${index + 1}</text>
      <text x="200" y="350" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">Education</text>
    </svg>`;
  }
}

function buildPresentationFilename(subject, topic) {
  const sanitize = (value, fallback) => {
    if (!value || typeof value !== "string") {
      return fallback;
    }
    const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return normalized || fallback;
  };

  const subjectSegment = sanitize(subject, "subject");
  const topicSegment = sanitize(topic, "topic");
  return `presentation-svg-${subjectSegment}-${topicSegment}.pptx`;
}
