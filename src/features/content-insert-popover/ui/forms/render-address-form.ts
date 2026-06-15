import { StorageSchema } from 'src/features/content-generation/model';
import { POPOVER_IDS } from 'src/features/content-insert-popover/config/constants';
import { ADDRESS_FORMATS } from 'src/generators/address/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderAddressForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
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
