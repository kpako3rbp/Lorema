import { GenerationLanguage } from '@lorema/core';
import { getRandomInteger, getRandomItem } from '@lorema/generators/shared/lib/random';
import { capitalizeFirstLetter } from '@lorema/generators/shared/lib/string';

import { SENTENCE_TEMPLATES_BY_LANGUAGE, TEXT_PARTS_BY_LANGUAGE } from '../config/constants';
import { LOREM_IPSUM_WORDS } from '../config/lorem-ipsum';
import { TextParts } from '../model/types';

type LoremOptions = {
  length: number;
  withParagraphs: boolean;
  language: GenerationLanguage;
  keepWholeSentencies: boolean;
};

const MIN_LOREM_SENTENCE_WORDS_COUNT = 6;
const MAX_LOREM_SENTENCE_WORDS_COUNT = 12;
const MIN_PARAGRAPH_SIZE = 2;
const MAX_PARAGRAPH_SIZE = 4;

const replaceTemplateVariables = (template: string, parts: TextParts): string => {
  return template
    .replace('{start}', getRandomItem(parts.starts))
    .replace('{subject}', getRandomItem(parts.subjects))
    .replace('{predicate}', getRandomItem(parts.predicates))
    .replace('{objectGen}', getRandomItem(parts.objectsGen))
    .replace('{objectDat}', getRandomItem(parts.objectsDat))
    .replace('{objectLoc}', getRandomItem(parts.objectsLoc))
    .replace('{object}', getRandomItem(parts.objects))
    .replace('{ending}', getRandomItem(parts.endings));
};

const generateSentence = (parts: TextParts, language: GenerationLanguage): string => {
  const template = getRandomItem(SENTENCE_TEMPLATES_BY_LANGUAGE[language]);
  const sentence = replaceTemplateVariables(template, parts).trim();

  return capitalizeFirstLetter(sentence);
};

const generateLoremIpsumSentence = (): string => {
  const wordsCount = getRandomInteger(MIN_LOREM_SENTENCE_WORDS_COUNT, MAX_LOREM_SENTENCE_WORDS_COUNT);
  const words = Array.from({ length: wordsCount }, () => getRandomItem(LOREM_IPSUM_WORDS));

  return `${capitalizeFirstLetter(words.join(' '))}.`;
};

const appendChunk = (chunks: string[], chunk: string): number => {
  chunks.push(chunk);

  return chunk.length;
};

export const generateLorem = (options: LoremOptions): string => {
  const { length, withParagraphs, language, keepWholeSentencies } = options;
  const textParts = TEXT_PARTS_BY_LANGUAGE[language];
  const chunks: string[] = [];
  let currentLength = 0;
  let sentencesInParagraph = 0;
  let targetParagraphSize = getRandomInteger(MIN_PARAGRAPH_SIZE, MAX_PARAGRAPH_SIZE);

  let lastValidLength = 0;

  while (currentLength < length) {
    const sentence = textParts ? generateSentence(textParts, language) : generateLoremIpsumSentence();

    lastValidLength = currentLength;

    currentLength += appendChunk(chunks, sentence);
    sentencesInParagraph += 1;

    const shouldStartNewParagraph =
      withParagraphs && sentencesInParagraph >= targetParagraphSize && currentLength < length;

    if (shouldStartNewParagraph) {
      currentLength += appendChunk(chunks, '\n\n');
      sentencesInParagraph = 0;
      targetParagraphSize = getRandomInteger(MIN_PARAGRAPH_SIZE, MAX_PARAGRAPH_SIZE);
    } else {
      currentLength += appendChunk(chunks, ' ');
    }
  }

  const fullText = chunks.join('');

  if (!keepWholeSentencies) {
    const text = fullText.slice(0, length);
    const trimmed = text.trim();

    return text.length === trimmed.length ? text : `${trimmed}.`;
  }

  const isOverlimited = currentLength > length;

  if (!isOverlimited) {
    return fullText.trimEnd();
  }

  const hasCompleteSentenceWithinLimit = lastValidLength > 0;

  if (!hasCompleteSentenceWithinLimit) {
    return `${fullText.slice(0, length - 1).trimEnd()}.`;
  }

  return fullText.slice(0, lastValidLength).trimEnd();
};
