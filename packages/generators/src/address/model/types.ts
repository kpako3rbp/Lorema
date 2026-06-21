import { Language } from '@lorema/generators/shared/model/types';

export type AddressParts = {
  countries: string[];
  regions: string[];
  states: string[];
  cities: string[];
  cityTypes: string[];
  streetTypes: string[];
  streetNames: string[];
};

export type AddressFormat = 'short' | 'full' | 'postal' | 'legal';

export type AddressSettings = {
  language: Language;
  formats: AddressFormat[];
};
