import { ContentType, Language, StorageSchema } from 'src/shared/model/types';

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
