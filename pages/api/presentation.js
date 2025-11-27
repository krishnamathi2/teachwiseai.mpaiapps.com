import PptxGenJS from "pptxgenjs";
import { SUBJECT_FILES } from "../../lib/contentMap";
import { requestModelContent } from "../../lib/modelProvider";
import { buildGradeLabel, parseGrade } from "../../lib/gradeUtils";

const glyphReplacements = {
  垐: "θ",
  垑: "θ",
  垒: "θ",
  垓: "θ",
  垙: "θ",
  垌: "θ",
  垛: "θ",
  垤: "θ",
  垥: "θ",
  ì: "i",
  ï: "i",
  ﬁ: "fi",
  ﬂ: "fl",
  "–": "-",
  "—": "-",
  "−": "-",
  "＝": "=",
  "﹣": "-",
};

const latexReplacements = {
  "\\cup": "∪",
  "\\cap": "∩",
  "\\subseteq": "⊆",
  "\\subset": "⊂",
  "\\supseteq": "⊇",
  "\\supset": "⊃",
  "\\in": "∈",
  "\\notin": "∉",
  "\\emptyset": "∅",
  "\\mathbb{N}": "ℕ",
  "\\mathbb{Z}": "ℤ",
  "\\mathbb{Q}": "ℚ",
  "\\mathbb{R}": "ℝ",
  "\\mathbb{C}": "ℂ",
};

const sanitizeLine = (rawLine = "") => {
  if (!rawLine) {
    return "";
  }

  let line = rawLine.normalize("NFKC");
  Object.entries(glyphReplacements).forEach(([glyph, replacement]) => {
    line = line.split(glyph).join(replacement);
  });

  line = line
    .replace(/[•●▪◦·]/g, "•")
    .replace(/[\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\(\s*\)/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/₹/g, "Rs.")
    .replace(/\*\*/g, "")
    .replace(/\\ /g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim();

  line = line
    .replace(/sin\s*θ/gi, "sin θ")
    .replace(/cos\s*θ/gi, "cos θ")
    .replace(/tan\s*θ/gi, "tan θ")
    .replace(/cot\s*θ/gi, "cot θ");

  Object.entries(latexReplacements).forEach(([pattern, replacement]) => {
    line = line.replace(new RegExp(pattern, "g"), replacement);
  });

  line = line.replace(
    /[^\x20-\x7EθπσΩωαβγδλμνξρτφψχ∑∏∞≤≥≠√°±×÷⅓¼½¾⅔⅛⅜⅝⅞‰π⁄]+/g,
    ""
  );

  return line;
};

const splitIntoBullets = (line, maxLength) => {
  if (!line) {
    return [];
  }

  if (line.length <= maxLength) {
    return [line];
  }

  const parts = line
    .split(/(?<=[.;])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return [line];
  }

  const flattened = [];
  parts.forEach((part) => {
    if (part.length <= maxLength) {
      flattened.push(part);
    } else {
      part.split(/,\s+/).forEach((chunk) => {
        const cleanChunk = chunk.trim();
        if (cleanChunk) {
          flattened.push(cleanChunk);
        }
      });
    }
  });

  return flattened.length > 0 ? flattened : [line];
};

const formatHeading = (line) => line.replace(/[:：.-]*$/, "");

const continuationTitle = (title) => {
  if (!title) {
    return title;
  }
  return title.includes("(cont.)") ? title : `${title} (cont.)`;
};

const buildSlideOutline = (lines, subjectLabel) => {
  const MAX_BULLETS_PER_SLIDE = 6;
  const MAX_BULLET_LENGTH = 120;
  const bulletStartRegex = /^(?:\(?[ivx]+\)|\(?[a-z]\)|\d+\.|\d+\)|[-•◦▪·])\s*/i;
  const defaultTitle = subjectLabel || "Presentation";

  const slides = [];
  let current = {
    title: defaultTitle,
    bullets: [],
  };
  let pendingBullet = "";

  const commitSlide = (nextTitle = defaultTitle) => {
    if (current.bullets.length > 0) {
      const uniqueBullets = current.bullets.filter(
        (bullet, index, self) => self.indexOf(bullet) === index
      );
      if (uniqueBullets.length > 0) {
        slides.push({
          title: current.title || defaultTitle,
          bullets: uniqueBullets,
        });
      }
    }
    current = {
      title: nextTitle || defaultTitle,
      bullets: [],
    };
  };

  const addBulletToCurrentSlide = (text) => {
    splitIntoBullets(text, MAX_BULLET_LENGTH).forEach((candidate) => {
      const cleanItem = candidate.replace(/^[-•◦▪·]+\s*/, "").trim();
      if (!cleanItem) {
        return;
      }

      if (current.bullets.length >= MAX_BULLETS_PER_SLIDE) {
        commitSlide(continuationTitle(current.title));
      }

      current.bullets.push(cleanItem);

      if (current.bullets.length >= MAX_BULLETS_PER_SLIDE) {
        commitSlide(continuationTitle(current.title));
      }
    });
  };

  const flushPendingBullet = () => {
    if (pendingBullet.trim()) {
      addBulletToCurrentSlide(pendingBullet.trim());
    }
    pendingBullet = "";
  };

  lines.forEach((line) => {
    if (!line) {
      flushPendingBullet();
      return;
    }

    if (/^(chapter|unit|topic)\b/i.test(line)) {
      flushPendingBullet();
      commitSlide(formatHeading(line));
      return;
    }

    if (/[:：]$/.test(line)) {
      flushPendingBullet();
      commitSlide(formatHeading(line));
      return;
    }

    if (/^(example|illustration|application)\b/i.test(line)) {
      flushPendingBullet();
      commitSlide(formatHeading(line));
      return;
    }

    if (bulletStartRegex.test(line)) {
      flushPendingBullet();
      pendingBullet = line.replace(bulletStartRegex, "").trim();
      return;
    }

    if (pendingBullet) {
      pendingBullet = `${pendingBullet} ${line}`.trim();
      if (/[.;:]$/.test(line)) {
        flushPendingBullet();
      }
    } else {
      pendingBullet = line;
      if (/[.;:]$/.test(line)) {
        flushPendingBullet();
      }
    }
  });

  flushPendingBullet();
  commitSlide(current.title);

  return slides;
};

function buildPresentationPrompt(subject, topic, gradeLabel) {
  return `Create a comprehensive explanation about ${topic} in ${gradeLabel} ${subject}.
Include:
1. Clear definition
2. Key concepts
3. Examples
4. Real-world applications

Structure the output so each slide is written as a single title line (no trailing punctuation) followed by 3-5 bullet sentences prefixed with "- ". Use plain text only—do not use Markdown formatting or LaTeX commands. Prefer common math symbols such as ∪, ∩, ⊆ instead of commands like \cup.`;
}

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
    const gradeNumber = parseGrade(grade);
    const prompt = buildPresentationPrompt(subject, topic, gradeLabel);
    const outlineText = await requestModelContent(prompt);

    if (!outlineText) {
      res.status(500).json({ message: "Unable to generate presentation outline" });
      return;
    }

    const normalizedTopic = topic.trim().toLowerCase();
    const normalizedSubject = subject.trim().toLowerCase();
    const subjectTopic = `${subject.trim()} - ${topic.trim()}`.toLowerCase();

    const sanitizedLines = outlineText
      .split("\n")
      .map(sanitizeLine)
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter((line) => {
        if (!line) {
          return false;
        }
        const normalizedLine = line.toLowerCase();
        if (normalizedLine === normalizedTopic) {
          return false;
        }
        if (normalizedLine === subjectTopic) {
          return false;
        }
        if (normalizedLine === normalizedSubject) {
          return false;
        }
        if (normalizedLine.startsWith(subjectTopic)) {
          return false;
        }
        return true;
      });

    const slideOutline = buildSlideOutline(sanitizedLines, subject.trim());

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_16x9";

    const titleSlide = pptx.addSlide();
    titleSlide.addText(`${gradeLabel} ${subject} • ${topic}`, {
      x: 0.5,
      y: 1.5,
      w: 9,
      fontSize: 36,
      color: "2e1065",
      bold: true,
    });
    titleSlide.addText("Generated via teachwiseAI", {
      x: 0.5,
      y: 3,
      w: 9,
      fontSize: 18,
      color: "475569",
    });

    if (slideOutline.length === 0) {
      const slide = pptx.addSlide();
      slide.addText("No content generated for this topic.", {
        x: 0.6,
        y: 2.5,
        fontSize: 24,
        color: "0f172a",
      });
    } else {
      slideOutline.forEach(({ title, bullets }) => {
        const slide = pptx.addSlide();
        slide.addText(title, {
          x: 0.6,
          y: 0.5,
          fontSize: 26,
          color: "1e3a8a",
          bold: true,
        });

          slide.addText(
            bullets.map((text) => ({ text, options: { bullet: true } })),
            {
              x: 0.6,
              y: 1.2,
              w: 9,
              fontSize: 20,
              color: "0f172a",
              lineSpacing: 28,
            }
          );
      });
    }

    const base64 = await pptx.write("base64");
    res.status(200).json({ base64, grade: gradeNumber });
  } catch (error) {
    res.status(500).json({ message: "Unable to generate presentation" });
  }
}
