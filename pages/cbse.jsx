import { useState } from "react";

export default function CBSE() {
  const [subject, setSubject] = useState("Chemistry");
  const [grade, setGrade] = useState("12");
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(8);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePresentation() {
    setLoading(true);
    setError("");
    setSlides([]);

    try {
      const res = await fetch("/api/presentation-svg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          slideCount
        })
      });

      if (!res.ok) {
        throw new Error("API failed");
      }

      const data = await res.json();

      // ✅ SAFE: index is explicitly defined
      const preparedSlides = (data.svgs || []).map((svg, index) => ({
        index,
        svg
      }));

      setSlides(preparedSlides);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>CBSE Presentation Generator</h1>

      <label>
        Subject:
        <select value={subject} onChange={e => setSubject(e.target.value)}>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Biology</option>
        </select>
      </label>
      <br />

      <label>
        Grade:
        <select value={grade} onChange={e => setGrade(e.target.value)}>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
      </label>
      <br />

      <label>
        Topic:
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
      </label>
      <br />

      <label>
        Slide Count:
        <input
          type="number"
          value={slideCount}
          onChange={e => setSlideCount(Number(e.target.value))}
        />
      </label>
      <br /><br />

      <button onClick={generatePresentation} disabled={loading}>
        {loading ? "Generating…" : "Generate Presentation"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      {slides.map(({ svg }, index) => (
        <div key={index} style={{ marginBottom: 24 }}>
          <h3>Slide {index + 1}</h3>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      ))}
    </div>
  );
}
