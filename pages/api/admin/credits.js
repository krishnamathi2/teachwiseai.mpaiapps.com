import { createClient } from "@supabase/supabase-js";

const normalizeEmail = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().toLowerCase();
};

const getAdminEmailSet = () => {
  const fallbackAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "support@teachwiseai.mpaiapps.com";
  const envList = [
    fallbackAdmin,
    process.env.ADMIN_ALLOWED_EMAILS,
    process.env.ADMIN_EMAILS,
    process.env.ADMIN_EMAIL,
  ]
    .filter(Boolean)
    .join(",");

  if (!envList) {
    return new Set();
  }

  return new Set(
    envList
      .split(",")
      .map((entry) => normalizeEmail(entry))
      .filter(Boolean),
  );
};

const ADMIN_EMAILS = getAdminEmailSet();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ensureSupabaseConfig = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      SUPABASE_URL ? null : "NEXT_PUBLIC_SUPABASE_URL",
      SUPABASE_ANON_KEY ? null : "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      SUPABASE_SERVICE_ROLE_KEY ? null : "SUPABASE_SERVICE_ROLE_KEY",
    ]
      .filter(Boolean)
      .join(", ");
    const error = new Error(
      missing
        ? `Missing Supabase environment variables: ${missing}`
        : "Supabase configuration not available",
    );
    error.code = "NOT_CONFIGURED";
    throw error;
  }
};

const parseAmount = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value.trim());
    return Number.isFinite(numeric) ? numeric : null;
  }

  return null;
};

const findUserByEmail = async (serviceClient, email) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return null;
  }

  let page = 1;
  const perPage = 100;
  const maxPages = 50;

  while (page <= maxPages) {
    const { data, error } = await serviceClient.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const match = data?.users?.find((user) => normalizeEmail(user.email) === normalizedEmail);
    if (match) {
      return match;
    }

    if (!data?.nextPage || data.nextPage === page) {
      break;
    }

    page = data.nextPage;
  }

  return null;
};

const readAdminUserFromToken = async (token) => {
  ensureSupabaseConfig();

  const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data?.user) {
    return null;
  }

  return data.user;
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    ensureSupabaseConfig();
  } catch (configError) {
    response
      .status(501)
      .json({ error: configError.message || "Credits API not configured", code: configError.code });
    return;
  }

  const authHeader = request.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    response.status(401).json({ error: "Missing authorization token" });
    return;
  }

  try {
    const adminUser = await readAdminUserFromToken(token);
    if (!adminUser) {
      response.status(401).json({ error: "Invalid admin session" });
      return;
    }

    const adminEmail = normalizeEmail(adminUser.email);
    if (!ADMIN_EMAILS.has(adminEmail)) {
      response.status(403).json({ error: "Not authorized" });
      return;
    }
  } catch (authError) {
    response.status(401).json({ error: "Unable to verify admin session" });
    return;
  }

  const { email, amount, credits, operation } = request.body || {};
  const targetEmail = normalizeEmail(email);
  if (!targetEmail) {
    response.status(400).json({ error: "A valid target email is required" });
    return;
  }

  const parsedAmount = parseAmount(amount ?? credits);
  if (parsedAmount === null || parsedAmount <= 0) {
    response.status(400).json({ error: "Credit amount must be greater than zero" });
    return;
  }

  try {
    ensureSupabaseConfig();
    const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const userRecord = await findUserByEmail(serviceClient, targetEmail);

    if (!userRecord) {
      response.status(404).json({ error: `No user found for ${email}` });
      return;
    }

    const currentCredits = parseAmount(
      userRecord.user_metadata?.credits ?? userRecord.user_metadata?.creditBalance ?? 0,
    ) || 0;

    const mode = operation === "set" ? "set" : "add";
    const nextCredits = mode === "set" ? parsedAmount : currentCredits + parsedAmount;

    const updatedMetadata = {
      ...(userRecord.user_metadata || {}),
      credits: nextCredits,
      creditBalance: nextCredits,
      lastCreditUpdate: new Date().toISOString(),
    };

    const { error: updateError } = await serviceClient.auth.admin.updateUserById(userRecord.id, {
      user_metadata: updatedMetadata,
    });

    if (updateError) {
      response.status(500).json({ error: updateError.message || "Failed to update credits" });
      return;
    }

    response.status(200).json({
      message: `${mode === "set" ? "Set" : "Added"} ${parsedAmount} credits for ${userRecord.email}. New balance: ${nextCredits}.`,
      nextCredits,
      targetEmail: userRecord.email,
      mode,
    });
  } catch (error) {
    const statusCode = error?.code === "NOT_CONFIGURED" ? 501 : 500;
    response.status(statusCode).json({ error: error.message || "Unexpected error" });
  }
}
