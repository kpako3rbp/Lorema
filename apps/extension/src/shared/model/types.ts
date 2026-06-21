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
