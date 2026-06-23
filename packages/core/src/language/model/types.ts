export const LANGUAGES = ['ru', 'en', 'la'] as const;

export type Language = (typeof LANGUAGES)[number];
export type InterfaceLanguage = Extract<Language, 'en' | 'ru'>;
export type GenerationLanguage = Language;
