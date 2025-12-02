import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import {
  detectGuestMode,
  subscribeToAuthChanges,
  AUTH_SESSION_STORAGE_KEY,
  broadcastAuthChange,
  clearActiveSession,
} from "../lib/guestUsage";

const getPalette = (appearance = {}) => {
  const isDark = Boolean(appearance.isDark);
  const text = appearance.text ?? (isDark ? "#e2e8f0" : "#0f172a");
  const accent = appearance.accent ?? (isDark ? "#38bdf8" : "#2563eb");
  const border = appearance.border ?? (isDark ? "#1f2937" : "#cbd5f5");
  const subduedText = appearance.subduedText ?? (isDark ? "#94a3b8" : "#64748b");
  const surface = appearance.surface ?? (isDark ? "rgba(15, 23, 42, 0.45)" : "#ffffff");
  const hoverSurface = appearance.hoverSurface ?? (isDark ? "rgba(148, 163, 184, 0.12)" : "#f8fafc");

  return { isDark, text, accent, border, subduedText, surface, hoverSurface };
};

function AuthControls({ appearance, containerStyle, showSignIn = true, showSignOut = true }) {
  const router = useRouter();
  const palette = getPalette(appearance);
  const [isGuest, setIsGuest] = useState(() => detectGuestMode());
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackTone, setFeedbackTone] = useState("info");

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((guestMode) => {
      setIsGuest(guestMode);
      if (!guestMode) {
        setFeedbackMessage("");
        setFeedbackTone("info");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    setFeedbackMessage("");
    setFeedbackTone("info");
    router.push("/login");
  };

  const handleSignOut = async () => {
    if (isSigningOut || isGuest) {
      return;
    }

    setIsSigningOut(true);
    setFeedbackMessage("");
    setFeedbackTone("info");

    try {
      if (supabase && isSupabaseConfigured) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      setFeedbackMessage(error.message ?? "Unable to sign out. Please try again.");
      setFeedbackTone("error");
      setIsSigningOut(false);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        clearActiveSession();
      }
    } catch (storageError) {
      // Ignore storage write errors.
    }

    broadcastAuthChange();
    setIsGuest(true);
    setFeedbackMessage("Signed out successfully.");
    setFeedbackTone("success");
    setIsSigningOut(false);
  };

  const signOutDisabled = isGuest || isSigningOut;

  const signInStyle = {
    padding: "8px 16px",
    borderRadius: "9999px",
    border: `1px solid ${palette.accent}`,
    background: palette.accent,
    color: palette.isDark ? "#0b1120" : "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  const signOutStyle = {
    padding: "8px 16px",
    borderRadius: "9999px",
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    fontWeight: 600,
    cursor: signOutDisabled ? "not-allowed" : "pointer",
    opacity: signOutDisabled ? 0.6 : 1,
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  const feedbackColor =
    feedbackTone === "success"
      ? "#34d399"
      : feedbackTone === "error"
      ? "#f87171"
      : palette.subduedText;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "6px",
        ...containerStyle,
      }}
    >
      {showSignIn || showSignOut ? (
        <div style={{ display: "flex", gap: "8px" }}>
          {showSignIn ? (
            <button type="button" onClick={handleSignIn} style={signInStyle}>
              Sign in
            </button>
          ) : null}
          {showSignOut ? (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signOutDisabled}
              style={signOutStyle}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          ) : null}
        </div>
      ) : null}
      {feedbackMessage ? (
        <span style={{ fontSize: "0.8rem", color: feedbackColor }}>{feedbackMessage}</span>
      ) : null}
    </div>
  );
}

export default AuthControls;
export { AuthControls };
