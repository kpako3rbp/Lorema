export type PhoneFormat = 'spaces' | 'dash' | 'brackets' | 'compact';

export type PhoneSettings = {
  countryCode: string;
  digitsCount: number;
  format: PhoneFormat;
};
