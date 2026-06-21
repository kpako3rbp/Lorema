import { TRANSLATIONS } from 'src/i18n';
import { MAX_PHONE_DIGITS, MIN_PHONE_DIGITS, PhoneFormat } from 'src/modules/generators';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

const PHONE_FORMATS: PhoneFormat[] = ['compact', 'brackets', 'dash', 'spaces'];

export const renderPhoneForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.phoneSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.phoneParams}</span>
    
      <div class="lorem-grid-form phone-form">
        ${renderCustomSelect({
          id: POPOVER_IDS.phoneFormatSelect,
          label: t.phoneFormat,
          selectedValues: [settings.format],
          interfaceLanguage: interfaceLanguage,
          options: PHONE_FORMATS.map((format) => ({
            value: format,
            label: t.phoneFormatVariants[format],
          })),
        })}

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.countryCode}
            ${renderTooltip(t.countryCodeTooltip, 170)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.countryCodeInput}"
            type="text"
            inputmode="numeric"
            placeholder="+XX"
            value="${settings.countryCode}"
          /> 
          <p id="${POPOVER_IDS.countryCodeError}" class="lorem-error"></p>
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.digitsCount}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.digitsCountInput}"
            type="number"
            placeholder="${MIN_PHONE_DIGITS}-${MAX_PHONE_DIGITS}"
            value="${settings.digitsCount}"
          /> 
          <p id="${POPOVER_IDS.digitsCountError}" class="lorem-error"></p>
        </label>
      </div>      
   </div>
  `;
};
