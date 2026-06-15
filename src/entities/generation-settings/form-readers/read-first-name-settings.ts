import { getSelectedValues } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { FirstNameSettings, NameLengthPreset } from '../model';
import { ContentSettingsReader } from './types';

export const readFirstNameSettings: ContentSettingsReader<FirstNameSettings> = (params) => {
  const { form, language } = params;

  return {
    language,
    lengthPresets: getSelectedValues<NameLengthPreset>(form, CONTENT_FORM_FIELD_IDS.firstNameLengthSelect),
  };
};
