import { LinkLengthPreset, LinkSettings } from 'src/features/content-generation/model';
import { getRandomInteger, getRandomItem } from 'src/shared/lib/random';

import {
  DOMAINS,
  LINK_LENGTH_PRESET_RANGES,
  LINK_LENGTH_PRESETS,
  PATHS,
  QUERY_KEYS,
  QUERY_VALUES,
  ZONES,
} from '../config/constants';

const IDS = ['a8f20c', 'f91d02', '42ab8e', 'c7d93f', 'e10fa4', 'b204de'];
const FILLER_CHARS = [...'abcdefghijklmnopqrstuvwxyz0123456789'];

const getLinkLengthPreset = (settings: LinkSettings): LinkLengthPreset => {
  const selectedLengthPresets = settings.lengthPresets.length ? settings.lengthPresets : LINK_LENGTH_PRESETS;

  return getRandomItem(selectedLengthPresets);
};

const getTargetLength = (preset: LinkLengthPreset): number => {
  const range = LINK_LENGTH_PRESET_RANGES[preset];

  return getRandomInteger(range.min, range.max);
};

const trimUnsafeEnd = (value: string): string => {
  return value.replace(/[/?&=._-]+$/, '');
};

const fitToTargetLength = (value: string, targetLength: number): string => {
  if (value.length > targetLength) {
    return trimUnsafeEnd(value.slice(0, targetLength));
  }

  return value;
};

const getRandomString = (length: number): string => {
  return Array.from({ length }, () => getRandomItem(FILLER_CHARS)).join('');
};

const getHost = (): string => {
  return `${getRandomItem(DOMAINS)}.${getRandomItem(ZONES)}`;
};

const getPath = (): string => {
  return getRandomItem(PATHS);
};

const getIdSegment = (): string => {
  return `${getRandomItem(IDS)}-${getRandomInteger(1000, 9999)}`;
};

const getReadableSegment = (): string => {
  return getRandomItem([
    getPath(),
    `${getPath()}-${getRandomInteger(10, 99)}`,
    `${getPath()}-${getRandomInteger(100, 999)}`,
    getIdSegment(),
  ]);
};

const extendPathToLength = (url: string, targetLength: number): string => {
  let result = url;

  while (result.length < targetLength) {
    const nextPart = `/${getReadableSegment()}`;

    if (result.length + nextPart.length <= targetLength) {
      result += nextPart;
      continue;
    }

    const remaining = targetLength - result.length;

    if (remaining <= 1) break;

    result += `/${getRandomString(remaining - 1)}`;
  }

  return trimUnsafeEnd(result);
};

const getQueryParam = (isFirst: boolean): string => {
  const separator = isFirst ? '?' : '&';
  const key = getRandomItem(QUERY_KEYS);
  const value = `${getRandomItem(QUERY_VALUES)}-${getRandomInteger(1000, 999999)}`;

  return `${separator}${key}=${value}`;
};

const extendQueryToLength = (url: string, targetLength: number): string => {
  let result = url;
  let hasQuery = result.includes('?');

  while (result.length < targetLength) {
    const param = getQueryParam(!hasQuery);

    if (result.length + param.length <= targetLength) {
      result += param;
      hasQuery = true;
      continue;
    }

    const remaining = targetLength - result.length;
    const paramStart = hasQuery ? '&q=' : '?q=';

    if (remaining <= paramStart.length) {
      result += getRandomString(remaining);
      break;
    }

    result += paramStart;
    result += getRandomString(remaining - paramStart.length);
  }

  return trimUnsafeEnd(result);
};

export const generateLink = (settings: LinkSettings): string => {
  const preset = getLinkLengthPreset(settings);
  const targetLength = getTargetLength(preset);
  const host = getHost();

  const baseUrl = `${settings.prefix}${host}`;

  const links: Record<LinkLengthPreset, () => string> = {
    sm: () => {
      return fitToTargetLength(`${baseUrl}/`, targetLength);
    },

    md: () => {
      return extendPathToLength(`${baseUrl}/${getPath()}`, targetLength);
    },

    lg: () => {
      return extendPathToLength(`${baseUrl}/${getPath()}/${getIdSegment()}`, targetLength);
    },

    xlg: () => {
      const url = extendPathToLength(`${baseUrl}/${getPath()}/${getIdSegment()}`, 120);

      return extendQueryToLength(url, targetLength);
    },
  };

  return links[preset]();
};
