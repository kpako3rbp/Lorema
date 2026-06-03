import { TRANSLATIONS } from 'src/i18n';
import { ContentType, Language, StorageSchema } from 'src/shared/model/types';

import { POPOVER_CLASSNAME, POPOVER_IDS } from '../config/constants';
import { CreatePopoverParams } from '../model/types';
import { renderLanguageSelect } from './render-language-select';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';
import popoverStyles from './style.css?inline';

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

const renderForm = (contentType: ContentType, storage: StorageSchema, interfaceLanguage: Language) => {
  const mapContentTypeToRenderFn: Record<ContentType, string> = {
    text: renderTextForm(storage, interfaceLanguage),
    title: renderTitleForm(storage, interfaceLanguage),
  };

  return mapContentTypeToRenderFn[contentType];
};

export const createPopover = (params: CreatePopoverParams): HTMLDivElement => {
  const { contentType, storage, interfaceLanguage, generationLanguage } = params;

  const t = TRANSLATIONS[interfaceLanguage].popover;

  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');

  popover.className = POPOVER_CLASSNAME;

  popover.innerHTML = /*html*/ `
    <div class="lorem-header">
      <p class="lorem-title">${t.title}</p>
      ${renderLanguageSelect(generationLanguage, true)}
    </div>
    

    <form id="${POPOVER_IDS.popoverForm}" class="lorem-form">
      ${renderForm(contentType, storage, interfaceLanguage)}      
      <div class="lorem-actions">        
        <div class="lorem-buttons-group">
          <button id="${POPOVER_IDS.insertButton}" type="submit" class="lorem-insert">${t.insert}</button>
          <button id="${POPOVER_IDS.cancelButton}" type="button" class="lorem-cancel">${t.cancel}</button>  
        </div>   
        <p class="lorem-hint">${t.saveHint}</p>   
      </div>      
    </form>
  `;

  shadowRoot.append(createStyle(), popover);

  return host;
};

export const removePopover = (): void => {
  document.getElementById(POPOVER_IDS.popover)?.remove();
};
