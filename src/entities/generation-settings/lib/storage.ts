import { getExtensionSettings } from 'src/entities/extension-settings/lib/storage';
import { getChromeStorageItems, setChromeStorageItems } from 'src/shared/api/chrome-storage';

import { DEFAULT_GENERATION_SETTINGS } from '../config/default-generation-settings';
import { GenerationSettings } from '../model';

const mergeObject = <T extends object>(defaults: T, value: unknown): T => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;

  return {
    ...defaults,
    ...(value as Partial<T>),
  };
};

export const getGenerationSetting = async <Key extends keyof GenerationSettings>(
  key: Key,
): Promise<GenerationSettings[Key]> => {
  const items = await getChromeStorageItems<GenerationSettings, Key>([key]);
  const value = items[key];
  const defaults = DEFAULT_GENERATION_SETTINGS[key];

  return mergeObject(defaults, value) as GenerationSettings[Key];
};

export const setGenerationSetting = async <Key extends keyof GenerationSettings>(
  key: Key,
  value: GenerationSettings[Key],
): Promise<void> => {
  await setChromeStorageItems<GenerationSettings>({ [key]: value } as Partial<GenerationSettings>);
};

export const ensureDefaultGenerationSettings = async (): Promise<void> => {
  const storageKeys = Object.keys(DEFAULT_GENERATION_SETTINGS) as Array<keyof GenerationSettings>;
  const items = await getChromeStorageItems<GenerationSettings, keyof GenerationSettings>(storageKeys);

  const nextValues = storageKeys.reduce<Partial<GenerationSettings>>((acc, key) => {
    if (items[key] === undefined) {
      (acc as Record<string, unknown>)[key] = DEFAULT_GENERATION_SETTINGS[key];
    }

    return acc;
  }, {});

  if (Object.keys(nextValues).length > 0) {
    await setChromeStorageItems<GenerationSettings>(nextValues);
  }
};

export const getGenerationSettings = async (): Promise<GenerationSettings> => ({
  textSettings: await getGenerationSetting('textSettings'),
  titleSettings: await getGenerationSetting('titleSettings'),
  emailSettings: await getGenerationSetting('emailSettings'),
  linkSettings: await getGenerationSetting('linkSettings'),
  phoneSettings: await getGenerationSetting('phoneSettings'),
  addressSettings: await getGenerationSetting('addressSettings'),
  firstNameSettings: await getGenerationSetting('firstNameSettings'),
  lastNameSettings: await getGenerationSetting('lastNameSettings'),
});

export const getAllSettings = async (): Promise<import('../model').StorageSchema> => ({
  ...(await getGenerationSettings()),
  ...(await getExtensionSettings()),
});

export const getStorageItems = getAllSettings;
export const getStorageItem = getGenerationSetting;
export const setStorageItem = setGenerationSetting;
export const ensureDefaultStorage = ensureDefaultGenerationSettings;
