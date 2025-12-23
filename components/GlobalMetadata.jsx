import { useEffect, useState } from 'react';
import Head from 'next/head';

/**
 * Global metadata component for international SEO and accessibility
 * Provides language attributes, timezone detection, and localization support
 */
export default function GlobalMetadata() {
  const [userLocale, setUserLocale] = useState('en-US');
  const [userTimezone, setUserTimezone] = useState('UTC');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect user's locale
    const detectedLocale = navigator.language || navigator.userLanguage || 'en-US';
    setUserLocale(detectedLocale);

    // Detect user's timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(detectedTimezone);

    // Store for use across the app
    try {
      window.localStorage.setItem('teachwiseai:locale', detectedLocale);
      window.localStorage.setItem('teachwiseai:timezone', detectedTimezone);
    } catch (error) {
      console.warn('Failed to store locale/timezone', error);
    }
  }, []);

  // Get language code from locale (e.g., 'en' from 'en-US')
  const languageCode = userLocale.split('-')[0];

  return (
    <Head>
      {/* Charset and viewport */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* SEO Meta Tags */}
      <meta name="description" content="TeachWise.AI - AI-powered educational content generation for teachers worldwide. Create lesson plans, MCQs, PDFs, and more for grades 6-12." />
      <meta name="keywords" content="education, AI, teaching, lesson plans, CBSE, ICSE, IB, teachers" />
      <meta name="author" content="TeachWise.AI" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://teachwiseai.mpaiapps.com/" />
      <meta property="og:title" content="TeachWise.AI - AI-Powered Educational Content Generation" />
      <meta property="og:description" content="Generate lesson plans, MCQs, PDFs, and educational content for grades 6-12 across multiple boards and subjects." />
      <meta property="og:locale" content={userLocale} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://teachwiseai.mpaiapps.com/" />
      <meta property="twitter:title" content="TeachWise.AI - AI-Powered Educational Content Generation" />
      <meta property="twitter:description" content="Generate lesson plans, MCQs, PDFs, and educational content for grades 6-12." />
      
      {/* Accessibility */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Alternate language versions (for future multi-language support) */}
      <link rel="alternate" hrefLang="en" href="https://teachwiseai.mpaiapps.com/" />
      <link rel="alternate" hrefLang="hi" href="https://teachwiseai.mpaiapps.com/?lang=hi" />
      <link rel="alternate" hrefLang="x-default" href="https://teachwiseai.mpaiapps.com/" />
      
      {/* Timezone information (stored in meta for server-side access) */}
      <meta name="timezone" content={userTimezone} />
      
      {/* Privacy and legal */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="https://api.openai.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    </Head>
  );
}

/**
 * Utility function to get user's locale from localStorage
 */
export function getUserLocale() {
  if (typeof window === 'undefined') return 'en-US';
  try {
    return window.localStorage.getItem('teachwiseai:locale') || 'en-US';
  } catch {
    return 'en-US';
  }
}

/**
 * Utility function to get user's timezone from localStorage
 */
export function getUserTimezone() {
  if (typeof window === 'undefined') return 'UTC';
  try {
    return window.localStorage.getItem('teachwiseai:timezone') || 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Utility function to format date according to user's locale
 */
export function formatLocalizedDate(date, options = {}) {
  const locale = getUserLocale();
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  }).format(new Date(date));
}

/**
 * Utility function to format currency according to user's locale
 */
export function formatLocalizedCurrency(amount, currency = 'USD') {
  const locale = getUserLocale();
  
  // Map common locales to their currency
  const localeCurrencyMap = {
    'en-IN': 'INR',
    'hi': 'INR',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-EU': 'EUR',
    'es': 'EUR',
    'fr': 'EUR',
    'de': 'EUR',
    'zh': 'CNY',
    'ja': 'JPY',
    'ar': 'AED',
  };
  
  const detectedCurrency = localeCurrencyMap[locale] || currency;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: detectedCurrency,
  }).format(amount);
}

/**
 * Check if user is in a sanctioned country (basic client-side check)
 * Note: Server-side verification should also be implemented
 */
export function isSanctionedCountry() {
  if (typeof window === 'undefined') return false;
  
  // This is a basic check - real implementation should use IP geolocation
  const locale = getUserLocale();
  const SANCTIONED_COUNTRIES = ['KP', 'IR', 'SY', 'CU'];
  
  // Extract country code if present
  const countryCode = locale.split('-')[1];
  
  return SANCTIONED_COUNTRIES.includes(countryCode);
}
