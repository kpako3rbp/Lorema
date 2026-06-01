import { SENTENCE_TEMPLATES_BY_LANGUAGE, TEXT_PARTS_BY_LANGUAGE } from '../../constants';
import { Language, TextParts, TextSettings } from '../../types';
import { getRandomItem } from '../../utils/random';

const MIN_SENTENCES_IN_PARAGRAPH = 2;
const PARAGRAPH_SIZE_VARIANTS = 3;
const MIN_LTE_RATIO = 0.8;

const capitalize = (text: string): string => (text.length ? text.charAt(0).toUpperCase() + text.slice(1) : text);

const getRandomParagraphSize = (): number => Math.floor(Math.random() * PARAGRAPH_SIZE_VARIANTS) + MIN_SENTENCES_IN_PARAGRAPH;

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

  return capitalize(replaceTemplateVariables(template, parts).trim());
};

const generateTextAtLeast = (length: number, language: Language, withParagraphs: boolean): string => {
  const textParts = TEXT_PARTS_BY_LANGUAGE[language];
  const chunks: string[] = [];
  let currentLength = 0;
  let sentencesInParagraph = 0;
  let targetParagraphSize = getRandomParagraphSize();

  while (currentLength < length) {
    const sentence = generateSentence(textParts, language);
    chunks.push(sentence);
    currentLength += sentence.length;
    sentencesInParagraph += 1;

    const separator = withParagraphs && sentencesInParagraph >= targetParagraphSize && currentLength < length ? '\n\n' : ' ';
    chunks.push(separator);
    currentLength += separator.length;

    if (separator === '\n\n') {
      sentencesInParagraph = 0;
      targetParagraphSize = getRandomParagraphSize();
    }
  }

  return chunks.join('').trimEnd();
};

const trimToLastWord = (text: string): string => {
  const trimmed = text.trimEnd();
  const lastWhitespaceIndex = trimmed.search(/\s+\S*$/);

  if (lastWhitespaceIndex <= 0) return trimmed;

  return trimmed.slice(0, lastWhitespaceIndex).trimEnd();
};

export const generateText = (settings: TextSettings): string => {
  const safeLength = Math.max(1, Math.floor(settings.length));

  if (settings.lengthMode === 'exact') {
    return generateTextAtLeast(safeLength, settings.language, false).slice(0, safeLength).padEnd(safeLength, ' ');
  }

  const minLength = Math.max(1, Math.floor(safeLength * MIN_LTE_RATIO));
  const targetLength = Math.floor(Math.random() * (safeLength - minLength + 1)) + minLength;
  const generated = generateTextAtLeast(targetLength, settings.language, settings.withParagraphs).slice(0, targetLength);

  return settings.trimToWord ? trimToLastWord(generated) : generated.trimEnd();
};
