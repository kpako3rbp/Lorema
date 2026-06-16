import { getRandomItem } from 'src/shared/lib/random';

import { NAME_LENGTH_PRESETS, NAME_PARTS_BY_LANGUAGE } from '../config/constants';
import { FirstNameSettings, LastNameSettings, NameLengthPreset } from '../model/types';

type NameType = 'firstName' | 'lastName';

const getLenghtPreset = (settings: FirstNameSettings | LastNameSettings): NameLengthPreset => {
  const selectedPresets = settings.lengthPresets.length ? settings.lengthPresets : NAME_LENGTH_PRESETS;

  return getRandomItem(selectedPresets);
};

const getNameList = (
  nameType: NameType,
  language: FirstNameSettings['language'],
  length: NameLengthPreset,
): string[] => {
  const parts = NAME_PARTS_BY_LANGUAGE[language];

  const source: Record<NameType, Record<NameLengthPreset, string[]>> = {
    firstName: parts.firstNames,
    lastName: parts.lastNames,
  };

  return source[nameType][length];
};

export const generateFirstName = (settings: FirstNameSettings): string => {
  return getRandomItem(getNameList('firstName', settings.language, getLenghtPreset(settings)));
};

export const generateLastName = (settings: LastNameSettings): string => {
  return getRandomItem(getNameList('lastName', settings.language, getLenghtPreset(settings)));
};
