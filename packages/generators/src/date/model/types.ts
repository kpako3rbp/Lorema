export type DateFormat =
  | 'dd.mm.yyyy'
  | 'yyyy-mm-dd'
  | 'dd/mm/yyyy'
  | 'mm/dd/yyyy'
  | 'yyyy/mm/dd'
  | 'ru-long'
  | 'en-long'
  | 'iso';

export type TimeFormat = 'none' | 'hh:mm' | 'hh:mm-a';

export type DateSettings = {
  minYear: number;
  maxYear: number;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
};
