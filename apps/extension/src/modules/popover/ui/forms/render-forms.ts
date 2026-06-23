import { DataTab, InterfaceLanguage } from '@lorema/core';
import { POPOVER_TAB_CLASSNAME } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';

import { renderAddressForm } from './render-address-form';
import { renderDateForm } from './render-date-form';
import { renderEmailForm } from './render-email-form';
import { renderLinkForm } from './render-link-form';
import { renderListForm } from './render-list-form';
import { renderNumberForm } from './render-number-form';
import { renderPersonForm } from './render-person-form';
import { renderPhoneForm } from './render-phone-form';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';

const FORM_RENDERERS: Record<DataTab, (storage: StorageSchema, interfaceLanguage: InterfaceLanguage) => string> = {
  text: renderTextForm,
  title: renderTitleForm,
  email: renderEmailForm,
  link: renderLinkForm,
  phone: renderPhoneForm,
  address: renderAddressForm,
  person: renderPersonForm,
  list: renderListForm,
  number: renderNumberForm,
  date: renderDateForm,
};

export const renderForms = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  return Object.entries(FORM_RENDERERS)
    .map(([dataTab, renderForm]) => {
      return /*html*/ `
        <div class="${POPOVER_TAB_CLASSNAME}" data-data-tab="${dataTab}">
          ${renderForm(storage, interfaceLanguage)}
        </div>
      `;
    })
    .join('');
};
