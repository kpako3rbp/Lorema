import { DEFAULT_STORAGE_VALUES } from '../config/default-storage-values';
import { StorageSchema } from '../model/storage-schema';

const mergeObject = <T extends object>(defaults: T, value: unknown): T => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;

  return {
    ...defaults,
    ...(value as Partial<T>),
  };
};

const normalizeStorageValue = <Key extends keyof StorageSchema>(key: Key, value: unknown): StorageSchema[Key] => {
  const defaults = DEFAULT_STORAGE_VALUES[key];

  if (typeof defaults === 'object' && defaults !== null) {
    return mergeObject(defaults, value) as StorageSchema[Key];
  }

  return (value ?? defaults) as StorageSchema[Key];
};

export const getStorageItem = async <Key extends keyof StorageSchema>(key: Key): Promise<StorageSchema[Key]> => {
  const items = (await chrome.storage.sync.get([key])) as Partial<StorageSchema>;

  return normalizeStorageValue(key, items[key]);
};

export const setStorageItem = async <Key extends keyof StorageSchema>(
  key: Key,
  value: StorageSchema[Key],
): Promise<void> => {
  await chrome.storage.sync.set({
    [key]: value,
  });
};

export const getStorageItems = async <Key extends keyof StorageSchema>(
  keys?: readonly Key[],
): Promise<StorageSchema | Pick<StorageSchema, Key>> => {
  const storageKeys = keys ?? (Object.keys(DEFAULT_STORAGE_VALUES) as Key[]);
  const items = (await chrome.storage.sync.get(storageKeys)) as Partial<StorageSchema>;

  return storageKeys.reduce<Partial<StorageSchema>>((acc, key) => {
    acc[key] = normalizeStorageValue(key, items[key]);

    return acc;
  }, {}) as StorageSchema | Pick<StorageSchema, Key>;
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
