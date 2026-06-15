import { getSelectedValues } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { LengthPreset, TitleSettings, TitleTopic } from '../model';
import { ContentSettingsReader } from './types';

export const readTitleSettings: ContentSettingsReader<TitleSettings> = (params) => {
  const { form, language } = params;

  return {
    language,
    lengthPresets: getSelectedValues<LengthPreset>(form, CONTENT_FORM_FIELD_IDS.titleLengthPresetSelect),
    topics: getSelectedValues<TitleTopic>(form, CONTENT_FORM_FIELD_IDS.topicSelect),
  };
};
