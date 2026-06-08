import { Translation } from '../types';

export const TRANSLATIONS_EN: Translation = {
  popup: {
    title: 'Settings',
    charsCount: 'Character count',
    save: 'Save',
    interfaceLanguage: 'Interface language',
    donate: 'Buy me a coffee',
    saved: 'Saved!',
  },

  popover: {
    title: 'Settings',
    titleTooltip: 'Settings will be saved automatically after insertion',

    insert: 'Insert',
    insertKey: 'Enter',
    cancel: 'Cancel',
    cancelKey: 'Esc',

    saveHint: 'Settings will be used for future inserts',
    trimHint: 'In exact length mode, text may be cut off',

    generationLanguage: 'Generation language',

    textParams: 'Text parameters',
    titleParams: 'Title parameters',
    emailParams: 'Email parameters',
    linkParams: 'Link parameters',
    phoneParams: 'Phone parameters',
    addressParams: 'Address parameters',
    firstNameParams: 'First name parameters',
    lastNameParams: 'Last name parameters',

    length: 'Character count',
    lengthMode: 'Mode',
    keepWholeWords: 'Keep whole words',
    paragraphs: 'Split into paragraphs',

    maxLoginLength: 'Maximum login length',
    loginLength: 'Login length',

    prefix: 'Prefix',
    linkPrefix: 'Prefix',
    maxLinkLength: 'Maximum length after prefix',
    linkLength: 'Link size',

    phoneFormat: 'Format',
    countryCode: 'Code',
    digitsCount: 'Number of digits',

    addressFormat: 'Format',

    firstNameLength: 'First name length',
    lastNameLength: 'Last name length',

    titleLength: 'Size',
    titleTopic: 'Topic',

    addressFormatVariants: {
      short: 'Short',
      full: 'Full',
      postal: 'Postal',
      legal: 'Legal',
    },

    min: 'Minimum',
    max: 'Maximum',
    invalid: 'Invalid format',
    required: 'Required',

    lengthModeTooltip:
      'Controls how exact the character count should be. In exact mode (=), the last word may be cut off',
    keepWholeWordsTooltip: 'The text always ends with a whole word and a period',
    paragraphsCheckboxTooltip: 'Text will be split into paragraphs of 2–3 sentences',
    countryCodeTooltip: 'Country code with or without plus, for example: +7 or 7',

    contentTitles: {
      text: 'Text',
      title: 'Title',
      email: 'Email',
      link: 'Link',
      phone: 'Phone',
      address: 'Address',
      firstName: 'First name',
      lastName: 'Last name',
    },

    titleTopics: {
      random: 'Random',
      business: 'Business',
      it: 'IT',
      project: 'Project',
      task: 'Task',
      art: 'Art',
      education: 'Education',
      science: 'Science',
      travel: 'Travel',
      finance: 'Finance',
      marketing: 'Marketing',
      health: 'Health',
    },

    lengthPreset: {
      random: 'Random',
      xsm: 'Very short',
      sm: 'Short',
      md: 'Medium',
      lg: 'Long',
      xlg: 'Very long',
    },

    phoneFormatVariants: {
      compact: 'Compact',
      brackets: 'Brackets and dashes',
      dash: 'Dashes',
      spaces: 'Spaces',
    },
  },

  context: {
    paste: 'Insert Lorem Ipsum',
    setupAndPaste: '⚙︎ Customize and insert',
    items: {
      text: '📄 Lorem Ipsum',
      title: '🅰️ Title',
      email: '📧 Email',
      link: '🔗 Link',
      phone: '📱 Phone',
      address: '📍 Address',
      firstName: '👤 First name',
      lastName: '👤 Last name',
    },
  },

  theme: {
    light: 'Light',
    dark: 'Dark',
  },
};
