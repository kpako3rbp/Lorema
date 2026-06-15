import { Language, TitleLengthPreset } from 'src/shared/model/types';

const RU_EXTRA_TEMPLATES: Record<TitleLengthPreset, string[]> = {
  xsm: [
    '{nom}: обзор',
    '{nom}: тренды',
    '{nom} сегодня',
    '{nom} в фокусе',
    'Будущее {gen}',
    'Сила {gen}',
    'Проблемы {gen}',
    'Новые правила {gen}',
  ],
  sm: [
    'Почему {nom} становится важнее',
    'Главные ошибки в работе {withInstr}',
    'Что меняется в {prep} уже сейчас',
    'Короткий гид по {prep}',
    'Как переосмыслить {acc}',
    'Новые сценарии для {gen}',
    'Что нужно знать о {prep}',
  ],
  md: [
    'Почему старые подходы к {prep} больше не работают',
    'Как {nom} меняет привычные процессы и решения',
    'Что помогает быстрее разобраться в {prep} без лишней теории',
    'Какие решения делают {acc} понятнее и эффективнее',
    'Где искать слабые места в работе {withInstr}',
    'Как использовать {context}, чтобы получить более точный {result}',
  ],
  lg: [
    'Почему {nom} требует нового взгляда на процессы, цели и ежедневные решения команды',
    'Как работа {withInstr} помогает находить проблемы раньше и быстрее улучшать {result}',
    'Что происходит с {instr}, когда команда перестает полагаться только на интуицию',
    'Как превратить {acc} из набора разрозненных действий в понятную систему работы',
    'Почему развитие {gen} начинается не с инструментов, а с ясных целей и честного анализа',
  ],
  xlg: [
    'Почему {nom} становится важным фактором устойчивого развития, когда команда сталкивается с ростом нагрузки, нехваткой ресурсов и постоянной сменой приоритетов',
    'Как системная работа {withInstr} помогает команде лучше понимать ограничения, быстрее находить слабые места и постепенно улучшать {result}',
    'Что важно изменить в подходе к {prep}, чтобы решения перестали быть случайными, а развитие стало последовательным и измеримым',
    'Как переосмыслить {acc}, если старые процессы уже не помогают команде двигаться быстрее, сохранять качество и контролировать результат',
  ],
};

const EN_EXTRA_TEMPLATES: Record<TitleLengthPreset, string[]> = {
  xsm: [
    '{topic} overview',
    '{topic} trends',
    '{topic} today',
    '{topic} insights',
    'Future of {topic}',
    '{topic} problems',
    '{topic} basics',
    '{topic} guide',
  ],
  sm: [
    'Why {topic} matters more now',
    'Common mistakes in {topic}',
    'What is changing in {topic}',
    'Short guide to {topic}',
    'How to rethink {topic}',
    'New scenarios for {topic}',
    'What to know about {topic}',
  ],
  md: [
    'Why old approaches to {topic} no longer work',
    'How {topic} changes everyday processes and decisions',
    'What helps teams understand {topic} without extra theory',
    'Which decisions make {topic} clearer and more effective',
    'Where to find weak points in {topic} processes',
    'How {context} helps improve {result}',
  ],
  lg: [
    'Why {topic} requires a fresh look at processes, goals and daily team decisions',
    'How working with {topic} helps detect problems earlier and improve {result} faster',
    'What happens to {topic} when the team stops relying only on intuition',
    'How to turn {topic} from scattered actions into a clear working system',
    'Why {topic} development starts with clear goals, not with tools',
  ],
  xlg: [
    'Why {topic} becomes an important part of stable development when the team faces growing workload, limited resources and changing priorities',
    'How systematic work with {topic} helps the team understand constraints, find weak points faster and gradually improve {result}',
    'What should change in the approach to {topic} so decisions become less random and development becomes more consistent',
    'How to rethink {topic} when old processes no longer help the team move faster, preserve quality and control the result',
  ],
};

export const EXTRA_TEMPLATES_BY_LANGUAGE: Record<Language, Record<TitleLengthPreset, string[]>> = {
  ru: RU_EXTRA_TEMPLATES,
  en: EN_EXTRA_TEMPLATES,
};
