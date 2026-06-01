import { ContentType, Language, StorageSchema } from '../types';

export type PopoverPosition = {
  x: number;
  y: number;
};

export type CreatePopoverParams = {
  contentType: ContentType;
  storage: StorageSchema;
  interfaceLanguage: Language;
  position: PopoverPosition;
};
