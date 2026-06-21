import { GenerationLanguage } from '@lorema/core';

import { TextParts } from '../model/types';
import { SENTENCE_TEMPLATES_EN, SENTENCE_TEMPLATES_LA, SENTENCE_TEMPLATES_RU } from './sentence-templates';
import { TEXT_PARTS_EN, TEXT_PARTS_RU } from './text-parts';

export const TEXT_PARTS_BY_LANGUAGE: Record<GenerationLanguage, TextParts | null> = {
  ru: TEXT_PARTS_RU,
  en: TEXT_PARTS_EN,
  la: null,
};

export const SENTENCE_TEMPLATES_BY_LANGUAGE: Record<GenerationLanguage, readonly string[]> = {
  ru: SENTENCE_TEMPLATES_RU,
  en: SENTENCE_TEMPLATES_EN,
  la: SENTENCE_TEMPLATES_LA,
};

export const MIN_TEXT_CHARS = 1;
export const MAX_TEXT_CHARS = 10000;
