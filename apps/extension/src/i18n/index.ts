import { InterfaceLanguage } from '@lorema/core';

import { TRANSLATIONS_EN } from './en/translations';
import { TRANSLATIONS_RU } from './ru/translations';
import { Translation } from './types';

export const TRANSLATIONS: Record<InterfaceLanguage, Translation> = {
  en: TRANSLATIONS_EN,
  ru: TRANSLATIONS_RU,
};

export type { Translation } from './types';
