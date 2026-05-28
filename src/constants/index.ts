import type { Language, TextParts } from 'src/types';

import { SENTENCE_TEMPLATES_EN } from './en/sentence-templates';
import { TEXT_PARTS_EN } from './en/text-parts';
import { SENTENCE_TEMPLATES_RU } from './ru/sentence-templates';
import { TEXT_PARTS_RU } from './ru/text-parts';

export const TEXT_PARTS_BY_LANGUAGE: Record<Language, TextParts> = {
  ru: TEXT_PARTS_RU,
  en: TEXT_PARTS_EN,
};

export const SENTENCE_TEMPLATES_BY_LANGUAGE: Record<Language, readonly string[]> = {
  ru: SENTENCE_TEMPLATES_RU,
  en: SENTENCE_TEMPLATES_EN,
};
