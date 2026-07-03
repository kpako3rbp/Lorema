import { TRANSLATIONS } from '@extension/i18n';
import { StorageSchema } from '@extension/modules/storage';
import { renderCustomSelect } from '@extension/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from '@extension/shared/ui/tooltip/render-tooltip';
import { InterfaceLanguage } from '@lorema/core';
import { EMAIL_LENGTH_PRESET_RANGES, EMAIL_LENGTH_PRESETS } from '@lorema/generators';

import { POPOVER_IDS } from '../../config/constants';

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
