import { useState } from "react";

export default function CbseDashboard() {
  const [subject, setSubject] = useState("Chemistry");
  const [topic, setTopic] = useState("werners theory");
  const [grade, setGrade] = useState("12");
  const [slideCount, setSlideCount] = useState(8);
  const [imageCount, setImageCount] = useState(8);
  const [useGPTI, setUseGPTI] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generatePresentation() {
    setLoading(true);
    setError(null);

    const config = {
      subject,
      topic,
      grade,
      slideCount,
      imageCount,
      useGPTI, // ✅ THIS IS THE KEY FLAG
    };

    try {
      const res = await fetch("/api/presentation-svg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate presentation");
      }

      // Download PPT
      const link = document.createElement("a");
      link.href = `data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,${data.base64}`;
      link.download = data.filename || "presentation.pptx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>CBSE Presentation Generator</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Subject: </label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Biology</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Grade: </label>
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Topic: </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Slide Count: </label>
        <input
          type="number"
          value={slideCount}
          min={1}
          max={20}
          onChange={(e) => setSlideCount(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Images Count: </label>
        <input
          type="number"
          value={imageCount}
          min={0}
          max={slideCount}
          onChange={(e) => setImageCount(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={useGPTI}
            onChange={(e) => setUseGPTI(e.target.checked)}
          />{" "}
          Generate presentations with GPTI (OpenAI Images)
        </label>
      </div>

      <button onClick={generatePresentation} disabled={loading}>
        {loading ? "Generating..." : "Generate High-Res Deck"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}
