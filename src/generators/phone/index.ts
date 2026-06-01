import { PhoneSettings } from '../../types';

const randomDigit = (): string => String(Math.floor(Math.random() * 10));

export const generatePhone = (settings: PhoneSettings): string => {
  const digitsCount = Math.max(1, Math.floor(settings.digitsCount));
  const digits = Array.from({ length: digitsCount }, randomDigit).join('');
  const groups: string[] = [];
  let index = 0;

  for (const size of [3, 3, 2, 2]) {
    if (index >= digits.length) break;
    groups.push(digits.slice(index, index + size));
    index += size;
  }

  if (index < digits.length) groups.push(digits.slice(index));

  return `${settings.countryCode} ${groups.filter(Boolean).join(' ')}`;
};
