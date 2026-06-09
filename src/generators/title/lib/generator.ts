import { Language, TitleLengthPreset, TitleSettings } from 'src/shared/model/types';
import { getRandomItem } from 'src/shared/utils/random';

import { TITLE_LENGTH_PRESETS } from '../config/constants';
import { EXTRA_TEMPLATES_BY_LANGUAGE } from '../config/extra-templates';
import { COMMON_TITLE_TEMPLATES, TOPIC_TITLE_TEMPLATES } from '../config/titles';
import { EN_TOPIC_FORMS, RU_TOPIC_FORMS, TOPICS } from '../config/topics';
import { TopicWithoutRandom } from '../model/types';

const TITLE_HISTORY_LIMIT = 30;
const titleHistory = new Set<string>();

const normalizeTitle = (value: string): string => value.trim().replace(/\s+/g, ' ');

const rememberTitle = (title: string): void => {
  titleHistory.add(title);

  if (titleHistory.size <= TITLE_HISTORY_LIMIT) return;

  const [firstTitle] = titleHistory;

  titleHistory.delete(firstTitle);
};

const renderRuTitle = (template: string, topic: TopicWithoutRandom): string => {
  const forms = RU_TOPIC_FORMS[topic];

  return template
    .replaceAll('{nom}', forms.nom)
    .replaceAll('{gen}', forms.gen)
    .replaceAll('{acc}', forms.acc)
    .replaceAll('{instr}', forms.instr)
    .replaceAll('{prep}', forms.prep)
    .replaceAll('{withInstr}', forms.withInstr)
    .replaceAll('{context}', forms.context)
    .replaceAll('{result}', forms.result);
};

const renderEnTitle = (template: string, topic: TopicWithoutRandom): string => {
  const forms = EN_TOPIC_FORMS[topic];

  return template
    .replaceAll('{topic}', forms.value)
    .replaceAll('{context}', forms.context)
    .replaceAll('{result}', forms.result);
};

const renderTitleByLanguage: Record<Language, (template: string, topic: TopicWithoutRandom) => string> = {
  ru: renderRuTitle,
  en: renderEnTitle,
};

const getTitleTemplates = (
  language: Language,
  topic: TopicWithoutRandom,
  lengthPreset: TitleLengthPreset,
): string[] => {
  return [
    ...COMMON_TITLE_TEMPLATES[language][lengthPreset],
    ...EXTRA_TEMPLATES_BY_LANGUAGE[language][lengthPreset],
    ...(TOPIC_TITLE_TEMPLATES[language][topic][lengthPreset] ?? []),
  ];
};

const getUniqueTitle = (templates: string[], language: Language, topic: TopicWithoutRandom): string => {
  const attempts = Math.min(templates.length, 20);

  for (let i = 0; i < attempts; i += 1) {
    const template = getRandomItem(templates);
    const title = normalizeTitle(renderTitleByLanguage[language](template, topic));

    if (!titleHistory.has(title)) {
      rememberTitle(title);

      return title;
    }
  }

  const title = normalizeTitle(renderTitleByLanguage[language](getRandomItem(templates), topic));

  rememberTitle(title);

  return title;
};

export const generateTitle = (settings: TitleSettings): string => {
  const topic = settings.topic === 'random' ? getRandomItem(TOPICS) : settings.topic;

  const lengthPreset = settings.lengthPreset === 'random' ? getRandomItem(TITLE_LENGTH_PRESETS) : settings.lengthPreset;

  const templates = getTitleTemplates(settings.language, topic, lengthPreset);

  return getUniqueTitle(templates, settings.language, topic);
};
