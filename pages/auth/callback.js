import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const handleAuthCallback = async () => {
      console.log('Handling auth callback');
      const { data, error } = await supabase.auth.getSession();
      console.log('Session data:', data);
      console.log('Session error:', error);

      if (error) {
        console.error('Error during auth callback:', error);
        router.push('/login?error=auth_callback_error');
        return;
      }

      if (data.session) {
        console.log('Session found, redirecting to /cbse');
        router.push('/cbse');
      } else {
        console.log('No session found, redirecting to /login');
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router, router.isReady]);

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