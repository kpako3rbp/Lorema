import { getSelectedValue } from 'src/shared/lib/form-element';
import { Language, Theme } from 'src/shared/model/types';

import { POPUP_IDS } from '../config/constants';
import { ExtensionSettings } from '../model/types';

export const readExtensionSettingsFromElements = (root: HTMLElement): ExtensionSettings => {
  return {
    interfaceLanguage: getSelectedValue<Language>(root, POPUP_IDS.interfaceLanguageSelect),
    theme: getSelectedValue<Theme>(root, POPUP_IDS.themeSelect),
  };
};
