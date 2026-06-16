import { ContentType } from '../content-type';
import { StorageSchema } from '../storage';
import { GENERATOR_BY_CONTENT_TYPE } from './config/generator-by-content-type';

export const generateContent = (contentType: ContentType, storage: StorageSchema): string => {
  return GENERATOR_BY_CONTENT_TYPE[contentType].generate(storage);
};
