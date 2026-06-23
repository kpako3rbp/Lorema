import { InterfaceLanguage } from '@lorema/core';
import { Theme } from 'src/shared/model/types';

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
