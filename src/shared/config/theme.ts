import { TRANSLATIONS } from 'src/i18n';
import { Language, Theme } from 'src/shared/model/types';

export const NAME_BY_LANGUAGE: Record<Theme, string> = {
  light: 'Русский',
  dark: 'English',
};

export const getNameByLanguage = (language: Language): Record<Theme, string> => ({
  light: TRANSLATIONS[language].theme.light,
  dark: TRANSLATIONS[language].theme.dark,
});

export const THEMES: Theme[] = [Theme.light, Theme.dark];
