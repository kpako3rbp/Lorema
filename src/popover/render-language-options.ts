import { NAME_BY_LANGUAGE } from '../constants';
import { Language } from '../types';

export const renderLanguageOptions = (selectedLanguage: Language, useShortName = false): string => {
  return Object.values(Language)
    .map(
      (language) => `
        <option value="${language}" ${selectedLanguage === language ? 'selected' : ''}>
          ${useShortName ? language.toUpperCase() : NAME_BY_LANGUAGE[language]}
        </option>
      `,
    )
    .join('');
};
