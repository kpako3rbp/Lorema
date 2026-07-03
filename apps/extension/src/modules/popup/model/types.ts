import { Theme } from '@extension/shared/model/types';
import { InterfaceLanguage } from '@lorema/core';

export type PopupView = 'settings' | 'support';

export type PopupElements = {
  root: HTMLElement;
  interfaceLanguageSelect: HTMLSelectElement | null;
  themeSelect: HTMLSelectElement | null;
  saveButton: HTMLButtonElement | null;
  showSupportButton: HTMLButtonElement | null;
  backButton: HTMLButtonElement | null;
};

export type ExtensionSettings = {
  interfaceLanguage: InterfaceLanguage;
  theme: Theme;
};

export type PopupState = {
  view: PopupView;
  interfaceLanguage: InterfaceLanguage;
  theme: Theme;
};
