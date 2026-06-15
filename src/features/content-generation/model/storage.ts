import { Language, Theme } from 'src/shared/model/types';

import {
  AddressSettings,
  EmailSettings,
  FirstNameSettings,
  LastNameSettings,
  LinkSettings,
  PhoneSettings,
  TextSettings,
  TitleSettings,
} from './types';

export type StorageSchema = {
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: FirstNameSettings;
  lastNameSettings: LastNameSettings;

  generationLanguage: Language;
  interfaceLanguage: Language;
  theme: Theme;
};
