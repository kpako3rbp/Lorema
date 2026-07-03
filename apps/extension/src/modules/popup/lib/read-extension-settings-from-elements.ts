import { getSelectedValue } from '@extension/shared/lib/form-element';
import { Theme } from '@extension/shared/model/types';
import { InterfaceLanguage } from '@lorema/core';

import { POPUP_IDS } from '../config/constants';
import { ExtensionSettings } from '../model/types';

export const readExtensionSettingsFromElements = (root: HTMLElement): ExtensionSettings => {
  return {
    interfaceLanguage: getSelectedValue<InterfaceLanguage>(root, POPUP_IDS.interfaceLanguageSelect),
    theme: getSelectedValue<Theme>(root, POPUP_IDS.themeSelect),
  };
};
