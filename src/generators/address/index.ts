import { AddressSettings, Language } from '../../types';
import { getRandomItem } from '../../utils/random';

type AddressRecord = {
  country: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode: string;
};

const ADDRESSES: Record<Language, AddressRecord[]> = {
  ru: [
    { country: 'Россия', city: 'Москва', street: 'ул. Ленина', house: '15', apartment: 'кв. 42', postalCode: '101000' },
    { country: 'Россия', city: 'Санкт-Петербург', street: 'Невский проспект', house: '28', apartment: 'кв. 7', postalCode: '191025' },
    { country: 'Россия', city: 'Казань', street: 'ул. Баумана', house: '9', apartment: 'кв. 18', postalCode: '420111' },
    { country: 'Россия', city: 'Новосибирск', street: 'Красный проспект', house: '64', apartment: 'кв. 105', postalCode: '630099' },
    { country: 'Россия', city: 'Екатеринбург', street: 'ул. Малышева', house: '33', apartment: 'кв. 12', postalCode: '620014' },
  ],
  en: [
    { country: 'UK', city: 'London', street: 'Baker Street', house: '221B', postalCode: 'NW1 6XE' },
    { country: 'USA', city: 'New York', street: 'Madison Avenue', house: '450', apartment: 'Apt. 12', postalCode: '10022' },
    { country: 'USA', city: 'San Francisco', street: 'Market Street', house: '1355', apartment: 'Apt. 8', postalCode: '94103' },
    { country: 'Canada', city: 'Toronto', street: 'King Street West', house: '70', apartment: 'Unit 5', postalCode: 'M5X 1A9' },
    { country: 'Australia', city: 'Sydney', street: 'George Street', house: '200', apartment: 'Unit 14', postalCode: '2000' },
  ],
};

export const generateAddress = (settings: AddressSettings): string => {
  const address = getRandomItem(ADDRESSES[settings.language]);

  if (settings.format === 'short') return `${address.street}, ${address.house}`;
  if (settings.format === 'medium') return `${address.city}, ${address.street}, ${address.house}`;

  const apartment = address.apartment ? `, ${address.apartment}` : '';

  return `${address.country}, ${address.city}, ${address.street}, ${address.house}${apartment}, ${address.postalCode}`;
};
