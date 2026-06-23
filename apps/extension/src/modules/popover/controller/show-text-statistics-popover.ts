import { loadPopoverFonts } from 'src/modules/popover/lib/load-popover-fonts';
import { movePopoverInsideViewport } from 'src/modules/popover/lib/move-popover-inside-viewport';
import { createPopover } from 'src/modules/popover/ui/create-popover';
import { getStorageItems } from 'src/modules/storage';
import { TextStatistics } from 'src/modules/text-statistics/model/types';
import { CursorPosition } from 'src/shared/model/types';

import { getTextStatisticsPopoverElements } from '../lib/get-text-statistics-popover-elements';
import { renderTextStatistics } from '../ui/content/render-text-statistics';
import { closeActivePopover } from './close-popover';
import { registerTextStatisticsPopoverEvents } from './register-text-statistics-popover-events';

export const showTextStatisticsPopover = async (
  statistics: TextStatistics,
  position: CursorPosition | null,
): Promise<void> => {
  const currentPosition = position ?? {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  closeActivePopover();
  const storage = await getStorageItems();

  await loadPopoverFonts();

  const content = renderTextStatistics({
    statistics,
    interfaceLanguage: storage.interfaceLanguage,
  });

  const popover = createPopover({
    content,
    theme: storage.theme,
    position: currentPosition,
  });

  const shadowRoot = popover.shadowRoot;

  if (!shadowRoot) {
    throw new Error('Shadow root not found');
  }

  document.body.appendChild(popover);

  const elements = getTextStatisticsPopoverElements(shadowRoot);

  registerTextStatisticsPopoverEvents(elements);

  requestAnimationFrame(() => movePopoverInsideViewport(popover));
};
