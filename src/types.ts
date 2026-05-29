export enum Language {
  en = 'en',
  ru = 'ru',
}

export type StorageSchema = {
  charsCount: number;
  withParagraphs: boolean;
  language: Language;
  interfaceLanguage: Language;
};

export type TextParts = {
  starts: string[];
  subjects: string[];
  predicates: string[];
  objects: string[];
  endings: string[];
};

export type ExtensionMessage = { type: 'INSERT_LOREM' | 'UPDATE_CONTEXT_MENU' };
