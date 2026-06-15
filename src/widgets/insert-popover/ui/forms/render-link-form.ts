import { LinkPrefix, StorageSchema } from 'src/entities/generation-settings/model';
import { LINK_LENGTH_PRESET_RANGES, LINK_LENGTH_PRESETS } from 'src/generators/link/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { POPOVER_IDS } from 'src/widgets/insert-popover/config/constants';

const LINK_PREFIXES: LinkPrefix[] = ['https://', 'http://', 'www.'];

export const renderLinkForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
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
