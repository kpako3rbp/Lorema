import { TitleTopic } from 'src/shared/model/types';

export type TopicWithoutRandom = Exclude<TitleTopic, 'random'>;

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
