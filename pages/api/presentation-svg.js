export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      subject,
      grade,
      topic,
      slideCount = 8
    } = req.body;

    const slides = [];

    for (let i = 0; i < slideCount; i++) {
      slides.push({
        title: `${topic} – Slide ${i + 1}`,
        content: `Explanation of ${topic} for Grade ${grade} (${subject}).`
      });
    }

    // ✅ SVG generation (index SAFE)
    const svgs = slides.map((slide, index) => {
      return generateSVG(slide, index);
    });

    res.status(200).json({ svgs });
  } catch (err) {
    console.error("presentation-svg error:", err);
    res.status(500).json({ error: err.message });
  }
}

function generateSVG(slide, index) {
  return `
<svg width="960" height="540" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <text x="50%" y="80" text-anchor="middle"
        font-size="36" fill="#ffffff"
        font-family="Arial, Helvetica, sans-serif">
    Slide ${index + 1}: ${escape(slide.title)}
  </text>
  <text x="50%" y="160" text-anchor="middle"
        font-size="22" fill="#e5e7eb"
        font-family="Arial, Helvetica, sans-serif">
    ${escape(slide.content)}
  </text>
</svg>
`;
}

function escape(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
