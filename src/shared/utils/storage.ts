import { DEFAULT_STORAGE_VALUES } from '../config/storage';
import { type StorageSchema } from '../model/types';

const mergeObject = <T extends object>(defaults: T, value: unknown): T => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;

  return {
    ...defaults,
    ...(value as Partial<T>),
  };
};

export const getStorageItem = async <Key extends keyof StorageSchema>(key: Key): Promise<StorageSchema[Key]> => {
  const items = (await chrome.storage.sync.get([key])) as Partial<StorageSchema>;
  const value = items[key];
  const defaults = DEFAULT_STORAGE_VALUES[key];

  if (typeof defaults === 'object' && defaults !== null) {
    return mergeObject(defaults, value) as StorageSchema[Key];
  }

  return value ?? defaults;
};

export const setStorageItem = async <Key extends keyof StorageSchema>(
  key: Key,
  value: StorageSchema[Key],
): Promise<void> => {
  await chrome.storage.sync.set({
    [key]: value,
  });
};

export const ensureDefaultStorage = async (): Promise<void> => {
  const storageKeys = Object.keys(DEFAULT_STORAGE_VALUES) as Array<keyof StorageSchema>;
  const items = (await chrome.storage.sync.get(storageKeys)) as Partial<StorageSchema>;

  const nextValues = storageKeys.reduce<Record<string, unknown>>((acc, key) => {
    if (items[key] === undefined) {
      acc[key] = DEFAULT_STORAGE_VALUES[key];
    }

    return acc;
  }, {});

  if (Object.keys(nextValues).length > 0) {
    await chrome.storage.sync.set(nextValues);
  }
};

export const getStorageItems = async (): Promise<StorageSchema> => ({
  titleSettings: await getStorageItem('titleSettings'),
  textSettings: await getStorageItem('textSettings'),
  interfaceLanguage: await getStorageItem('interfaceLanguage'),
  generationLanguage: await getStorageItem('generationLanguage'),
});
