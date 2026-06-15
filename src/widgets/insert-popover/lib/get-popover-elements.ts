import { getRequiredElementById } from 'src/shared/lib/query-element';
import { POPOVER_IDS } from 'src/widgets/insert-popover/config/constants';

import { PopoverElements } from '../model/types';

export const getPopoverElements = (shadowRoot: ShadowRoot): PopoverElements => ({
  languageSelect: getRequiredElementById(shadowRoot, POPOVER_IDS.languageSelect),

  form: getRequiredElementById(shadowRoot, POPOVER_IDS.popoverForm),
  insertButton: getRequiredElementById(shadowRoot, POPOVER_IDS.insertButton),
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
