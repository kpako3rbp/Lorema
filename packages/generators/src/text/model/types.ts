import { GenerationLanguage } from '@lorema/core';

export type TextParts = {
  starts: string[];
  subjects: string[];
  predicates: string[];
  objects: string[];
  objectsGen: string[];
  objectsDat: string[];
  objectsLoc: string[];
  endings: string[];
};

export type LengthMode = 'lte' | 'exact';

export type TextSettings = {
  language: GenerationLanguage;
  length: number;
  lengthMode: LengthMode;
  keepWholeSentencies: boolean;
  withParagraphs: boolean;
};
