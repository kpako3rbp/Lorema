import { getRandomInteger } from '@lorema/generators';

import { MAX_DATE_YEAR, MIN_DATE_YEAR } from '../config/constants';
import { DateSettings } from '../model/types';

const normalizeYear = (value: number, fallback: number): number => {
  if (!Number.isFinite(value)) return fallback;

  const year = Math.floor(value);

  return Math.min(MAX_DATE_YEAR, Math.max(MIN_DATE_YEAR, year));
};

const normalizeYearRange = (minYearValue: number, maxYearValue: number): [number, number] => {
  const minYear = normalizeYear(minYearValue, MIN_DATE_YEAR);
  const maxYear = normalizeYear(maxYearValue, MAX_DATE_YEAR);

  return minYear <= maxYear ? [minYear, maxYear] : [maxYear, minYear];
};

const getDaysInMonth = (year: number, monthIndex: number): number => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

const pad = (value: number): string => {
  return String(value).padStart(2, '0');
};

const getRandomDate = (minYear: number, maxYear: number): Date => {
  const year = getRandomInteger(minYear, maxYear);
  const monthIndex = getRandomInteger(0, 11);
  const day = getRandomInteger(1, getDaysInMonth(year, monthIndex));
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  const seconds = getRandomInteger(0, 59);

  return new Date(year, monthIndex, day, hours, minutes, seconds);
};

const formatDate = (date: Date, format: DateSettings['dateFormat']): string => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const formatters: Record<DateSettings['dateFormat'], () => string> = {
    'dd.mm.yyyy': () => `${day}.${month}.${year}`,
    'yyyy-mm-dd': () => `${year}-${month}-${day}`,
    'dd/mm/yyyy': () => `${day}/${month}/${year}`,
    'mm/dd/yyyy': () => `${month}/${day}/${year}`,
    'yyyy/mm/dd': () => `${year}/${month}/${day}`,
    'ru-long': () =>
      new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date),
    'en-long': () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(date),
    iso: () => date.toISOString(),
  };

  return formatters[format]();
};

const formatTime = (date: Date, format: DateSettings['timeFormat']): string => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  const hours12Value = date.getHours() % 12 || 12;
  const hours12 = pad(hours12Value);
  const period = date.getHours() >= 12 ? 'PM' : 'AM';

  const formatters: Record<DateSettings['timeFormat'], () => string> = {
    none: () => '',
    'hh:mm': () => `${hours}:${minutes}`,
    'hh:mm-a': () => `${hours12}:${minutes} ${period}`,
  };

  return formatters[format]();
};

export const generateDate = (settings: DateSettings): string => {
  const [minYear, maxYear] = normalizeYearRange(settings.minYear, settings.maxYear);
  const date = getRandomDate(minYear, maxYear);

  if (settings.dateFormat === 'iso') {
    return formatDate(date, settings.dateFormat);
  }

  const datePart = formatDate(date, settings.dateFormat);
  const timePart = formatTime(date, settings.timeFormat);

  return timePart ? `${datePart} ${timePart}` : datePart;
};
