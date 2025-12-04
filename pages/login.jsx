import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const statusCopy = {
  idle: "Enter the email you use with Teachwise AI and we'll email you a one-time sign-in link.",
  sending: "Sending magic link…",
  sent: "Magic link sent! Check your inbox to finish signing in.",
  error: "Something went wrong while sending the link.",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setRedirectUrl(`${window.location.origin}/auth/callback`);
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim()) && status !== "sending";
  }, [email, status]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!supabase || !isSupabaseConfigured) {
      setErrorMessage("Supabase credentials are missing. Update your .env.local file and restart the dev server.");
      setStatus("error");
      return;
    }

    if (!redirectUrl) {
      setErrorMessage("Still preparing the redirect URL. Please try again in a moment.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Unable to send magic link.");
      setStatus("error");
      return;
    }

    setStatus("sent");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1120",
        color: "#e2e8f0",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 24px 48px rgba(15, 23, 42, 0.55)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ color: "#38bdf8", fontWeight: 600, letterSpacing: "0.12em" }}>
            TEACHWISE AI
          </span>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>Sign in</h1>
        </header>

        <p style={{ margin: "0 0 12px 0", color: "#cbd5f5", fontSize: "1rem", lineHeight: 1.6 }}>
          Teachwise AI is a Gen AI Powered App for helping the teachers across the globe to generate presentations, MCQs, Lesson Plans, Web Pages, PDFs and much more.
        </p>

        <p style={{ margin: 0, lineHeight: 1.6, fontSize: "0.95rem", color: "#cbd5f5" }}>
          {statusCopy[status]}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #1f2937",
                background: "#0f172a",
                color: "#e2e8f0",
                fontSize: "0.95rem",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              padding: "12px 18px",
              borderRadius: "9999px",
              border: "none",
              background: canSubmit ? "#38bdf8" : "#1e293b",
              color: canSubmit ? "#0b1120" : "#475569",
              fontWeight: 600,
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {status === "sending" ? "Sending…" : "Email me a magic link"}
          </button>
        </form>

        {status === "sent" ? (
          <div style={{
            background: "rgba(56, 189, 248, 0.12)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            borderRadius: "12px",
            padding: "12px 16px",
            color: "#bae6fd",
            fontSize: "0.9rem",
          }}>
            We've sent an email to <strong>{email.trim()}</strong>. Open it and click the button to finish signing in.
          </div>
        ) : null}

        {status === "error" && errorMessage ? (
          <div
            style={{
              background: "rgba(248, 113, 113, 0.12)",
              border: "1px solid rgba(248, 113, 113, 0.35)",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#fecaca",
              fontSize: "0.9rem",
            }}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}
