import { EmailSettings } from '../../types';
import { getRandomItem } from '../../utils/random';

const DOMAINS = ['email.com', 'mail.com', 'inbox.com', 'example.net', 'testmail.dev'];
const LOGINS = ['alex', 'maria', 'john', 'kate', 'ivan', 'demo', 'user', 'tester', 'pixel', 'nova'];

export const generateEmail = (settings: EmailSettings): string => {
  const maxLength = Math.max(1, Math.floor(settings.loginMaxLength));
  const suffix = String(Math.floor(Math.random() * 90) + 10);
  const base = getRandomItem(LOGINS);
  const login = `${base}${suffix}`.slice(0, maxLength).replace(/\.$/, 'x');

  return `${login}@${getRandomItem(DOMAINS)}`;
};
