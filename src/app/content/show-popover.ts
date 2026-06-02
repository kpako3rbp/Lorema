import { generateContent } from 'src/generators';
import { POPOVER_IDS } from 'src/popover/config/constants';
import { movePopoverInsideViewport } from 'src/popover/lib/move-popover-inside-viewport';
import { createPopover, removePopover } from 'src/popover/ui/create-popover';
import { ContentType, Language, LengthMode, StorageSchema, TitleTopic } from 'src/shared/model/types';
import { queryElement } from 'src/shared/utils/query-element';
import { getStorageItems, setStorageItem } from 'src/shared/utils/storage';

import { insertTextAtTarget } from './insert-text-at-target';
import { EditableTargetSnapshot } from './types';

type PopoverElements = {
  form: HTMLFormElement;
  lengthInput: HTMLInputElement;
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  languageSelect: HTMLSelectElement;
};

const getPopoverElements = (shadowRoot: ShadowRoot): PopoverElements => ({
  form: queryElement(shadowRoot, `#${POPOVER_IDS.popover}`),
  lengthInput: queryElement(shadowRoot, `#${POPOVER_IDS.lengthInput}`),
  insertButton: queryElement(shadowRoot, `#${POPOVER_IDS.insertButton}`),
  cancelButton: queryElement(shadowRoot, `#${POPOVER_IDS.cancelButton}`),
  languageSelect: queryElement(shadowRoot, `#${POPOVER_IDS.languageSelect}`),
});

const closeActivePopover = (): void => {
  removePopover();
  document.removeEventListener('mousedown', closePopoverOnOutsideClick, true);
};

function closePopoverOnOutsideClick(event: MouseEvent): void {
  const host = document.getElementById(POPOVER_IDS.popover);

  if (!host) return;

  const target = event.target;

  if (!(target instanceof Node)) return;
  if (host.contains(target)) return;

  closeActivePopover();
}

const getInput = (form: HTMLFormElement, id: string): HTMLInputElement => queryElement(form, `#${id}`);
const getSelect = (form: HTMLFormElement, id: string): HTMLSelectElement => queryElement(form, `#${id}`);

const parsePositiveInteger = (input: HTMLInputElement): number | null => {
  const value = Number(input.value);

  input.classList.remove('error');

  if (!Number.isFinite(value) || value <= 0) {
    input.focus();
    input.select();
    input.classList.add('error');

    return null;
  }

  return Math.floor(value);
};

const readSettingsFromForm = (
  contentType: ContentType,
  form: HTMLFormElement,
  storage: StorageSchema,
): StorageSchema | null => {
  const getLanguage = (): Language => getSelect(form, POPOVER_IDS.languageSelect).value as Language;

  const handlers: Record<ContentType, () => Partial<StorageSchema> | null> = {
    text: () => {
      const length = parsePositiveInteger(getInput(form, 'length'));

      if (length === null) return null;

      const lengthMode = new FormData(form).get('lengthMode') as LengthMode;

      return {
        textSettings: {
          language: getLanguage(),
          length,
          lengthMode,
          trimToWord: !getInput(form, 'noTrimText').checked,
          withParagraphs: lengthMode === 'exact' ? false : getInput(form, 'withParagraphs').checked,
        },
      };
    },

    title: () => ({
      titleSettings: {
        language: getLanguage(),
        maxLength: Number(getSelect(form, 'maxLength').value),
        topic: getSelect(form, 'topic').value as TitleTopic,
      },
    }),
  };

  const patch = handlers[contentType]();

  if (!patch) return null;

  return {
    ...storage,
    ...patch,
  };
};

const saveContentSettings = async (contentType: ContentType, storage: StorageSchema): Promise<void> => {
  return setStorageItem(`${contentType}Settings`, storage[`${contentType}Settings`]);
};

const submitContent = async (
  contentType: ContentType,
  form: HTMLFormElement,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const nextStorage = readSettingsFromForm(contentType, form, storage);

  if (!nextStorage) return;

  await saveContentSettings(contentType, nextStorage);
  insertTextAtTarget(target.element, generateContent(contentType, nextStorage), target.savedRange);
  closeActivePopover();
};

const registerPopoverEvents = (
  contentType: ContentType,
  elements: PopoverElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): void => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    void submitContent(contentType, elements.form, storage, target);
  });

  elements.form.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeActivePopover();
  });

  elements.cancelButton.addEventListener('click', closeActivePopover);
  document.addEventListener('mousedown', closePopoverOnOutsideClick, true);

  // const lengthModeInput = elements.form.querySelector<HTMLInputElement>(`#${POPOVER_LENGTHMODE_INPUT_ID}`);
  // const paragraphsModeCheckbox = elements.form.querySelector<HTMLInputElement>(`#${POPOVER_PARAGRAPHS_CHECKBOX_ID}`);
  // const cutModeCheckbox = elements.form.querySelector<HTMLInputElement>(`#${POPOVER_PARAGRAPHS_CHECKBOX_ID}`);

  // lengthModeInput?.addEventListener('change', () => {
  //   if (paragraphsModeCheckbox) {
  //     paragraphsModeCheckbox.disabled = lengthModeInput.value === 'exact' && lengthModeInput.checked;
  //   }
  //   if (cutWordModeCheckbox) {
  //     cutWordModeCheckbox.disabled = lengthModeInput.value === 'exact' && lengthModeInput.checked;
  //   }
  // });
};

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};

export const showPopover = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageItems();

  const popover = createPopover({
    contentType,
    storage,
    interfaceLanguage: storage.interfaceLanguage,
    generationLanguage: storage.generationLanguage,
    position: target.position,
  });

  const shadowRoot = popover.shadowRoot;

  if (!shadowRoot) {
    throw new Error('Shadow root not found');
  }

  document.body.appendChild(popover);

  requestAnimationFrame(() => movePopoverInsideViewport(popover));

  const elements = getPopoverElements(shadowRoot);

  registerPopoverEvents(contentType, elements, storage, target);

  requestAnimationFrame(() => {
    elements.lengthInput?.focus();
    elements.lengthInput?.select();
  });
};
