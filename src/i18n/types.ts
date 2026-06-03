import { ContentType, TitleTopic } from 'src/shared/model/types';

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
    insert: string;
    cancel: string;
    saveHint: string;
    trimHint: string;
    generationLanguage: string;
    length: string;
    lengthMode: string;
    keepWholeWords: string;
    paragraphs: string;
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
  };

  context: {
    paste: string;
    setupAndPaste: string;
    items: Record<ContentType, string>;
  };
};
