import { ContentSettingsKey } from 'src/entities/generation-settings/model';

import { ContentType } from '../model';
import { CONTENT_REGISTRY } from '../registry/content-registry';

export const CONTENT_TYPES = Object.keys(CONTENT_REGISTRY) as ContentType[];

export const getContentSettingsKey = (contentType: ContentType): ContentSettingsKey => {
  return CONTENT_REGISTRY[contentType].settingsKey;
};
