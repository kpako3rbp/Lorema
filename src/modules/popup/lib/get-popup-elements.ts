import { queryOptionalElementById } from 'src/shared/lib/query-element';

import { POPUP_IDS } from '../config/constants';
import { PopupElements } from '../model/types';

export const getPopupElements = (root: HTMLElement): PopupElements => ({
  root,
  interfaceLanguageSelect: queryOptionalElementById<HTMLSelectElement>(root, POPUP_IDS.interfaceLanguageSelect),
  themeSelect: queryOptionalElementById<HTMLSelectElement>(root, POPUP_IDS.themeSelect),
  saveButton: queryOptionalElementById<HTMLButtonElement>(root, POPUP_IDS.saveButton),
  showSupportButton: queryOptionalElementById<HTMLButtonElement>(root, POPUP_IDS.showSupportButton),
  backButton: queryOptionalElementById<HTMLButtonElement>(root, POPUP_IDS.backButton),
});
