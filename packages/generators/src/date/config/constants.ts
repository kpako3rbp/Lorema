import { DateFormat, TimeFormat } from '../model/types';

export const MIN_DATE_YEAR = 1900;
export const MAX_DATE_YEAR = 2100;
export const DATE_FORMATS: DateFormat[] = [
  'dd.mm.yyyy',
  'yyyy-mm-dd',
  'dd/mm/yyyy',
  'mm/dd/yyyy',
  'yyyy/mm/dd',
  'ru-long',
  'en-long',
  'iso',
];
export const TIME_FORMATS: TimeFormat[] = ['none', 'hh:mm', 'hh:mm-a'];
