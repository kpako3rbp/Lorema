import { AddressFormat, ContentType, LinkPrefix, TitleTopic } from '../types';

export type Translation = {
  popup: {
    title: string;
    interfaceLanguage: string;
    donate: string;
    instruction: string;
  };
  popover: {
    insert: string;
    cancel: string;
    saveHint: string;
    generationLanguage: string;
    length: string;
    lengthMode: string;
    trimToWord: string;
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
    addressFormats: Record<AddressFormat, string>;
    linkPrefixes: Record<LinkPrefix, string>;
  };
  context: {
    quickRoot: string;
    customRoot: string;
    items: Record<ContentType, string>;
  };
};
