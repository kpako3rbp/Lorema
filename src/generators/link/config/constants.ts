import { LinkLengthPreset } from 'src/shared/model/types';

export const DOMAINS = ['alpha', 'demo', 'sample', 'project', 'content', 'market', 'studio', 'portal'];
export const ZONES = ['com', 'net', 'dev', 'io'];
export const PATHS = ['about', 'blog', 'docs', 'catalog', 'profile', 'news', 'start'];
export const QUERY_KEYS = ['ref', 'utm_source', 'utm_campaign', 'page', 'sort', 'filter', 'search', 'token'];
export const QUERY_VALUES = ['demo', 'test', 'main', 'profile', 'catalog', 'active', 'new', 'popular'];

export const LINK_LENGTH_PRESETS: LinkLengthPreset[] = ['sm', 'md', 'lg', 'xlg'];

export const LINK_LENGTH_PRESET_RANGES: Record<LinkLengthPreset, { min: number; max: number }> = {
  sm: { min: 15, max: 35 },
  md: { min: 35, max: 60 },
  lg: { min: 60, max: 120 },
  xlg: { min: 200, max: 600 },
};
