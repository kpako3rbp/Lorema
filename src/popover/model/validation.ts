import { MAX_PHONE_DIGITS, MIN_PHONE_DIGITS } from 'src/generators/phone/config/constants';
import { MAX_TEXT_CHARS, MIN_TEXT_CHARS } from 'src/generators/text/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { queryElement } from 'src/shared/utils/query-element';
import { showInputError, validateCountryCode, validateNumberInput } from 'src/shared/utils/validation';

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

export const validatePhoneForm = (form: HTMLFormElement, interfaceLanguage: Language): boolean => {
  const t = TRANSLATIONS[interfaceLanguage].popover;

  const countryCodeInput = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.countryCodeInput}`);
  const countryCodeError = queryElement<HTMLElement>(form, `#${POPOVER_IDS.countryCodeError}`);

  const digitsCountInput = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.digitsCountInput}`);
  const digitsCountError = queryElement<HTMLElement>(form, `#${POPOVER_IDS.digitsCountError}`);

  const countryCodeResult = validateCountryCode(countryCodeInput.value, {
    required: t.required,
    invalid: t.invalid,
  });

  const digitsCountResult = validateNumberInput(digitsCountInput, MIN_PHONE_DIGITS, MAX_PHONE_DIGITS, {
    invalid: t.invalid,
    min: `${t.min} ${MIN_PHONE_DIGITS}`,
    max: `${t.max} ${MAX_PHONE_DIGITS}`,
  });

  showInputError(countryCodeInput, countryCodeError, countryCodeResult.message);
  showInputError(digitsCountInput, digitsCountError, digitsCountResult.message);

  return countryCodeResult.isValid && digitsCountResult.isValid;
};
