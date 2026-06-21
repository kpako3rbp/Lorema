import { getRandomItem } from '../../shared/lib/random';
import { NAME_LENGTH_PRESETS, NAME_PARTS_BY_LANGUAGE } from '../config/constants';
import { FirstNameSettings, LastNameSettings, NameLengthPreset, PersonNamePart } from '../model/types';

type PersonDataSettings = {
  firstName: FirstNameSettings;
  lastName: LastNameSettings;
};

const getLenghtPreset = (settings: FirstNameSettings | LastNameSettings): NameLengthPreset => {
  const selectedPresets = settings.lengthPresets.length ? settings.lengthPresets : NAME_LENGTH_PRESETS;

  return getRandomItem(selectedPresets);
};

const getNameList = (
  nameType: PersonNamePart,
  language: FirstNameSettings['language'],
  length: NameLengthPreset,
): string[] => {
  const parts = NAME_PARTS_BY_LANGUAGE[language];

  const source: Record<PersonNamePart, Record<NameLengthPreset, string[]>> = {
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

const generateNamePart = (settings: PersonDataSettings, part: PersonNamePart): string => {
  const generators: Record<PersonNamePart, () => string> = {
    firstName: () => generateFirstName(settings.firstName),
    lastName: () => generateLastName(settings.lastName),
  };

  return generators[part]();
};

export const generatePersonData = (
  settings: PersonDataSettings,
  parts: PersonNamePart[] = ['firstName', 'lastName'],
): string => {
  return parts.map((part) => generateNamePart(settings, part)).join(' ');
};

export const generateFullName = (settings: PersonDataSettings): string => {
  return generatePersonData(settings, ['firstName', 'lastName']);
};
