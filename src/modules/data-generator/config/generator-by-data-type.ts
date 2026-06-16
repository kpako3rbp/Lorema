import { DataType } from 'src/modules/data-type';
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

type DataSettingsKey = keyof Omit<StorageSchema, 'generationLanguage' | 'interfaceLanguage' | 'theme'>;

type DataTypeConfig<Key extends DataSettingsKey = DataSettingsKey> = {
  settingsKey: Key;
  generate: (storage: StorageSchema) => string;
};

const createDataTypeConfig = <Key extends DataSettingsKey>(
  settingsKey: Key,
  generator: (settings: StorageSchema[Key]) => string,
): DataTypeConfig<Key> => {
  return { settingsKey, generate: (storage) => generator(storage[settingsKey]) };
};

export const GENERATOR_BY_DATA_TYPE: Record<DataType, DataTypeConfig> = {
  text: createDataTypeConfig('textSettings', generateLorem),
  title: createDataTypeConfig('titleSettings', generateTitle),
  email: createDataTypeConfig('emailSettings', generateEmail),
  link: createDataTypeConfig('linkSettings', generateLink),
  phone: createDataTypeConfig('phoneSettings', generatePhone),
  address: createDataTypeConfig('addressSettings', generateAddress),
  firstName: createDataTypeConfig('firstNameSettings', generateFirstName),
  lastName: createDataTypeConfig('lastNameSettings', generateLastName),
};
