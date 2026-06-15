import { ContentType, StorageSchema } from 'src/features/content-generation/model';
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
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  languageSelect: HTMLSelectElement;
};
