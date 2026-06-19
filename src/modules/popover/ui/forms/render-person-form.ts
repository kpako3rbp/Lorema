import { TRANSLATIONS } from 'src/i18n';
import { NAME_LENGTH_PRESETS } from 'src/modules/generators/person/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

import { POPOVER_IDS } from '../../config/constants';

export const renderPersonForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
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
