import { Language } from '../model/types';

export const getBrowserLanguage = (): Language => {
  const language = navigator.language.toLowerCase();

  if (language.startsWith('ru')) {
    return Language.ru;
  }

  return Language.en;
};
