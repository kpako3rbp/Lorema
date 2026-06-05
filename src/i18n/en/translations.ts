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
    insert: 'Insert',
    insertKey: 'Enter',
    cancel: 'Cancel',
    cancelKey: 'Esc',
    saveHint: 'Settings will be used for future inserts',
    trimHint: 'In exact length mode, text may be cut off',
    generationLanguage: 'Generation language',

    textParams: 'Text parameters',
    titleParams: 'Title parameters',

    length: 'Character count',
    lengthMode: 'Mode',
    keepWholeWords: 'Keep whole words',
    paragraphs: 'Split into paragraphs',
    lengthModeTooltip: 'In exact length mode, words may be cut off',
    keepWholeWordsTooltip: 'The text always ends with a whole word and a period',
    paragraphsCheckboxTooltip: 'Text will be split into paragraphs of 2–3 sentences',

    maxLoginLength: 'Maximum login length',
    prefix: 'Prefix',
    maxLinkLength: 'Maximum length after prefix',
    countryCode: 'Country code',
    digitsCount: 'Number of digits after code',
    addressFormat: 'Address format',

    titleLength: 'Size',
    titleTopic: 'Topic',

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
