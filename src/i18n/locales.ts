export const SUPPORTED_LOCALES = ['en', 'es', 'it', 'de', 'ru', 'zh'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE_NAME = 'lorna_locale';
export const LOCALE_STORAGE_KEY = 'lorna_locale';
export const LOCALE_CHANGE_EVENT = 'lorna:localechange';

export interface LocaleOption {
  code: Locale;
  flagCode: string;
}

export const LOCALE_OPTIONS: ReadonlyArray<LocaleOption> = [
  { code: 'en', flagCode: 'us' },
  { code: 'es', flagCode: 'es' },
  { code: 'it', flagCode: 'it' },
  { code: 'de', flagCode: 'de' },
  { code: 'ru', flagCode: 'ru' },
  { code: 'zh', flagCode: 'cn' }
];

export function isLocale(input: string | null | undefined): input is Locale {
  if (!input) return false;
  return SUPPORTED_LOCALES.includes(input as Locale);
}

export function normalizeLocale(input: string | null | undefined): Locale | null {
  if (!input) return null;
  const normalized = input.toLowerCase().trim().replace('_', '-');
  if (isLocale(normalized)) return normalized;
  const [base] = normalized.split('-');
  if (isLocale(base)) return base;
  return null;
}

export function parseCookieValue(cookieHeader: string | null | undefined, key: string): string | null {
  if (!cookieHeader) return null;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const [rawName, ...rest] = pair.trim().split('=');
    if (rawName === key) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

export function resolveLocale(options: {
  cookie?: string | null;
  stored?: string | null;
  browser?: readonly string[] | null;
  fallback?: Locale;
}): Locale {
  const fallback = options.fallback ?? DEFAULT_LOCALE;
  const fromCookie = normalizeLocale(options.cookie ?? null);
  if (fromCookie) return fromCookie;

  const fromStored = normalizeLocale(options.stored ?? null);
  if (fromStored) return fromStored;

  const browserCandidates = options.browser ?? [];
  for (const candidate of browserCandidates) {
    const locale = normalizeLocale(candidate);
    if (locale) return locale;
  }

  return fallback;
}

export function detectLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale | null {
  if (!acceptLanguage) return null;

  const candidates = acceptLanguage
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [tag, qPart] = part.split(';');
      const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
      return { tag, q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const locale = normalizeLocale(tag);
    if (locale) return locale;
  }

  return null;
}
