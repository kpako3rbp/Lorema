import { StorageSchema } from '@extension/modules/storage';
import { DATA_TABS, InterfaceLanguage } from '@lorema/core';

import { POPOVER_TAB_CLASSNAME } from '../../config/constants';
import { DATA_TAB_CONFIG } from '../../config/data-tab-registry';

export const renderForms = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  return DATA_TABS.map((dataTab) => {
    return /*html*/ `
      <div class="${POPOVER_TAB_CLASSNAME}" data-data-tab="${dataTab}">
        ${DATA_TAB_CONFIG[dataTab].renderForm(storage, interfaceLanguage)}
      </div>
    `;
  }).join('');
};
