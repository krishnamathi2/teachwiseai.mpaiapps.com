import PptxGenJS from "pptxgenjs";
import { buildGradeLabel } from "../../lib/gradeUtils";

const STABILITY_API_KEY = process.env.STABILITY_AI_KEY;
const STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
const MAX_PRESENTATION_SLIDES = 100;
const PRESENTATION_WIDTH = 1280;
const PRESENTATION_HEIGHT = 720;
const STABILITY_IMAGE_WIDTH = 1024;
const STABILITY_IMAGE_HEIGHT = 1024;
const MAX_SLIDE_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!STABILITY_API_KEY) {
    res.status(500).json({ message: "Stability AI key missing" });
    return;
  }

  const { subject, topic, grade, slideCount, useCraiyon = false } = req.body || {};

  if (!subject || !topic) {
    res.status(400).json({ message: "Subject and topic are required" });
    return;
  }

  const parsedCount = Number.parseInt(slideCount, 10);
  if (!Number.isFinite(parsedCount) || parsedCount < 1) {
    res.status(400).json({ message: "Slide count must be at least 1" });
    return;
  }

  const totalSlides = Math.min(parsedCount, MAX_PRESENTATION_SLIDES);
  const gradeLabel = buildGradeLabel(grade);

  try {
    const descriptors = buildPresentationDescriptors(subject, topic, gradeLabel, totalSlides);
    const slideImages = useCraiyon 
      ? await generateCraiyonPresentationSlides(descriptors)
      : await generatePresentationSlides(descriptors);

    if (slideImages.length === 0) {
      throw new Error("Unable to generate slides");
    }

    const deckBytes = await createPresentationDeck(subject, topic, gradeLabel, slideImages);
    const base64 = deckBytes.toString("base64");
    const filename = buildPresentationFilename(subject, topic);

    res.status(200).json({
      base64,
      filename,
      slideCount: slideImages.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Presentation generation failed", error);
    res.status(500).json({ message: error.message || "Failed to generate presentation" });
  }
}

function buildPresentationDescriptors(subject, topic, gradeLabel, slideCount) {
  const phases = [
    "Hook & curiosity",
    "Concept overview",
    "Key example",
    "Guided practice",
    "Real-world connection",
    "Quick recap",
  ];

  return Array.from({ length: slideCount }).map((_, index) => {
    const phaseLabel = phases[index] || `Deep dive ${index + 1}`;
    return {
      index: index + 1,
      heading: phaseLabel,
      summary: `${phaseLabel} for ${topic} in ${gradeLabel} ${subject}`,
      subject,
      topic,
      gradeLabel,
    };
  });
}

async function generatePresentationSlides(descriptors = []) {
  const slideBuffers = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const descriptor of descriptors) {
    let buffer = null;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_SLIDE_RETRIES; attempt += 1) {
      // eslint-disable-next-line no-console
      console.log(`Generating slide ${descriptor.index}, attempt ${attempt}/${MAX_SLIDE_RETRIES}`);
      
      // eslint-disable-next-line no-await-in-loop
      const result = await requestStabilitySlide(descriptor);
      
      if (result.buffer) {
        buffer = result.buffer;
        // eslint-disable-next-line no-console
        console.log(`Slide ${descriptor.index} generated successfully`);
        break;
      }
      
      lastError = result.error;
      // eslint-disable-next-line no-console
      console.error(`Slide ${descriptor.index} attempt ${attempt} failed:`, lastError);
      
      if (attempt < MAX_SLIDE_RETRIES) {
        // Exponential backoff with longer delays
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
      }
    }

    if (!buffer) {
      throw new Error(
        `Unable to generate slide ${descriptor.index} after ${MAX_SLIDE_RETRIES} attempts. Last error: ${lastError || 'Unknown error'}`,
      );
    }

    slideBuffers.push(buffer);
  }

  return slideBuffers;
}

async function generateCraiyonPresentationSlides(descriptors = []) {
  const { generateCraiyonImage } = await import("../../lib/craiyonApi");
  const slideBuffers = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const descriptor of descriptors) {
    try {
      // eslint-disable-next-line no-console
      console.log(`Generating Craiyon slide ${descriptor.index}`);
      
      const prompt = buildCraiyonPrompt(descriptor);
      // eslint-disable-next-line no-await-in-loop
      const base64Image = await generateCraiyonImage(prompt);
      
      // Convert base64 to buffer
      const buffer = Buffer.from(base64Image, 'base64');
      slideBuffers.push(buffer);
      
      // eslint-disable-next-line no-console
      console.log(`Craiyon slide ${descriptor.index} generated successfully`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Craiyon slide ${descriptor.index} failed:`, error);
      throw new Error(`Unable to generate Craiyon slide ${descriptor.index}: ${error.message}`);
    }
  }

  return slideBuffers;
}

function buildCraiyonPrompt(descriptor) {
  const { heading, topic, subject, gradeLabel } = descriptor;
  return `Educational illustration for ${heading} about ${topic}, ${subject} subject for ${gradeLabel} students, colorful diagram, simple, clear, educational`;
}

async function requestStabilitySlide(descriptor) {
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
            text: buildStabilityPrompt(descriptor),
            weight: 1,
          },
          {
            text: "text, words, letters, typography, writing, labels, captions, titles, watermarks, signatures, numbers, alphabet, characters, fonts",
            weight: -1,
          },
        ],
        cfg_scale: 7,
        height: STABILITY_IMAGE_HEIGHT,
        width: STABILITY_IMAGE_WIDTH,
        samples: 1,
        steps: 40,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // eslint-disable-next-line no-console
      console.error(`Stability AI HTTP ${response.status}:`, errorText);
      return { buffer: null, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
    }

    const payload = await response.json();
    const artifact = payload?.artifacts?.[0];
    
    if (!artifact?.base64) {
      return { buffer: null, error: "No image data in response" };
    }
    
    return { buffer: Buffer.from(artifact.base64, "base64"), error: null };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Stability AI request error:", error.message);
    return { buffer: null, error: error.message };
  }
}

async function createPresentationDeck(subject, topic, gradeLabel, slideImages) {
  const pptx = new PptxGenJS();
  
  // Set presentation properties
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "TeachwiseAI";
  pptx.subject = `${gradeLabel} ${subject}`;
  pptx.title = `${topic} - ${subject}`;

  const contentForSlides = await generateSlideContent(subject, topic, gradeLabel, slideImages.length);

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, imageBuffer] of slideImages.entries()) {
    if (!imageBuffer) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const slide = pptx.addSlide();
    const slideContent = contentForSlides[index];
    
    // Add main title - larger and bolder
    slide.addText(slideContent.title, {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.7,
      fontSize: 36,
      bold: true,
      color: "1E3A8A",
      fontFace: "Arial",
    });

    // Add subtitle/phase
    slide.addText(slideContent.subtitle, {
      x: 0.5,
      y: 1.1,
      w: "90%",
      h: 0.4,
      fontSize: 22,
      bold: true,
      color: "3B82F6",
      fontFace: "Arial",
    });

    try {
      // Convert buffer to base64 data URL
      const base64Image = imageBuffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64Image}`;

      // Add image to slide - larger and centered
      slide.addImage({
        data: dataUrl,
        x: 0.5,
        y: 1.7,
        w: 5.5,
        h: 5,
        sizing: { type: "contain", w: 5.5, h: 5 },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to embed stability slide", error);
    }

    // Add content box with clear bullet points - right side
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.2,
      y: 1.7,
      w: 6.2,
      h: 5,
      fill: { color: "F1F5F9" },
      line: { color: "CBD5E1", width: 1 },
    });

    // Add detailed paragraphs instead of bullet points
    const contentText = slideContent.paragraphs.join("\n\n");
    slide.addText(contentText, {
      x: 6.5,
      y: 2,
      w: 5.6,
      h: 4.4,
      fontSize: 14,
      color: "0F172A",
      fontFace: "Arial",
      valign: "top",
      lineSpacing: 22,
    });

    // Add footer
    slide.addText(`${gradeLabel} ${subject} | Slide ${index + 1} of ${slideImages.length}`, {
      x: 0.5,
      y: 6.9,
      w: "90%",
      h: 0.3,
      fontSize: 11,
      color: "64748B",
      fontFace: "Arial",
      align: "center",
    });
  }

  // Generate PowerPoint file as buffer
  const pptxBuffer = await pptx.write({ outputType: "nodebuffer" });
  return pptxBuffer;
}

async function generateSlideContent(subject, topic, gradeLabel, slideCount) {
  const phases = [
    {
      title: topic,
      subtitle: "Introduction & Overview",
      template: (t, s, g) => [
        `${t} represents a crucial area of study in ${s} for ${g} students. This topic explores fundamental concepts that form the foundation of advanced learning.`,
        
        `Key areas covered include the basic definitions, historical context, and modern applications. Students will understand both theoretical frameworks and practical implementations.`,
        
        `Real-world significance: This concept has widespread applications in industry, research, medicine, technology, and environmental science, making it essential knowledge for future careers.`,
      ],
    },
    {
      title: topic,
      subtitle: "Core Concepts & Key Definitions",
      template: (t, s, g) => [
        `Definition: ${t} encompasses the essential principles and mechanisms that govern this area of ${s}. Understanding terminology is critical for mastering the subject.`,
        
        `Fundamental Components: The topic involves multiple interconnected systems including structural elements, functional processes, and regulatory mechanisms that work together.`,
        
        `Scientific Basis: Built on established theories and experimental evidence, this concept demonstrates clear cause-and-effect relationships with measurable outcomes and predictable patterns.`,
      ],
    },
    {
      title: topic,
      subtitle: "Detailed Explanation & Mechanisms",
      template: (t, s, g) => [
        `How it Works: ${t} operates through specific processes involving sequential steps, biochemical pathways, physical transformations, or systematic procedures depending on the context.`,
        
        `Key Processes: The mechanisms include initiation phases, active operation periods, regulation checkpoints, and completion stages. Each step is controlled by specific factors and conditions.`,
        
        `Important Variables: Temperature, pH levels, concentration, time duration, environmental conditions, and catalytic agents all play crucial roles in determining outcomes and efficiency.`,
      ],
    },
    {
      title: topic,
      subtitle: "Real-World Examples & Case Studies",
      template: (t, s, g) => [
        `Everyday Applications: ${t} manifests in numerous daily life scenarios - from household processes to commercial products, transportation systems to communication technologies.`,
        
        `Industry Examples: Manufacturing sectors, pharmaceutical companies, agricultural operations, and technology firms extensively utilize these principles for product development and quality control.`,
        
        `Notable Case Studies: Historical breakthroughs, famous experiments, landmark discoveries, and modern innovations demonstrate the practical impact and transformative potential of this knowledge.`,
      ],
    },
    {
      title: topic,
      subtitle: "Practical Applications & Impact",
      template: (t, s, g) => [
        `Healthcare & Medicine: ${t} plays vital roles in disease diagnosis, treatment development, vaccine production, drug formulation, medical device engineering, and therapeutic interventions.`,
        
        `Industrial & Commercial Uses: Food processing, waste management, energy production, material synthesis, quality assurance, biotechnology applications, and manufacturing optimization.`,
        
        `Environmental Significance: Pollution control, ecosystem restoration, sustainable resource management, climate change mitigation, biodiversity conservation, and renewable energy development.`,
      ],
    },
    {
      title: topic,
      subtitle: "Problem Solving & Analysis",
      template: (t, s, g) => [
        `Common Challenges: Students often struggle with complex terminology, interconnected concepts, quantitative calculations, abstract visualizations, and application of theory to novel situations.`,
        
        `Solution Strategies: Break problems into smaller steps, identify given information and unknowns, apply relevant formulas and principles, verify units and dimensions, check answer reasonability.`,
        
        `Exam Preparation Tips: Focus on concept understanding over memorization, practice diverse problem types, create visual diagrams, summarize key points, review common mistakes, attempt past papers.`,
      ],
    },
    {
      title: topic,
      subtitle: "Key Takeaways & Essential Facts",
      template: (t, s, g) => [
        `Critical Points to Remember: ${t} involves specific processes, defined conditions, measurable outcomes, and practical applications. Master the core vocabulary, key equations, and fundamental principles.`,
        
        `Connections to Other Topics: This concept links to cellular biology, chemical reactions, energy transformations, genetic mechanisms, ecological relationships, and technological innovations in ${s}.`,
        
        `Assessment Focus: Exam questions typically test definition recall, process explanation, data analysis, experimental design, application scenarios, and critical thinking about limitations and improvements.`,
      ],
    },
    {
      title: topic,
      subtitle: "Summary, Review & Future Learning",
      template: (t, s, g) => [
        `Comprehensive Recap: ${t} encompasses definitions, mechanisms, applications, and significance. We explored how it works, why it matters, and where it applies in real-world contexts.`,
        
        `Discussion Questions: How has this changed modern life? What are ethical considerations? What future developments are expected? How does it address global challenges? What careers utilize this knowledge?`,
        
        `Next Steps: Advanced topics include molecular details, biotechnology applications, genetic engineering, nanotechnology integration, artificial intelligence implementations, and cutting-edge research frontiers.`,
      ],
    },
  ];

  return Array.from({ length: slideCount }).map((_, index) => {
    const phase = phases[index] || phases[phases.length - 1];
    return {
      title: phase.title,
      subtitle: phase.subtitle,
      paragraphs: phase.template(topic, subject, gradeLabel),
    };
  });
}

function buildStabilityPrompt(descriptor = {}) {
  const { heading, summary, topic, subject, gradeLabel, index } = descriptor;
  const slideHeading = heading || `Slide ${index || 1}`;
  const focusSummary = summary || `Explain ${topic || "topic"} for ${gradeLabel || "students"}.`;

  // Subject-specific styling
  let styleGuide = "";
  const subjectLower = (subject || "").toLowerCase();
  
  if (subjectLower.includes("history")) {
    styleGuide = "historical photograph, vintage imagery, historical monuments, ancient architecture, historical artifacts, period-accurate scenes, museum quality photograph, heritage sites, historical figures in period clothing, archaeological discoveries";
  } else if (subjectLower.includes("biology") || subjectLower.includes("science")) {
    styleGuide = "scientific photograph, microscope imagery, nature photography, laboratory scenes, biological specimens, natural phenomena, scientific equipment, detailed organism close-ups";
  } else if (subjectLower.includes("chemistry")) {
    styleGuide = "chemistry laboratory, chemical reactions, molecular structures, laboratory glassware, chemical elements, scientific experiments, periodic table elements";
  } else if (subjectLower.includes("physics")) {
    styleGuide = "physics experiments, mechanical systems, optical phenomena, electromagnetic demonstrations, laboratory apparatus, energy demonstrations, wave patterns";
  } else if (subjectLower.includes("geography")) {
    styleGuide = "landscape photography, geographical features, natural formations, aerial views, topographical scenes, environmental photography, earth science imagery";
  } else if (subjectLower.includes("mathematics") || subjectLower.includes("math")) {
    styleGuide = "geometric patterns, mathematical models, 3D shapes, symmetrical designs, architectural geometry, fractal patterns, mathematical visualization";
  } else if (subjectLower.includes("english") || subjectLower.includes("literature")) {
    styleGuide = "literary scenes, book imagery, classical art, dramatic scenes, theatrical photography, artistic compositions, cultural imagery";
  } else {
    styleGuide = "educational photograph, clear visual representation, professional quality imagery, authentic scenes, realistic depiction";
  }

  return `High quality photographic image directly related to "${topic}" for ${gradeLabel} ${subject} education.
Main subject: ${topic}
Visual style: ${styleGuide}
Requirements: realistic, authentic, historically/scientifically accurate, professional quality.
CRITICAL: Pure visual content only - absolutely NO text, NO words, NO letters, NO labels, NO watermarks anywhere in the image.`;
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
  return `presentation-${subjectSegment}-${topicSegment}.pptx`;
}
