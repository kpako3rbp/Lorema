import { getCheckboxValue, getInputValue } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { LengthMode, TextSettings } from '../model';
import { ContentSettingsReader } from './types';

export const readTextSettings: ContentSettingsReader<TextSettings> = (params) => {
  const { form, language } = params;

  const lengthMode = new FormData(form).get('lengthMode') as LengthMode;

  return {
    language,
    length: Math.floor(Number(getInputValue(form, CONTENT_FORM_FIELD_IDS.textLengthInput))),
    lengthMode,
    keepWholeSentencies:
      lengthMode === 'exact' ? false : getCheckboxValue(form, CONTENT_FORM_FIELD_IDS.keepWholeSentencies),
    withParagraphs: lengthMode === 'exact' ? false : getCheckboxValue(form, CONTENT_FORM_FIELD_IDS.paragraphsCheckbox),
  };
};
