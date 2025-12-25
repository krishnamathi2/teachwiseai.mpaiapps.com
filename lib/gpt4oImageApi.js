import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSlideImageGPT4o({
  subject,
  topic,
  slideTitle,
  slideType,
  index,
}) {
  const prompt = `
Create a clean CBSE classroom diagram.

Subject: ${subject}
Topic: ${topic}
Slide title: ${slideTitle}
Slide type: ${slideType}

Rules:
- Educational diagram only
- Flat vector style
- Clear labels
- No decorative background
- No watermark
`;

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  return result.data[0].b64_json;
}
