import { TRANSLATIONS } from '@extension/i18n';
import { StorageSchema } from '@extension/modules/storage';
import { renderCustomSelect } from '@extension/shared/ui/custom-select/render-custom-select';
import { InterfaceLanguage } from '@lorema/core';
import { NAME_LENGTH_PRESETS } from '@lorema/generators';

import { POPOVER_IDS } from '../../config/constants';

export const renderPersonForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.fullNameParams}</span>

      <div class="lorem-grid-form">
        ${renderCustomSelect({
          id: POPOVER_IDS.firstNameLengthSelect,
          label: t.firstNameLength,
          multiple: true,
          selectedValues: storage.firstNameSettings.lengthPresets,
          interfaceLanguage,
          options: NAME_LENGTH_PRESETS.map((preset) => ({
            value: preset,
            label: t.lengthPreset[preset],
          })),
        })}

        ${renderCustomSelect({
          id: POPOVER_IDS.lastNameLengthSelect,
          label: t.lastNameLength,
          multiple: true,
          selectedValues: storage.lastNameSettings.lengthPresets,
          interfaceLanguage,
          options: NAME_LENGTH_PRESETS.map((preset) => ({
            value: preset,
            label: t.lengthPreset[preset],
          })),
        })}
      </div>
    </div>
  `;
};
