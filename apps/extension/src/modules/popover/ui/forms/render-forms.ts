import { DATA_TABS, InterfaceLanguage } from '@lorema/core';
import { POPOVER_TAB_CLASSNAME } from 'src/modules/popover/config/constants';
import { DATA_TAB_CONFIG } from 'src/modules/popover/config/data-tab-registry';
import { StorageSchema } from 'src/modules/storage';

export const renderForms = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  return DATA_TABS.map((dataTab) => {
    return /*html*/ `
      <div class="${POPOVER_TAB_CLASSNAME}" data-data-tab="${dataTab}">
        ${DATA_TAB_CONFIG[dataTab].renderForm(storage, interfaceLanguage)}
      </div>
    `;
  }).join('');
};
