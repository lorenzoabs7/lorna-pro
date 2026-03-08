/**
 * Single source of truth for site-wide SEO constants.
 * Import SITE_URL here instead of hardcoding 'https://lornadev.com' anywhere else.
 */

export const SITE_URL = 'https://lornadev.com' as const;
export const SITE_NAME = 'Lorna Dev' as const;
export const SITE_TAGLINE = 'Engineering Consulting for Production-Ready Systems' as const;

/** Default OG/Twitter share image — must exist at public/og-image.png */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png` as const;

/**
 * Brand logo served from public/lornaLogo.svg.
 * Used in schema.org logo fields (Organization, publisher, etc.).
 * Note: Google structured data guidelines prefer PNG/JPG for logos.
 * If a PNG version is needed, place it at public/lornaLogo.png and update this constant.
 */
export const SITE_LOGO = `${SITE_URL}/lornaLogo.svg` as const;

/** Twitter/X handle — update to real handle when available */
export const TWITTER_HANDLE = '@lornadev' as const;

/** Default robots directive for public pages */
export const DEFAULT_ROBOTS = 'index, follow' as const;

/**
 * Returns an absolute canonical URL for a given pathname.
 * Input:  '/about'  → 'https://lornadev.com/about'
 * Input:  'about'   → 'https://lornadev.com/about'
 */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  // Strip query strings and hashes from canonical
  const withoutQuery = clean.split('?')[0].split('#')[0];
  return `${SITE_URL}${withoutQuery}`;
}

/**
 * Ensures an image path is an absolute URL.
 * Accepts either a relative path ('/og-image.png') or an already-absolute URL.
 */
export function absoluteImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}
