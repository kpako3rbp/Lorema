import { GenerationLanguage } from '@lorema/core';

export type NameParts = {
  firstNames: Record<NameLengthPreset, string[]>;
  lastNames: Record<NameLengthPreset, string[]>;
};

export type NameLengthPreset = 'sm' | 'md' | 'lg';

export type FirstNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: GenerationLanguage;
};

export type LastNameSettings = {
  lengthPresets: NameLengthPreset[];
  language: GenerationLanguage;
};

export type PersonNamePart = 'firstName' | 'lastName';
