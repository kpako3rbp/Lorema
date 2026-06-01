import { DEFAULT_STORAGE_VALUES } from '../constants';
import { Language, LegacyStorageSchema, StorageSchema } from '../types';

const isLanguage = (value: unknown): value is Language => value === Language.en || value === Language.ru;

const mergeObject = <T extends object>(defaults: T, value: unknown): T => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;

  return {
    ...defaults,
    ...(value as Partial<T>),
  };
};

const migrateLegacyStorage = async (): Promise<void> => {
  const items = (await chrome.storage.sync.get(null)) as Partial<StorageSchema> & LegacyStorageSchema;
  const textSettingsExists = Boolean(items.textSettings);

  if (!textSettingsExists && (items.charsCount || items.withParagraphs !== undefined || items.language)) {
    await chrome.storage.sync.set({
      textSettings: {
        ...DEFAULT_STORAGE_VALUES.textSettings,
        length: typeof items.charsCount === 'number' ? items.charsCount : DEFAULT_STORAGE_VALUES.textSettings.length,
        withParagraphs:
          typeof items.withParagraphs === 'boolean'
            ? items.withParagraphs
            : DEFAULT_STORAGE_VALUES.textSettings.withParagraphs,
        language: isLanguage(items.language) ? items.language : DEFAULT_STORAGE_VALUES.textSettings.language,
      },
    });
  }
};

export const getStorageItem = async <Key extends keyof StorageSchema>(key: Key): Promise<StorageSchema[Key]> => {
  await migrateLegacyStorage();
  const items = (await chrome.storage.sync.get([key])) as Partial<StorageSchema>;
  const value = items[key];
  const defaults = DEFAULT_STORAGE_VALUES[key];

  if (typeof defaults === 'object' && defaults !== null) {
    return mergeObject(defaults, value) as StorageSchema[Key];
  }

  return (value ?? defaults) as StorageSchema[Key];
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
  await migrateLegacyStorage();
  const items = (await chrome.storage.sync.get(Object.keys(DEFAULT_STORAGE_VALUES))) as Partial<StorageSchema>;
  const nextValues: Record<string, unknown> = {};

  for (const key of Object.keys(DEFAULT_STORAGE_VALUES) as Array<keyof StorageSchema>) {
    if (items[key] === undefined) {
      nextValues[key] = DEFAULT_STORAGE_VALUES[key];
    }
  }

  if (Object.keys(nextValues).length > 0) {
    await chrome.storage.sync.set(nextValues);
  }
};
