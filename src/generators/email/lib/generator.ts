import { getRandomInteger, getRandomItem } from 'src/shared/lib/random';
import { EmailLengthPreset, EmailSettings } from 'src/shared/model/types';

import {
  DOMAINS,
  EMAIL_LENGTH_PRESET_RANGES,
  EMAIL_LENGTH_PRESETS,
  LOGINS,
  SEPARATORS,
  WORDS,
} from '../config/constants';

const getEmailLengthPreset = (settings: EmailSettings): EmailLengthPreset => {
  const selectedLengthPresets = settings.lengthPresets.length ? settings.lengthPresets : EMAIL_LENGTH_PRESETS;

  return getRandomItem(selectedLengthPresets);
};

const getRandomYear = (): string => String(getRandomInteger(1990, 2026));

const trimLogin = (login: string, maxLength: number): string => {
  return login.slice(0, maxLength).replace(/[._-]$/, '');
};

const buildLogin = (): string => {
  const parts = [
    getRandomItem(LOGINS),
    getRandomItem(SEPARATORS),
    getRandomItem(WORDS),
    getRandomItem(SEPARATORS),
    Math.random() > 0.5 ? getRandomYear() : String(getRandomInteger(10, 99)),
  ];

  return parts.join('');
};

export const generateEmail = (settings: EmailSettings): string => {
  const preset = getEmailLengthPreset(settings);

  const range = EMAIL_LENGTH_PRESET_RANGES[preset];
  const targetLength = getRandomInteger(range.min, range.max);

  let login = buildLogin();

  while (login.length < targetLength) {
    const separator = login.endsWith('.') || login.endsWith('_') ? '' : getRandomItem(SEPARATORS);

    login += `${separator}${getRandomItem(WORDS)}`;
  }

  login = trimLogin(login, targetLength);

  return `${login}@${getRandomItem(DOMAINS)}`;
};
