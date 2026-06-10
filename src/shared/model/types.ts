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
export type LinkPrefix = 'https://' | 'http://' | 'www.';
export type AddressFormat = 'short' | 'full' | 'postal' | 'legal';

export type TitleTopic = 'business' | 'it' | 'art' | 'science' | 'finance' | 'marketing';

export type TextSettings = {
  language: Language;
  length: number;
  lengthMode: LengthMode;
  keepWholeWords: boolean;
  withParagraphs: boolean;
};

export type TitleLengthPreset = LengthPreset;

export type TitleSettings = {
  language: Language;
  lengthPresets: TitleLengthPreset[];
  topics: TitleTopic[];
};

export type EmailLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;

export type EmailSettings = {
  lengthPresets: EmailLengthPreset[];
};

export type LinkLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg' | 'xlg'>;

export type LinkSettings = {
  prefix: LinkPrefix;
  lengthPresets: LinkLengthPreset[];
};

export type PhoneFormat = 'spaces' | 'dash' | 'brackets' | 'compact';

export type PhoneSettings = {
  countryCode: string;
  digitsCount: number;
  format: PhoneFormat;
};

export type AddressSettings = {
  language: Language;
  formats: AddressFormat[];
};

export type NameLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;

export type FirstNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: Language;
};

export type LastNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: Language;
};

export type StorageSchema = {
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
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
