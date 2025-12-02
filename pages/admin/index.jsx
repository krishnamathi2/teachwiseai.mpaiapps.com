import { useEffect, useMemo, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import {
  AUTH_SESSION_STORAGE_KEY,
  AUTH_STATE_EVENT,
  broadcastAuthChange,
  clearActiveSession,
} from "../../lib/guestUsage";

const ADMIN_SESSION_KEY = "teachwiseai:adminSession";
const ADMIN_USERS_STORAGE_KEY = "teachwiseai:adminUsers";
const GENERAL_USERS_STORAGE_KEY = "teachwiseai:generalUsers";

const DEFAULT_INITIAL_CREDITS = 100;
const defaultAdminProfile = { email: "", credits: null };

const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().toLowerCase();
};

const parseCreditsValue = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  return null;
};

const sanitizeEmailValue = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const parseStoredGeneralUsers = (rawValue) => {
  if (!Array.isArray(rawValue)) {
    return [];
  }

  const normalizedEntries = rawValue
    .map((entry) => {
      if (typeof entry === "string") {
        const email = sanitizeEmailValue(entry);
        if (!email) {
          return null;
        }
        return { email, credits: 0 };
      }

      if (entry && typeof entry === "object") {
        const email = sanitizeEmailValue(entry.email);
        if (!email) {
          return null;
        }

        const credits = parseCreditsValue(entry.credits);
        return { email, credits: credits ?? 0 };
      }

      return null;
    })
    .filter(Boolean);

  const aggregated = new Map();

  normalizedEntries.forEach(({ email, credits }) => {
    const key = normalizeString(email);
    if (!key) {
      return;
    }

    const existing = aggregated.get(key);
    const safeCredits = parseCreditsValue(credits) ?? 0;

    if (existing) {
      aggregated.set(key, {
        email: existing.email || email,
        credits: (parseCreditsValue(existing.credits) ?? 0) + safeCredits,
      });
    } else {
      aggregated.set(key, { email, credits: safeCredits });
    }
  });

  return Array.from(aggregated.values());
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [magicLinkMessage, setMagicLinkMessage] = useState("");
  const [magicLinkTone, setMagicLinkTone] = useState("info");
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [generalUsers, setGeneralUsers] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newGeneralEmail, setNewGeneralEmail] = useState("");
  const [newGeneralCredits, setNewGeneralCredits] = useState("");
  const [adminUsersMessage, setAdminUsersMessage] = useState("");
  const [adminUsersMessageTone, setAdminUsersMessageTone] = useState("info");
  const [generalUsersMessage, setGeneralUsersMessage] = useState("");
  const [generalUsersMessageTone, setGeneralUsersMessageTone] = useState("info");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [adminProfile, setAdminProfile] = useState(defaultAdminProfile);

  const addGeneralInputRef = useRef(null);

  const adminEmail = useMemo(() => {
    const envEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (envEmail) {
      return normalizeString(envEmail);
    }

    return normalizeString("support@teachwiseai.mpaiapps.com");
  }, []);
  const knownAdminEmails = useMemo(() => {
    const base = adminEmail ? [adminEmail] : [];
    const persisted = adminUsers
      .map((value) => normalizeString(value))
      .filter((value) => Boolean(value) && value !== adminEmail);
    return Array.from(new Set([...base, ...persisted]));
  }, [adminEmail, adminUsers]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw);
      if (parsed && parsed.signedIn && typeof parsed.email === "string") {
        setIsSignedIn(true);
      }
    } catch (storageError) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(ADMIN_USERS_STORAGE_KEY);
      if (!raw) {
        setAdminUsers([]);
        return;
      }

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setAdminUsers(parsed);
      } else {
        setAdminUsers([]);
      }
    } catch (error) {
      setAdminUsers([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(GENERAL_USERS_STORAGE_KEY);
      if (!raw) {
        setGeneralUsers([]);
        return;
      }

      const parsed = JSON.parse(raw);
      setGeneralUsers(parseStoredGeneralUsers(parsed));
    } catch (error) {
      setGeneralUsers([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const evaluateAdminSession = () => {
      try {
        const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
        if (!raw) {
          setIsSignedIn(false);
          window.localStorage.removeItem(ADMIN_SESSION_KEY);
          setAdminProfile(defaultAdminProfile);
          return;
        }

        const parsed = JSON.parse(raw);
        const sessionEmail = normalizeString(parsed?.user?.email ?? "");

        if (sessionEmail && knownAdminEmails.includes(sessionEmail)) {
          setIsSignedIn(true);
          window.localStorage.setItem(
            ADMIN_SESSION_KEY,
            JSON.stringify({ email: sessionEmail, signedIn: true, signedInAt: Date.now() }),
          );
          const parsedCredits = parseCreditsValue(parsed?.user?.credits);
          const effectiveCredits =
            parsedCredits !== null && parsedCredits !== undefined && parsedCredits > 0
              ? parsedCredits
              : DEFAULT_INITIAL_CREDITS;

          setAdminProfile({
            email: parsed?.user?.email ?? "",
            credits: effectiveCredits,
          });

          try {
            const updatedPayload = {
              ...parsed,
              user: {
                ...parsed?.user,
                credits: effectiveCredits,
              },
            };
            window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(updatedPayload));
          } catch (storageError) {
            // Ignore storage sync issues.
          }
        } else {
          setIsSignedIn(false);
          window.localStorage.removeItem(ADMIN_SESSION_KEY);
          setAdminProfile(defaultAdminProfile);
        }
      } catch (error) {
        setIsSignedIn(false);
        window.localStorage.removeItem(ADMIN_SESSION_KEY);
        setAdminProfile(defaultAdminProfile);
      }
    };

    evaluateAdminSession();

    const handleStorage = (event) => {
      if (event.key === AUTH_SESSION_STORAGE_KEY) {
        evaluateAdminSession();
      }
    };

    const handleInternalEvent = () => {
      evaluateAdminSession();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AUTH_STATE_EVENT, handleInternalEvent);

    let subscription = null;
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(() => {
        evaluateAdminSession();
      });
      subscription = data?.subscription ?? null;
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(AUTH_STATE_EVENT, handleInternalEvent);
      subscription?.unsubscribe?.();
    };
  }, [knownAdminEmails, supabase]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMagicLinkMessage("");
    setMagicLinkTone("info");

    const normalizedInputEmail = normalizeString(email);

    if (!normalizedInputEmail) {
      setMagicLinkMessage("Enter the admin email to receive a magic link.");
      setMagicLinkTone("error");
      return;
    }

    if (!knownAdminEmails.includes(normalizedInputEmail)) {
      setMagicLinkMessage("This email is not authorized for admin access.");
      setMagicLinkTone("error");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setMagicLinkMessage(
        "Supabase authentication is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to use magic links.",
      );
      setMagicLinkTone("error");
      return;
    }

    setIsSendingMagicLink(true);

    try {
      const emailRedirectTo = typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedInputEmail,
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        setMagicLinkMessage(error.message || "Unable to send magic link. Please try again.");
        setMagicLinkTone("error");
        return;
      }

      setMagicLinkMessage("Magic sign-in link sent. Check your inbox to continue.");
      setMagicLinkTone("success");
      setEmail("");
    } catch (sendError) {
      setMagicLinkMessage("An unexpected error occurred while sending the magic link.");
      setMagicLinkTone("error");
    } finally {
      setIsSendingMagicLink(false);
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (signOutError) {
        // eslint-disable-next-line no-console
        console.warn("Failed to sign out via Supabase", signOutError);
      }
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      clearActiveSession();
    }

    setIsSignedIn(false);
    setEmail("");
    setMagicLinkMessage("");
    setMagicLinkTone("info");
    setNewAdminEmail("");
    setNewGeneralEmail("");
    setNewGeneralCredits("");
    setAdminUsersMessage("");
    setAdminUsersMessageTone("info");
    setGeneralUsersMessage("");
    setGeneralUsersMessageTone("info");
    setAdminProfile(defaultAdminProfile);
  };

  const handleAddAdminUser = () => {
    setAdminUsersMessage("");
    setAdminUsersMessageTone("info");

    const normalized = normalizeString(newAdminEmail);
    if (!normalized) {
      setAdminUsersMessage("Enter a valid email before adding an admin user.");
      setAdminUsersMessageTone("error");
      return;
    }

    if (!normalized.includes("@")) {
      setAdminUsersMessage("The email must include an @ symbol.");
      setAdminUsersMessageTone("error");
      return;
    }

    if (adminUsers.some((value) => normalizeString(value) === normalized)) {
      setAdminUsersMessage("This email already has admin privileges.");
      setAdminUsersMessageTone("warning");
      return;
    }

    const updated = [...adminUsers, normalized];
    setAdminUsers(updated);
    setNewAdminEmail("");
    setAdminUsersMessage("Admin privileges granted successfully.");
    setAdminUsersMessageTone("success");

    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleAddCredits = () => {
    setGeneralUsersMessage("");
    setGeneralUsersMessageTone("info");

    const trimmedEmail = sanitizeEmailValue(newGeneralEmail);
    const normalizedEmail = normalizeString(trimmedEmail);

    if (!trimmedEmail || !normalizedEmail) {
      setGeneralUsersMessage("Enter a valid email before adding credits.");
      setGeneralUsersMessageTone("error");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setGeneralUsersMessage("The email must include an @ symbol.");
      setGeneralUsersMessageTone("error");
      return;
    }

    const parsedCredits = parseCreditsValue(newGeneralCredits);
    if (parsedCredits === null || parsedCredits <= 0) {
      setGeneralUsersMessage("Enter a credit amount greater than zero.");
      setGeneralUsersMessageTone("error");
      return;
    }

    const creditsLabel = Number.isInteger(parsedCredits)
      ? parsedCredits.toString()
      : parsedCredits.toFixed(2);

    const existingIndex = generalUsers.findIndex(
      (entry) => normalizeString(entry.email) === normalizedEmail,
    );

    let updatedUsers = [];
    let confirmationMessage = "";

    if (existingIndex >= 0) {
      const updatedEntry = {
        email: generalUsers[existingIndex].email || trimmedEmail,
        credits: (parseCreditsValue(generalUsers[existingIndex].credits) ?? 0) + parsedCredits,
      };

      updatedUsers = [...generalUsers];
      updatedUsers[existingIndex] = updatedEntry;
      const newTotalLabel = Number.isInteger(updatedEntry.credits)
        ? updatedEntry.credits.toString()
        : updatedEntry.credits.toFixed(2);
      confirmationMessage = `Added ${creditsLabel} credits to ${updatedEntry.email}. New balance: ${newTotalLabel} credits.`;
    } else {
      const newEntry = {
        email: trimmedEmail,
        credits: parsedCredits,
      };
      updatedUsers = [...generalUsers, newEntry];
      confirmationMessage = `Created ${trimmedEmail} with ${creditsLabel} credits.`;
    }

    setGeneralUsers(updatedUsers);
    setNewGeneralEmail("");
    setNewGeneralCredits("");
    setGeneralUsersMessage(confirmationMessage);
    setGeneralUsersMessageTone("success");

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(GENERAL_USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      } catch (storageError) {
        // Ignore storage errors when persisting general users.
      }

      try {
        const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
        if (rawSession) {
          const parsedSession = JSON.parse(rawSession);
          const sessionEmail = normalizeString(parsedSession?.user?.email ?? "");

          if (sessionEmail && sessionEmail === normalizedEmail) {
            const currentCredits = parseCreditsValue(parsedSession?.user?.credits) ?? 0;
            const nextCredits = currentCredits + parsedCredits;

            const updatedSession = {
              ...parsedSession,
              user: {
                ...parsedSession.user,
                credits: nextCredits,
                creditBalance: nextCredits,
              },
            };

            window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(updatedSession));
            broadcastAuthChange();
            setAdminProfile((prev) => ({
              email: updatedSession?.user?.email ?? prev.email,
              credits: nextCredits,
            }));
          }
        }
      } catch (sessionError) {
        // Ignore malformed session payloads.
      }
    }
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
          borderRadius: "16px",
          border: "1px solid #1f2937",
          padding: "28px",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.55)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ color: "#38bdf8", fontWeight: 600, letterSpacing: "0.12em" }}>TEACHWISE AI</span>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>
            {isSignedIn ? "Admin panel" : "Admin sign in"}
          </h1>
        </header>

        {!isSignedIn ? (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <p style={{ margin: 0, lineHeight: 1.6, color: "#cbd5f5", fontSize: "0.95rem" }}>
              Enter your admin email to receive a one-time magic sign-in link.
            </p>

            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Admin email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
                autoComplete="off"
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #1f2937",
                  background: "#0b1120",
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                }}
              />
            </label>
            {magicLinkMessage ? (
              <span
                style={{
                  color:
                    magicLinkTone === "success"
                      ? "#34d399"
                      : magicLinkTone === "error"
                      ? "#f87171"
                      : "#cbd5f5",
                  fontSize: "0.85rem",
                }}
              >
                {magicLinkMessage}
              </span>
            ) : null}

            <button
              type="submit"
              disabled={isSendingMagicLink}
              style={{
                padding: "12px 18px",
                borderRadius: "9999px",
                border: "none",
                background: isSendingMagicLink ? "#0ea5e9" : "#38bdf8",
                color: "#0b1120",
                fontWeight: 600,
                cursor: isSendingMagicLink ? "not-allowed" : "pointer",
              }}
            >
              {isSendingMagicLink ? "Sending link..." : "Send magic link"}
            </button>

            <span
              style={{
                fontSize: "0.8rem",
                color: "#94a3b8",
                lineHeight: 1.4,
              }}
            >
              {isSupabaseConfigured
                ? "We will email you a secure link. The link expires shortly after it is issued."
                : "Magic link sign-in requires Supabase credentials in .env.local."}
            </span>
          </form>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <section style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 600 }}>Dashboard</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.95rem" }}>
                <span style={{ color: "#cbd5f5" }}>
                  Signed in as: <strong style={{ color: "#f8fafc" }}>{adminProfile.email || "Unknown"}</strong>
                </span>
                <span style={{ color: "#cbd5f5" }}>
                  Credit balance: <strong style={{ color: "#f8fafc" }}>{
                    typeof adminProfile.credits === "number" && Number.isFinite(adminProfile.credits)
                      ? `${adminProfile.credits} credits`
                      : "Not available"
                  }</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (addGeneralInputRef.current) {
                    addGeneralInputRef.current.focus();
                    addGeneralInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                style={{
                  alignSelf: "flex-start",
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  border: "none",
                  background: "#38bdf8",
                  color: "#0b1120",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Add credits
              </button>
            </section>

            <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 600 }}>Welcome to Admin Panel</h2>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              Add your management tools and insights here.
            </p>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Add Credits</h3>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>User email</span>
              <input
                type="email"
                placeholder="Enter user email"
                value={newGeneralEmail}
                onChange={(event) => setNewGeneralEmail(event.target.value)}
                ref={addGeneralInputRef}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #1f2937",
                  background: "#0b1120",
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Credits to add</span>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter credits"
                value={newGeneralCredits}
                onChange={(event) => setNewGeneralCredits(event.target.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #1f2937",
                  background: "#0b1120",
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                }}
              />
            </label>
            <button
              type="button"
              onClick={handleAddCredits}
              style={{
                alignSelf: "flex-start",
                padding: "10px 18px",
                borderRadius: "9999px",
                border: "none",
                background: "#22d3ee",
                color: "#0b1120",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add credits
            </button>
            {generalUsersMessage ? (
              <span
                style={{
                  fontSize: "0.9rem",
                  color:
                    generalUsersMessageTone === "success"
                      ? "#34d399"
                      : generalUsersMessageTone === "warning"
                      ? "#facc15"
                      : generalUsersMessageTone === "error"
                      ? "#f87171"
                      : "#cbd5f5",
                }}
              >
                {generalUsersMessage}
              </span>
            ) : null}

            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Add Admin Users</h3>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Admin email</span>
              <input
                type="email"
                placeholder="Enter admin email"
                value={newAdminEmail}
                onChange={(event) => setNewAdminEmail(event.target.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #1f2937",
                  background: "#0b1120",
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                }}
              />
            </label>
            <button
              type="button"
              onClick={handleAddAdminUser}
              style={{
                alignSelf: "flex-start",
                padding: "10px 18px",
                borderRadius: "9999px",
                border: "none",
                background: "#38bdf8",
                color: "#0b1120",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Grant admin access
            </button>
            {adminUsersMessage ? (
              <span
                style={{
                  fontSize: "0.9rem",
                  color:
                    adminUsersMessageTone === "success"
                      ? "#34d399"
                      : adminUsersMessageTone === "warning"
                      ? "#facc15"
                      : adminUsersMessageTone === "error"
                      ? "#f87171"
                      : "#cbd5f5",
                }}
              >
                {adminUsersMessage}
              </span>
            ) : null}
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                alignSelf: "flex-start",
                padding: "10px 18px",
                borderRadius: "9999px",
                border: "1px solid #1f2937",
                background: "transparent",
                color: "#e2e8f0",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
