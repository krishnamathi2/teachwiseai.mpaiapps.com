export const GUEST_USAGE_STORAGE_KEY = "teachwiseai:guestUsage";
export const AUTH_SESSION_STORAGE_KEY = "teachwiseai:authSession";
export const GUEST_GENERATION_LIMIT = 10;
export const AUTH_STATE_EVENT = "teachwiseai:authStateUpdated";
export const ACTIVE_SESSION_STORAGE_KEY = "teachwiseai:sessionActive";

const defaultQuota = {
  limit: GUEST_GENERATION_LIMIT,
  used: 0,
  remaining: GUEST_GENERATION_LIMIT,
};

const clampUsage = (value) => {
  if (Number.isNaN(value) || typeof value !== "number") {
    return 0;
  }
  return Math.min(Math.max(value, 0), GUEST_GENERATION_LIMIT);
};

const readUsageValue = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const stored = window.localStorage.getItem(GUEST_USAGE_STORAGE_KEY);
    if (!stored) {
      return 0;
    }

    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed.used === "number") {
      return clampUsage(parsed.used);
    }
  } catch (error) {
    // Ignore malformed storage entries and fall back to zero usage.
  }

  return 0;
};

const writeUsageValue = (used) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = JSON.stringify({
      used: clampUsage(used),
      updatedAt: Date.now(),
    });
    window.localStorage.setItem(GUEST_USAGE_STORAGE_KEY, payload);
  } catch (error) {
    // Swallow storage write errors (e.g. quota exceeded or disabled storage).
  }
};

const buildQuota = (used) => {
  const normalized = clampUsage(used);
  const limit = GUEST_GENERATION_LIMIT;
  return {
    limit,
    used: normalized,
    remaining: Math.max(limit - normalized, 0),
  };
};

export const getGuestQuotaSnapshot = () => {
  return buildQuota(readUsageValue());
};

export const incrementGuestUsage = () => {
  const nextUsed = clampUsage(readUsageValue() + 1);
  writeUsageValue(nextUsed);
  return buildQuota(nextUsed);
};

export const resetGuestUsage = () => {
  writeUsageValue(0);
  return { ...defaultQuota };
};

export const detectGuestMode = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  return !raw;
};

export const subscribeToAuthChanges = (listener) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event) => {
    if (event.key === AUTH_SESSION_STORAGE_KEY) {
      listener(detectGuestMode());
    }
  };

  const handleInternal = () => {
    listener(detectGuestMode());
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(AUTH_STATE_EVENT, handleInternal);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(AUTH_STATE_EVENT, handleInternal);
  };
};

export const getDefaultGuestQuota = () => ({ ...defaultQuota });

export const broadcastAuthChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_STATE_EVENT));
};

export const markActiveSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, "1");
  } catch (error) {
    // Ignore sessionStorage write errors (e.g. when disabled).
  }
};

export const clearActiveSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
  } catch (error) {
    // Ignore sessionStorage removal errors.
  }
};
