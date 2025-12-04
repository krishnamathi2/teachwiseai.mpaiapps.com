import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

const TOKEN_KEYS = ["access_token", "refresh_token", "expires_in", "token_type", "type"];

const readTokenFromLocation = () => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }

  const hash = window.location.hash?.replace(/^#/, "") ?? "";
  const search = window.location.search?.replace(/^\?/, "") ?? "";
  const params = new URLSearchParams(hash);
  const searchParams = new URLSearchParams(search);

  const accessToken = params.get("access_token") || searchParams.get("access_token");
  const refreshToken = params.get("refresh_token") || searchParams.get("refresh_token");

  return { accessToken, refreshToken };
};

const clearTokenParams = () => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  TOKEN_KEYS.forEach((key) => {
    url.searchParams.delete(key);
  });
  url.hash = "";
  window.history.replaceState({}, "", url.toString());
};

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || !supabase) {
      return;
    }

    let mounted = true;

    const handleAuthCallback = async () => {
      try {
        const { accessToken, refreshToken } = readTokenFromLocation();

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            throw error;
          }
          clearTokenParams();
          if (!mounted) {
            return;
          }
          if (data?.session) {
            router.replace("/");
            return;
          }
        }

        const { data: existing } = await supabase.auth.getSession();
        if (existing?.session) {
          router.replace("/");
        } else {
          router.replace("/login?error=no_session");
        }
      } catch (error) {
        console.error("Error during auth callback", error);
        if (!mounted) {
          return;
        }
        const message = encodeURIComponent(error?.message || "auth_callback_error");
        router.replace(`/login?error=${message}`);
      }
    };

    handleAuthCallback();

    return () => {
      mounted = false;
    };
  }, [router.isReady, router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b1120',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '32px',
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '18px',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.55)',
        }}
      >
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 16px 0' }}>
          Signing you in...
        </h1>
        <p style={{ margin: 0, color: '#cbd5f5' }}>
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}