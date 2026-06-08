import { ContentType, StorageSchema } from 'src/shared/model/types';

import { generateAddress } from './address/lib/generator';
import { generateEmail } from './email/lib/generator';
import { generateLink } from './link/lib/generator';
import { generatePhone } from './phone/lib/generator';
import { generateLorem } from './text/lib/generator';
import { generateTitle } from './title/lib/generator';

export const generateContent = (contentType: ContentType, storage: StorageSchema) => {
  const mapTypeToGenerator: Record<ContentType, string> = {
    text: generateLorem(storage.textSettings),
    title: generateTitle(storage.titleSettings),
    email: generateEmail(storage.emailSettings),
    link: generateLink(storage.linkSettings),
    phone: generatePhone(storage.phoneSettings),
    address: generateAddress(storage.addressSettings),
  };

  return mapTypeToGenerator[contentType];
};
