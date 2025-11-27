import fs from "fs";
import path from "path";
import { SUBJECT_FILES } from "../../lib/contentMap";

export default function handler(req, res) {
  const { subject, type } = req.query;

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!subject || !type) {
    res.status(400).json({ message: "Subject and type are required" });
    return;
  }

  const subjectKey = subject.toLowerCase();
  const typeKey = type.toLowerCase();

  const subjectEntry = SUBJECT_FILES[subjectKey];
  const fileName = subjectEntry?.[typeKey];

  if (!fileName) {
    res.status(404).json({ message: "Content not found" });
    return;
  }

  try {
    const candidates = [
      path.join(process.cwd(), "public", fileName),
      path.join(process.cwd(), fileName),
    ];

    // Vercel bundles static assets under public/, fallback keeps local dev working.
    const filePath = candidates.find((candidate) => fs.existsSync(candidate));

    if (!filePath) {
      res.status(404).json({ message: "Content file missing" });
      return;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString("base64");

    res.status(200).json({ base64 });
  } catch (error) {
    res.status(500).json({ message: "Unable to load requested content" });
  }
}
