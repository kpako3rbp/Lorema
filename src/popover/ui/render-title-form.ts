import {
  TITLE_LENGTH_PRESET_RANGES,
  TITLE_LENGTH_SELECT_OPTIONS,
  TITLE_TOPICS,
} from 'src/generators/title/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language, StorageSchema, TitleLengthSelectOption } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';

export const renderTitleForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.titleSettings;
  const presetLabels = Object.fromEntries(
    TITLE_LENGTH_SELECT_OPTIONS.map((preset) => {
      if (preset === 'random') {
        return [preset, t.lengthPreset.random];
      }

      return [
        preset,
        `${t.lengthPreset[preset]} (${TITLE_LENGTH_PRESET_RANGES[preset].min}-${TITLE_LENGTH_PRESET_RANGES[preset].max})`,
      ];
    }),
  ) as Record<TitleLengthSelectOption, string>;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.titleParams}</span>
    
      <div class="lorem-grid-form">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.titleLength}</span>
          <select id="${POPOVER_IDS.titleLengthPresetSelect}" class="lorem-select">
            ${renderOptions(TITLE_LENGTH_SELECT_OPTIONS, settings.lengthPreset, presetLabels)}
          </select>
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.titleTopic}</span>
          <select id="${POPOVER_IDS.topicSelect}" class="lorem-select">
            ${renderOptions(TITLE_TOPICS, settings.topic, t.titleTopics)}
          </select>
        </label>
      </div>
   </div>
  `;
};
