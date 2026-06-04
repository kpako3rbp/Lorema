import { TitleSettings } from 'src/shared/model/types';
import { getRandomItem } from 'src/shared/utils/random';

import { TITLE_LENGTH_PRESETS } from '../config/constants';
import { TITLES } from '../config/titles';
import { TOPICS } from '../config/topics';

export const generateTitle = (settings: TitleSettings): string => {
  const topic = settings.topic === 'random' ? getRandomItem(TOPICS) : settings.topic;

  const lengthPreset = settings.lengthPreset === 'random' ? getRandomItem(TITLE_LENGTH_PRESETS) : settings.lengthPreset;

  const variants = TITLES[settings.language][topic][lengthPreset];

  return getRandomItem(variants);
};
