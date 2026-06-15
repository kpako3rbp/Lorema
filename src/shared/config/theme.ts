import { TRANSLATIONS } from 'src/i18n';
import { Language, Theme } from 'src/shared/model/types';

import { renderBritishFlagIcon } from '../ui/icons/british-flag';
import { renderDarkThemeIcon } from '../ui/icons/dark-theme';
import { renderLightThemeIcon } from '../ui/icons/light-theme';
import { renderRussianFlagIcon } from '../ui/icons/russian-flag';

export const getNameByLanguage = (language: Language): Record<Theme, string> => ({
  light: TRANSLATIONS[language].theme.light,
  dark: TRANSLATIONS[language].theme.dark,
});

export const THEMES: Theme[] = [Theme.light, Theme.dark];

export const ICON_BY_THEME: Record<Theme, string> = {
  [Theme.light]: renderLightThemeIcon(),
  [Theme.dark]: renderDarkThemeIcon(),
};

export const ICON_BY_LANGUAGE: Record<Language, string> = {
  en: renderBritishFlagIcon(),
  ru: renderRussianFlagIcon(),
};
