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

export type TitleLengthPreset = LengthPreset;
export type TitleLengthSelectOption = TitleLengthPreset | 'random';

export type TitleSettings = {
  language: Language;
  lengthPreset: TitleLengthSelectOption;
  topic: TitleTopic;
};

export type EmailLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;
export type EmailLengthSelectOption = EmailLengthPreset | 'random';

export type EmailSettings = {
  lengthPreset: EmailLengthSelectOption;
};

export type LinkLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg' | 'xlg'>;
export type LinkLengthSelectOption = LinkLengthPreset | 'random';

export type LinkSettings = {
  prefix: LinkPrefix;
  lengthPreset: LinkLengthSelectOption;
};

export type PhoneFormat = 'spaces' | 'dash' | 'brackets' | 'compact';

export type PhoneSettings = {
  countryCode: string;
  digitsCount: number;
  format: PhoneFormat;
};

export type AddressSettings = {
  language: Language;
  format: AddressFormat;
};

export type FirstNameLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;

export type FirstNameSettings = {
  lengthPreset: FirstNameSettings;
  language: Language;
};

export type LastNameLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;

export type LastNameSettings = {
  lengthPreset: LastNameLengthPreset;
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
