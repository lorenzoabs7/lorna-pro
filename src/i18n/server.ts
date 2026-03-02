import { createTranslator, type Translator } from './translator';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  detectLocaleFromAcceptLanguage,
  normalizeLocale,
  parseCookieValue,
  resolveLocale,
  type Locale
} from './locales';

interface I18nServerContext {
  locale: Locale;
  translator: Translator;
}

const CONTEXT_KEY = '__i18n_context';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function getCookieLocaleFromAstro(astro: any): string | null {
  const cookieFromApi = astro?.cookies?.get?.(LOCALE_COOKIE_NAME)?.value;
  if (cookieFromApi) return cookieFromApi;
  const cookieHeader = astro?.request?.headers?.get?.('cookie');
  return parseCookieValue(cookieHeader, LOCALE_COOKIE_NAME);
}

function getQueryLocaleFromAstro(astro: any): Locale | null {
  const q = astro?.url?.searchParams?.get?.('locale');
  return normalizeLocale(q ?? null);
}

export function resolveServerLocale(astro: any): Locale {
  const queryLocale = getQueryLocaleFromAstro(astro);
  if (queryLocale) return queryLocale;

  const cookieLocale = getCookieLocaleFromAstro(astro);
  const acceptLanguage = astro?.request?.headers?.get?.('accept-language') ?? null;
  const browserLocale = detectLocaleFromAcceptLanguage(acceptLanguage);
  return resolveLocale({
    cookie: cookieLocale,
    browser: browserLocale ? [browserLocale] : null,
    fallback: DEFAULT_LOCALE
  });
}

export function getI18nContext(astro: any): I18nServerContext {
  if (!astro?.locals) {
    const locale = resolveServerLocale(astro);
    return {
      locale,
      translator: createTranslator(locale, { isDev: import.meta.env.DEV })
    };
  }

  const cached = astro.locals[CONTEXT_KEY] as I18nServerContext | undefined;
  if (cached) return cached;

  const locale = resolveServerLocale(astro);
  const queryLocale = getQueryLocaleFromAstro(astro);

  if (queryLocale && astro?.cookies?.set) {
    astro.cookies.set(LOCALE_COOKIE_NAME, queryLocale, {
      path: '/',
      maxAge: ONE_YEAR_SECONDS,
      sameSite: 'lax'
    });
  }

  const context: I18nServerContext = {
    locale,
    translator: createTranslator(locale, { isDev: import.meta.env.DEV })
  };

  astro.locals[CONTEXT_KEY] = context;
  return context;
}

export function getI18n(astro: any): Translator & { locale: Locale } {
  const { locale, translator } = getI18nContext(astro);
  return {
    ...translator,
    locale
  };
}
