import { SENTENCE_TEMPLATES_BY_LANGUAGE, TEXT_PARTS_BY_LANGUAGE } from '../constants';
import { Language, TextParts } from '../types';
import { getRandomItem } from './random';

type LoremOptions = { length: number; withParagraphs: boolean; language: Language };

const capitalize = (text: string): string => {
  if (!text.length) return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
};

const getRandomParagraphSize = (): number => {
  return Math.floor(Math.random() * 3) + 2;
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

// export const generateLorem = (length: number): string => {
//   let text = '';

//   while (text.length < length) {
//     text += `${generateSentence(TEXT_PARTS)} `;
//   }

//   return text.trim().slice(0, length);
// };

// export const generateLorem = (options: { length: number; withParagraphs: boolean }): string => {
//   const { length, withParagraphs } = options;
//   const parts: string[] = [];

//   let currentLength = 0;
//   let sentencesInParagraph = 0;
//   let targetParagraphSize = getRandomParagraphSize();

//   while (currentLength < length) {
//     const sentence = generateSentence(TEXT_PARTS);

//     parts.push(sentence);

//     currentLength += sentence.length + 1;

//     sentencesInParagraph += 1;

//     if (withParagraphs && sentencesInParagraph >= targetParagraphSize && currentLength < length) {
//       parts.push('\n\n');

//       sentencesInParagraph = 0;

//       targetParagraphSize = getRandomParagraphSize();
//     } else {
//       parts.push(' ');
//     }
//   }

//   return parts.join('').trim();
// };

export const generateLorem = (options: LoremOptions): string => {
  const { length, withParagraphs, language } = options;

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

    const shouldStartNewParagraph =
      withParagraphs && sentencesInParagraph >= targetParagraphSize && currentLength < length;

    if (shouldStartNewParagraph) {
      chunks.push('\n\n');
      currentLength += 2;

      sentencesInParagraph = 0;
      targetParagraphSize = getRandomParagraphSize();
    } else {
      chunks.push(' ');
      currentLength += 1;
    }
  }

  return chunks.join('').slice(0, length);
};
