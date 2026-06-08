import { FirstNameSettings, LastNameSettings, NameLengthPreset, NameLengthSelectOption } from 'src/shared/model/types';
import { getRandomItem } from 'src/shared/utils/random';

import { NAME_PARTS_BY_LANGUAGE } from '../config/constants';

type NameType = 'firstName' | 'lastName';

const getNameList = (
  nameType: NameType,
  language: FirstNameSettings['language'],
  length: NameLengthSelectOption,
): string[] => {
  const parts = NAME_PARTS_BY_LANGUAGE[language];

  const source: Record<NameType, Record<NameLengthPreset, string[]>> = {
    firstName: parts.firstNames,
    lastName: parts.lastNames,
  };

  if (length === 'random') {
    return Object.values(source[nameType]).flat();
  }

  return source[nameType][length];
};

export const generateFirstName = (settings: FirstNameSettings): string => {
  return getRandomItem(getNameList('firstName', settings.language, settings.lengthPreset));
};

export const generateLastName = (settings: LastNameSettings): string => {
  return getRandomItem(getNameList('lastName', settings.language, settings.lengthPreset));
};
