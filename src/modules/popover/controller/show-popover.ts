import { DataType } from 'src/modules/data-type';
import { EditableTargetSnapshot } from 'src/modules/editable-target';
import { loadPopoverFonts } from 'src/modules/popover/lib/load-popover-fonts';
import { movePopoverInsideViewport } from 'src/modules/popover/lib/move-popover-inside-viewport';
import { createPopover } from 'src/modules/popover/ui/create-popover';
import { getStorageItems } from 'src/modules/storage';

import { getPopoverElements } from '../lib/get-popover-elements';
import { closeActivePopover } from './close-popover';
import { registerPopoverEvents } from './register-events';

export const showPopover = async (dataType: DataType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageItems();

  await loadPopoverFonts();

  const popover = createPopover({
    dataType,
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
    elements.lengthInput?.focus();
    elements.lengthInput?.select();
  });
};
