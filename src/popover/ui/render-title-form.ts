import { TITLE_LENGTH_PRESETS, TITLE_TOPICS } from 'src/generators/title/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language, StorageSchema } from 'src/shared/model/types';

import { renderOptions } from './render-options';

export const renderTitleForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.titleSettings;
  const presetLabels = Object.fromEntries(TITLE_LENGTH_PRESETS.map((value) => [value, String(value)]));

  return /*html*/ `
    <label class="form-field"><span>${t.titleLength}</span><select id="maxLength" class="lorem-select">${renderOptions(TITLE_LENGTH_PRESETS.map(String), String(settings.maxLength), presetLabels)}</select></label>
    <label class="form-field"><span>${t.titleTopic}</span><select id="topic" class="lorem-select">${renderOptions(TITLE_TOPICS, settings.topic, t.titleTopics)}</select></label>
  `;
};
