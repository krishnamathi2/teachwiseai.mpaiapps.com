import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subject, grade, topic, slideCount = 6 } = req.body;

    // 1️⃣ Ask GPT for slide structure (CHEAP + FAST)
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a teacher creating concise classroom presentation slides."
        },
        {
          role: "user",
          content: `
Create ${slideCount} slides for:
Subject: ${subject}
Grade: ${grade}
Topic: ${topic}

Return JSON only in this format:
[
  {
    "title": "...",
    "content": "2–3 short bullet sentences",
    "image_prompt": "simple educational diagram description"
  }
]
`
        }
      ],
      temperature: 0.4
    });

    const slides = JSON.parse(textResponse.choices[0].message.content);

    // 2️⃣ Generate SVG slides with images
    const svgs = [];

    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];

      let imageUrl = "";

      // Generate image ONLY if prompt exists
      if (slide.image_prompt) {
        const img = await openai.images.generate({
          model: "gpt-image-1",
          prompt: slide.image_prompt,
          size: "512x512"
        });

        imageUrl = img.data[0].url;
      }

      svgs.push(generateSVG(slide, index, imageUrl));
    }

    res.status(200).json({ svgs });
  } catch (err) {
    console.error("OPENAI SVG ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

function generateSVG(slide, index, imageUrl) {
  return `
<svg width="960" height="540" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>

  <text x="50%" y="70" text-anchor="middle"
        font-size="36" fill="#ffffff"
        font-family="Arial, Helvetica, sans-serif">
    Slide ${index + 1}: ${escape(slide.title)}
  </text>

  <foreignObject x="80" y="120" width="800" height="140">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="color:#e5e7eb;font-size:20px;font-family:Arial">
      ${escape(slide.content)}
    </div>
  </foreignObject>

  ${
    imageUrl
      ? `<image href="${imageUrl}" x="300" y="280" width="360" height="200"/>`
      : ""
  }
</svg>
`;
}

function escape(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
