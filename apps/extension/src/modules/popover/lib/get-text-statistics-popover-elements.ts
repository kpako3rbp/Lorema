import { getRequiredElementById } from '@extension/shared/lib/query-element';

import { POPOVER_IDS } from '../config/constants';
import { PopoverTextStatisticsElements } from '../model/types';

export const getTextStatisticsPopoverElements = (shadowRoot: ShadowRoot): PopoverTextStatisticsElements => ({
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
