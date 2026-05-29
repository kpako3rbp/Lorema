import { TRANSLATIONS } from '../i18n';
import {
  MAX_CHARS,
  POPOVER_CANCEL_BTN_ID,
  POPOVER_CHECKBOX_ID,
  POPOVER_CLASSNAME,
  POPOVER_ID,
  POPOVER_INPUT_ID,
  POPOVER_INSERT_BTN_ID,
  POPOVER_LANG_SELECT_ID,
} from './constants';
import { renderLanguageOptions } from './render-language-options';
import popoverStyles from './style.css?inline';
import { CreatePopoverParams } from './types';

const createHost = (params: CreatePopoverParams): HTMLDivElement => {
  const host = document.createElement('div');

  host.id = POPOVER_ID;
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
  const { charsCount, withParagraphs, language, interfaceLanguage } = params;
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');

  popover.className = POPOVER_CLASSNAME;

  popover.innerHTML = `
    <p class="lorem-title">
      ${t.charsCount}
    </p>

    <input
      class="lorem-input"
      id="${POPOVER_INPUT_ID}"
      type="number"
      min="1"
      max="${MAX_CHARS}"
      value="${charsCount}"
      placeholder="${t.charsCount}"
    />

    <div class="lorem-options">
      <select id="${POPOVER_LANG_SELECT_ID}" class="lorem-language">
        ${renderLanguageOptions(language, true)}
      </select>

      <label class="lorem-checkbox">
        <input
          id="${POPOVER_CHECKBOX_ID}"
          class="lorem-checkbox-input"
          type="checkbox"
          ${withParagraphs ? 'checked' : ''}
        />

        <span>
          ${t.paragraphs}
        </span>
      </label>
    </div>

    <div class="lorem-actions">
      <button
        id="${POPOVER_INSERT_BTN_ID}"
        type="button"
        class="lorem-insert"
      >
        ${t.insert}
      </button>

      <button
        id="${POPOVER_CANCEL_BTN_ID}" 
        type="button"
        class="lorem-cancel"
      >
        ${t.cancel}
      </button>
    </div>
  `;

  shadowRoot.append(createStyle(), popover);

  return host;
};

export const removePopover = (): void => {
  document.getElementById(POPOVER_ID)?.remove();
};
