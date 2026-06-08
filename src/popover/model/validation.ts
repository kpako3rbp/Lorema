import { MAX_TEXT_CHARS, MIN_TEXT_CHARS } from 'src/generators/text/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { queryElement } from 'src/shared/utils/query-element';
import { showInputError, validateNumberInput } from 'src/shared/utils/validation';

import { POPOVER_IDS } from '../config/constants';

export const validateTextForm = (form: HTMLFormElement, interfaceLanguage: Language): boolean => {
  const t = TRANSLATIONS[interfaceLanguage].popover;

  const inputEL = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.textLengthInput}`);
  const errorEl = queryElement<HTMLElement>(form, `#${POPOVER_IDS.textLengthError}`);

  const result = validateNumberInput(inputEL, 1, MAX_TEXT_CHARS, {
    invalid: t.invalid,
    min: `${t.min} ${MIN_TEXT_CHARS}`,
    max: `${t.max} ${MAX_TEXT_CHARS}`,
  });

  showInputError(inputEL, errorEl, result.message);

  return result.isValid;
};
