import { Language, Theme } from 'src/shared/model/types';

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
  interfaceLanguage: Language;
  theme: Theme;
};

export type PopupState = {
  view: PopupView;
  interfaceLanguage: Language;
  theme: Theme;
};
