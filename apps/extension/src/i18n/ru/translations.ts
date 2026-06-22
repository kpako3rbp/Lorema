import { Translation } from '../types';

export const TRANSLATIONS_RU: Translation = {
  popup: {
    descriptor: 'генератор контента',
    github: 'GitHub',
    reportBug: 'Сообщить о баге',
    feedback: 'Оставить отзыв',

    settings: {
      title: 'Настройки',
      save: 'Сохранить настройки',
      interfaceLanguage: 'Язык интерфейса',
      theme: 'Тема',
      donate: 'Купить мне кофе',
      saved: 'Сохранено!',
      likeExtension: 'Нравится расширение?',
      supportDeveloper: 'Отблагодарить разработчика',
      description: 'Кликните ПКМ по текстовому полю, чтобы быстро вставить контент или настроить его перед вставкой',
    },
    support: {
      back: '← Вернуться назад',
      thanks: 'Спасибо, что пользуетесь Lorema 💙',
      description: 'Если расширение вам нравится, вы можете угостить разработчика кофе ☕ или оставить отзыв ⭐',
      rubles: 'Рубли',
      sbp: 'Перевод по СБП',
      crypto: 'Криптовалюта',
      copy: 'Скопировать',
      copied: 'Кошелек скопирован',
    },
  },

  popover: {
    dataGeneration: {
      title: 'Настройки',
      titleTooltip: 'Настройки для всех категорий сохранятся автоматически после вставки',

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
      fullNameParams: 'Параметры имени и фамилии',

      length: 'Количество символов',
      lengthMode: 'Режим',
      keepWholeSentencies: 'Не обрезать предложения',
      paragraphs: 'Разбить на абзацы',

      maxLoginLength: 'Максимальная длина логина',
      loginLength: 'Длина логина',

      prefix: 'Префикс',
      linkPrefix: 'Префикс',
      maxLinkLength: 'Максимальная длина после префикса',
      linkLength: 'Размер ссылки',

      phoneFormat: 'Формат',
      countryCode: 'Код',
      domain: 'Домен',
      digitsCount: 'Количество цифр',

      addressFormat: 'Формат',

      firstNameLength: 'Размер имени',
      lastNameLength: 'Размер фамилии',

      listParams: 'Параметры списка',
      listItemsCount: 'Пункты',
      listItemLength: 'Размер пункта',
      listType: 'Тип списка',

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
      maxWarning: 'Если указать слишком мало символов, предложения могут обрезаться',
      invalid: 'Неверный формат',
      required: 'Обязательно',

      lengthModeTooltip: 'Выбор точности количества символов. В строгом режиме (=) последнее слово может обрезаться',
      keepWholeSentenciesTooltip: 'Последнее предложение всегда будет полным с точкой в конце',
      paragraphsCheckboxTooltip: 'Текст будет разбит на абзацы по 2–4 предложения',
      countryCodeTooltip: 'Код страны с плюсом или без, например: +7 или 7',
      domainTooltip: 'Опционально. Если не задать, будет сгенерирован автоматически',

      dataTitles: {
        text: 'Текст',
        title: 'Заголовок',
        email: 'Email',
        link: 'Ссылка',
        phone: 'Телефон',
        address: 'Адрес',
        person: 'Имя',
        list: 'Список',
        // number: 'Число',
        // date: 'Дата',
      },

      titleTopics: {
        business: 'Бизнес',
        it: 'IT',
        art: 'Искусство',
        science: 'Наука',
        finance: 'Финансы',
        marketing: 'Маркетинг',
      },

      lengthPreset: {
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

      listTypeVariants: {
        bullet: 'Маркированный',
        numbered: 'Нумерованный',
      },
    },
    textStatistics: {
      title: 'Подсчет символов',
      characters: 'Всего символов',
      charactersWithoutSpaces: 'Без пробелов',
      spaces: 'Пробелов',
      words: 'Слов',
      sentences: 'Предложений',
      paragraphs: 'Абзацев',
    },
  },

  context: {
    paste: 'Вставить контент',
    setupAndPaste: '⚙︎ Настроить и вставить',
    calculateTextStatistics: 'Посчитать символы',
    items: {
      text: '📄 Текст-рыба',
      title: '🅰️ Заголовок',
      email: '📧 Email',
      link: '🔗 Ссылка',
      phone: '📱 Телефон',
      address: '📍 Адрес',
      firstName: '🖊️ Имя',
      lastName: '🖊️ Фамилия',
      fullName: '🧑 Имя и фамилия',
      list: '📋 Список',
      // number: '🔢 Число',
      // date: '📅 Дата',
    },
  },

  theme: {
    light: 'Светлая',
    dark: 'Темная',
  },

  customSelect: {
    selected: 'Выбрано',
    random: 'Случайно',
  },
};
