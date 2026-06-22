import { Translation } from '../types';

export const TRANSLATIONS_EN: Translation = {
  popup: {
    descriptor: 'content generator',
    github: 'GitHub',
    reportBug: 'Report a bug',
    feedback: 'Leave feedback',

    settings: {
      title: 'Settings',
      save: 'Save settings',
      interfaceLanguage: 'Interface language',
      theme: 'Theme',
      donate: 'Buy me a coffee',
      saved: 'Saved!',
      likeExtension: 'Enjoying Lorema?',
      supportDeveloper: 'Enjoying Lorema? Buy me a coffee',
      description: 'Right-click a text field to insert content instantly or customize it before inserting',
    },

    support: {
      back: '← Back to settings',
      thanks: 'Thank you for using Lorema 💙',
      description: 'If you enjoy using the extension, you can buy the developer a coffee ☕ or leave a feedback ⭐',
      rubles: 'Rubles',
      sbp: 'Faster Payment System Russia',
      crypto: 'Cryptocurrency',
      copy: 'Copy',
      copied: 'Wallet copied',
    },
  },

  popover: {
    dataGeneration: {
      title: 'Settings',
      titleTooltip: 'Settings for all categories will be saved automatically after insertion',

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
      fullNameParams: 'Full name parameters',

      length: 'Character count',
      lengthMode: 'Mode',
      keepWholeSentencies: 'Keep whole sentencies',
      paragraphs: 'Split into paragraphs',

      maxLoginLength: 'Maximum login length',
      loginLength: 'Login length',

      prefix: 'Prefix',
      linkPrefix: 'Prefix',
      maxLinkLength: 'Maximum length after prefix',
      linkLength: 'Link size',

      phoneFormat: 'Format',
      countryCode: 'Code',
      domain: 'Domain',
      digitsCount: 'Number of digits',

      addressFormat: 'Format',

      firstNameLength: 'First name length',
      lastNameLength: 'Last name length',

      listParams: 'List parameters',
      listItemsCount: 'Items',
      listItemLength: 'Item size',
      listType: 'List type',

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
      maxWarning: 'If the character limit is too low, sentences may be truncated',
      invalid: 'Invalid format',
      required: 'Required',

      lengthModeTooltip:
        'Controls how exact the character count should be. In exact mode (=), the last word may be cut off',
      keepWholeSentenciesTooltip: 'The last sentence will always be complete with a dot at the end',
      paragraphsCheckboxTooltip: 'Text will be split into paragraphs of 2–3 sentences',
      countryCodeTooltip: 'Country code with or without plus, for example: +7 or 7',
      domainTooltip: 'Optional. If not specified, it will be generated automatically',
      decimalPlacesTooltip: 'Number of digits after the decimal separator. Set 0 if you need whole numbers',
      multipleOfTooltip: 'By default, numbers are generated as multiples of 1',

      dataTitles: {
        text: 'Text',
        title: 'Title',
        email: 'Email',
        link: 'Link',
        phone: 'Phone',
        address: 'Address',
        person: 'Person',
        list: 'List',
        number: 'Number',
      },

      titleTopics: {
        business: 'Business',
        it: 'IT',
        art: 'Art',
        science: 'Science',
        finance: 'Finance',
        marketing: 'Marketing',
      },

      lengthPreset: {
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

      listTypeVariants: { bullet: 'Bulleted', numbered: 'Numbered' },

      number: 'Number',
      numberParams: 'Number parameters',
      numberMin: 'From',
      numberMax: 'To',
      numberMultipleOf: 'Multiple of',
      numberDecimalPlaces: 'Decimal places',
      numberDecimalSeparator: 'Separator',
      numberDecimalSeparatorVariants: {
        dot: 'Dot',
        comma: 'Comma',
      },
    },
    textStatistics: {
      title: 'Character count',
      characters: 'Total characters',
      charactersWithoutSpaces: 'Without spaces',
      spaces: 'Spaces',
      words: 'Words',
      sentences: 'Sentences',
      paragraphs: 'Paragraphs',
    },
  },

  context: {
    paste: 'Insert content',
    setupAndPaste: '⚙︎ Customize and insert',
    calculateTextStatistics: 'Count characters',
    items: {
      text: '📄 Lorem Ipsum',
      title: '🅰️ Title',
      email: '📧 Email',
      link: '🔗 Link',
      phone: '📱 Phone',
      address: '📍 Address',
      firstName: '👤 First name',
      lastName: '👤 Last name',
      fullName: '🧑 Full name',
      list: '📋 List',
      number: '🔢 Число',
      // date: '📅 Дата',
    },
  },

  theme: {
    light: 'Light',
    dark: 'Dark',
  },

  customSelect: {
    selected: 'Selected',
    random: 'Random',
  },
};
