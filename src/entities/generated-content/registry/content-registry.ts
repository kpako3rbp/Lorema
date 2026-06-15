import { readAddressSettings } from 'src/entities/generation-settings/form-readers/read-address-settings';
import { readEmailSettings } from 'src/entities/generation-settings/form-readers/read-email-settings';
import { readFirstNameSettings } from 'src/entities/generation-settings/form-readers/read-first-name-settings';
import { readLastNameSettings } from 'src/entities/generation-settings/form-readers/read-last-name-settings';
import { readLinkSettings } from 'src/entities/generation-settings/form-readers/read-link-settings';
import { readPhoneSettings } from 'src/entities/generation-settings/form-readers/read-phone-settings';
import { readTextSettings } from 'src/entities/generation-settings/form-readers/read-text-settings';
import { readTitleSettings } from 'src/entities/generation-settings/form-readers/read-title-settings';
import { ContentSettingsByType, ContentSettingsKey, GenerationSettings } from 'src/entities/generation-settings/model';
import { generateAddress } from 'src/generators/address/lib/generator';
import { generateEmail } from 'src/generators/email/lib/generator';
import { generateLink } from 'src/generators/link/lib/generator';
import { generateFirstName, generateLastName } from 'src/generators/person/lib/generator';
import { generatePhone } from 'src/generators/phone/lib/generator';
import { generateLorem } from 'src/generators/text/lib/generator';
import { generateTitle } from 'src/generators/title/lib/generator';
import { Language } from 'src/shared/model/types';

import { ContentType } from '../model';

type ContentRegistryItem<TContentType extends ContentType> = {
  type: TContentType;
  settingsKey: ContentSettingsKey;
  generate: (settings: ContentSettingsByType[TContentType]) => string;
  readSettings: (params: { form: HTMLFormElement; language: Language }) => ContentSettingsByType[TContentType];
};

export const CONTENT_REGISTRY = {
  text: {
    type: 'text',
    settingsKey: 'textSettings',
    generate: generateLorem,
    readSettings: readTextSettings,
  },
  title: {
    type: 'title',
    settingsKey: 'titleSettings',
    generate: generateTitle,
    readSettings: readTitleSettings,
  },
  email: {
    type: 'email',
    settingsKey: 'emailSettings',
    generate: generateEmail,
    readSettings: readEmailSettings,
  },
  link: {
    type: 'link',
    settingsKey: 'linkSettings',
    generate: generateLink,
    readSettings: readLinkSettings,
  },
  phone: {
    type: 'phone',
    settingsKey: 'phoneSettings',
    generate: generatePhone,
    readSettings: readPhoneSettings,
  },
  address: {
    type: 'address',
    settingsKey: 'addressSettings',
    generate: generateAddress,
    readSettings: readAddressSettings,
  },
  firstName: {
    type: 'firstName',
    settingsKey: 'firstNameSettings',
    generate: generateFirstName,
    readSettings: readFirstNameSettings,
  },
  lastName: {
    type: 'lastName',
    settingsKey: 'lastNameSettings',
    generate: generateLastName,
    readSettings: readLastNameSettings,
  },
} satisfies { [TContentType in ContentType]: ContentRegistryItem<TContentType> };

export const generateContent = <TContentType extends ContentType>(
  contentType: TContentType,
  storage: GenerationSettings,
): string => {
  const registryItem = CONTENT_REGISTRY[contentType];

  const generate = registryItem.generate as (settings: ContentSettingsByType[TContentType]) => string;

  return generate(storage[registryItem.settingsKey] as ContentSettingsByType[TContentType]);
};

export const readContentSettings = <TContentType extends ContentType>(params: {
  contentType: TContentType;
  form: HTMLFormElement;
  language: Language;
}): ContentSettingsByType[TContentType] => {
  const readSettings = CONTENT_REGISTRY[params.contentType].readSettings as (readerParams: {
    form: HTMLFormElement;
    language: Language;
  }) => ContentSettingsByType[TContentType];

  return readSettings(params);
};
