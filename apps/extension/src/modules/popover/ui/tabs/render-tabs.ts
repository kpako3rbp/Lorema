import { DATA_TABS, DATA_TYPE_TO_TAB, DataTab, DataType, InterfaceLanguage } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';
import { renderAddressIcon } from 'src/shared/ui/icons/address';
import { renderDateIcon } from 'src/shared/ui/icons/date';
import { renderEmailIcon } from 'src/shared/ui/icons/email';
import { renderLinkIcon } from 'src/shared/ui/icons/link';
import { renderListIcon } from 'src/shared/ui/icons/list';
import { renderNumberIcon } from 'src/shared/ui/icons/number';
import { renderPersonIcon } from 'src/shared/ui/icons/person';
import { renderPhoneIcon } from 'src/shared/ui/icons/phone';
import { renderTextIcon } from 'src/shared/ui/icons/text';
import { renderTitleIcon } from 'src/shared/ui/icons/title';

const mapTypeToIcon: Record<DataTab, string> = {
  text: renderTextIcon(),
  title: renderTitleIcon(),
  list: renderListIcon(),
  email: renderEmailIcon(),
  link: renderLinkIcon(),
  phone: renderPhoneIcon(),
  address: renderAddressIcon(),
  person: renderPersonIcon(),
  number: renderNumberIcon(),
  date: renderDateIcon(),
};

export const renderTabs = (activeDataType: DataType, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const activeTab = DATA_TYPE_TO_TAB[activeDataType];

  return /*html*/ `
    <div class="lorem-tabs">
      ${DATA_TABS.map(
        (tab) => /*html*/ `
          <label class="lorem-tab">
            <input
              type="radio"
              name="dataTab"
              value="${tab}"
              ${activeTab === tab ? 'checked' : ''}
            />
            <span>
              ${mapTypeToIcon[tab]}
              ${t.dataTitles[tab]}
            </span>
          </label>
        `,
      ).join('')}
    </div>
  `;
};
