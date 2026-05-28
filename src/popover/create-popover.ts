import { TRANSLATIONS } from '../i18n';
import { Language } from '../types';
import popoverStyles from './style.css?inline';

type Params = {
  charsCount: number;
  withParagraphs: boolean;
  language: Language;
  interfaceLanguage: Language;
  position: {
    x: number;
    y: number;
  };
};

const POPOVER_ID = 'lorem-config-popover';
const MAX_CHARS = 99999;

export const removePopover = (): void => {
  document.getElementById(POPOVER_ID)?.remove();
};

export const createPopover = (params: Params): HTMLDivElement => {
  const { charsCount, withParagraphs, language = Language.en, interfaceLanguage = Language.en, position } = params;
  const t = TRANSLATIONS[interfaceLanguage].popover;

  const host = document.createElement('div');

  host.id = POPOVER_ID;

  host.style.position = 'fixed';
  host.style.left = `${position.x}px`;
  host.style.top = `${position.y}px`;
  host.style.zIndex = '99999';

  const shadowRoot = host.attachShadow({
    mode: 'open',
  });

  const style = document.createElement('style');

  style.textContent = popoverStyles;

  const popover = document.createElement('div');

  popover.className = 'lorem-popover';

  popover.innerHTML = `
    <p class="lorem-title">
      ${t.charsCount}
    </p>

    <input
      class="lorem-input"
      type="number"
      min="1"
      max="${MAX_CHARS}"
      value="${charsCount}"
    />

    <div class="lorem-options">
        <select class="lorem-language">
          ${Object.values(Language).map(
            (value) =>
              `
                <option value="${value}" ${language === value ? 'selected' : ''}>
                ${value.toUpperCase()}
                </option>
              `,
          )}          
        </select>

        <label class="lorem-checkbox">
          <input
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
        type="button"
        class="lorem-insert"
      >
        ${t.insert}
      </button>

      <button
        type="button"
        class="lorem-cancel"
      >
        ${t.cancel}
      </button>
    </div>
  `;

  shadowRoot.append(style, popover);

  return host;
};

export const movePopoverInsideViewport = (popover: HTMLElement): void => {
  const rect = popover.getBoundingClientRect();

  if (rect.right > window.innerWidth) {
    popover.style.left = `${window.innerWidth - rect.width - 8}px`;
  }

  if (rect.bottom > window.innerHeight) {
    popover.style.top = `${window.innerHeight - rect.height - 8}px`;
  }
};
