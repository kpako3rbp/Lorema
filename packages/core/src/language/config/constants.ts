import { GenerationLanguage, InterfaceLanguage, Language } from '../model/types';

export const INTERFACE_LANGUAGES: InterfaceLanguage[] = ['ru', 'en'];
export const GENERATION_LANGUAGES: GenerationLanguage[] = ['ru', 'en', 'la'];

export const SHORT_NAME_BY_LANGUAGE: Record<Language, string> = {
  ru: 'RU',
  en: 'EN',
  la: 'LA',
};

export const NAME_BY_LANGUAGE: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  la: 'Lingua Latina',
};
