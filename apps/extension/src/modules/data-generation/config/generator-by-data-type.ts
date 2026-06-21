import { DataType } from 'src/modules/data-type';
import {
  generateAddress,
  generateEmail,
  generateFirstName,
  generateFullName,
  generateLastName,
  generateLink,
  generateLorem,
  generatePhone,
  generateTitle,
} from 'src/modules/generators';
import { StorageSchema } from 'src/modules/storage';

type DataSettingsKey = keyof Omit<StorageSchema, 'generationLanguage' | 'interfaceLanguage' | 'theme'>;

type DataGenerator = (storage: StorageSchema) => string;

const createDataGenerator = <Key extends DataSettingsKey>(
  settingsKey: Key,
  generator: (settings: StorageSchema[Key]) => string,
): DataGenerator => {
  return (storage) => generator(storage[settingsKey]);
};

export const GENERATOR_BY_DATA_TYPE: Record<DataType, DataGenerator> = {
  text: createDataGenerator('textSettings', generateLorem),
  title: createDataGenerator('titleSettings', generateTitle),
  email: createDataGenerator('emailSettings', generateEmail),
  link: createDataGenerator('linkSettings', generateLink),
  phone: createDataGenerator('phoneSettings', generatePhone),
  address: createDataGenerator('addressSettings', generateAddress),
  firstName: createDataGenerator('firstNameSettings', generateFirstName),
  lastName: createDataGenerator('lastNameSettings', generateLastName),
  fullName: (storage) =>
    generateFullName({
      firstName: storage.firstNameSettings,
      lastName: storage.lastNameSettings,
    }),
};
