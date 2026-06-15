import { ContentType, StorageSchema } from 'src/shared/model/types';

import { generateAddress } from './address/lib/generator';
import { generateEmail } from './email/lib/generator';
import { generateLink } from './link/lib/generator';
import { generateFirstName, generateLastName } from './person/lib/generator';
import { generatePhone } from './phone/lib/generator';
import { generateLorem } from './text/lib/generator';
import { generateTitle } from './title/lib/generator';

type ContentGenerator = (storage: StorageSchema) => string;

export const CONTENT_GENERATORS: Record<ContentType, ContentGenerator> = {
  text: (storage) => generateLorem(storage.textSettings),
  title: (storage) => generateTitle(storage.titleSettings),
  email: (storage) => generateEmail(storage.emailSettings),
  link: (storage) => generateLink(storage.linkSettings),
  phone: (storage) => generatePhone(storage.phoneSettings),
  address: (storage) => generateAddress(storage.addressSettings),
  firstName: (storage) => generateFirstName(storage.firstNameSettings),
  lastName: (storage) => generateLastName(storage.lastNameSettings),
};
