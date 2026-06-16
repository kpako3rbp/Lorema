import { ContentType } from '../content-type';
import { generateAddress } from '../generators/address/lib/generator';
import { generateEmail } from '../generators/email/lib/generator';
import { generateLink } from '../generators/link/lib/generator';
import { generateFirstName, generateLastName } from '../generators/person/lib/generator';
import { generatePhone } from '../generators/phone/lib/generator';
import { generateLorem } from '../generators/text/lib/generator';
import { generateTitle } from '../generators/title/lib/generator';
import { StorageSchema } from '../storage';

export const generateContent = (contentType: ContentType, storage: StorageSchema) => {
  const mapTypeToGenerator: Record<ContentType, () => string> = {
    text: () => generateLorem(storage.textSettings),
    title: () => generateTitle(storage.titleSettings),
    email: () => generateEmail(storage.emailSettings),
    link: () => generateLink(storage.linkSettings),
    phone: () => generatePhone(storage.phoneSettings),
    address: () => generateAddress(storage.addressSettings),
    firstName: () => generateFirstName(storage.firstNameSettings),
    lastName: () => generateLastName(storage.lastNameSettings),
  };

  return mapTypeToGenerator[contentType]();
};
