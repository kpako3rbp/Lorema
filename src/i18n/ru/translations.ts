import { Translation } from '../types';

export const TRANSLATIONS_RU: Translation = {
  popup: {
    title: 'Настройки',
    charsCount: 'Количество символов',
    save: 'Сохранить',
    interfaceLanguage: 'Язык интерфейса',
    donate: 'Купить мне кофе',
    saved: 'Сохранено!',
  },

  popover: {
    title: 'Настройки',
    titleTooltip: 'Настройки сохранятся автоматически после вставки',

    insert: 'Вставить',
    insertKey: 'Enter',
    cancel: 'Отмена',
    cancelKey: 'Esc',

    saveHint: 'Настройки будут использованы при дальнейших вставках',
    trimHint: 'При выборе строгого равенства текст может обрезаться',

    generationLanguage: 'Язык генерации',

    textParams: 'Параметры текста',
    titleParams: 'Параметры заголовка',
    emailParams: 'Параметры email',
    linkParams: 'Параметры ссылки',
    phoneParams: 'Параметры телефона',
    addressParams: 'Параметры адреса',
    firstNameParams: 'Параметры имени',
    lastNameParams: 'Параметры фамилии',

    length: 'Количество символов',
    lengthMode: 'Режим',
    keepWholeWords: 'Не обрезать слова',
    paragraphs: 'Разбить на абзацы',

    maxLoginLength: 'Максимальная длина логина',
    loginLength: 'Длина логина',

    prefix: 'Префикс',
    linkPrefix: 'Префикс',
    maxLinkLength: 'Максимальная длина после префикса',
    linkLength: 'Размер ссылки',

    phoneFormat: 'Формат',
    countryCode: 'Код',
    digitsCount: 'Количество цифр',

    addressFormat: 'Формат',

    firstNameLength: 'Размер имени',
    lastNameLength: 'Размер фамилии',

    titleLength: 'Размер',
    titleTopic: 'Тема',

    addressFormatVariants: {
      short: 'Короткий',
      full: 'Подробный',
      postal: 'Почтовый',
      legal: 'Юридический',
    },

    min: 'Минимум',
    max: 'Максимум',
    invalid: 'Неверный формат',
    required: 'Обязательно',

    lengthModeTooltip: 'Выбор точности количества символов. В строгом режиме (=) последнее слово может обрезаться',
    keepWholeWordsTooltip: 'В конце предложения всегда целое слово с точкой',
    paragraphsCheckboxTooltip: 'Текст будет разбит на абзацы по 2–3 предложения',
    countryCodeTooltip: 'Код страны с плюсом или без, например: +7 или 7',

    contentTitles: {
      text: 'Текст',
      title: 'Заголовок',
      email: 'Email',
      link: 'Ссылка',
      phone: 'Телефон',
      address: 'Адрес',
      firstName: 'Имя',
      lastName: 'Фамилия',
    },

    titleTopics: {
      random: 'Случайно',
      business: 'Бизнес',
      it: 'IT',
      art: 'Искусство',
      science: 'Наука',
      finance: 'Финансы',
      marketing: 'Маркетинг',
    },

    lengthPreset: {
      random: 'Случайно',
      xsm: 'Очень короткий',
      sm: 'Короткий',
      md: 'Средний',
      lg: 'Длинный',
      xlg: 'Очень длинный',
    },

    phoneFormatVariants: {
      compact: 'Слитно',
      brackets: 'Скобки и дефисы',
      dash: 'Дефисы',
      spaces: 'Пробелы',
    },
  },

  context: {
    paste: 'Вставить текст-рыбу',
    setupAndPaste: '⚙︎ Настроить и вставить',
    items: {
      text: '📄 Текст-рыба',
      title: '🅰️ Заголовок',
      email: '📧 Email',
      link: '🔗 Ссылка',
      phone: '📱 Телефон',
      address: '📍 Адрес',
      firstName: '👤 Имя',
      lastName: '👤 Фамилия',
    },
  },

  theme: {
    light: 'Светлая',
    dark: 'Темная',
  },
};
