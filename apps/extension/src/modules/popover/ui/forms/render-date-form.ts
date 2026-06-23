import { InterfaceLanguage } from '@lorema/core';
import { DATE_FORMATS, TIME_FORMATS } from '@lorema/generators/date/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderDateForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.dateSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.dateParams}</span>

      <div class="lorem-grid-form date-form">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.dateMinYear}</span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.dateMinYearInput}"
            type="number"
            value="${settings.minYear}"
          />
          <p class="lorem-error" id="${POPOVER_IDS.dateMinYearError}"></p>
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.dateMaxYear}</span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.dateMaxYearInput}"
            type="number"
            value="${settings.maxYear}"
          />
          <p class="lorem-error" id="${POPOVER_IDS.dateMaxYearError}"></p>
        </label>

        ${renderCustomSelect({
          id: POPOVER_IDS.dateFormatSelect,
          label: t.dateFormat,
          selectedValues: [settings.dateFormat],
          interfaceLanguage,
          options: DATE_FORMATS.map((format) => ({
            value: format,
            label: t.dateFormatVariants[format],
          })),
        })}

        ${renderCustomSelect({
          id: POPOVER_IDS.timeFormatSelect,
          label: t.timeFormat,
          selectedValues: [settings.timeFormat],
          interfaceLanguage,
          options: TIME_FORMATS.map((format) => ({
            value: format,
            label: t.timeFormatVariants[format],
          })),
        })}
      </div>
    </div>
  `;
};
