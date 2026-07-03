import { EditableTargetSnapshot } from '@extension/modules/editable-target';
import { getStorageItems } from '@extension/modules/storage';
import { initCustomSelects } from '@extension/shared/ui/custom-select/init-custom-selects';
import { DataType } from '@lorema/core';

import { getGenerationPopoverElements } from '../lib/get-generation-popover-elements';
import { loadPopoverFonts } from '../lib/load-popover-fonts';
import { movePopoverInsideViewport } from '../lib/move-popover-inside-viewport';
import { renderInsertData } from '../ui/content/render-insert-data';
import { createPopover } from '../ui/create-popover';
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
