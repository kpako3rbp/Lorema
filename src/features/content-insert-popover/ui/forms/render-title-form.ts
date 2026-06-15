import { StorageSchema } from 'src/features/content-generation/model';
import { POPOVER_IDS } from 'src/features/content-insert-popover/config/constants';
import { TITLE_LENGTH_PRESET_RANGES, TITLE_LENGTH_PRESETS, TITLE_TOPICS } from 'src/generators/title/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

export const renderTitleForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.titleSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.titleParams}</span>
    
      <div class="lorem-grid-form">
        ${renderCustomSelect({
          id: POPOVER_IDS.titleLengthPresetSelect,
          label: t.titleLength,
          multiple: true,
          selectedValues: settings.lengthPresets,
          interfaceLanguage: interfaceLanguage,
          options: TITLE_LENGTH_PRESETS.map((preset) => ({
            value: preset,
            label: `${t.lengthPreset[preset]} (${TITLE_LENGTH_PRESET_RANGES[preset].min}-${TITLE_LENGTH_PRESET_RANGES[preset].max})`,
          })),
        })}

        ${renderCustomSelect({
          id: POPOVER_IDS.topicSelect,
          label: t.titleTopic,
          multiple: true,
          selectedValues: settings.topics,
          interfaceLanguage: interfaceLanguage,
          options: TITLE_TOPICS.map((topic) => ({
            value: topic,
            label: t.titleTopics[topic],
          })),
        })}
      </div>
   </div>
  `;
};
