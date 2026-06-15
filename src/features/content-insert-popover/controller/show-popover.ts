import { EditableTargetSnapshot } from 'src/entities/editable-target/types';
import { CONTENT_FORM_FIELD_IDS } from 'src/features/content-generation/config/form-field-ids';
import { getStorageItems } from 'src/features/content-generation/lib/storage';
import { ContentType } from 'src/features/content-generation/model';
import { loadPopoverFonts } from 'src/features/content-insert-popover/lib/load-popover-fonts';
import { movePopoverInsideViewport } from 'src/features/content-insert-popover/lib/move-popover-inside-viewport';
import { createPopover } from 'src/features/content-insert-popover/ui/create-popover';

import { getPopoverElements } from '../lib/get-popover-elements';
import { closeActivePopover } from './close-popover';
import { registerPopoverEvents } from './register-events';

export const showPopover = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageItems();

  await loadPopoverFonts();

  const popover = createPopover({
    contentType,
    storage,
    interfaceLanguage: storage.interfaceLanguage,
    generationLanguage: storage.generationLanguage,
    position: target.position,
  });

  const shadowRoot = popover.shadowRoot;

  if (!shadowRoot) {
    throw new Error('Shadow root not found');
  }

  document.body.appendChild(popover);

  requestAnimationFrame(() => movePopoverInsideViewport(popover));

  const elements = getPopoverElements(shadowRoot);

  registerPopoverEvents(elements, storage, target);

  requestAnimationFrame(() => {
    const lengthInput = shadowRoot.getElementById(CONTENT_FORM_FIELD_IDS.textLengthInput) as HTMLInputElement | null;

    lengthInput?.focus();
    lengthInput?.select();
  });
};
