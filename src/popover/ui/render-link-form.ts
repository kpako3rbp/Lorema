import { LINK_LENGTH_PRESET_RANGES, LINK_LENGTH_SELECT_OPTIONS } from 'src/generators/link/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language, LinkLengthSelectOption, LinkPrefix, StorageSchema } from 'src/shared/model/types';

import { POPOVER_IDS } from '../config/constants';
import { renderOptions } from './render-options';

const LINK_PREFIXES: LinkPrefix[] = ['https://', 'http://', 'www.'];

export const renderLinkForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.linkSettings;
  const prefixLabels = Object.fromEntries(LINK_PREFIXES.map((prefix) => [prefix, prefix])) as Record<
    LinkPrefix,
    string
  >;
  const presetLabels = Object.fromEntries(
    LINK_LENGTH_SELECT_OPTIONS.map((preset) => {
      if (preset === 'random') {
        return [preset, t.lengthPreset.random];
      }

      return [
        preset,
        `${t.lengthPreset[preset]} (${LINK_LENGTH_PRESET_RANGES[preset].min}-${LINK_LENGTH_PRESET_RANGES[preset].max})`,
      ];
    }),
  ) as Record<LinkLengthSelectOption, string>;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.linkParams}</span>
    
      <div class="lorem-grid-form grid-1-3">
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.linkPrefix}</span>
          <select id="${POPOVER_IDS.linkPrefixSelect}" class="lorem-select">
            ${renderOptions(LINK_PREFIXES, settings.prefix, prefixLabels)}
          </select>
        </label>

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">${t.linkLength}</span>
          <select id="${POPOVER_IDS.linkLengthPresetSelect}" class="lorem-select">
            ${renderOptions(LINK_LENGTH_SELECT_OPTIONS, settings.lengthPreset, presetLabels)}
          </select>
        </label>
      </div>      
   </div>
  `;
};
