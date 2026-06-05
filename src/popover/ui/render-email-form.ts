import { EMAIL_LENGTH_PRESET_RANGES, EMAIL_LENGTH_PRESETS } from 'src/generators/email/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { EmailLengthPreset, Language, StorageSchema } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';

export const renderEmailForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.emailSettings;
  const presetLabels = Object.fromEntries(
    EMAIL_LENGTH_PRESETS.map((preset) => {
      return [
        preset,
        `${t.lengthPreset[preset]} (${EMAIL_LENGTH_PRESET_RANGES[preset].min}-${EMAIL_LENGTH_PRESET_RANGES[preset].max})`,
      ];
    }),
  ) as Record<EmailLengthPreset, string>;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.emailParams}</span>
    
      <label class="lorem-form-el-with-label">
        <span class="lorem-label">${t.loginLength}</span>
        <select id="${POPOVER_IDS.emailLengthPresetSelect}" class="lorem-select">
          ${renderOptions(EMAIL_LENGTH_PRESETS, settings.lengthPreset, presetLabels)}
        </select>
      </label>
   </div>
  `;
};
