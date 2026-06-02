import { ContentType, StorageSchema } from 'src/shared/model/types';

import { generateLorem } from './text/lib/generator';
import { generateTitle } from './title/lib/generator';

export const generateContent = (contentType: ContentType, storage: StorageSchema) => {
  const mapTypeToGenerator: Record<ContentType, string> = {
    text: generateLorem(storage.textSettings),
    title: generateTitle(storage.titleSettings),
  };

  return mapTypeToGenerator[contentType];
};
