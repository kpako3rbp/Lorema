import { Language, PersonNameSettings } from '../../types';
import { getRandomItem } from '../../utils/random';

const FIRST_NAMES: Record<Language, string[]> = {
  ru: ['Александр', 'Мария', 'Иван', 'Анна', 'Дмитрий', 'Елена', 'Никита', 'Ольга', 'Павел', 'София'],
  en: ['Alex', 'Maria', 'John', 'Anna', 'David', 'Emma', 'Nick', 'Olivia', 'Paul', 'Sophia'],
};

const LAST_NAMES: Record<Language, string[]> = {
  ru: ['Иванов', 'Петрова', 'Смирнов', 'Кузнецова', 'Соколов', 'Попова', 'Васильев', 'Морозова'],
  en: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'],
};

export const generateFirstName = (settings: PersonNameSettings): string => getRandomItem(FIRST_NAMES[settings.language]);

export const generateLastName = (settings: PersonNameSettings): string => getRandomItem(LAST_NAMES[settings.language]);
