import { CursorPosition, Theme } from 'src/shared/model/types';

export type CreatePopoverParams = {
  content: string;
  theme: Theme;
  position: CursorPosition;
};

export type PopoverGenerationElements = {
  form: HTMLFormElement;
  lengthInput: HTMLInputElement;
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  languageSelect: HTMLSelectElement;
};

export type PopoverTextStatisticsElements = {
  cancelButton: HTMLButtonElement;
};
