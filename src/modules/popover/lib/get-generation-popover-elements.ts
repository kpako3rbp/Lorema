import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { getRequiredElementById } from 'src/shared/lib/query-element';

import { PopoverGenerationElements } from '../model/types';

export const getGenerationPopoverElements = (shadowRoot: ShadowRoot): PopoverGenerationElements => ({
  languageSelect: getRequiredElementById(shadowRoot, POPOVER_IDS.languageSelect),

  form: getRequiredElementById(shadowRoot, POPOVER_IDS.popoverForm),
  lengthInput: getRequiredElementById(shadowRoot, POPOVER_IDS.textLengthInput),

  insertButton: getRequiredElementById(shadowRoot, POPOVER_IDS.insertButton),
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
