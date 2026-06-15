import {
  AddressFormat,
  ContentType,
  LengthPreset,
  PhoneFormat,
  TitleTopic,
} from 'src/entities/generation-settings/model';

type ThemeTranslation = {
  light: string;
  dark: string;
};

type CustomSelectTranslation = {
  selected: string;
  random: string;
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
  keepWholeSentencies: string;
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
  maxWarning: string;
  invalid: string;
  required: string;

  lengthModeTooltip: string;
  keepWholeSentenciesTooltip: string;
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

type PopupSupportTranslation = {
  back: string;
  thanks: string;
  description: string;
  rubles: string;
  sbp: string;
  crypto: string;
  copy: string;
  copied: string;
};

type PopupSettingsTranslation = {
  title: string;
  save: string;
  interfaceLanguage: string;
  theme: string;
  donate: string;
  saved: string;
  likeExtension: string;
  supportDeveloper: string;
};

export type Translation = {
  popup: {
    descriptor: string;

    settings: PopupSettingsTranslation;
    support: PopupSupportTranslation;

    github: string;
    reportBug: string;
    feedback: string;
  };
  popover: PopoverTranslation;
  context: ContextTranslation;
  customSelect: CustomSelectTranslation;
  theme: ThemeTranslation;
};
