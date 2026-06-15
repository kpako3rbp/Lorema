import { ContentType, StorageSchema } from '../model/types';

export type ContentSettingsKey = Extract<keyof StorageSchema, `${ContentType}Settings`>;

export const CONTENT_TYPES: ContentType[] = [
  'text',
  'title',
  'email',
  'link',
  'phone',
  'address',
  'firstName',
  'lastName',
];

export const CONTENT_SETTINGS_KEYS: Record<ContentType, ContentSettingsKey> = {
  text: 'textSettings',
  title: 'titleSettings',
  email: 'emailSettings',
  link: 'linkSettings',
  phone: 'phoneSettings',
  address: 'addressSettings',
  firstName: 'firstNameSettings',
  lastName: 'lastNameSettings',
};

export const getContentSettingsKey = (contentType: ContentType): ContentSettingsKey => {
  return CONTENT_SETTINGS_KEYS[contentType];
};
