export type LengthMode = 'lte' | 'exact';
export type LengthPreset = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
export type ContentType = 'text' | 'title' | 'email' | 'link' | 'phone' | 'address' | 'firstName' | 'lastName';
export type LinkPrefix = 'https://' | 'http://' | 'www.';
export type AddressFormat = 'short' | 'full' | 'postal' | 'legal';

export type TitleTopic = 'business' | 'it' | 'art' | 'science' | 'finance' | 'marketing';

export type TextSettings = {
  language: import('src/shared/model/types').Language;
  length: number;
  lengthMode: LengthMode;
  keepWholeSentencies: boolean;
  withParagraphs: boolean;
};

export type TitleLengthPreset = LengthPreset;

export type TitleSettings = {
  language: import('src/shared/model/types').Language;
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
  language: import('src/shared/model/types').Language;
  formats: AddressFormat[];
};

export type NameLengthPreset = Extract<LengthPreset, 'sm' | 'md' | 'lg'>;

export type FirstNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: import('src/shared/model/types').Language;
};

export type LastNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: import('src/shared/model/types').Language;
};

export type ContentSettingsByType = {
  text: TextSettings;
  title: TitleSettings;
  email: EmailSettings;
  link: LinkSettings;
  phone: PhoneSettings;
  address: AddressSettings;
  firstName: FirstNameSettings;
  lastName: LastNameSettings;
};

export type ContentSettingsKey = `${ContentType}Settings`;
