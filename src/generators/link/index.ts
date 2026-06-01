import { LinkSettings } from '../../types';
import { getRandomItem } from '../../utils/random';

const DOMAINS = ['alpha', 'demo', 'sample', 'project', 'content', 'market', 'studio', 'portal'];
const ZONES = ['com', 'net', 'dev', 'io'];
const PATHS = ['about', 'blog', 'docs', 'catalog', 'profile', 'news', 'start'];

export const generateLink = (settings: LinkSettings): string => {
  const maxLength = Math.max(4, Math.floor(settings.maxLength));
  const host = `${getRandomItem(DOMAINS)}-${Math.floor(Math.random() * 90) + 10}.${getRandomItem(ZONES)}`;
  const path = `/${getRandomItem(PATHS)}/${Math.floor(Math.random() * 900) + 100}`;
  const rest = `${host}${path}`.slice(0, maxLength).replace(/[\/-]$/, '');

  return `${settings.prefix}${rest}`;
};
