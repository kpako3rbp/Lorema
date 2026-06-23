import { DATA_TABS, DATA_TYPE_TO_TAB, DataType, InterfaceLanguage } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';

import { DATA_TAB_CONFIG } from '../../config/data-tab-registry';

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
              ${DATA_TAB_CONFIG[tab].icon}
              ${t.dataTitles[tab]}
            </span>
          </label>
        `,
      ).join('')}
    </div>
  `;
};
