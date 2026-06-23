import { ListLengthPreset, ListType } from '../model/types';

export const LIST_LENGTH_PRESETS: ListLengthPreset[] = ['xsm', 'sm', 'md', 'lg', 'xlg'];

export const LISTLENGTH_PRESET_RANGES: Record<ListLengthPreset, { min: number; max: number }> = {
  xsm: { min: 5, max: 20 },
  sm: { min: 20, max: 40 },
  md: { min: 40, max: 70 },
  lg: { min: 70, max: 120 },
  xlg: { min: 120, max: 200 },
};

export const MIN_LIST_ITEMS_COUNT = 1;
export const MAX_LIST_ITEMS_COUNT = 100;

export const LIST_TYPES: ListType[] = ['bullet', 'numbered'];

export const LIST_ITEM_LENGTH_PRESETS: ListLengthPreset[] = LIST_LENGTH_PRESETS;
export const LIST_ITEM_LENGTH_PRESET_RANGES = LISTLENGTH_PRESET_RANGES;
