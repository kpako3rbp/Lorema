import { GenerationLanguage } from '@lorema/core';

export type ListType = 'bullet' | 'numbered';
export type ListLengthPreset = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';

export type ListSettings = {
  language: GenerationLanguage;
  itemsCount: number;
  lengthPresets: ListLengthPreset[];
  type: ListType;
};
