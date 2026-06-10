import { TRANSLATIONS } from 'src/i18n';
import { LANGUAGES, SHORT_NAME_BY_LANGUAGE } from 'src/shared/config/language';
import { initCustomSelects } from 'src/shared/ui/custom-select/init-custom-selects';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

import { POPOVER_CLASSNAME, POPOVER_IDS } from '../config/constants';
import { CreatePopoverParams } from '../model/types';
import { renderForms } from './forms/render-forms';
import popoverStyles from './style.css?inline';
import { renderTabs } from './tabs/render-tabs';

const createHost = (params: CreatePopoverParams): HTMLDivElement => {
  const host = document.createElement('div');

  host.id = POPOVER_IDS.popover;
  host.dataset.cursorX = String(params.position.x);
  host.dataset.cursorY = String(params.position.y);

  return host;
};

const createStyle = (): HTMLStyleElement => {
  const style = document.createElement('style');

  style.textContent = popoverStyles;

  return style;
};

export const createPopover = (params: CreatePopoverParams): HTMLDivElement => {
  const { contentType, storage, interfaceLanguage, generationLanguage } = params;

  const t = TRANSLATIONS[interfaceLanguage].popover;

  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');

  popover.className = POPOVER_CLASSNAME;
  popover.dataset.theme = storage.theme;
  host.dataset.theme = storage.theme;

  popover.innerHTML = /*html*/ `
    <div class="lorem-header">
      <p class="lorem-title">
        ${t.title}
        ${renderTooltip(t.titleTooltip, 180)}
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
          })),
          className: 'generation-language',
        })}
      </div>
    </div>       

    <form id="${POPOVER_IDS.popoverForm}" class="lorem-form">
      ${renderTabs(contentType, interfaceLanguage)} 
      
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
  `;

  shadowRoot.append(createStyle(), popover);
  initCustomSelects(shadowRoot, interfaceLanguage);

  return host;
};
