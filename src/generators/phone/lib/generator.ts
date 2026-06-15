import { PhoneSettings } from 'src/features/content-generation/model';

const PATTERN = [3, 3, 2, 2];

const randomDigit = (): string => String(Math.floor(Math.random() * 10));

const normalizeCountryCode = (countryCode: string): string => {
  return countryCode.trim();
};

const splitByPattern = (value: string, pattern: number[]): string[] => {
  let index = 0;
  const groups: string[] = [];

  for (const size of pattern) {
    groups.push(value.slice(index, index + size));
    index += size;
  }

  const rest = value.slice(index);

  if (rest) {
    groups.push(rest);
  }

  return groups;
};

export const generatePhone = (settings: PhoneSettings): string => {
  const countryCode = normalizeCountryCode(settings.countryCode);
  const digitsCount = Math.max(1, Math.floor(settings.digitsCount));
  const digits = Array.from({ length: digitsCount }, randomDigit).join('');

  const groups = splitByPattern(digits, PATTERN);

  const mapFormatToPattern: Record<PhoneSettings['format'], () => string> = {
    compact: () => `${countryCode}${digits}`,
    dash: () => `${countryCode} ${groups.join('-')}`,
    brackets: () => {
      const [operatorCode, ...rest] = groups;

      if (!operatorCode) return countryCode;

      return `${countryCode} (${operatorCode}) ${rest.join('-')}`;
    },
    spaces: () => `${countryCode} ${groups.join(' ')}`,
  };

  return mapFormatToPattern[settings.format]();
};
