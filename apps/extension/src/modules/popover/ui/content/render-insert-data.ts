import { TRANSLATIONS } from 'src/i18n';
import { DataType } from 'src/modules/data-type';
import { StorageSchema } from 'src/modules/storage';
import { LANGUAGES, SHORT_NAME_BY_LANGUAGE } from 'src/shared/config/language';
import { Language } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

import { POPOVER_IDS } from '../../config/constants';
import { renderForms } from '../forms/render-forms';
import { renderTabs } from '../tabs/render-tabs';

type RenderInsertDataParams = {
  dataType: DataType;
  storage: StorageSchema;
  interfaceLanguage: Language;
  generationLanguage: Language;
};

export const renderInsertData = (params: RenderInsertDataParams): string => {
  const { dataType, storage, interfaceLanguage, generationLanguage } = params;

  const t = TRANSLATIONS[interfaceLanguage].popover.dataGeneration;

  return /*html*/ `
    <div class="lorem-generation-wrapper">
      <div class="lorem-header">
        <p class="lorem-title">
          ${t.title}
          ${renderTooltip(t.titleTooltip, 220)}
        </p>

        <div class="lorem-flex aic">
          <p class="lorem-descriptor">${t.generationLanguage}</p>

          ${renderCustomSelect({
            id: POPOVER_IDS.languageSelect,
            selectedValues: [generationLanguage],
            interfaceLanguage: interfaceLanguage,
            options: LANGUAGES.map((lang) => ({
              value: lang,
              label: SHORT_NAME_BY_LANGUAGE[lang],
              // iconMarkup: ICON_BY_LANGUAGE[lang],
            })),
            className: 'generation-language',
          })}
        </div>
      </div>       

      <form id="${POPOVER_IDS.popoverForm}" class="lorem-form">
        ${renderTabs(dataType, interfaceLanguage)} 
        
        ${renderForms(storage, interfaceLanguage)}
        
        <div class="lorem-actions">        
          <div class="lorem-buttons-group">
            <button id="${POPOVER_IDS.insertButton}" type="submit" class="lorem-submit">
              ${t.insert}
              <span>(${t.insertKey})</span>
            </button>
            <button id="${POPOVER_IDS.cancelButton}" type="button" class="lorem-cancel">
              ${t.cancel}
              <span>(${t.cancelKey})</span>
            </button>  
          </div>
        </div>      
      </form>
    </div>
  `;
};
