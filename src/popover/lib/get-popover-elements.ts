import { POPOVER_IDS } from 'src/popover/config/constants';
import { queryElementById } from 'src/shared/utils/query-element';

export type PopoverElements = {
  form: HTMLFormElement;
  lengthInput: HTMLInputElement;
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  languageSelect: HTMLSelectElement;
};

export const getPopoverElements = (shadowRoot: ShadowRoot): PopoverElements => ({
  languageSelect: queryElementById(shadowRoot, POPOVER_IDS.languageSelect),

  form: queryElementById(shadowRoot, POPOVER_IDS.popoverForm),
  lengthInput: queryElementById(shadowRoot, POPOVER_IDS.textLengthInput),

  insertButton: queryElementById(shadowRoot, POPOVER_IDS.insertButton),
  cancelButton: queryElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
