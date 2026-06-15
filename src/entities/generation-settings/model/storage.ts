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

export type GenerationSettings = {
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: FirstNameSettings;
  lastNameSettings: LastNameSettings;
};

export type StorageSchema = GenerationSettings & import('src/entities/extension-settings/model').ExtensionSettings;
