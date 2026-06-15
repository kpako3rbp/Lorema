import { POPOVER_TAB_CLASSNAME } from 'src/popover/config/constants';
import { ContentType, Language, StorageSchema } from 'src/shared/model/types';

import { renderAddressForm } from './render-address-form';
import { renderEmailForm } from './render-email-form';
import { renderFirstNameForm } from './render-firsrname-form';
import { renderLastNameForm } from './render-lastname-form';
import { renderLinkForm } from './render-link-form';
import { renderPhoneForm } from './render-phone-form';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';

const FORM_RENDERERS: Record<ContentType, (storage: StorageSchema, interfaceLanguage: Language) => string> = {
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
    .map(([contentType, renderForm]) => {
      return /*html*/ `
        <div class="${POPOVER_TAB_CLASSNAME}" data-content-type="${contentType}">
          ${renderForm(storage, interfaceLanguage)}
        </div>
      `;
    })
    .join('');
};
