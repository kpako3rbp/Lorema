import { Language } from '@lorema/generators/shared/model/types';

import { EnTopicForms, RuTopicForms, TitleTopic } from '../model/types';

export const TOPICS: TitleTopic[] = ['business', 'it', 'art', 'science', 'finance', 'marketing'];

export const RU_TOPIC_FORMS: Record<TitleTopic, RuTopicForms> = {
  business: {
    nom: 'бизнес',
    gen: 'бизнеса',
    acc: 'бизнес',
    instr: 'бизнесом',
    prep: 'бизнесе',
    withInstr: 'с бизнесом',
    context: 'рынка',
    result: 'прибыли',
  },

  it: {
    nom: 'платформа',
    gen: 'платформы',
    acc: 'платформу',
    instr: 'платформой',
    prep: 'платформе',
    withInstr: 'с платформой',
    context: 'интерфейса',
    result: 'стабильности',
  },

  science: {
    nom: 'исследование',
    gen: 'исследования',
    acc: 'исследование',
    instr: 'исследованием',
    prep: 'исследовании',
    withInstr: 'с исследованием',
    context: 'данных',
    result: 'точности',
  },

  finance: {
    nom: 'бюджет',
    gen: 'бюджета',
    acc: 'бюджет',
    instr: 'бюджетом',
    prep: 'бюджете',
    withInstr: 'с бюджетом',
    context: 'расходов',
    result: 'доходности',
  },

  marketing: {
    nom: 'компания',
    gen: 'компании',
    acc: 'компанию',
    instr: 'компанией',
    prep: 'компании',
    withInstr: 'с компанией',
    context: 'аудитории',
    result: 'конверсии',
  },

  art: {
    nom: 'выставка',
    gen: 'выставки',
    acc: 'выставку',
    instr: 'выставкой',
    prep: 'выставке',
    withInstr: 'с выставкой',
    context: 'творческого процесса',
    result: 'вовлеченности',
  },
};

export const EN_TOPIC_FORMS: Record<TitleTopic, EnTopicForms> = {
  business: {
    value: 'business',
    context: 'market analysis',
    result: 'profitability',
  },

  it: {
    value: 'platform',
    context: 'user interface',
    result: 'stability',
  },

  science: {
    value: 'research',
    context: 'data analysis',
    result: 'accuracy',
  },

  finance: {
    value: 'budget',
    context: 'expenses',
    result: 'profitability',
  },

  marketing: {
    value: 'campaign',
    context: 'target audience',
    result: 'conversion',
  },

  art: {
    value: 'exhibition',
    context: 'creative process',
    result: 'engagement',
  },
};

export const TOPIC_FORMS_BY_LANGUAGE: Record<Language, unknown> = {
  ru: RU_TOPIC_FORMS,
  en: EN_TOPIC_FORMS,
};
