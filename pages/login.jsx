import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const statusCopy = {
  idle: "Sign in with your email. You will receive a magic link from Supabase Auth. (Sometimes it lands in spam folder)",
  sending: "Sending magic link…",
  sent: "Magic link sent! Check your inbox (and spam folder) to finish signing in.",
  error: "Something went wrong while sending the link.",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setRedirectUrl(`${window.location.origin}/auth/callback`);
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim()) && status !== "sending" && ageVerified;
  }, [email, status, ageVerified]);

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
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
          50% { transform: scale(1.1) translateY(-20px); opacity: 0.8; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 968px) {
          .login-container { 
            grid-template-columns: 1fr !important; 
          }
          .desktop-only { 
            display: none !important; 
          }
        }
      `}</style>
      
      <div
        className="login-container"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
      {/* Left side - Brand and features */}
      <div
        className="desktop-only"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
            borderRadius: "50%",
            filter: "blur(100px)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(249, 115, 22, 0.15))",
            borderRadius: "50%",
            filter: "blur(100px)",
            animation: "pulse 10s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ 
            fontSize: "3rem", 
            fontWeight: 900,
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
            position: "relative",
            animation: "slideInLeft 0.8s ease-out",
          }}>
            teachwise.ai
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite",
              WebkitBackgroundClip: "text",
              pointerEvents: "none",
            }} />
          </div>
          
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: 800, 
            margin: "0 0 24px 0",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            animation: "slideInLeft 0.8s ease-out 0.2s both",
          }}>
            A Gen AI Powered Global App for Teachers across the Globe
          </h1>
          
          <p style={{ 
            fontSize: "1.05rem", 
            color: "#94a3b8",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "520px",
            animation: "slideInLeft 0.8s ease-out 0.4s both",
          }}>
            <span
              style={{
                display: "inline-block",
                padding: "10px 18px",
                borderRadius: "999px",
                background: "rgba(148, 163, 184, 0.1)",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                color: "#e2e8f0",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Generate lesson plans, PDFs, MCQs, web pages, concept maps, and more.
            </span>
          </p>
          <p
            style={{
              marginTop: "24px",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textShadow: "0 8px 25px rgba(251, 191, 36, 0.35)",
            }}
          >
            Get started for free with 100 credits.
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px",
          position: "relative",
          zIndex: 1,
        }}>
          
        </div>
      </div>

      {/* Right side - Login form */}
      <div
        style={{
          background: "#ffffff",
          padding: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "300px",
            height: "300px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), transparent)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "250px",
            height: "250px",
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.05), transparent)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeIn 0.6s ease-out" }}>
          <h1 style={{ 
            fontSize: "2.25rem", 
            fontWeight: 900, 
            margin: 0, 
            background: "linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            Welcome to teachwise.ai
          </h1>
          <p style={{ 
            margin: 0, 
            color: "#3b82f6", 
            fontSize: "0.95rem", 
            lineHeight: 1.5,
            fontWeight: 700,
          }}>
            {statusCopy[status]}
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px",
          animation: "fadeIn 0.6s ease-out 0.2s both",
        }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ 
              fontSize: "0.875rem", 
              fontWeight: 600, 
              color: "#0f172a",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              Email Address
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              style={{
                padding: "18px 20px",
                borderRadius: "14px",
                border: "2px solid #e2e8f0",
                background: "#f8fafc",
                color: "#0f172a",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                fontWeight: 500,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366f1";
                e.target.style.background = "#ffffff";
                e.target.style.boxShadow = "0 0 0 4px rgba(99, 102, 241, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.background = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
            />
          </label>

          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "16px",
            background: ageVerified ? "rgba(34, 197, 94, 0.05)" : "rgba(99, 102, 241, 0.05)",
            borderRadius: "12px",
            border: `2px solid ${ageVerified ? "rgba(34, 197, 94, 0.2)" : "rgba(99, 102, 241, 0.2)"}`,
            animation: "fadeIn 0.5s ease-out",
          }}>
            <input
              type="checkbox"
              id="age-verify"
              checked={ageVerified}
              onChange={(e) => setAgeVerified(e.target.checked)}
              aria-label="Age verification checkbox"
              aria-required="true"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: "#6366f1",
                marginTop: "2px",
              }}
            />
            <label
              htmlFor="age-verify"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.5,
                color: "#475569",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              I confirm that I am at least <strong>13 years old</strong> and agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#6366f1",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
                aria-label="View Terms of Service (opens in new tab)"
              >
                Terms of Service
              </a>
              {" "}and{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#6366f1",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
                aria-label="View Privacy Policy (opens in new tab)"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            aria-label="Sign in with magic link"
            style={{
              padding: "18px 28px",
              borderRadius: "14px",
              border: "none",
              background: canSubmit 
                ? "linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #a855f7 100%)" 
                : "#e2e8f0",
              backgroundSize: "200% 200%",
              color: canSubmit ? "#ffffff" : "#94a3b8",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: canSubmit 
                ? "0 10px 30px rgba(99, 102, 241, 0.35), 0 1px 2px rgba(0, 0, 0, 0.05)" 
                : "none",
              transform: "translateY(0)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (canSubmit) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 16px 40px rgba(99, 102, 241, 0.45), 0 2px 4px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (canSubmit) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.35), 0 1px 2px rgba(0, 0, 0, 0.05)";
              }
            }}
          >
            {status === "sending" ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>
                Sending magic link...
              </span>
            ) : (
              "Please look for an email from Supabase Auth"
            )}
          </button>
        </form>

        {status === "sent" ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.08))",
            border: "2px solid rgba(34, 197, 94, 0.25)",
            borderRadius: "16px",
            padding: "20px 24px",
            color: "#065f46",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            animation: "slideIn 0.3s ease-out",
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              marginBottom: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(34, 197, 94, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}>
                ✓
              </div>
              <strong style={{ fontSize: "0.95rem" }}>Check your inbox!</strong>
            </div>
            We&rsquo;ve sent a magic link to <strong>{email.trim()}</strong>. Click the link to sign in instantly.
          </div>
        ) : null}

        {status === "error" && errorMessage ? (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08))",
              border: "2px solid rgba(239, 68, 68, 0.25)",
              borderRadius: "16px",
              padding: "20px 24px",
              color: "#991b1b",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              marginBottom: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}>
                ⚠
              </div>
              <strong style={{ fontSize: "0.95rem" }}>Error</strong>
            </div>
            {errorMessage}
          </div>
        ) : null}

        <div style={{
          paddingTop: "24px",
          marginTop: "12px",
          borderTop: "2px solid transparent",
          backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #6366f1, #a855f7)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          animation: "fadeIn 0.6s ease-out 0.4s both",
        }}>
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            color: "#64748b",
            fontSize: "0.875rem",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: 600, color: "#475569" }}>Trusted by educators worldwide</span>
              <span style={{ fontSize: "0.8rem" }}>🌟 Join 10,000+ teachers using AI</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              For Support - <a href="mailto:support@teachwiseai.mpaiapps.com" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }} aria-label="Contact support via email">support@teachwiseai.mpaiapps.com</a>
            </div>
          </div>
        </div>

        <footer style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "2px solid transparent",
          backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #e2e8f0, #cbd5e1)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.875rem",
          animation: "fadeIn 0.6s ease-out 0.6s both",
        }}>
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6366f1"}
            onMouseLeave={(e) => e.target.style.color = "#64748b"}
            aria-label="View Privacy Policy"
          >
            Privacy Policy
          </a>
          <span style={{ color: "#cbd5e1" }}>•</span>
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6366f1"}
            onMouseLeave={(e) => e.target.style.color = "#64748b"}
            aria-label="View Terms of Service"
          >
            Terms of Service
          </a>
          <span style={{ color: "#cbd5e1" }}>•</span>
          <span style={{ color: "#94a3b8" }}>© 2025 TeachWise.AI</span>
        </footer>
      </div>
      </div>
    </div>
    </>
  );
}
