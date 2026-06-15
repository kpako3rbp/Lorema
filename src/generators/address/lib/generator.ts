import { AddressFormat, AddressSettings } from 'src/entities/generation-settings/model';
import { getRandomInteger, getRandomItem } from 'src/shared/lib/random';
import { Language } from 'src/shared/model/types';

import { ADDRESS_FORMATS, ADDRESS_PARTS_BY_LANGUAGE } from '../config/constants';

const getSettingsFormat = (settings: AddressSettings): AddressFormat => {
  const selectedFormats = settings.formats.length ? settings.formats : ADDRESS_FORMATS;

  return getRandomItem(selectedFormats);
};

const generateRussianAddress = (settings: AddressSettings) => {
  const parts = ADDRESS_PARTS_BY_LANGUAGE.ru;

  const country = getRandomItem(parts.countries);
  const region = getRandomItem(parts.regions);
  const city = getRandomItem(parts.cities);
  const streetType = getRandomItem(parts.streetTypes);
  const streetName = getRandomItem(parts.streetNames);

  const building = getRandomInteger(1, 250);
  const apartment = getRandomInteger(1, 400);
  const postalCode = getRandomInteger(100000, 999999);

  const shortStreetAddress = `${streetType} ${streetName}, ${building}-${apartment}`;
  const fullStreetAddress = `${streetType} ${streetName}, д. ${building}, кв. ${apartment}`;

  const formatMap: Record<AddressFormat, string> = {
    short: shortStreetAddress,
    full: `г. ${city}, ${fullStreetAddress}`,
    postal: `${postalCode}, ${country}, ${region}, г. ${city}, ${fullStreetAddress}`,
    legal: `${postalCode}, город ${city}, ${streetType} ${streetName}, д. ${building} ${getRandomItem(['стр.', 'корп.'])} ${getRandomInteger(1, 20)}`,
  };

  return formatMap[getSettingsFormat(settings)];
};

const generateEnglishAddress = (settings: AddressSettings) => {
  const parts = ADDRESS_PARTS_BY_LANGUAGE.en;

  const country = getRandomItem(parts.countries);
  const state = getRandomItem(parts.states);
  const city = getRandomItem(parts.cities);
  const streetName = getRandomItem(parts.streetNames);
  const streetType = getRandomItem(parts.streetTypes);

  const building = getRandomInteger(1, 9999);
  const apartment = getRandomInteger(1, 500);
  const zipCode = getRandomInteger(10000, 99999);

  const streetAddress = `${building} ${streetName} ${streetType}, Apt ${apartment}`;

  const formatMap: Record<AddressFormat, string> = {
    short: streetAddress,
    full: `${streetAddress}, ${city}, ${state}`,
    postal: `${zipCode}, ${streetAddress}, ${city}, ${state}, ${country}`,
    legal: `${zipCode}, ${city}, ${state}, ${building} ${streetName} ${streetType}, Suite ${getRandomInteger(100, 5000)}`,
  };

  return formatMap[getSettingsFormat(settings)];
};

const ADDRESS_GENERATORS_BY_LANGUAGE: Record<Language, (settings: AddressSettings) => string> = {
  ru: generateRussianAddress,
  en: generateEnglishAddress,
};

export const generateAddress = (settings: AddressSettings): string => {
  return ADDRESS_GENERATORS_BY_LANGUAGE[settings.language](settings);
};
