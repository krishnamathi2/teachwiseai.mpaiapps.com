import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CONSENT_STORAGE_KEY = "teachwiseai:cookieConsent";
const CONSENT_VERSION = "1.0";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Show banner after a short delay for better UX
        setTimeout(() => setShowBanner(true), 1000);
        return;
      }

      const parsed = JSON.parse(stored);
      // Show banner again if consent version changed
      if (parsed.version !== CONSENT_VERSION) {
        setShowBanner(true);
      }
    } catch (error) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          accepted: true,
          version: CONSENT_VERSION,
          timestamp: new Date().toISOString(),
        })
      );
      setShowBanner(false);
    } catch (error) {
      console.error("Failed to save consent", error);
    }
  };

  const handleDecline = () => {
    if (typeof window === "undefined") return;

    try {
      // Clear all localStorage data except consent decision
      const keys = Object.keys(window.localStorage);
      keys.forEach((key) => {
        if (key !== CONSENT_STORAGE_KEY) {
          window.localStorage.removeItem(key);
        }
      });

      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          accepted: false,
          version: CONSENT_VERSION,
          timestamp: new Date().toISOString(),
        })
      );
      setShowBanner(false);

      // Inform user about limited functionality
      alert(
        "You've declined data storage. Some features may not work properly. " +
        "You can change this decision anytime in your browser settings."
      );
    } catch (error) {
      console.error("Failed to save consent", error);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .cookie-banner {
          animation: slideUp 0.4s ease-out;
        }

        .cookie-banner button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .cookie-banner button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .cookie-banner {
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            max-width: 100% !important;
            border-radius: 16px 16px 0 0 !important;
            margin: 0 !important;
          }

          .cookie-content {
            flex-direction: column !important;
            gap: 16px !important;
          }

          .cookie-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }

          .cookie-buttons button {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="cookie-banner"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent banner"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "900px",
          width: "calc(100% - 40px)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "2px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          zIndex: 999999,
        }}
      >
        <div
          className="cookie-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🍪</span>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>
                We Value Your Privacy
              </h3>
            </div>
            <p style={{ 
              margin: 0, 
              lineHeight: 1.6, 
              color: "#475569",
              fontSize: "0.95rem",
            }}>
              We use browser storage (similar to cookies) to remember your preferences, maintain your login session, 
              and track usage credits. This helps us provide you with a personalized experience. 
              By clicking &ldquo;Accept&rdquo;, you consent to our use of browser storage as described in our{" "}
              <button
                onClick={() => router.push("/privacy")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6366f1",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                  font: "inherit",
                  fontWeight: 600,
                }}
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>

          <div
            className="cookie-buttons"
            style={{
              display: "flex",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleDecline}
              style={{
                padding: "12px 24px",
                background: "white",
                color: "#64748b",
                border: "2px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              aria-label="Decline cookie consent"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              aria-label="Accept cookie consent"
            >
              Accept All
            </button>
          </div>
        </div>

        <div style={{ 
          marginTop: "16px", 
          paddingTop: "16px", 
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          fontSize: "0.875rem",
        }}>
          <button
            onClick={() => router.push("/privacy")}
            style={{
              background: "none",
              border: "none",
              color: "#6366f1",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              fontWeight: 600,
            }}
            aria-label="View Privacy Policy"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => router.push("/terms")}
            style={{
              background: "none",
              border: "none",
              color: "#6366f1",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              fontWeight: 600,
            }}
            aria-label="View Terms of Service"
          >
            Terms of Service
          </button>
          <span style={{ color: "#94a3b8" }}>|</span>
          <span style={{ color: "#64748b" }}>
            We do not sell your personal information
          </span>
        </div>
      </div>
    </>
  );
}
