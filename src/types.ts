export enum Language {
  en = 'en',
  ru = 'ru',
}

export type LengthMode = 'lte' | 'exact';
export type InsertMode = 'quick' | 'custom';
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
export type LinkPrefix = 'https://' | 'http://' | 'www.';
export type AddressFormat = 'short' | 'medium' | 'full';

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

export type EmailSettings = {
  loginMaxLength: number;
};

export type LinkSettings = {
  prefix: LinkPrefix;
  maxLength: number;
};

export type PhoneSettings = {
  countryCode: string;
  digitsCount: number;
};

export type AddressSettings = {
  language: Language;
  format: AddressFormat;
};

export type PersonNameSettings = {
  language: Language;
};

export type StorageSchema = {
  interfaceLanguage: Language;
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: PersonNameSettings;
  lastNameSettings: PersonNameSettings;
};

export type LegacyStorageSchema = {
  charsCount?: number;
  withParagraphs?: boolean;
  language?: Language;
  interfaceLanguage?: Language;
};

export type TextParts = {
  starts: string[];
  subjects: string[];
  predicates: string[];
  objects: string[];
  endings: string[];
};

export type ExtensionMessage =
  | {
      type: 'INSERT_CONTENT';
      mode: InsertMode;
      contentType: ContentType;
    }
  | {
      type: 'UPDATE_CONTEXT_MENU';
    };
