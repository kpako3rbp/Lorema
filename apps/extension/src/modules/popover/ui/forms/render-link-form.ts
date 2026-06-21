import { InterfaceLanguage } from '@lorema/core';
import { LinkPrefix } from '@lorema/generators';
import { LINK_LENGTH_PRESET_RANGES, LINK_LENGTH_PRESETS } from '@lorema/generators/link/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';

const LINK_PREFIXES: LinkPrefix[] = ['https://', 'http://', 'www.'];

export const renderLinkForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.linkSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.linkParams}</span>
    
      <div class="lorem-grid-form grid-1-3">
        ${renderCustomSelect({
          id: POPOVER_IDS.linkPrefixSelect,
          label: t.linkPrefix,
          selectedValues: [settings.prefix],
          interfaceLanguage: interfaceLanguage,
          options: LINK_PREFIXES.map((prefix) => ({
            value: prefix,
            label: prefix,
          })),
        })}

        ${renderCustomSelect({
          id: POPOVER_IDS.linkLengthPresetSelect,
          label: t.linkLength,
          multiple: true,
          selectedValues: settings.lengthPresets,
          interfaceLanguage: interfaceLanguage,
          options: LINK_LENGTH_PRESETS.map((preset) => ({
            value: preset,
            label: `${t.lengthPreset[preset]} (${LINK_LENGTH_PRESET_RANGES[preset].min}-${LINK_LENGTH_PRESET_RANGES[preset].max})`,
          })),
        })}
      </div>      
   </div>
  `;
};
