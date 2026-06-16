import { Language } from 'src/shared/model/types';

export type RuTopicForms = {
  nom: string;
  gen: string;
  acc: string;
  instr: string;
  prep: string;
  withInstr: string;
  context: string;
  result: string;
};

export type EnTopicForms = {
  value: string;
  context: string;
  result: string;
};

export type TitleTopic = 'business' | 'it' | 'art' | 'science' | 'finance' | 'marketing';
export type TitleLengthPreset = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';

export type TitleSettings = {
  language: Language;
  lengthPresets: TitleLengthPreset[];
  topics: TitleTopic[];
};
