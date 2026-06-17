export enum Language {
  en = 'en',
  ru = 'ru',
}

export enum Theme {
  dark = 'dark',
  light = 'light',
}

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type CursorPosition = {
  x: number;
  y: number;
};
