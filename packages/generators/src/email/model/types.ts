export type EmailLengthPreset = 'sm' | 'md' | 'lg';

export type EmailSettings = {
  lengthPresets: EmailLengthPreset[];
  domain?: string;
};
