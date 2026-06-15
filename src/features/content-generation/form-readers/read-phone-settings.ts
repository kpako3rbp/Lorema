import { getInputValue, getSelectedValue } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { PhoneFormat, PhoneSettings } from '../model';
import { ContentSettingsReader } from './types';

export const readPhoneSettings: ContentSettingsReader<PhoneSettings> = (params) => {
  const { form } = params;

  return {
    countryCode: getInputValue(form, CONTENT_FORM_FIELD_IDS.countryCodeInput),
    digitsCount: Math.floor(Number(getInputValue(form, CONTENT_FORM_FIELD_IDS.digitsCountInput))),
    format: getSelectedValue<PhoneFormat>(form, CONTENT_FORM_FIELD_IDS.phoneFormatSelect),
  };
};
