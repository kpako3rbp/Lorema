import { EmailLengthPreset } from 'src/features/content-generation/model';

export const EMAIL_LENGTH_PRESETS: EmailLengthPreset[] = ['sm', 'md', 'lg'];

export const EMAIL_LENGTH_PRESET_RANGES: Record<EmailLengthPreset, { min: number; max: number }> = {
  sm: { min: 5, max: 10 },
  md: { min: 10, max: 20 },
  lg: { min: 20, max: 40 },
};

export const DOMAINS = ['email.com', 'mail.com', 'inbox.com', 'example.net', 'testmail.dev'];
export const LOGINS = [
  'alex',
  'maria',
  'john',
  'kate',
  'ivan',
  'demo',
  'user',
  'tester',
  'pixel',
  'nova',

  'andrew',
  'michael',
  'daniel',
  'thomas',
  'james',
  'david',
  'robert',
  'william',
  'ryan',
  'mark',

  'anna',
  'olivia',
  'emma',
  'sophia',
  'victoria',
  'amelia',
  'isabella',
  'natalie',
  'eva',
  'linda',

  'developer',
  'designer',
  'manager',
  'founder',
  'engineer',
  'architect',
  'freelancer',
  'consultant',

  'rocket',
  'hunter',
  'falcon',
  'shadow',
  'phoenix',
  'vector',
  'matrix',
  'orbit',
  'quantum',
  'vertex',

  'alpha',
  'beta',
  'gamma',
  'omega',
  'delta',
  'sigma',

  'coffee',
  'dragon',
  'tiger',
  'eagle',
  'wolf',
  'fox',
];
export const WORDS = [
  'dev',
  'design',
  'studio',
  'team',
  'admin',
  'project',
  'cloud',
  'pixel',
  'nova',
  'data',
  'app',
  'web',
  'user',
  'test',
  'demo',
];

export const SEPARATORS = ['', '.', '_'];
