import { POPOVER_IDS } from 'src/features/content-insert-popover/config/constants';
import { getRequiredElementById } from 'src/shared/lib/query-element';

import { PopoverElements } from '../model/types';

export const getPopoverElements = (shadowRoot: ShadowRoot): PopoverElements => ({
  languageSelect: getRequiredElementById(shadowRoot, POPOVER_IDS.languageSelect),

  form: getRequiredElementById(shadowRoot, POPOVER_IDS.popoverForm),
  insertButton: getRequiredElementById(shadowRoot, POPOVER_IDS.insertButton),
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
