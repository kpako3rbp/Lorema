import { TitleTopic } from 'src/shared/model/types';

export const TOPICS: Exclude<TitleTopic, 'random'>[] = [
  'business',
  'it',
  'project',
  'task',
  'art',
  'education',
  'science',
  'travel',
  'finance',
  'marketing',
  'health',
];
