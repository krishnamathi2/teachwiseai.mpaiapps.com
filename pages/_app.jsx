import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import {
  AUTH_SESSION_STORAGE_KEY,
  ACTIVE_SESSION_STORAGE_KEY,
  broadcastAuthChange,
  clearActiveSession,
  markActiveSession,
} from "../lib/guestUsage";

const GENERAL_USERS_STORAGE_KEY = "teachwiseai:generalUsers";

const INITIAL_SIGN_IN_CREDITS = 100;

const normalizeEmailValue = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().toLowerCase();
};

const readGeneralUsers = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(GENERAL_USERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const writeGeneralUsers = (entries) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(GENERAL_USERS_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Unable to persist general user credits", error);
  }
};

const getGeneralUserCredits = (email) => {
  const normalizedEmail = normalizeEmailValue(email);
  if (!normalizedEmail) {
    return null;
  }

  const entries = readGeneralUsers();
  const matched = entries.find((entry) => normalizeEmailValue(entry?.email) === normalizedEmail);
  if (!matched) {
    return null;
  }

  return normalizeCreditsValue(matched?.credits);
};

const upsertGeneralUserCredits = (email, credits) => {
  const normalizedEmail = normalizeEmailValue(email);
  if (!normalizedEmail) {
    return;
  }

  const sanitizedCredits = normalizeCreditsValue(credits);
  const nextCredits = sanitizedCredits ?? 0;
  const entries = readGeneralUsers();
  let updated = false;

  const nextEntries = entries.map((entry) => {
    if (normalizeEmailValue(entry?.email) === normalizedEmail) {
      updated = true;
      return {
        email: entry?.email || email,
        credits: nextCredits,
      };
    }
    return entry;
  });

  if (!updated) {
    nextEntries.push({ email, credits: nextCredits });
  }

  writeGeneralUsers(nextEntries);
};

const normalizeCreditsValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  return Math.max(0, Math.round(numeric));
};

const readStoredSession = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Unable to read stored auth session", error);
    return null;
  }
};

function persistSessionInStorage(session) {
  if (typeof window === "undefined") {
    return;
  }

  if (session) {
    markActiveSession();
    const storedSession = readStoredSession();
    const credits = normalizeCreditsValue(
      session.user?.user_metadata?.credits ??
        session.user?.user_metadata?.creditBalance ??
        session.user?.app_metadata?.credits,
    );
    const storedCredits = normalizeCreditsValue(storedSession?.user?.credits);
    const generalCredits = getGeneralUserCredits(session.user?.email);

    // Default to starter credits when a user signs in for the first time.
    const resolvedCredits = (() => {
      const candidates = [credits, storedCredits, generalCredits];
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate !== null && candidate !== undefined) {
          return candidate;
        }
      }

      return INITIAL_SIGN_IN_CREDITS;
    })();

    const payload = {
      user: {
        id: session.user?.id,
        email: session.user?.email,
        credits: resolvedCredits,
      },
      accessToken: session.access_token,
      expiresAt: session.expires_at,
      refreshedAt: Date.now(),
    };

    try {
      window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Unable to persist auth session", error);
    }

    if (session.user?.email) {
      upsertGeneralUserCredits(session.user.email, resolvedCredits);
    }
  } else {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    clearActiveSession();
  }

  broadcastAuthChange();
}

function TeachwiseApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasActiveMarker = Boolean(
      window.sessionStorage.getItem(ACTIVE_SESSION_STORAGE_KEY),
    );

    const urlSearch = window.location.search ?? "";
    const urlHash = window.location.hash ?? "";
    const hasAuthCallbackTokens =
      urlSearch.includes("access_token=") ||
      urlSearch.includes("refresh_token=") ||
      urlHash.includes("access_token=");

    if (!hasActiveMarker) {
      markActiveSession();

      if (!hasAuthCallbackTokens) {
        try {
          window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn("Unable to clear stored auth session", error);
        }

        if (supabase && isSupabaseConfigured) {
          supabase.auth.signOut().catch(() => {
            // Ignore sign-out errors during session reset.
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }
      persistSessionInStorage(data?.session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      persistSessionInStorage(session ?? null);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default TeachwiseApp;
