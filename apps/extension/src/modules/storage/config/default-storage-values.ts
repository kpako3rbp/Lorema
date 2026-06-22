import { getBrowserLanguage } from 'src/shared/lib/get-browser-language';
import { Theme } from 'src/shared/model/types';

import { StorageSchema } from '../model/storage-schema';

const browserLanguage = getBrowserLanguage();

export const DEFAULT_STORAGE_VALUES: StorageSchema = {
  textSettings: {
    language: browserLanguage,
    length: 200,
    lengthMode: 'lte',
    keepWholeSentencies: true,
    withParagraphs: false,
  },
  titleSettings: {
    language: browserLanguage,
    lengthPresets: ['sm', 'md'],
    topics: [],
  },
  emailSettings: {
    lengthPresets: ['sm', 'md'],
    domain: '',
  },
  linkSettings: {
    prefix: 'https://',
    domain: '',
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
  theme: Theme.dark,
};
