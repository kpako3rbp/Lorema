import { getBrowserLanguage } from '../lib/get-browser-language';
import { StorageSchema, Theme } from '../model/types';

const browserLanguage = getBrowserLanguage();

export const DEFAULT_STORAGE_VALUES: StorageSchema = {
  textSettings: {
    language: browserLanguage,
    length: 200,
    lengthMode: 'lte',
    keepWholeWords: true,
    withParagraphs: false,
  },
  titleSettings: {
    language: browserLanguage,
    lengthPresets: ['sm', 'md'],
    topics: [],
  },
  emailSettings: {
    lengthPresets: ['sm', 'md'],
  },
  linkSettings: {
    prefix: 'https://',
    lengthPresets: ['sm', 'md'],
  },
  phoneSettings: {
    countryCode: '+7',
    digitsCount: 10,
    format: 'compact',
  },
  addressSettings: {
    language: browserLanguage,
    formats: ['full'],
  },
  firstNameSettings: {
    lengthPresets: [],
    language: browserLanguage,
  },
  lastNameSettings: {
    lengthPresets: [],
    language: browserLanguage,
  },

  generationLanguage: browserLanguage,
  interfaceLanguage: browserLanguage,
  theme: Theme.light,
};
