import { NameLengthPreset } from 'src/entities/generation-settings/model';

export type NameParts = {
  firstNames: Record<NameLengthPreset, string[]>;
  lastNames: Record<NameLengthPreset, string[]>;
};
