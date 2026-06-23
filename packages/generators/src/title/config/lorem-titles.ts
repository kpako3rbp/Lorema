import { TitleLengthPreset } from '../model/types';

export const LOREM_TITLE_TEMPLATES: Record<TitleLengthPreset, string[]> = {
  xsm: [
    'Lorem ipsum',
    'Dolor sit amet',
    'Magna aliqua',
    'Nulla pariatur',
    'Amet elit',
    'Minim veniam',
    'Duis aute',
    'Tempor incididunt',
  ],

  sm: [
    'Lorem ipsum dolor sit amet',
    'Consectetur adipiscing elit',
    'Sed do eiusmod tempor',
    'Ut enim ad minim veniam',
    'Duis aute irure dolor',
    'Excepteur sint occaecat',
  ],

  md: [
    'Lorem ipsum dolor sit amet consectetur',
    'Sed do eiusmod tempor incididunt',
    'Ut enim ad minim veniam quis nostrud',
    'Duis aute irure dolor in reprehenderit',
    'Excepteur sint occaecat cupidatat non proident',
  ],

  lg: [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam quis nostrud exercitation ullamco',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse',
  ],

  xlg: [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt',
    'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
    'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt',
  ],
};
