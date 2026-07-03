import { getRequiredElementById } from '@extension/shared/lib/query-element';

import { POPOVER_IDS } from '../config/constants';
import { PopoverGenerationElements } from '../model/types';

export const getGenerationPopoverElements = (shadowRoot: ShadowRoot): PopoverGenerationElements => ({
  languageSelect: getRequiredElementById(shadowRoot, POPOVER_IDS.languageSelect),

  form: getRequiredElementById(shadowRoot, POPOVER_IDS.popoverForm),
  lengthInput: getRequiredElementById(shadowRoot, POPOVER_IDS.textLengthInput),

  insertButton: getRequiredElementById(shadowRoot, POPOVER_IDS.insertButton),
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
