import { ContentType } from 'src/modules/content-type';
import {
  generateAddress,
  generateEmail,
  generateFirstName,
  generateLastName,
  generateLink,
  generateLorem,
  generatePhone,
  generateTitle,
} from 'src/modules/generators';
import { StorageSchema } from 'src/modules/storage';

type ContentSettingsKey = keyof Omit<StorageSchema, 'generationLanguage' | 'interfaceLanguage' | 'theme'>;

type ContentTypeConfig<Key extends ContentSettingsKey = ContentSettingsKey> = {
  settingsKey: Key;
  generate: (storage: StorageSchema) => string;
};

const createContentTypeConfig = <Key extends ContentSettingsKey>(
  settingsKey: Key,
  generator: (settings: StorageSchema[Key]) => string,
): ContentTypeConfig<Key> => {
  return { settingsKey, generate: (storage) => generator(storage[settingsKey]) };
};

export const GENERATOR_BY_CONTENT_TYPE: Record<ContentType, ContentTypeConfig> = {
  text: createContentTypeConfig('textSettings', generateLorem),
  title: createContentTypeConfig('titleSettings', generateTitle),
  email: createContentTypeConfig('emailSettings', generateEmail),
  link: createContentTypeConfig('linkSettings', generateLink),
  phone: createContentTypeConfig('phoneSettings', generatePhone),
  address: createContentTypeConfig('addressSettings', generateAddress),
  firstName: createContentTypeConfig('firstNameSettings', generateFirstName),
  lastName: createContentTypeConfig('lastNameSettings', generateLastName),
};
