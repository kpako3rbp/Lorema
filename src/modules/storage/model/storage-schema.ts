import {
  AddressSettings,
  EmailSettings,
  FirstNameSettings,
  LastNameSettings,
  LinkSettings,
  PhoneSettings,
  TextSettings,
  TitleSettings,
} from 'src/modules/generators';
import { Language, Theme } from 'src/shared/model/types';

export type StorageSchema = {
  // Settings
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: FirstNameSettings;
  lastNameSettings: LastNameSettings;

  // Common
  generationLanguage: Language;
  interfaceLanguage: Language;
  theme: Theme;
};
