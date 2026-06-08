import { TRANSLATIONS } from 'src/i18n';
import { AddressFormat, Language, StorageSchema } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';

const ADDRESS_FORMATS: AddressFormat[] = ['short', 'full', 'postal', 'legal'];

export const renderAddressForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.addressSettings;

  const formatLabels = Object.fromEntries(
    ADDRESS_FORMATS.map((format) => [format, t.addressFormatVariants[format]]),
  ) as Record<AddressFormat, string>;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.addressParams}</span>

      <label class="lorem-form-el-with-label">
        <span class="lorem-label">${t.addressFormat}</span>

        <select id="${POPOVER_IDS.addressFormatSelect}" class="lorem-select">
          ${renderOptions(ADDRESS_FORMATS, settings.format, formatLabels)}
        </select>
      </label>
    </div>
  `;
};
