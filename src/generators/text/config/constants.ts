import { Language } from 'src/shared/model/types';

import { TextParts } from '../model/types';
import { SENTENCE_TEMPLATES_EN, SENTENCE_TEMPLATES_RU } from './sentence-templates';
import { TEXT_PARTS_EN, TEXT_PARTS_RU } from './text-parts';

export const TEXT_PARTS_BY_LANGUAGE: Record<Language, TextParts> = {
  ru: TEXT_PARTS_RU,
  en: TEXT_PARTS_EN,
};

export const SENTENCE_TEMPLATES_BY_LANGUAGE: Record<Language, readonly string[]> = {
  ru: SENTENCE_TEMPLATES_RU,
  en: SENTENCE_TEMPLATES_EN,
};

export const NAME_BY_LANGUAGE: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
};

export const MIN_TEXT_CHARS = 1;
export const MAX_TEXT_CHARS = 10000;
