import { MAX_PHONE_DIGITS, MIN_PHONE_DIGITS } from 'src/generators/phone/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language, PhoneFormat, StorageSchema } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';
import { renderTooltip } from './render-tooltip';

const PHONE_FORMATS: PhoneFormat[] = ['compact', 'brackets', 'dash', 'spaces'];

export const renderPhoneForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.phoneSettings;

  const formatLabels = Object.fromEntries(
    PHONE_FORMATS.map((format) => [format, t.phoneFormatVariants[format]]),
  ) as Record<PhoneFormat, string>;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.phoneParams}</span>
    
      <div class="lorem-grid-form phone-form">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.phoneFormat}</span>
          <select id="${POPOVER_IDS.phoneFormatSelect}" class="lorem-select">
            ${renderOptions(PHONE_FORMATS, settings.format, formatLabels)}
          </select>
        </label>

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
