import { Language } from '@lorema/generators/shared/model/types';

export type NameParts = {
  firstNames: Record<NameLengthPreset, string[]>;
  lastNames: Record<NameLengthPreset, string[]>;
};

export type NameLengthPreset = 'sm' | 'md' | 'lg';

export type FirstNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: Language;
};

export type LastNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: Language;
};

export type PersonNamePart = 'firstName' | 'lastName';
