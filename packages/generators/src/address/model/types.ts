import { GenerationLanguage } from '@lorema/core';

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
  language: GenerationLanguage;
  formats: AddressFormat[];
};
