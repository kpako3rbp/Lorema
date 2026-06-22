export type NumberDecimalSeparator = 'dot' | 'comma';

export type NumberSettings = {
  min: number;
  max: number;
  multipleOf: number;
  decimalPlaces: number;
  decimalSeparator: NumberDecimalSeparator;
};
