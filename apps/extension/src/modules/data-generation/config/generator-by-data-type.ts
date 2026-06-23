import { DataType } from '@lorema/core';
import {
  generateAddress,
  generateDate,
  generateEmail,
  generateFirstName,
  generateFullName,
  generateLastName,
  generateLink,
  generateList,
  generateLorem,
  generateNumber,
  generatePhone,
  generateTitle,
} from '@lorema/generators';
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
  list: createDataGenerator('listSettings', generateList),
  number: createDataGenerator('numberSettings', generateNumber),
  date: createDataGenerator('dateSettings', generateDate),
};
