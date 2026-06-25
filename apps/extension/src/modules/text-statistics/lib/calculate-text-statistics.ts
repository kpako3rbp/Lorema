import { TextStatistics } from '../model/types';

const WHITESPACE_REGEXP = /\s/gu;
const WHITESPACES_REGEXP = /\s/gu;

const countMatches = (value: string, regexp: RegExp): number => {
  return value.match(regexp)?.length ?? 0;
};

const countCharacters = (value: string): number => {
  return Array.from(value).length;
};

const normalizeTextForStatistics = (value: string): string => {
  return value
    .replace(/\u00A0/g, ' ')
    .replace(/\u202F/g, ' ')
    .trim();
};

const countSentences = (text: string): number => {
  const trimmedText = text.trim();

  if (!trimmedText) return 0;

  return trimmedText
    .split(/[.!?…]+(?:\s+|$)/)
    .map((sentence) => sentence.trim())
    .filter(Boolean).length;
};

export const calculateTextStatistics = (text: string): TextStatistics => {
  const normalizedText = normalizeTextForStatistics(text);
  const textWithoutSpaces = normalizedText.replace(WHITESPACES_REGEXP, '');

  return {
    characters: countCharacters(normalizedText),
    charactersWithoutSpaces: countCharacters(textWithoutSpaces),
    spaces: countMatches(normalizedText, WHITESPACE_REGEXP),
    words: normalizedText ? normalizedText.split(/\s+/).length : 0,
    sentences: countSentences(normalizedText),
  };
};
