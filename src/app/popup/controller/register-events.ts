import { TRANSLATIONS } from 'src/i18n';
import { setStorageItem } from 'src/shared/lib/storage';

import { POPUP_CLOSE_DELAY } from '../config/constants';
import { readExtensionSettingsFromElements } from '../lib/read-extension-settings-from-elements';
import { PopupElements, PopupState } from '../model/types';

export const registerPopupEvents = (elements: PopupElements, state: PopupState, rerender: () => void): void => {
  const { interfaceLanguageSelect, themeSelect, saveButton, showSupportButton, backButton } = elements;

  interfaceLanguageSelect?.addEventListener('change', () => handleSettingsChange(elements, state, rerender));
  themeSelect?.addEventListener('change', () => handleSettingsChange(elements, state, rerender));

  saveButton?.addEventListener('click', () => {
    void handleSaveSettings(elements, state);
  });

  showSupportButton?.addEventListener('click', () => {
    state.view = 'support';
    rerender();
  });

  backButton?.addEventListener('click', () => {
    state.view = 'settings';
    rerender();
  });
};

const handleSettingsChange = (elements: PopupElements, state: PopupState, rerender: () => void): void => {
  const { interfaceLanguage, theme } = readExtensionSettingsFromElements(elements.root);

  state.interfaceLanguage = interfaceLanguage;
  state.theme = theme;

  rerender();
};

const handleSaveSettings = async (elements: PopupElements, state: PopupState): Promise<void> => {
  await Promise.all([
    setStorageItem('interfaceLanguage', state.interfaceLanguage),
    setStorageItem('generationLanguage', state.interfaceLanguage),
    setStorageItem('theme', state.theme),
  ]);

  const saveButton = elements.saveButton;

  if (saveButton) {
    saveButton.textContent = TRANSLATIONS[state.interfaceLanguage].popup.settings.saved;
  }

  setTimeout(() => window.close(), POPUP_CLOSE_DELAY);
};
