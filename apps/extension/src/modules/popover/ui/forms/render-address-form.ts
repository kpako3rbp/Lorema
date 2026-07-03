import { TRANSLATIONS } from '@extension/i18n';
import { StorageSchema } from '@extension/modules/storage';
import { renderCustomSelect } from '@extension/shared/ui/custom-select/render-custom-select';
import { InterfaceLanguage } from '@lorema/core';
import { ADDRESS_FORMATS } from '@lorema/generators';

import { POPOVER_IDS } from '../../config/constants';

export const renderAddressForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.addressSettings;

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.addressParams}</span>

      ${renderCustomSelect({
        id: POPOVER_IDS.addressFormatSelect,
        label: t.addressFormat,
        multiple: true,
        selectedValues: settings.formats,
        interfaceLanguage: interfaceLanguage,
        options: ADDRESS_FORMATS.map((format) => ({
          value: format,
          label: t.addressFormatVariants[format],
        })),
      })}
    </div>
  `;
};
