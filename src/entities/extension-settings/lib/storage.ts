import { getChromeStorageItems, setChromeStorageItems } from 'src/shared/api/chrome-storage';

import { DEFAULT_EXTENSION_SETTINGS } from '../config/default-extension-settings';
import { ExtensionSettings } from '../model';

export const getExtensionSetting = async <Key extends keyof ExtensionSettings>(
  key: Key,
): Promise<ExtensionSettings[Key]> => {
  const items = await getChromeStorageItems<ExtensionSettings, Key>([key]);

  return items[key] ?? DEFAULT_EXTENSION_SETTINGS[key];
};

export const setExtensionSetting = async <Key extends keyof ExtensionSettings>(
  key: Key,
  value: ExtensionSettings[Key],
): Promise<void> => {
  await setChromeStorageItems<ExtensionSettings>({ [key]: value } as Partial<ExtensionSettings>);
};

export const ensureDefaultExtensionSettings = async (): Promise<void> => {
  const storageKeys = Object.keys(DEFAULT_EXTENSION_SETTINGS) as Array<keyof ExtensionSettings>;
  const items = await getChromeStorageItems<ExtensionSettings, keyof ExtensionSettings>(storageKeys);

  const nextValues = storageKeys.reduce<Partial<ExtensionSettings>>((acc, key) => {
    if (items[key] === undefined) {
      (acc as Record<string, unknown>)[key] = DEFAULT_EXTENSION_SETTINGS[key];
    }

    return acc;
  }, {});

  if (Object.keys(nextValues).length > 0) {
    await setChromeStorageItems<ExtensionSettings>(nextValues);
  }
};

export const getExtensionSettings = async (): Promise<ExtensionSettings> => ({
  generationLanguage: await getExtensionSetting('generationLanguage'),
  interfaceLanguage: await getExtensionSetting('interfaceLanguage'),
  theme: await getExtensionSetting('theme'),
});
