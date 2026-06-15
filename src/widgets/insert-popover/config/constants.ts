import { CONTENT_FORM_FIELD_IDS } from 'src/entities/generation-settings/config/form-field-ids';

export const POPOVER_IDS = {
  popover: 'popover',
  popoverForm: 'popoverForm',
  languageSelect: 'languageSelect',
  insertButton: 'insertButton',
  cancelButton: 'cancelButton',
  ...CONTENT_FORM_FIELD_IDS,
} as const;

export const POPOVER_CLASSNAME = 'lorem-popover';
export const POPOVER_TAB_CLASSNAME = 'lorem-tab-panel';

export const POPOVER_OFFSET = 14;
