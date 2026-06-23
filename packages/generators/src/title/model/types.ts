import { GenerationLanguage } from '@lorema/core';

export type RuTopicSubject = {
  nom: string;
  gen: string;
  acc: string;
  instr: string;
  prep: string;
  withInstr: string;
};

export type RuTopicData = {
  subjects: RuTopicSubject[];
  contexts: string[];
  results: string[];
  problems: string[];
  processes: string[];
  tools: string[];
};

export type EnTopicData = {
  subjects: string[];
  contexts: string[];
  results: string[];
  problems: string[];
  processes: string[];
  tools: string[];
};

export type TitleTopic = 'business' | 'it' | 'art' | 'science' | 'finance' | 'marketing';
export type TitleLengthPreset = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';

export type TitleSettings = {
  language: GenerationLanguage;
  lengthPresets: TitleLengthPreset[];
  topics: TitleTopic[];
};
