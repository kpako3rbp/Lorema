import { initCopyElements } from 'src/shared/ui/copy-element/init-copy-element';
import { initCustomSelects } from 'src/shared/ui/custom-select/init-custom-selects';

import { getPopupElements } from '../lib/get-popup-elements';
import { PopupState } from '../model/types';
import { createPopup } from '../ui/create-popup';
import { registerPopupEvents } from './register-events';

export const renderPopup = (root: HTMLElement, state: PopupState): void => {
  root.innerHTML = createPopup(state);

  document.documentElement.lang = state.interfaceLanguage;
  document.documentElement.dataset.theme = state.theme;

  initCustomSelects(root, state.interfaceLanguage);
  initCopyElements({ root });

  const elements = getPopupElements(root);

  registerPopupEvents(elements, state, () => {
    renderPopup(root, state);
  });
};
