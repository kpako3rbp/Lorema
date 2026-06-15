import { getSelectedValue, getSelectedValues } from 'src/shared/lib/form-element';

import { CONTENT_FORM_FIELD_IDS } from '../config/form-field-ids';
import { LinkLengthPreset, LinkPrefix, LinkSettings } from '../model';
import { ContentSettingsReader } from './types';

export const readLinkSettings: ContentSettingsReader<LinkSettings> = (params) => {
  const { form } = params;

  return {
    prefix: getSelectedValue<LinkPrefix>(form, CONTENT_FORM_FIELD_IDS.linkPrefixSelect),
    lengthPresets: getSelectedValues<LinkLengthPreset>(form, CONTENT_FORM_FIELD_IDS.linkLengthPresetSelect),
  };
};
