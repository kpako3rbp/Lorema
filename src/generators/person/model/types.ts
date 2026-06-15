import { NameLengthPreset } from 'src/shared/model/types';

export type NameParts = {
  firstNames: Record<NameLengthPreset, string[]>;
  lastNames: Record<NameLengthPreset, string[]>;
};
