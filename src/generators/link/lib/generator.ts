import { LinkLengthPreset, LinkSettings } from 'src/shared/model/types';
import { getRandomInteger, getRandomItem } from 'src/shared/utils/random';

import { DOMAINS, LINK_LENGTH_PRESETS, PATHS, QUERY_KEYS, QUERY_VALUES, ZONES } from '../config/constants';

const IDS = ['a8f20c', 'f91d02', '42ab8e', 'c7d93f', 'e10fa4', 'b204de'];

const getResolvedPreset = (preset: LinkSettings['lengthPreset']): LinkLengthPreset => {
  return preset === 'random' ? getRandomItem(LINK_LENGTH_PRESETS) : preset;
};

const trimUnsafeEnd = (value: string): string => {
  return value.replace(/[/?&=._-]+$/, '');
};

const getHost = (): string => {
  return `${getRandomItem(DOMAINS)}.${getRandomItem(ZONES)}`;
};

const getSlug = (): string => {
  return `${getRandomItem(PATHS)}-${getRandomInteger(100, 999)}`;
};

const getLongSlug = (): string => {
  return `${getRandomItem(PATHS)}-${getRandomItem(IDS)}-${getRandomInteger(1000, 9999)}`;
};

const getQueryParam = (isFirst: boolean): string => {
  const separator = isFirst ? '?' : '&';
  const key = getRandomItem(QUERY_KEYS);
  const value = getRandomItem(QUERY_VALUES);

  return `${separator}${key}=${value}`;
};

const addQueryParams = (url: string, count: number): string => {
  let result = url;

  for (let index = 0; index < count; index += 1) {
    result += getQueryParam(index === 0);
  }

  return result;
};

export const generateLink = (settings: LinkSettings): string => {
  const host = getHost();
  const preset = getResolvedPreset(settings.lengthPreset);

  const links: Record<LinkLengthPreset, string> = {
    sm: `${settings.prefix}${host}/`,
    md: `${settings.prefix}${host}/${getRandomItem(PATHS)}`,
    lg: `${settings.prefix}${host}/${getRandomItem(PATHS)}/${getSlug()}/${getLongSlug()}`,
    xlg: addQueryParams(
      `${settings.prefix}${host}/${getRandomItem(PATHS)}/${getSlug()}/${getLongSlug()}`,
      getRandomInteger(3, 6),
    ),
  };

  return trimUnsafeEnd(links[preset]);
};
