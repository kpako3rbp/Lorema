import { loadPopoverFonts } from 'src/popover/lib/load-popover-fonts';
import { movePopoverInsideViewport } from 'src/popover/lib/move-popover-inside-viewport';
import { createPopover } from 'src/popover/ui/create-popover';
import { ContentType } from 'src/shared/model/types';
import { getStorageItems } from 'src/shared/utils/storage';

import { EditableTargetSnapshot } from '../../app/content/types';
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
    elements.lengthInput?.focus();
    elements.lengthInput?.select();
  });
};
