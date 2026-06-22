import { InterfaceLanguage } from '@lorema/core';
import { MAX_PHONE_DIGITS, MAX_TEXT_CHARS, MIN_PHONE_DIGITS, MIN_TEXT_CHARS } from '@lorema/generators';
import { MAX_LIST_ITEMS_COUNT, MIN_LIST_ITEMS_COUNT } from '@lorema/generators/list/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { getRequiredElement } from 'src/shared/lib/query-element';
import { numberWithSpaces } from 'src/shared/lib/string';
import { validateCountryCode, validateNumberInput } from 'src/shared/lib/validation';
import { showInputError } from 'src/shared/ui/form-error/show-input-error';

import { POPOVER_IDS } from '../config/constants';

export const validateTextForm = (form: HTMLFormElement, interfaceLanguage: InterfaceLanguage): boolean => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  const inputEL = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.textLengthInput}`);
  const errorEl = getRequiredElement<HTMLElement>(form, `#${POPOVER_IDS.textLengthError}`);

  const result = validateNumberInput(inputEL, 1, MAX_TEXT_CHARS, {
    invalid: t.invalid,
    min: `${t.min} ${numberWithSpaces(MIN_TEXT_CHARS)}`,
    max: `${t.max} ${numberWithSpaces(MAX_TEXT_CHARS)}`,
  });

  showInputError(inputEL, errorEl, result.message);

  return result.isValid;
};

export const validatePhoneForm = (form: HTMLFormElement, interfaceLanguage: InterfaceLanguage): boolean => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  const countryCodeInput = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.countryCodeInput}`);
  const countryCodeError = getRequiredElement<HTMLElement>(form, `#${POPOVER_IDS.countryCodeError}`);

  const digitsCountInput = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.digitsCountInput}`);
  const digitsCountError = getRequiredElement<HTMLElement>(form, `#${POPOVER_IDS.digitsCountError}`);

  const countryCodeResult = validateCountryCode(countryCodeInput.value, {
    invalid: t.invalid,
  });

  const digitsCountResult = validateNumberInput(digitsCountInput, MIN_PHONE_DIGITS, MAX_PHONE_DIGITS, {
    invalid: t.invalid,
    min: `${t.min} ${numberWithSpaces(MIN_PHONE_DIGITS)}`,
    max: `${t.max} ${numberWithSpaces(MAX_PHONE_DIGITS)}`,
  });

  showInputError(countryCodeInput, countryCodeError, countryCodeResult.message);
  showInputError(digitsCountInput, digitsCountError, digitsCountResult.message);

  return countryCodeResult.isValid && digitsCountResult.isValid;
};

export const validateListForm = (form: HTMLFormElement, interfaceLanguage: InterfaceLanguage): boolean => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  const inputEL = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.listItemsCountInput}`);
  const errorEl = getRequiredElement<HTMLElement>(form, `#${POPOVER_IDS.listItemsCountError}`);

  const result = validateNumberInput(inputEL, 1, MAX_LIST_ITEMS_COUNT, {
    invalid: t.invalid,
    min: `${t.min} ${numberWithSpaces(MIN_LIST_ITEMS_COUNT)}`,
    max: `${t.max} ${numberWithSpaces(MAX_LIST_ITEMS_COUNT)}`,
  });

  showInputError(inputEL, errorEl, result.message);

  return result.isValid;
};
