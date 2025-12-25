import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Middleware to authenticate API requests
 * Checks for valid Supabase session via Authorization header
 * Also allows guest usage tracking via custom header
 */
export async function authenticateRequest(req) {
  // Skip authentication in local development
  if (process.env.NODE_ENV === 'development') {
    return {
      authenticated: true,
      isGuest: false,
      error: null,
      user: { id: 'local-dev-user', email: 'dev@localhost' },
    };
  }

  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      authenticated: false,
      isGuest: true,
      error: null,
      user: null,
    };
  }

  // Get authorization token from header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  // Check for guest mode indicator
  const guestMode = req.headers["x-guest-mode"] === "true";

  if (guestMode) {
    // Allow guest usage but mark as guest
    return {
      authenticated: true,
      isGuest: true,
      error: null,
      user: null,
    };
  }

  if (!token) {
    return {
      authenticated: false,
      isGuest: false,
      error: "No authentication token provided",
      user: null,
    };
  }

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Verify the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return {
        authenticated: false,
        isGuest: false,
        error: error?.message || "Invalid authentication token",
        user: null,
      };
    }

    return {
      authenticated: true,
      isGuest: false,
      error: null,
      user: data.user,
    };
  } catch (error) {
    return {
      authenticated: false,
      isGuest: false,
      error: error.message || "Authentication failed",
      user: null,
    };
  }
}

/**
 * Wrapper function to protect API routes with authentication
 * Usage: export default withAuth(handler, options)
 */
export function withAuth(handler, options = {}) {
  const { allowGuest = true, requireAuth = false } = options;

  return async (req, res) => {
    const auth = await authenticateRequest(req);

    // If guest mode is not allowed and user is guest
    if (!allowGuest && auth.isGuest) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please sign in to use this feature",
      });
    }

    // If authentication is required and user is not authenticated
    if (requireAuth && !auth.authenticated) {
      return res.status(401).json({
        error: "Authentication required",
        message: auth.error || "Please sign in to continue",
      });
    }

    // If not authenticated at all (not even guest)
    if (!auth.authenticated && !auth.isGuest) {
      return res.status(401).json({
        error: "Authentication required",
        message: auth.error || "Please provide valid authentication",
      });
    }

    // Attach auth info to request for handler to use
    req.auth = auth;

    // Call the actual handler
    return handler(req, res);
  };
}

/**
 * Rate limiting helper (basic in-memory implementation)
 * For production, consider using Redis or a dedicated rate limiting service
 */
const rateLimitMap = new Map();

export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const key = identifier;

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const record = rateLimitMap.get(key);

  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // Increment count
  record.count++;

  if (record.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - record.count,
  };
}

// Clean up old entries periodically
if (typeof global !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime + 60000) {
        rateLimitMap.delete(key);
      }
    }
  }, 300000); // Clean every 5 minutes
}
