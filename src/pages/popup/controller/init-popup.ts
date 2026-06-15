import { getStorageItems } from 'src/entities/generation-settings/lib/storage';

import { POPUP_IDS } from '../config/constants';
import { PopupState } from '../model/types';
import { renderPopup } from './render-popup';

export const initPopup = async (): Promise<void> => {
  const root = document.getElementById(POPUP_IDS.popupRoot);

  if (!root) {
    throw new Error('Popup root not found');
  }

  const { interfaceLanguage, theme } = await getStorageItems();

  const state: PopupState = {
    view: 'settings',
    interfaceLanguage,
    theme,
  };

  renderPopup(root, state);
};
