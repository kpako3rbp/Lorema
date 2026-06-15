import { NameLengthPreset } from 'src/features/content-generation/model';

export type NameParts = {
  firstNames: Record<NameLengthPreset, string[]>;
  lastNames: Record<NameLengthPreset, string[]>;
};
