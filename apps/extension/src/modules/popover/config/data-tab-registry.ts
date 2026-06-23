import { DataTab, InterfaceLanguage } from '@lorema/core';
import { StorageSchema } from 'src/modules/storage';
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

import {
  validateDateForm,
  validateListForm,
  validateNumberForm,
  validatePhoneForm,
  validateTextForm,
} from '../model/validation';
import { renderAddressForm } from '../ui/forms/render-address-form';
import { renderDateForm } from '../ui/forms/render-date-form';
import { renderEmailForm } from '../ui/forms/render-email-form';
import { renderLinkForm } from '../ui/forms/render-link-form';
import { renderListForm } from '../ui/forms/render-list-form';
import { renderNumberForm } from '../ui/forms/render-number-form';
import { renderPersonForm } from '../ui/forms/render-person-form';
import { renderPhoneForm } from '../ui/forms/render-phone-form';
import { renderTextForm } from '../ui/forms/render-text-form';
import { renderTitleForm } from '../ui/forms/render-title-form';

type FormRenderer = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage) => string;
type FormValidator = (form: HTMLFormElement, interfaceLanguage: InterfaceLanguage) => boolean;

type DataTabConfig = {
  renderForm: FormRenderer;
  validateForm?: FormValidator;
  icon: string;
};

export const DATA_TAB_CONFIG: Record<DataTab, DataTabConfig> = {
  text: {
    renderForm: renderTextForm,
    validateForm: validateTextForm,
    icon: renderTextIcon(),
  },
  title: {
    renderForm: renderTitleForm,
    icon: renderTitleIcon(),
  },
  list: {
    renderForm: renderListForm,
    validateForm: validateListForm,
    icon: renderListIcon(),
  },
  address: {
    renderForm: renderAddressForm,
    icon: renderAddressIcon(),
  },
  person: {
    renderForm: renderPersonForm,
    icon: renderPersonIcon(),
  },
  email: {
    renderForm: renderEmailForm,
    icon: renderEmailIcon(),
  },
  link: {
    renderForm: renderLinkForm,
    icon: renderLinkIcon(),
  },
  phone: {
    renderForm: renderPhoneForm,
    validateForm: validatePhoneForm,
    icon: renderPhoneIcon(),
  },
  number: {
    renderForm: renderNumberForm,
    validateForm: validateNumberForm,
    icon: renderNumberIcon(),
  },
  date: {
    renderForm: renderDateForm,
    validateForm: validateDateForm,
    icon: renderDateIcon(),
  },
};
