const resolveProvider = () => {
  const configured = process.env.PRESENTATION_PROVIDER;
  if (configured) {
    return configured.toLowerCase();
  }
  if (process.env.OPENAI_API_KEY) {
    return "openai";
  }
  return "ollama";
};

export async function requestModelContent(prompt, explicitProvider) {
  const provider = (explicitProvider || resolveProvider()).toLowerCase();

  switch (provider) {
    case "ollama":
      return queryOllama(prompt);
    case "huggingface":
      return queryHuggingFace(prompt);
    case "openai":
      return queryOpenAI(prompt);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

async function queryOllama(prompt) {
  const endpoint = process.env.OLLAMA_ENDPOINT || "http://localhost:11434/api/generate";
  const model = process.env.OLLAMA_MODEL || "llama3";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || "Ollama request failed");
  }

  const data = await response.json();
  return data?.response;
}

async function queryHuggingFace(prompt) {
  const url =
    process.env.HUGGINGFACE_MODEL_ENDPOINT ||
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
  const token = process.env.HUGGINGFACE_API_KEY;

  if (!token) {
    throw new Error("Hugging Face API key is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || "Hugging Face request failed");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data[0]?.generated_text;
  }

  return data?.generated_text || data?.data?.[0]?.generated_text;
}

async function queryOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: prompt,
      temperature: 0.7,
      max_output_tokens: 900,
    }),
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || "OpenAI request failed");
  }

  const data = await response.json();
  return data?.output?.[0]?.content?.[0]?.text || data?.output_text;
}

async function safeReadError(response) {
  try {
    const text = await response.text();
    return text?.slice(0, 300);
  } catch (error) {
    return null;
  }
}
