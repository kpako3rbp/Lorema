import { getBrowserLanguage } from 'src/shared/lib/get-browser-language';
import { Theme } from 'src/shared/model/types';

import { ExtensionSettings } from '../model';

const browserLanguage = getBrowserLanguage();

export const DEFAULT_EXTENSION_SETTINGS: ExtensionSettings = {
  generationLanguage: browserLanguage,
  interfaceLanguage: browserLanguage,
  theme: Theme.light,
};
