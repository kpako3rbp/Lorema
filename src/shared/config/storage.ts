import { StorageSchema, Theme } from '../model/types';
import { getBrowserLanguage } from '../utils/get-browser-language';

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
    lengthPreset: 'md',
    topic: 'random',
  },
  emailSettings: {
    lengthPreset: 'sm',
  },
  linkSettings: {
    prefix: 'https://',
    maxLength: 40,
  },
  phoneSettings: {
    countryCode: '+7',
    digitsCount: 10,
  },
  addressSettings: {
    language: browserLanguage,
    format: 'short',
  },
  firstNameSettings: {
    language: browserLanguage,
  },
  lastNameSettings: {
    language: browserLanguage,
  },

  generationLanguage: browserLanguage,
  interfaceLanguage: browserLanguage,
  theme: Theme.light,
};
