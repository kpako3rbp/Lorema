import { ContentType, StorageSchema } from 'src/shared/model/types';

import { CONTENT_GENERATORS } from './registry';

export const generateContent = (contentType: ContentType, storage: StorageSchema): string => {
  return CONTENT_GENERATORS[contentType](storage);
};
