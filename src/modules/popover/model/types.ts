import { ContentType } from 'src/modules/content-type';
import { StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';

export type PopoverPosition = {
  x: number;
  y: number;
};

export type CreatePopoverParams = {
  contentType: ContentType;
  storage: StorageSchema;
  interfaceLanguage: Language;
  generationLanguage: Language;
  position: PopoverPosition;
};

export type PopoverElements = {
  form: HTMLFormElement;
  lengthInput: HTMLInputElement;
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  languageSelect: HTMLSelectElement;
};
