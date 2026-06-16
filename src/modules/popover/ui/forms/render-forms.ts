import { DataType } from 'src/modules/data-type';
import { POPOVER_TAB_CLASSNAME } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';

import { renderAddressForm } from './render-address-form';
import { renderEmailForm } from './render-email-form';
import { renderFirstNameForm } from './render-first-name-form';
import { renderLastNameForm } from './render-last-name-form';
import { renderLinkForm } from './render-link-form';
import { renderPhoneForm } from './render-phone-form';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';

const FORM_RENDERERS: Record<DataType, (storage: StorageSchema, interfaceLanguage: Language) => string> = {
  text: renderTextForm,
  title: renderTitleForm,
  email: renderEmailForm,
  link: renderLinkForm,
  phone: renderPhoneForm,
  address: renderAddressForm,
  firstName: renderFirstNameForm,
  lastName: renderLastNameForm,
};

export const renderForms = (storage: StorageSchema, interfaceLanguage: Language): string => {
  return Object.entries(FORM_RENDERERS)
    .map(([dataType, renderForm]) => {
      return /*html*/ `
        <div class="${POPOVER_TAB_CLASSNAME}" data-data-type="${dataType}">
          ${renderForm(storage, interfaceLanguage)}
        </div>
      `;
    })
    .join('');
};
