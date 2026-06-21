import { Language } from 'src/shared/model/types';

import { TRANSLATIONS_EN } from './en/translations';
import { TRANSLATIONS_RU } from './ru/translations';
import { Translation } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.en]: TRANSLATIONS_EN,
  [Language.ru]: TRANSLATIONS_RU,
};

export type { Translation } from './types';
