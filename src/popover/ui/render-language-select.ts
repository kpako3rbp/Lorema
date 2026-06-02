import { LANGUAGES, NAME_BY_LANGUAGE, SHORT_NAME_BY_LANGUAGE } from 'src/shared/config/language';
import { Language } from 'src/shared/model/types';

import { renderOptions } from './render-options';

export const renderLanguageSelect = (selected: Language, useShortName = false) => /*html*/ `
  <select id="language" class="lorem-select">
    ${renderOptions(LANGUAGES, selected, useShortName ? SHORT_NAME_BY_LANGUAGE : NAME_BY_LANGUAGE)}
  </select>
`;
