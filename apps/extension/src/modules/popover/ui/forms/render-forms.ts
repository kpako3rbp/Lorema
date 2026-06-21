import { DataTab } from '@lorema/core';
import { POPOVER_TAB_CLASSNAME } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';

import { renderAddressForm } from './render-address-form';
import { renderEmailForm } from './render-email-form';
import { renderLinkForm } from './render-link-form';
import { renderPersonForm } from './render-person-form';
import { renderPhoneForm } from './render-phone-form';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';

const FORM_RENDERERS: Record<DataTab, (storage: StorageSchema, interfaceLanguage: Language) => string> = {
  text: renderTextForm,
  title: renderTitleForm,
  email: renderEmailForm,
  link: renderLinkForm,
  phone: renderPhoneForm,
  address: renderAddressForm,
  person: renderPersonForm,
};

export const renderForms = (storage: StorageSchema, interfaceLanguage: Language): string => {
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
