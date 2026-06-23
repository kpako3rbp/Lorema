import { generateTitle, getRandomItem } from '@lorema/generators';

import { LIST_ITEM_LENGTH_PRESETS, MAX_LIST_ITEMS_COUNT, MIN_LIST_ITEMS_COUNT } from '../config/constants';
import { ListSettings } from '../model/types';

const clampItemsCount = (value: number): number => {
  if (!Number.isFinite(value)) return MIN_LIST_ITEMS_COUNT;

  return Math.min(MAX_LIST_ITEMS_COUNT, Math.max(MIN_LIST_ITEMS_COUNT, Math.floor(value)));
};

const formatListItem = (value: string, index: number, type: ListSettings['type']): string => {
  const item = value.trim();

  const formatters: Record<ListSettings['type'], () => string> = {
    bullet: () => `• ${item}`,
    numbered: () => `${index + 1}. ${item}`,
  };

  return formatters[type]();
};

export const generateList = (settings: ListSettings): string => {
  const itemsCount = clampItemsCount(settings.itemsCount);
  const lengthPresets = settings.lengthPresets.length ? settings.lengthPresets : LIST_ITEM_LENGTH_PRESETS;

  const items = Array.from({ length: itemsCount }, (_, index) => {
    const item = generateTitle({
      language: settings.language,
      lengthPresets: [getRandomItem(lengthPresets)],
      topics: [],
    });

    return formatListItem(item, index, settings.type);
  });

  return items.join('\n');
};
