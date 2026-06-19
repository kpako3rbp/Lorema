import { TRANSLATIONS } from 'src/i18n';
import { DataType } from 'src/modules/data-type';
import { DATA_TABS, DATA_TYPE_TO_TAB, DataTab } from 'src/modules/data-type/config/constants';
import { Language } from 'src/shared/model/types';
import { renderAddressIcon } from 'src/shared/ui/icons/address';
import { renderEmailIcon } from 'src/shared/ui/icons/email';
import { renderLinkIcon } from 'src/shared/ui/icons/link';
import { renderPersonIcon } from 'src/shared/ui/icons/person';
import { renderPhoneIcon } from 'src/shared/ui/icons/phone';
import { renderTextIcon } from 'src/shared/ui/icons/text';
import { renderTitleIcon } from 'src/shared/ui/icons/title';

const mapTypeToIcon: Record<DataTab, string> = {
  text: renderTextIcon(),
  title: renderTitleIcon(),
  // list: renderListIcon(),
  email: renderEmailIcon(),
  link: renderLinkIcon(),
  phone: renderPhoneIcon(),
  address: renderAddressIcon(),
  person: renderPersonIcon(),
  // number: renderNumberIcon(),
  // date: renderDateIcon(),
};

export const renderTabs = (activeDataType: DataType, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const activeTab = DATA_TYPE_TO_TAB[activeDataType];

  return /*html*/ `
    <div class="lorem-tabs">
      ${DATA_TABS.map(
        (tab) => /*html*/ `
          <label class="lorem-tab">
            <input
              type="radio"
              name="dataType"
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
