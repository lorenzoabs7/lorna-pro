import {
  DEFAULT_LOCALE,
  LOCALE_CHANGE_EVENT,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  normalizeLocale,
  parseCookieValue,
  resolveLocale,
  type Locale
} from './locales';

declare global {
  interface Window {
    __LORNA_LOCALE__?: Locale;
  }
}

let currentLocale: Locale = DEFAULT_LOCALE;
let initialized = false;

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function getCookieLocale(): string | null {
  if (typeof document === 'undefined') return null;
  return parseCookieValue(document.cookie, LOCALE_COOKIE_NAME);
}

function getStoredLocale(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getBrowserLocales(): readonly string[] {
  if (typeof navigator === 'undefined') return [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    return navigator.languages;
  }
  return navigator.language ? [navigator.language] : [];
}

function persistLocale(locale: Locale): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }

  if (typeof window !== 'undefined') {
    window.__LORNA_LOCALE__ = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // noop: storage may be blocked
    }
  }
}

export function detectClientLocale(): Locale {
  const locale = resolveLocale({
    cookie: getCookieLocale(),
    stored: getStoredLocale(),
    browser: getBrowserLocales(),
    fallback: DEFAULT_LOCALE
  });
  return locale;
}

export function initializeClientLocale(): Locale {
  if (initialized) return currentLocale;

  if (typeof window !== 'undefined') {
    const fromWindow = normalizeLocale(window.__LORNA_LOCALE__);
    currentLocale = fromWindow ?? detectClientLocale();
    persistLocale(currentLocale);
  }

  initialized = true;
  return currentLocale;
}

export function getCurrentLocale(): Locale {
  if (!initialized) return initializeClientLocale();
  return currentLocale;
}

export function setCurrentLocale(locale: Locale, options?: { reload?: boolean }): void {
  const next = normalizeLocale(locale) ?? DEFAULT_LOCALE;
  currentLocale = next;
  initialized = true;
  persistLocale(next);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale: next } }));
    if (options?.reload) {
      window.location.reload();
    }
  }
}

export function subscribeLocaleChange(listener: (locale: Locale) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    const detailLocale = normalizeLocale((event as CustomEvent<{ locale?: string }>).detail?.locale ?? null);
    listener(detailLocale ?? getCurrentLocale());
  };

  window.addEventListener(LOCALE_CHANGE_EVENT, handler as EventListener);
  return () => window.removeEventListener(LOCALE_CHANGE_EVENT, handler as EventListener);
}
