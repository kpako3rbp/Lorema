import { NAME_LENGTH_SELECT_OPTIONS } from 'src/generators/person/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language, NameLengthSelectOption, StorageSchema } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';

export const renderLastNameForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.firstNameSettings;

  const presetLabels = Object.fromEntries(
    NAME_LENGTH_SELECT_OPTIONS.map((preset) => {
      if (preset === 'random') {
        return [preset, t.lengthPreset.random];
      }

      return [preset, t.lengthPreset[preset]];
    }),
  ) as Record<NameLengthSelectOption, string>;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.lastNameParams}</span>

      <label class="lorem-form-el-with-label">
        <span class="lorem-label">${t.lastNameLength}</span>

        <select id="${POPOVER_IDS.lastNameLengthSelect}" class="lorem-select">
          ${renderOptions(NAME_LENGTH_SELECT_OPTIONS, settings.lengthPreset, presetLabels)}
        </select>
      </label>
    </div>
  `;
};
