import { AddressFormat, ContentType, LengthPreset, PhoneFormat, TitleTopic } from 'src/shared/model/types';

type ThemeTranslation = {
  light: string;
  dark: string;
};

type CustomSelectTranslation = {
  selected: string;
  random: string;
};

type PopupTranslation = {
  title: string;
  save: string;
  interfaceLanguage: string;
  theme: string;
  donate: string;
  saved: string;
};

type PopoverTranslation = {
  title: string;
  titleTooltip: string;

  insert: string;
  insertKey: string;
  cancel: string;
  cancelKey: string;

  saveHint: string;
  trimHint: string;

  generationLanguage: string;

  textParams: string;
  titleParams: string;
  emailParams: string;
  linkParams: string;
  phoneParams: string;
  addressParams: string;
  firstNameParams: string;
  lastNameParams: string;

  length: string;
  lengthMode: string;
  keepWholeWords: string;
  paragraphs: string;

  maxLoginLength: string;
  loginLength: string;

  prefix: string;
  linkPrefix: string;
  maxLinkLength: string;
  linkLength: string;

  phoneFormat: string;
  countryCode: string;
  digitsCount: string;

  addressFormat: string;

  firstNameLength: string;
  lastNameLength: string;

  titleLength: string;
  titleTopic: string;

  min: string;
  max: string;
  invalid: string;
  required: string;

  lengthModeTooltip: string;
  keepWholeWordsTooltip: string;
  paragraphsCheckboxTooltip: string;
  countryCodeTooltip: string;

  contentTitles: Record<ContentType, string>;
  titleTopics: Record<TitleTopic, string>;
  lengthPreset: Record<LengthPreset, string>;
  phoneFormatVariants: Record<PhoneFormat, string>;
  addressFormatVariants: Record<AddressFormat, string>;
};

type ContextTranslation = {
  paste: string;
  setupAndPaste: string;
  items: Record<ContentType, string>;
};

export type Translation = {
  popup: PopupTranslation;
  popover: PopoverTranslation;
  context: ContextTranslation;
  customSelect: CustomSelectTranslation;
  theme: ThemeTranslation;
};
