import { MAX_DECIMAL_PLACES, MAX_MULTIPLE_OF, MIN_DECIMAL_PLACES, MIN_MULTIPLE_OF } from '../config/constants';
import { NumberDecimalSeparator, NumberSettings } from '../model/types';

const SEPERATOR_BY_TYPE: Record<NumberDecimalSeparator, '.' | ','> = {
  comma: ',',
  dot: '.',
};

const normalizeNumber = (value: number, fallback: number): number => {
  return Number.isFinite(value) ? value : fallback;
};

const normalizeRange = (minValue: number, maxValue: number): [number, number] => {
  const min = normalizeNumber(minValue, 0);
  const max = normalizeNumber(maxValue, 100);

  return min <= max ? [min, max] : [max, min];
};

const clampDecimalPlaces = (value: number): number => {
  if (!Number.isFinite(value)) return MIN_DECIMAL_PLACES;

  return Math.min(MAX_DECIMAL_PLACES, Math.max(MIN_DECIMAL_PLACES, Math.floor(value)));
};

const normalizeMultipleOf = (value: number): number => {
  if (!Number.isFinite(value)) return MIN_MULTIPLE_OF;
  const normalized = Math.floor(Math.abs(value));

  return Math.min(MAX_MULTIPLE_OF, Math.max(MIN_MULTIPLE_OF, normalized));
};

const getRandomInteger = (min: number, max: number): number => {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);

  return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
};

const getRandomIntegerMultiple = (min: number, max: number, multipleOf: number): number => {
  const minMultiplier = Math.ceil(min / multipleOf);
  const maxMultiplier = Math.floor(max / multipleOf);

  if (minMultiplier > maxMultiplier) {
    return getRandomInteger(min, max);
  }

  return getRandomInteger(minMultiplier, maxMultiplier) * multipleOf;
};

const getRandomFraction = (decimalPlaces: number): string => {
  if (decimalPlaces === 0) return '';

  const limit = 10 ** decimalPlaces;
  const value = Math.floor(Math.random() * limit);

  return String(value).padStart(decimalPlaces, '0');
};

const formatNumber = (
  integerPart: number,
  fractionPart: string,
  separator: NumberSettings['decimalSeparator'],
): string => {
  if (!fractionPart) return String(integerPart);

  const decimalSeparator = SEPERATOR_BY_TYPE[separator];

  return `${integerPart}${decimalSeparator}${fractionPart}`;
};

export const generateNumber = (settings: NumberSettings): string => {
  const [min, max] = normalizeRange(settings.min, settings.max);
  const decimalPlaces = clampDecimalPlaces(settings.decimalPlaces);
  const multipleOf = normalizeMultipleOf(settings.multipleOf);

  const integerPart = getRandomIntegerMultiple(min, max, multipleOf);
  const fractionPart = getRandomFraction(decimalPlaces);

  return formatNumber(integerPart, fractionPart, settings.decimalSeparator);
};
