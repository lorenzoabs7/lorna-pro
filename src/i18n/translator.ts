import en from './messages/en.json';
import { enMessages, messagesByLocale } from './messages';
import type { TranslationParams } from './format';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  interpolate,
  selectCase,
  selectPluralForm
} from './format';
import { DEFAULT_LOCALE, type Locale } from './locales';

type Primitive = string | number | boolean | null;
type NestedKey<T, Prefix extends string = ''> = {
  [K in keyof T & string]:
    T[K] extends Primitive
      ? `${Prefix}${K}`
      : T[K] extends readonly unknown[]
        ? `${Prefix}${K}`
        : T[K] extends Record<string, unknown>
          ? `${Prefix}${K}` | NestedKey<T[K], `${Prefix}${K}.`>
          : `${Prefix}${K}`;
}[keyof T & string];

export type TranslationKey = NestedKey<typeof en>;

export interface Translator {
  locale: Locale;
  fallbackLocale: Locale;
  t: (key: TranslationKey, params?: TranslationParams) => string;
  tp: (key: TranslationKey, count: number, params?: TranslationParams) => string;
  ts: (key: TranslationKey, selector: string, params?: TranslationParams) => string;
  raw: <T = unknown>(key: TranslationKey) => T | null;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (value: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (
    value: number,
    currency: string,
    options?: Omit<Intl.NumberFormatOptions, 'style' | 'currency'>
  ) => string;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getByPath(source: Record<string, unknown>, key: string): unknown {
  const parts = key.split('.');
  let current: unknown = source;
  for (const part of parts) {
    if (!isObject(current) && !Array.isArray(current)) {
      return undefined;
    }
    const next = (current as Record<string, unknown>)[part];
    current = next;
  }
  return current;
}

function getMessage(locale: Locale, key: TranslationKey): unknown {
  const localizedValue = getByPath(messagesByLocale[locale], key);
  if (localizedValue !== undefined) return localizedValue;
  return getByPath(enMessages, key);
}

function missingKeyValue(key: string, isDev: boolean): string {
  return isDev ? `[[missing:${key}]]` : key;
}

export function createTranslator(
  locale: Locale = DEFAULT_LOCALE,
  options?: { fallbackLocale?: Locale; isDev?: boolean }
): Translator {
  const fallbackLocale = options?.fallbackLocale ?? DEFAULT_LOCALE;
  const isDev = options?.isDev ?? import.meta.env.DEV;

  const t = (key: TranslationKey, params?: TranslationParams): string => {
    const value = getMessage(locale, key);
    if (typeof value !== 'string') {
      return missingKeyValue(key, isDev);
    }
    return interpolate(value, params);
  };

  const tp = (key: TranslationKey, count: number, params?: TranslationParams): string => {
    const value = getMessage(locale, key);
    if (!isObject(value)) {
      return missingKeyValue(key, isDev);
    }
    const forms = Object.entries(value).reduce<Record<string, string>>((acc, [formKey, formValue]) => {
      if (typeof formValue === 'string') {
        acc[formKey] = formValue;
      }
      return acc;
    }, {});
    if (!Object.keys(forms).length) {
      return missingKeyValue(key, isDev);
    }
    const selected = selectPluralForm(locale, count, forms);
    return interpolate(selected, { ...params, count });
  };

  const ts = (key: TranslationKey, selector: string, params?: TranslationParams): string => {
    const value = getMessage(locale, key);
    if (!isObject(value)) {
      return missingKeyValue(key, isDev);
    }
    const cases = Object.entries(value).reduce<Record<string, string>>((acc, [caseKey, caseValue]) => {
      if (typeof caseValue === 'string') {
        acc[caseKey] = caseValue;
      }
      return acc;
    }, {});
    if (!Object.keys(cases).length) {
      return missingKeyValue(key, isDev);
    }
    const selected = selectCase(selector, cases);
    return interpolate(selected, params);
  };

  const raw = <T = unknown>(key: TranslationKey): T | null => {
    const value = getMessage(locale, key);
    if (value === undefined) return null;
    return value as T;
  };

  return {
    locale,
    fallbackLocale,
    t,
    tp,
    ts,
    raw,
    formatNumber: (value, intlOptions) => formatNumber(locale, value, intlOptions),
    formatDate: (value, intlOptions) => formatDate(locale, value, intlOptions),
    formatCurrency: (value, currency, intlOptions) =>
      formatCurrency(locale, value, currency, intlOptions)
  };
}
