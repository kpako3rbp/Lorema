import { InterfaceLanguage } from '@lorema/core';
import { NUMBER_DECIMAL_SEPARATORS } from '@lorema/generators/number/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

export const renderNumberForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.numberSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.numberParams}</span>

      <div class="lorem-grid-form grid-1-1-1-1-1">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.numberMin}</span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.numberMinInput}"
            type="number"
            value="${settings.min}"
          />
          <p id="${POPOVER_IDS.numberMinError}" class="lorem-error"></p>
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.numberMax}</span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.numberMaxInput}"
            type="number"
            value="${settings.max}"
          />
          <p id="${POPOVER_IDS.numberMaxError}" class="lorem-error"></p>
        </label>

        ${renderCustomSelect({
          id: POPOVER_IDS.numberDecimalSeparatorSelect,
          label: t.numberDecimalSeparator,
          selectedValues: [settings.decimalSeparator],
          interfaceLanguage,
          options: NUMBER_DECIMAL_SEPARATORS.map((separator) => ({
            value: separator,
            label: t.numberDecimalSeparatorVariants[separator],
          })),
        })}

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.numberDecimalPlaces}
            ${renderTooltip(t.decimalPlacesTooltip, 150)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.numberDecimalPlacesInput}"
            type="number"
            value="${settings.decimalPlaces}"
          />   
          <p id="${POPOVER_IDS.numberDecimalPlacesError}" class="lorem-error"></p>       
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.numberMultipleOf}
            ${renderTooltip(t.multipleOfTooltip, 150)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.numberMultipleOfInput}"
            type="number"
            value="${settings.multipleOf}"
          />  
          <p id="${POPOVER_IDS.numberMultipleOfError}" class="lorem-error"></p>        
        </label>
      </div>
    </div>
  `;
};
