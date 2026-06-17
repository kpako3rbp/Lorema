import { PopoverTextStatisticsElements } from '../model/types';
import { closeActivePopover, closePopoverOnOutsideClick } from './close-popover';

const closePopoverOnEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeActivePopover();
  }
};

export const registerTextStatisticsPopoverEvents = (elements: PopoverTextStatisticsElements): void => {
  document.addEventListener('mousedown', closePopoverOnOutsideClick, true);
  document.addEventListener('keydown', closePopoverOnEscape, true);

  elements.cancelButton.addEventListener('click', closeActivePopover);
};
