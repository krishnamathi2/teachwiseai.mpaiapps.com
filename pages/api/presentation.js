import { SUBJECT_FILES } from "../../lib/contentMap";
import { buildGradeLabel, parseGrade } from "../../lib/gradeUtils";
import { buildLessonWithAI, generatePptBuffer } from "../../lib/openaiLesson";

export default async function handler(req, res) {
  const {
    subject,
    topic,
    grade,
    board = "CBSE",
    periodMinutes = 40,
    language = "English",
  } = req.query;

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
    const lesson = await buildLessonWithAI({
      board,
      classLevel: gradeLabel,
      subject,
      topic,
      periodMinutes: Number(periodMinutes) || 40,
      language,
    });

    const buffer = await generatePptBuffer(lesson);
    const base64 = buffer.toString("base64");
    const safeTopic = topic.replace(/[^\w]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "") || "presentation";

    res.status(200).json({
      base64,
      grade: gradeNumber,
      lessonMeta: lesson.meta,
      filename: `${safeTopic}_Grade${gradeNumber}_${board}.pptx`,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message || "Unable to generate presentation" });
  }
}
