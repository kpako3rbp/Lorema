import { DataType } from '@lorema/core';
import { EditableTargetSnapshot } from 'src/modules/editable-target';
import { loadPopoverFonts } from 'src/modules/popover/lib/load-popover-fonts';
import { movePopoverInsideViewport } from 'src/modules/popover/lib/move-popover-inside-viewport';
import { createPopover } from 'src/modules/popover/ui/create-popover';
import { getStorageItems } from 'src/modules/storage';
import { initCustomSelects } from 'src/shared/ui/custom-select/init-custom-selects';

import { getGenerationPopoverElements } from '../lib/get-generation-popover-elements';
import { renderInsertData } from '../ui/content/render-insert-data';
import { closeActivePopover } from './close-popover';
import { registerGenerationPopoverEvents } from './register-generation-events';

export const showGenerationPopover = async (dataType: DataType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageItems();

  await loadPopoverFonts();

  const content = renderInsertData({
    dataType,
    storage,
    interfaceLanguage: storage.interfaceLanguage,
    generationLanguage: storage.generationLanguage,
  });

  const popover = createPopover({
    content,
    theme: storage.theme,
    position: target.position,
  });

  const shadowRoot = popover.shadowRoot;

  if (!shadowRoot) {
    throw new Error('Shadow root not found');
  }

  document.body.appendChild(popover);

  requestAnimationFrame(() => movePopoverInsideViewport(popover));

  initCustomSelects(shadowRoot, storage.interfaceLanguage);

  const elements = getGenerationPopoverElements(shadowRoot);

  registerGenerationPopoverEvents(elements, storage, target);

  requestAnimationFrame(() => {
    elements.lengthInput?.focus();
    elements.lengthInput?.select();
  });
};
