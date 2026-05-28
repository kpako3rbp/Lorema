import { type StorageSchema } from '../types';
import { getBrowserLanguage } from './get-browser-language';

const DEFAULT_STORAGE_VALUES: StorageSchema = {
  charsCount: 300,
  withParagraphs: false,
  language: getBrowserLanguage(),
  interfaceLanguage: getBrowserLanguage(),
};

export const getStorageItem = async <Key extends keyof StorageSchema>(key: Key): Promise<StorageSchema[Key]> => {
  const items = await chrome.storage.sync.get([key]);

  return items[key] ?? DEFAULT_STORAGE_VALUES[key];
};

export const setStorageItem = async <Key extends keyof StorageSchema>(
  key: Key,
  value: StorageSchema[Key],
): Promise<void> => {
  await chrome.storage.sync.set({
    [key]: value,
  });
};
