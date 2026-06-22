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
  listSettings: {
    language: browserLanguage,
    itemsCount: 5,
    lengthPresets: ['sm', 'md'],
    type: 'bullet',
  },
  numberSettings: {
    min: 1,
    max: 9999,
    multipleOf: 1,
    decimalPlaces: 0,
    decimalSeparator: 'dot',
  },

  generationLanguage: browserLanguage,
  interfaceLanguage: browserLanguage,
  theme: Theme.dark,
};
