export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    subject,
    grade,
    topic,
    slideCount = 8,
    useImages
  } = req.body;

  const slides = [];

  for (let index = 0; index < slideCount; index++) {
    slides.push({
      title: `${topic} – Slide ${index + 1}`,
      content: `Explanation of ${topic} for Grade ${grade} (${subject}).`,
      image: useImages
        ? `https://via.placeholder.com/600x400?text=Slide+${index + 1}`
        : null
    });
  }

  res.status(200).json({ slides });
}
