import { GenerationLanguage } from '@lorema/core';
import { capitalizeFirstLetter, getRandomItem } from '@lorema/generators';

import { TITLE_LENGTH_PRESET_RANGES, TITLE_LENGTH_PRESETS, TITLE_TOPICS } from '../config/constants';
import { COMMON_TITLE_TEMPLATES, TOPIC_TITLE_TEMPLATES } from '../config/title-templates';
import { EN_TOPIC_DATA, RU_TOPIC_DATA } from '../config/topic-data';
import { TitleLengthPreset, TitleSettings, TitleTopic } from '../model/types';

const TITLE_HISTORY_LIMIT = 30;
const TITLE_GENERATION_ATTEMPTS = 60;

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

const replaceTemplate = (template: string, values: Record<string, string>): string => {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, value);
  }, template);
};

const renderLaTitle = (template: string): string => template;

const renderRuTitle = (template: string, topic: TitleTopic): string => {
  const data = RU_TOPIC_DATA[topic];
  const subject = getRandomItem(data.subjects);

  return replaceTemplate(template, {
    ...subject,
    context: getRandomItem(data.contexts),
    result: getRandomItem(data.results),
    problem: getRandomItem(data.problems),
    process: getRandomItem(data.processes),
    tool: getRandomItem(data.tools),
  });
};

const renderEnTitle = (template: string, topic: TitleTopic): string => {
  const data = EN_TOPIC_DATA[topic];

  return replaceTemplate(template, {
    topic: getRandomItem(data.subjects),
    context: getRandomItem(data.contexts),
    result: getRandomItem(data.results),
    problem: getRandomItem(data.problems),
    process: getRandomItem(data.processes),
    tool: getRandomItem(data.tools),
  });
};

const renderTitleByLanguage: Record<GenerationLanguage, (template: string, topic: TitleTopic) => string> = {
  ru: renderRuTitle,
  en: renderEnTitle,
  la: renderLaTitle,
};

const getTitleTemplates = (
  language: Exclude<GenerationLanguage, 'la'>,
  topic: TitleTopic,
  lengthPreset: TitleLengthPreset,
): string[] => {
  const topicTemplates = TOPIC_TITLE_TEMPLATES[language][topic][lengthPreset] ?? [];

  return [...COMMON_TITLE_TEMPLATES[language][lengthPreset], ...topicTemplates];
};

const trimTitleToMaxLength = (title: string, maxLength: number): string => {
  if (title.length <= maxLength) return title;

  const trimmed = title.slice(0, maxLength).trim();
  const lastSpaceIndex = trimmed.lastIndexOf(' ');

  if (lastSpaceIndex <= 0) return trimmed;

  return trimmed.slice(0, lastSpaceIndex);
};

const getUniqueTitle = (
  templates: string[],
  renderTitle: (template: string) => string,
  lengthPreset: TitleLengthPreset,
): string => {
  const { max } = TITLE_LENGTH_PRESET_RANGES[lengthPreset];

  for (let i = 0; i < TITLE_GENERATION_ATTEMPTS; i += 1) {
    const title = normalizeTitle(renderTitle(getRandomItem(templates)));

    if (title.length > max) continue;
    if (titleHistory.has(title)) continue;

    rememberTitle(title);

    return title;
  }

  const title = normalizeTitle(renderTitle(getRandomItem(templates)));
  const trimmedTitle = trimTitleToMaxLength(title, max);

  rememberTitle(trimmedTitle);

  return trimmedTitle;
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
  const lengthPreset = getTitleLengthPreset(settings);

  if (settings.language === 'la') {
    return getUniqueTitle(COMMON_TITLE_TEMPLATES.la[lengthPreset], renderLaTitle, lengthPreset);
  }

  const topic = getTitleTopic(settings);
  const templates = getTitleTemplates(settings.language, topic, lengthPreset);

  return getUniqueTitle(
    templates,
    (template) => renderTitleByLanguage[settings.language](template, topic),
    lengthPreset,
  );
};
