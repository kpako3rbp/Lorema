import { EditableTargetSnapshot } from 'src/app/content/types';
import { StorageSchema } from 'src/shared/model/types';

import { syncElementsUI } from '../lib/sync-ui';
import { PopoverElements } from '../model/types';
import { closeActivePopover, closePopoverOnOutsideClick } from './close-popover';
import { submitForm } from './submit-form';

export const registerPopoverEvents = (
  elements: PopoverElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): void => {
  const { form, cancelButton } = elements;

  syncElementsUI(elements);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    submitForm(elements, storage, target);
  });

  form.addEventListener('change', () => {
    syncElementsUI(elements);
  });

  form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActivePopover();

      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      submitForm(elements, storage, target);
    }
  });

  cancelButton.addEventListener('click', closeActivePopover);
  document.addEventListener('mousedown', closePopoverOnOutsideClick, true);
};
