import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import {
  getCurrentLocale,
  initializeClientLocale,
  setCurrentLocale,
  subscribeLocaleChange
} from './client';
import { createTranslator, type TranslationKey, type Translator } from './translator';
import type { TranslationParams } from './format';
import type { Locale } from './locales';

interface I18nContextValue extends Translator {
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps extends PropsWithChildren {
  initialLocale?: Locale;
}

export function I18nProvider({ initialLocale, children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? getCurrentLocale());

  useEffect(() => {
    initializeClientLocale();
    const unsubscribe = subscribeLocaleChange((nextLocale) => {
      setLocaleState(nextLocale);
    });
    setLocaleState(getCurrentLocale());
    return unsubscribe;
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setCurrentLocale(nextLocale);
  }, []);

  const translator = useMemo(() => createTranslator(locale), [locale]);

  const contextValue = useMemo<I18nContextValue>(
    () => ({
      ...translator,
      setLocale
    }),
    [translator, setLocale]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider.');
  }
  return context;
}

export function useTranslation(): {
  locale: Locale;
  t: (key: TranslationKey, params?: TranslationParams) => string;
  tp: (key: TranslationKey, count: number, params?: TranslationParams) => string;
  ts: (key: TranslationKey, selector: string, params?: TranslationParams) => string;
} {
  const { locale, t, tp, ts } = useI18n();
  return { locale, t, tp, ts };
}
