import { ContentType, StorageSchema } from '../types';
import { generateAddress } from './address';
import { generateEmail } from './email';
import { generateLink } from './link';
import { generateFirstName, generateLastName } from './person';
import { generatePhone } from './phone';
import { generateText } from './text';
import { generateTitle } from './title';

export const generateContent = (contentType: ContentType, storage: StorageSchema): string => {
  switch (contentType) {
    case 'text':
      return generateText(storage.textSettings);
    case 'title':
      return generateTitle(storage.titleSettings);
    case 'email':
      return generateEmail(storage.emailSettings);
    case 'link':
      return generateLink(storage.linkSettings);
    case 'phone':
      return generatePhone(storage.phoneSettings);
    case 'address':
      return generateAddress(storage.addressSettings);
    case 'firstName':
      return generateFirstName(storage.firstNameSettings);
    case 'lastName':
      return generateLastName(storage.lastNameSettings);
  }
};
