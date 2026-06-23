import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { getRequiredElementById } from 'src/shared/lib/query-element';

import { PopoverTextStatisticsElements } from '../model/types';

export const getTextStatisticsPopoverElements = (shadowRoot: ShadowRoot): PopoverTextStatisticsElements => ({
  cancelButton: getRequiredElementById(shadowRoot, POPOVER_IDS.cancelButton),
});
