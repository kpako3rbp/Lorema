import { getSelectedValues } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { AddressFormat, AddressSettings } from '../model';
import { ContentSettingsReader } from './types';

export const readAddressSettings: ContentSettingsReader<AddressSettings> = (params) => {
  const { form, language } = params;

  return {
    language,
    formats: getSelectedValues<AddressFormat>(form, CONTENT_FORM_FIELD_IDS.addressFormatSelect),
  };
};
