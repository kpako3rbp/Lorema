import { StorageSchema } from '../model/types';
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

  generationLanguage: browserLanguage,
  interfaceLanguage: browserLanguage,
};
