import { EMAIL_LENGTH_PRESET_RANGES, EMAIL_LENGTH_PRESETS } from 'src/generators/email/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/popover/config/constants';
import { Language, StorageSchema } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderEmailForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.emailSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.emailParams}</span>
      
      ${renderCustomSelect({
        id: POPOVER_IDS.emailLengthPresetSelect,
        label: t.loginLength,
        multiple: true,
        selectedValues: settings.lengthPresets,
        interfaceLanguage: interfaceLanguage,
        options: EMAIL_LENGTH_PRESETS.map((preset) => ({
          value: preset,
          label: `${t.lengthPreset[preset]} (${EMAIL_LENGTH_PRESET_RANGES[preset].min}-${EMAIL_LENGTH_PRESET_RANGES[preset].max})`,
        })),
      })}
   </div>
  `;
};
