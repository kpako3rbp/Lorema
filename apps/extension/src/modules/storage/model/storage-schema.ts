import { GenerationLanguage, InterfaceLanguage } from '@lorema/core';
import {
  AddressSettings,
  EmailSettings,
  FirstNameSettings,
  LastNameSettings,
  LinkSettings,
  ListSettings,
  PhoneSettings,
  TextSettings,
  TitleSettings,
} from '@lorema/generators';
import { Theme } from 'src/shared/model/types';

export type StorageSchema = {
  // Generation Settings
  generationLanguage: GenerationLanguage;
  textSettings: TextSettings;
  titleSettings: TitleSettings;
  emailSettings: EmailSettings;
  linkSettings: LinkSettings;
  phoneSettings: PhoneSettings;
  addressSettings: AddressSettings;
  firstNameSettings: FirstNameSettings;
  lastNameSettings: LastNameSettings;
  listSettings: ListSettings;

  // Common
  interfaceLanguage: InterfaceLanguage;
  theme: Theme;
};
