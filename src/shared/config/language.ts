import { Language } from 'src/shared/model/types';

export const SHORT_NAME_BY_LANGUAGE: Record<Language, string> = {
  ru: 'RU',
  en: 'EN',
};

export const NAME_BY_LANGUAGE: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
};

export const LANGUAGES: Language[] = [Language.ru, Language.en];
