import { getStorageItems } from 'src/modules/storage';

import { POPUP_IDS } from '../config/constants';
import { PopupState } from '../model/types';
import { renderPopup } from './render-popup';

export const initPopup = async (): Promise<void> => {
  const root = document.getElementById(POPUP_IDS.popupRoot);

  if (!root) {
    throw new Error('Popup root not found');
  }

  const { interfaceLanguage, theme } = await getStorageItems(['interfaceLanguage', 'theme']);

  const state: PopupState = {
    view: 'settings',
    interfaceLanguage,
    theme,
  };

  renderPopup(root, state);
};
