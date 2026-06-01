import { StorageSchema } from '../types';
import { getBrowserLanguage } from '../utils/get-browser-language';

const browserLanguage = getBrowserLanguage();

export const DEFAULT_STORAGE_VALUES: StorageSchema = {
  interfaceLanguage: browserLanguage,
  textSettings: {
    language: browserLanguage,
    length: 200,
    lengthMode: 'lte',
    trimToWord: true,
    withParagraphs: false,
  },
  titleSettings: {
    language: browserLanguage,
    maxLength: 50,
    topic: 'random',
  },
  emailSettings: {
    loginMaxLength: 12,
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
};
