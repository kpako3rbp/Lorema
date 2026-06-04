import { ContentType, LengthPreset, TitleTopic } from 'src/shared/model/types';

export type Translation = {
  popup: {
    title: string;
    charsCount: string;
    save: string;
    interfaceLanguage: string;
    donate: string;
    saved: string;
  };

  popover: {
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

    length: string;
    lengthMode: string;
    keepWholeWords: string;
    paragraphs: string;
    lengthModeTooltip: string;
    keepWholeWordsTooltip: string;
    paragraphsCheckboxTooltip: string;

    maxLoginLength: string;
    prefix: string;
    maxLinkLength: string;
    countryCode: string;
    digitsCount: string;
    addressFormat: string;

    titleLength: string;
    titleTopic: string;

    contentTitles: Record<ContentType, string>;
    titleTopics: Record<TitleTopic, string>;
    lengthPreset: Record<LengthPreset | 'random', string>;
  };

  context: {
    paste: string;
    setupAndPaste: string;
    items: Record<ContentType, string>;
  };
};
