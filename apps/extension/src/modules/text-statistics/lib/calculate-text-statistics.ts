import { TextStatistics } from '../model/types';

const countMatches = (value: string, regexp: RegExp): number => {
  return value.match(regexp)?.length ?? 0;
};

const countCharacters = (value: string): number => {
  return Array.from(value).length;
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
  const trimmedText = text.trim();
  const textWithoutSpaces = text.replace(/ /g, '');

  return {
    characters: countCharacters(text),
    charactersWithoutSpaces: countCharacters(textWithoutSpaces),
    spaces: countMatches(text, / /g),
    words: trimmedText ? trimmedText.split(/\s+/).length : 0,
    sentences: countSentences(text),
    // paragraphs: trimmedText ? trimmedText.split(/\n\s*\n/).filter(Boolean).length : 0,
  };
};
