import { TitleLengthPreset, TitleLengthSelectOption, TitleTopic } from 'src/shared/model/types';

export const TITLE_LENGTH_PRESETS: TitleLengthPreset[] = ['xsm', 'sm', 'md', 'lg', 'xlg'];
export const TITLE_LENGTH_SELECT_OPTIONS: TitleLengthSelectOption[] = ['random', ...TITLE_LENGTH_PRESETS];

export const TITLE_LENGTH_PRESET_RANGES: Record<TitleLengthPreset, { min: number; max: number }> = {
  xsm: { min: 5, max: 20 },
  sm: { min: 20, max: 40 },
  md: { min: 40, max: 70 },
  lg: { min: 70, max: 120 },
  xlg: { min: 120, max: 200 },
};

export const TITLE_TOPICS: TitleTopic[] = ['random', 'business', 'it', 'art', 'science', 'finance', 'marketing'];
