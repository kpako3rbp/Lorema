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
  // host.style.left = `${position.x}px`;
  // host.style.top = `${position.y}px`;
  host.style.left = '0';
  host.style.top = '0';
  host.style.zIndex = '99999';

  host.dataset.cursorX = String(position.x);
  host.dataset.cursorY = String(position.y);

  const shadowRoot = host.attachShadow({
    mode: 'open',
  });

  const style = document.createElement('style');

  style.textContent = popoverStyles;

  const popover = document.createElement('div');

  popover.style.position = 'fixed';
  popover.style.left = `${position.x + 8}px`;
  popover.style.top = `${position.y + 8}px`;

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

// export const movePopoverInsideViewport = (popover: HTMLElement): void => {
//   const rect = popover.getBoundingClientRect();

//   if (rect.right > window.innerWidth) {
//     popover.style.left = `${window.innerWidth - rect.width - 8}px`;
//   }

//   if (rect.bottom > window.innerHeight) {
//     popover.style.top = `${window.innerHeight - rect.height - 8}px`;
//   }
// };

export const movePopoverInsideViewport = (host: HTMLElement): void => {
  const popover = host.shadowRoot?.querySelector<HTMLElement>('.lorem-popover');

  if (!popover) return;

  const offset = 8;
  const rect = popover.getBoundingClientRect();

  const cursorX = Number(host.dataset.cursorX);
  const cursorY = Number(host.dataset.cursorY);

  const hasSpaceBottom = cursorY + rect.height + offset <= window.innerHeight;
  const hasSpaceTop = cursorY - rect.height - offset >= 0;

  const hasSpaceRight = cursorX + rect.width + offset <= window.innerWidth;
  const hasSpaceLeft = cursorX - rect.width - offset >= 0;

  let top = cursorY + offset;
  let left = cursorX + offset;

  if (!hasSpaceBottom && hasSpaceTop) {
    top = cursorY - rect.height - offset;
  }

  if (!hasSpaceRight && hasSpaceLeft) {
    left = cursorX - rect.width - offset;
  }

  top = Math.max(offset, Math.min(top, window.innerHeight - rect.height - offset));
  left = Math.max(offset, Math.min(left, window.innerWidth - rect.width - offset));

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
};
