import { TRANSLATIONS } from 'src/i18n';
import { DATA_TYPES, DataType } from 'src/modules/data-type';
import { Language } from 'src/shared/model/types';
import { renderAddressIcon } from 'src/shared/ui/icons/address';
import { renderEmailIcon } from 'src/shared/ui/icons/email';
import { renderFirstNameIcon } from 'src/shared/ui/icons/first-name';
import { renderLastNameIcon } from 'src/shared/ui/icons/last-name';
import { renderLinkIcon } from 'src/shared/ui/icons/link';
import { renderPhoneIcon } from 'src/shared/ui/icons/phone';
import { renderTextIcon } from 'src/shared/ui/icons/text';
import { renderTitleIcon } from 'src/shared/ui/icons/title';

const mapTypeToIcon: Record<DataType, string> = {
  text: renderTextIcon(),
  title: renderTitleIcon(),
  email: renderEmailIcon(),
  link: renderLinkIcon(),
  phone: renderPhoneIcon(),
  address: renderAddressIcon(),
  firstName: renderFirstNameIcon(),
  lastName: renderLastNameIcon(),
};

export const renderTabs = (activeDataType: DataType, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  return /*html*/ `
    <div class="lorem-tabs">
      ${DATA_TYPES.map(
        (dataType) => /*html*/ `
          <label class="lorem-tab">
            <input
              type="radio"
              name="dataType"
              value="${dataType}"
              ${activeDataType === dataType ? 'checked' : ''}
            />
            <span>
              ${mapTypeToIcon[dataType]}
              ${t.dataTitles[dataType]}
            </span>
          </label>
        `,
      ).join('')}
    </div>
  `;
};
