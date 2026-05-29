import { StorageSchema } from '../types';
import { getBrowserLanguage } from '../utils/get-browser-language';

const browserLanguage = getBrowserLanguage();

export const DEFAULT_STORAGE_VALUES: StorageSchema = {
  charsCount: 200,
  withParagraphs: false,
  language: browserLanguage,
  interfaceLanguage: browserLanguage,
};
