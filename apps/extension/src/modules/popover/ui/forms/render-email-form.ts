import { InterfaceLanguage } from '@lorema/core';
import { EMAIL_LENGTH_PRESET_RANGES, EMAIL_LENGTH_PRESETS } from '@lorema/generators/email/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

export const renderEmailForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.emailSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.emailParams}</span>
      
      <div class="lorem-grid-form grid-2-2">
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

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.domain}
            ${renderTooltip(t.domainTooltip, 170)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.emailDomainInput}"
            type="text"
            placeholder="email.com"
            value="${settings.domain}"
          /> 
        </label>
      </div>
   </div>
  `;
};
