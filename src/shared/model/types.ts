export enum Language {
  en = 'en',
  ru = 'ru',
}

export type LengthMode = 'lte' | 'exact';
export type InsertMode = 'quick' | 'custom';
export type ContentType = 'text' | 'title';
export type TitleTopic =
  | 'random'
  | 'business'
  | 'it'
  | 'project'
  | 'task'
  | 'art'
  | 'education'
  | 'science'
  | 'travel'
  | 'finance'
  | 'marketing'
  | 'health';

export type TextSettings = {
  language: Language;
  length: number;
  lengthMode: LengthMode;
  trimToWord: boolean;
  withParagraphs: boolean;
};

export type TitleSettings = {
  language: Language;
  maxLength: number;
  topic: TitleTopic;
};

export type StorageSchema = {
  textSettings: TextSettings;
  titleSettings: TitleSettings;

  // Common
  generationLanguage: Language;
  interfaceLanguage: Language;
};

export type ExtensionMessage =
  | {
      type: 'INSERT_CONTENT_FROM_CONTEXT_MENU';
      mode: InsertMode;
      contentType: ContentType;
    }
  | {
      type: 'INSERT_CONTENT_FROM_HOTKEY';
      mode: InsertMode;
      contentType: ContentType;
    }
  | {
      type: 'UPDATE_CONTEXT_MENU';
    };
