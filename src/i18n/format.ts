import type { Locale } from './locales';

export type TranslationParams = Record<string, string | number | boolean | null | undefined>;

const TOKEN_REGEX = /\{([a-zA-Z0-9_.-]+)\}/g;

export function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return template.replace(TOKEN_REGEX, (_match, token: string) => {
    const value = params[token];
    return value === null || value === undefined ? '' : String(value);
  });
}

export function formatNumber(
  locale: Locale,
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatDate(
  locale: Locale,
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatCurrency(
  locale: Locale,
  value: number,
  currency: string,
  options?: Omit<Intl.NumberFormatOptions, 'style' | 'currency'>
): string {
  return new Intl.NumberFormat(locale, { ...options, style: 'currency', currency }).format(value);
}

export function selectPluralForm(locale: Locale, count: number, forms: Record<string, string>): string {
  const pluralRule = new Intl.PluralRules(locale).select(count);
  return forms[pluralRule] ?? forms.other ?? Object.values(forms)[0] ?? '';
}

export function selectCase(value: string, cases: Record<string, string>): string {
  return cases[value] ?? cases.other ?? Object.values(cases)[0] ?? '';
}
