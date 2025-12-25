// Perplexity API integration for content generation
// Docs: https://docs.perplexity.ai/reference/get-completion

export async function queryPerplexity(prompt) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  const endpoint = "https://api.perplexity.ai/chat/completions";
  if (!apiKey) throw new Error("Perplexity API key is not configured");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: "You are a helpful educational assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 900,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Perplexity request failed");
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content;
}
