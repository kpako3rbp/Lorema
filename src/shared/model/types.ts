export enum Language {
  en = 'en',
  ru = 'ru',
}

export enum Theme {
  dark = 'dark',
  light = 'light',
}

export type LengthMode = 'lte' | 'exact';
export type InsertMode = 'quick' | 'custom';
export type LengthPreset = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
export type ContentType = 'text' | 'title' | 'email' | 'link' | 'phone' | 'address' | 'firstName' | 'lastName';
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
  keepWholeWords: boolean;
  withParagraphs: boolean;
};

export type TitleLengthPreset = LengthPreset | 'random';

export type TitleSettings = {
  language: Language;
  lengthPreset: TitleLengthPreset;
  topic: TitleTopic;
};

export type EmailSettings = {};
export type LinklSettings = {};
export type PhoneSettings = {};
export type AddressSettings = {};
export type FirstNameSettings = {};
export type LastNameSettings = {};

export type StorageSchema = {
  textSettings: TextSettings;
  titleSettings: TitleSettings;

  emailSettings: EmailSettings;
  linkSettings: LinklSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: FirstNameSettings;
  lastNameSettings: LastNameSettings;

  // Common
  generationLanguage: Language;
  interfaceLanguage: Language;
  theme: Theme;
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
