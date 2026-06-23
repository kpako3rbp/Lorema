import { EditableTargetSnapshot } from 'src/modules/editable-target';
import { StorageSchema } from 'src/modules/storage';

import { syncElementsUI, syncTitleTopicSelectWithLanguage } from '../lib/sync-ui';
import { PopoverGenerationElements } from '../model/types';
import { closeActivePopover, closePopoverOnOutsideClick } from './close-popover';
import { submitForm } from './submit-form';

export const registerGenerationPopoverEvents = (
  elements: PopoverGenerationElements,
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

  elements.languageSelect.addEventListener('change', () => {
    syncTitleTopicSelectWithLanguage(elements, storage.interfaceLanguage);
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
