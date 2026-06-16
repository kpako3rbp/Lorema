export type LinkPrefix = 'https://' | 'http://' | 'www.';

export type LinkLengthPreset = 'sm' | 'md' | 'lg' | 'xlg';

export type LinkSettings = {
  prefix: LinkPrefix;
  lengthPresets: LinkLengthPreset[];
};
