import { NAME_LENGTH_PRESETS } from 'src/generators/person/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/popover/config/constants';
import { Language, StorageSchema } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderLastNameForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.firstNameSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.lastNameParams}</span>

      ${renderCustomSelect({
        id: POPOVER_IDS.lastNameLengthSelect,
        label: t.lastNameLength,
        multiple: true,
        selectedValues: settings.lengthPresets,
        interfaceLanguage: interfaceLanguage,
        options: NAME_LENGTH_PRESETS.map((preset) => ({
          value: preset,
          label: t.lengthPreset[preset],
        })),
      })}
    </div>
  `;
};
