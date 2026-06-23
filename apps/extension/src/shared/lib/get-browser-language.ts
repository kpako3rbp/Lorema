import { InterfaceLanguage } from '@lorema/core';

export const getBrowserLanguage = (): InterfaceLanguage => {
  const language = navigator.language.toLowerCase();

  if (language.startsWith('ru')) {
    return 'ru';
  }

  return 'en';
};
