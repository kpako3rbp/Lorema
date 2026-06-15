import { StorageSchema } from 'src/entities/generation-settings/model';
import { NAME_LENGTH_PRESETS } from 'src/generators/person/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { POPOVER_IDS } from 'src/widgets/insert-popover/config/constants';

export const renderFirstNameForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.firstNameSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.firstNameParams}</span>

      ${renderCustomSelect({
        id: POPOVER_IDS.firstNameLengthSelect,
        label: t.firstNameLength,
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
