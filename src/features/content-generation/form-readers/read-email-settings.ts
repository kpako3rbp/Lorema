import { getSelectedValues } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { EmailLengthPreset, EmailSettings } from '../model';
import { ContentSettingsReader } from './types';

export const readEmailSettings: ContentSettingsReader<EmailSettings> = (params) => {
  const { form } = params;

  return {
    lengthPresets: getSelectedValues<EmailLengthPreset>(form, CONTENT_FORM_FIELD_IDS.emailLengthPresetSelect),
  };
};
