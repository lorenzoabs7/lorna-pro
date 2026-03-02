import en from './en.json';
import es from './es.json';
import it from './it.json';
import de from './de.json';
import ru from './ru.json';
import zh from './zh.json';
import type { Locale } from '../locales';

export type MessageTree = Record<string, unknown>;

export const messagesByLocale: Record<Locale, MessageTree> = {
  en,
  es,
  it,
  de,
  ru,
  zh
};

export const enMessages = en as MessageTree;
