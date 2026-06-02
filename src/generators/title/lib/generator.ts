import { TitleSettings } from 'src/shared/model/types';
import { getRandomItem } from 'src/shared/utils/random';

import { TITLES } from '../config/titles';
import { TOPICS } from '../config/topics';

export const generateTitle = (settings: TitleSettings): string => {
  const topic = settings.topic === 'random' ? getRandomItem(TOPICS) : settings.topic;
  const variants = TITLES[settings.language][topic];
  let title = getRandomItem(variants);

  if (title.length > settings.maxLength) {
    title = title.slice(0, settings.maxLength).trimEnd();
  }

  return title;
};
