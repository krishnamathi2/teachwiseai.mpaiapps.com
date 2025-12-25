import React, { useState } from "react";

export default function SampleDocuments() {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent("TeachwiseAI Feedback");
    const body = encodeURIComponent(feedback);
    window.location.href = `mailto:support@teachwiseai.mpaiapps.com?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 24 }}>
        VIEW THE SAMPLE DOCUMENTS GENERATED
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: 32 }}>
        PLEASE CLICK ON THE FEEDBACK FORM BELOW FOR FEEDBACK - WE VALUE YOUR FEEDBACK
      </p>
      <button
        style={{
          padding: "10px 22px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
          marginBottom: 24,
        }}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Hide Feedback Form" : "Open Feedback Form"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            rows={5}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: "1rem", marginBottom: 12 }}
            required
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              background: "#059669",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </button>
        </form>
      )}
      {submitted && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 20, color: "#166534" }}>
          <h3>Thank you for your feedback!</h3>
          <div style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{feedback}</div>
        </div>
      )}
    </div>
  );
}
