import { getRandomItem } from 'src/shared/lib/random';
import { Language } from 'src/shared/model/types';

import { SENTENCE_TEMPLATES_BY_LANGUAGE, TEXT_PARTS_BY_LANGUAGE } from '../config/constants';
import { TextParts } from '../model/types';

type LoremOptions = {
  length: number;
  withParagraphs: boolean;
  language: Language;
  keepWholeWords: boolean;
};

const MIN_SENTENCES_IN_PARAGRAPH = 2;
const MIN_LAST_SENTENCE_WORDS = 2;
const MIN_LAST_WORD_LENGTH = 5;
const PARAGRAPH_SIZE_VARIANTS = 3;

const getWords = (text: string): string[] => {
  return text.trim().match(/[a-zа-яё0-9]+/gi) ?? [];
};

const capitalize = (text: string): string => {
  if (!text.length) return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
};

// const countWords = (text: string): number => {
//   return text.trim().split(/\s+/).filter(Boolean).length;
// };

// const hasValidLastSentence = (text: string): boolean => {
//   const sentences = text
//     .split(/[.!?]+/)
//     .map((item) => item.trim())
//     .filter(Boolean);
//   const lastSentence = sentences.at(-1);

//   return lastSentence ? countWords(lastSentence) >= MIN_LAST_SENTENCE_WORDS : false;
// };

const hasValidLastSentence = (text: string): boolean => {
  const sentences = text
    .split(/[.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const lastSentence = sentences.at(-1);

  if (!lastSentence) return false;

  const words = getWords(lastSentence);
  const lastWord = words.at(-1);

  return words.length >= MIN_LAST_SENTENCE_WORDS && !!lastWord && lastWord.length >= MIN_LAST_WORD_LENGTH;
};

const addDot = (text: string): string => {
  const result = text.trimEnd();

  if (/[.!?]$/.test(result)) return result;

  return `${result.replace(/[,:;]$/, '')}.`;
};

const getRandomParagraphSize = (): number => {
  return Math.floor(Math.random() * PARAGRAPH_SIZE_VARIANTS) + MIN_SENTENCES_IN_PARAGRAPH;
};

const replaceTemplateVariables = (template: string, parts: TextParts): string => {
  return template
    .replace('{start}', getRandomItem(parts.starts))
    .replace('{subject}', getRandomItem(parts.subjects))
    .replace('{predicate}', getRandomItem(parts.predicates))
    .replace('{object}', getRandomItem(parts.objects))
    .replace('{ending}', getRandomItem(parts.endings));
};

const generateSentence = (parts: TextParts, language: Language): string => {
  const template = getRandomItem(SENTENCE_TEMPLATES_BY_LANGUAGE[language]);
  const sentence = replaceTemplateVariables(template, parts).trim();

  return capitalize(sentence);
};

const appendChunk = (chunks: string[], chunk: string): number => {
  chunks.push(chunk);

  return chunk.length;
};

// const trimTextToLastWord = (text: string): string => {
//   let result = text.trimEnd();

//   while (result.includes(' ')) {
//     const lastSpaceIndex = result.lastIndexOf(' ');

//     result = result.slice(0, lastSpaceIndex).trimEnd();

//     if (hasValidLastSentence(result)) {
//       return addDot(result);
//     }
//   }

//   return addDot(result);
// };

const trimTextToLastWord = (text: string): string => {
  let result = text.trimEnd();

  while (result.includes(' ')) {
    const lastSpaceIndex = result.lastIndexOf(' ');

    result = result.slice(0, lastSpaceIndex).trimEnd();
    if (hasValidLastSentence(result)) {
      return addDot(result);
    }
  }

  return addDot(result);
};

export const generateLorem = (options: LoremOptions): string => {
  const { length, withParagraphs, language, keepWholeWords } = options;
  const textParts = TEXT_PARTS_BY_LANGUAGE[language];
  const chunks: string[] = [];

  let currentLength = 0;
  let sentencesInParagraph = 0;
  let targetParagraphSize = getRandomParagraphSize();

  while (currentLength < length) {
    const sentence = generateSentence(textParts, language);

    currentLength += appendChunk(chunks, sentence);
    sentencesInParagraph += 1;

    const shouldStartNewParagraph =
      withParagraphs && sentencesInParagraph >= targetParagraphSize && currentLength < length;

    if (shouldStartNewParagraph) {
      currentLength += appendChunk(chunks, '\n\n');
      sentencesInParagraph = 0;
      targetParagraphSize = getRandomParagraphSize();
    } else {
      currentLength += appendChunk(chunks, ' ');
    }
  }

  const text = chunks.join('').slice(0, length);

  return keepWholeWords ? trimTextToLastWord(text) : text;
};
