import { InterfaceLanguage } from '@lorema/core';
import {
  LIST_ITEM_LENGTH_PRESET_RANGES,
  LIST_ITEM_LENGTH_PRESETS,
  LIST_TYPES,
  MAX_LIST_ITEMS_COUNT,
  MIN_LIST_ITEMS_COUNT,
} from '@lorema/generators';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderListForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.listSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.listParams}</span>

      <div class="lorem-grid-form grid-1-3-2">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.listItemsCount}</span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.listItemsCountInput}"
            type="number"
            value="${settings.itemsCount}"
            placeholder="${MIN_LIST_ITEMS_COUNT}-${MAX_LIST_ITEMS_COUNT}"
          />
          <p id="${POPOVER_IDS.listItemsCountError}" class="lorem-error"></p>
        </label>

        ${renderCustomSelect({
          id: POPOVER_IDS.listLengthPresetSelect,
          label: t.listItemLength,
          multiple: true,
          selectedValues: settings.lengthPresets,
          interfaceLanguage,
          options: LIST_ITEM_LENGTH_PRESETS.map((preset) => ({
            value: preset,
            label: `${t.lengthPreset[preset]} (${LIST_ITEM_LENGTH_PRESET_RANGES[preset].min}-${LIST_ITEM_LENGTH_PRESET_RANGES[preset].max})`,
          })),
        })}

        ${renderCustomSelect({
          id: POPOVER_IDS.listTypeSelect,
          label: t.listType,
          selectedValues: [settings.type],
          interfaceLanguage,
          options: LIST_TYPES.map((type) => ({
            value: type,
            label: t.listTypeVariants[type],
          })),
        })}
      </div>
    </div>
  `;
};
