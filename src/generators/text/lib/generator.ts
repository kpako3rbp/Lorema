import { getRandomItem } from 'src/shared/lib/random';
import { capitalizeFirstLetter } from 'src/shared/lib/string';
import { Language } from 'src/shared/model/types';

import { SENTENCE_TEMPLATES_BY_LANGUAGE, TEXT_PARTS_BY_LANGUAGE } from '../config/constants';
import { TextParts } from '../model/types';

type LoremOptions = {
  length: number;
  withParagraphs: boolean;
  language: Language;
  keepWholeSentencies: boolean;
};

const PARAGRAPH_SIZES = [2, 3, 4];

const getRandomParagraphSize = (): number => getRandomItem(PARAGRAPH_SIZES);

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

const generateSentence = (parts: TextParts, language: Language): string => {
  const template = getRandomItem(SENTENCE_TEMPLATES_BY_LANGUAGE[language]);
  const sentence = replaceTemplateVariables(template, parts).trim();

  return capitalizeFirstLetter(sentence);
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
  let targetParagraphSize = getRandomParagraphSize();

  let lastSentenceEnd = 0;

  while (currentLength < length) {
    const sentence = generateSentence(textParts, language);

    lastSentenceEnd = currentLength;

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

  const fullText = chunks.join('');

  if (!keepWholeSentencies) {
    return fullText.slice(0, length);
  }

  if (currentLength <= length) {
    return fullText.trimEnd();
  }

  if (lastSentenceEnd === 0) {
    return `${fullText.slice(0, length - 1).trimEnd()}.`;
  }

  return fullText.slice(0, lastSentenceEnd).trimEnd();
};
