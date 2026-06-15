import { getRandomItem } from 'src/shared/lib/random';
import { capitalizeFirstLetter } from 'src/shared/lib/string';
import { Language, TitleLengthPreset, TitleSettings, TitleTopic } from 'src/shared/model/types';

import { TITLE_LENGTH_PRESETS, TITLE_TOPICS } from '../config/constants';
import { EXTRA_TEMPLATES_BY_LANGUAGE } from '../config/extra-templates';
import { COMMON_TITLE_TEMPLATES, TOPIC_TITLE_TEMPLATES } from '../config/titles';
import { EN_TOPIC_FORMS, RU_TOPIC_FORMS } from '../config/topics';

const TITLE_HISTORY_LIMIT = 30;
const titleHistory = new Set<string>();

const normalizeTitle = (value: string): string => {
  const normalized = value.trim().replace(/\s+/g, ' ');

  return capitalizeFirstLetter(normalized);
};

const rememberTitle = (title: string): void => {
  titleHistory.add(title);

  if (titleHistory.size <= TITLE_HISTORY_LIMIT) return;

  const [firstTitle] = titleHistory;

  titleHistory.delete(firstTitle);
};

const renderRuTitle = (template: string, topics: TitleTopic): string => {
  const forms = RU_TOPIC_FORMS[topics];

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

const renderEnTitle = (template: string, topics: TitleTopic): string => {
  const forms = EN_TOPIC_FORMS[topics];

  return template
    .replaceAll('{topic}', forms.value)
    .replaceAll('{context}', forms.context)
    .replaceAll('{result}', forms.result);
};

const renderTitleByLanguage: Record<Language, (template: string, topics: TitleTopic) => string> = {
  ru: renderRuTitle,
  en: renderEnTitle,
};

const getTitleTemplates = (language: Language, topics: TitleTopic, lengthPreset: TitleLengthPreset): string[] => {
  return [
    ...COMMON_TITLE_TEMPLATES[language][lengthPreset],
    ...EXTRA_TEMPLATES_BY_LANGUAGE[language][lengthPreset],
    ...(TOPIC_TITLE_TEMPLATES[language][topics][lengthPreset] ?? []),
  ];
};

const getUniqueTitle = (templates: string[], language: Language, topics: TitleTopic): string => {
  const attempts = Math.min(templates.length, 20);

  for (let i = 0; i < attempts; i += 1) {
    const template = getRandomItem(templates);
    const title = normalizeTitle(renderTitleByLanguage[language](template, topics));

    if (!titleHistory.has(title)) {
      rememberTitle(title);

      return title;
    }
  }

  const title = normalizeTitle(renderTitleByLanguage[language](getRandomItem(templates), topics));

  rememberTitle(title);

  return title;
};

const getTitleTopic = (settings: TitleSettings): TitleTopic => {
  const selectedTopics = settings.topics.length ? settings.topics : TITLE_TOPICS;

  return getRandomItem(selectedTopics);
};

const getTitleLengthPreset = (settings: TitleSettings): TitleLengthPreset => {
  const selectedLengthPresets = settings.lengthPresets.length ? settings.lengthPresets : TITLE_LENGTH_PRESETS;

  return getRandomItem(selectedLengthPresets);
};

export const generateTitle = (settings: TitleSettings): string => {
  const topic = getTitleTopic(settings);
  const lengthPreset = getTitleLengthPreset(settings);

  const templates = getTitleTemplates(settings.language, topic, lengthPreset);

  return getUniqueTitle(templates, settings.language, topic);
};
