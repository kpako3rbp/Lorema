import { InterfaceLanguage } from '@lorema/core';
import { LINK_LENGTH_PRESET_RANGES, LINK_LENGTH_PRESETS, LinkPrefix } from '@lorema/generators';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

const LINK_PREFIXES: LinkPrefix[] = ['https://', 'http://', 'www.'];

export const renderLinkForm = (storage: StorageSchema, interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;
  const settings = storage.linkSettings;

  return /*html*/ `
   <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.linkParams}</span>
    
      <div class="lorem-grid-form link-form">
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

        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.domain}
            ${renderTooltip(t.domainTooltip, 170)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.linkDomainInput}"
            type="text"
            placeholder="example.com"
            value="${settings.domain}"
          /> 
          <p id="${POPOVER_IDS.linkDomainError}" class="lorem-error"></p>
        </label>

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
