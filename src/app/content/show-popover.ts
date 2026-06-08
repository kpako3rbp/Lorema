import { generateContent } from 'src/generators';
import { POPOVER_IDS, POPOVER_TAB_CLASSNAME } from 'src/popover/config/constants';
import { movePopoverInsideViewport } from 'src/popover/lib/move-popover-inside-viewport';
import { validateTextForm } from 'src/popover/model/validation';
import { createPopover, removePopover } from 'src/popover/ui/create-popover';
import {
  ContentType,
  EmailLengthPreset,
  Language,
  LengthMode,
  LengthPreset,
  LinkLengthPreset,
  LinkPrefix,
  StorageSchema,
  TitleTopic,
} from 'src/shared/model/types';
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
  form: queryElement(shadowRoot, `#${POPOVER_IDS.popoverForm}`),
  lengthInput: queryElement(shadowRoot, `#${POPOVER_IDS.textLengthInput}`),
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
  languageSelect: HTMLSelectElement,
  storage: StorageSchema,
): StorageSchema | null => {
  const getLanguage = (): Language => languageSelect.value as Language;

  const handlers: Record<ContentType, () => Partial<StorageSchema> | null> = {
    text: () => {
      const length = parsePositiveInteger(getInput(form, POPOVER_IDS.textLengthInput));

      if (length === null) return null;

      const lengthMode = new FormData(form).get('lengthMode') as LengthMode;

      return {
        textSettings: {
          language: getLanguage(),
          length,
          lengthMode,
          keepWholeWords: lengthMode === 'exact' ? false : getInput(form, POPOVER_IDS.keepWholeWords).checked,
          withParagraphs: lengthMode === 'exact' ? false : getInput(form, POPOVER_IDS.paragraphsCheckbox).checked,
        },
      };
    },

    title: () => ({
      titleSettings: {
        language: getLanguage(),
        lengthPreset: getSelect(form, POPOVER_IDS.titleLengthPresetSelect).value as LengthPreset,
        topic: getSelect(form, POPOVER_IDS.topicSelect).value as TitleTopic,
      },
    }),

    email: () => ({
      emailSettings: {
        lengthPreset: getSelect(form, POPOVER_IDS.emailLengthPresetSelect).value as EmailLengthPreset,
      },
    }),

    link: () => {
      return {
        linkSettings: {
          prefix: getSelect(form, POPOVER_IDS.linkPrefixSelect).value as LinkPrefix,
          lengthPreset: getSelect(form, POPOVER_IDS.linkLengthPresetSelect).value as LinkLengthPreset,
        },
      };
    },
  };

  const patch = handlers[contentType]();

  if (!patch) return null;

  return {
    ...storage,
    generationLanguage: getLanguage(),
    ...patch,
  };
};

const saveContentSettings = async (contentType: ContentType, storage: StorageSchema): Promise<void> => {
  await setStorageItem('generationLanguage', storage.generationLanguage);
  await setStorageItem(`${contentType}Settings`, storage[`${contentType}Settings`]);
};

const validateActiveForm = (contentType: ContentType, form: HTMLFormElement, interfaceLanguage: Language): boolean => {
  const validators: Partial<Record<ContentType, () => boolean>> = {
    text: () => validateTextForm(form, interfaceLanguage),
  };

  return validators[contentType]?.() ?? true;
};

const submitContent = async (
  contentType: ContentType,
  elements: PopoverElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const nextStorage = readSettingsFromForm(contentType, elements.form, elements.languageSelect, storage);

  if (!nextStorage) return;

  await saveContentSettings(contentType, nextStorage);
  insertTextAtTarget(target.element, generateContent(contentType, nextStorage), target.savedRange);
  closeActivePopover();
};

const syncTextCheckboxesWithLengthMode = (form: HTMLFormElement): void => {
  const lengthMode = new FormData(form).get('lengthMode');

  const shouldDisableCheckboxes = lengthMode === 'exact';

  const trimTextCheckbox = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.keepWholeWords}`);
  const paragraphsCheckbox = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.paragraphsCheckbox}`);

  trimTextCheckbox.disabled = shouldDisableCheckboxes;
  paragraphsCheckbox.disabled = shouldDisableCheckboxes;

  if (shouldDisableCheckboxes) {
    trimTextCheckbox.checked = false;
    paragraphsCheckbox.checked = false;
  }
};

const syncTabPanels = (form: HTMLFormElement): void => {
  const activeContentType = new FormData(form).get('contentType');

  const panels = form.querySelectorAll<HTMLElement>(`.${POPOVER_TAB_CLASSNAME}`);

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.contentType === activeContentType);
  });
};

const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};

const syncElementsUI = (elements: PopoverElements) => {
  syncTabPanels(elements.form);

  if (getActiveContentType(elements.form) === 'text') {
    syncTextCheckboxesWithLengthMode(elements.form);
  }
};

const submitForm = (elements: PopoverElements, storage: StorageSchema, target: EditableTargetSnapshot): void => {
  const contentType = getActiveContentType(elements.form);

  if (!validateActiveForm(contentType, elements.form, storage.interfaceLanguage)) return;

  void submitContent(contentType, elements, storage, target);
};

const registerPopoverEvents = (
  elements: PopoverElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): void => {
  syncElementsUI(elements);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();

    submitForm(elements, storage, target);
  });

  elements.form.addEventListener('change', () => {
    syncElementsUI(elements);
  });

  elements.form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActivePopover();

      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      submitForm(elements, storage, target);
    }
  });

  elements.cancelButton.addEventListener('click', closeActivePopover);
  document.addEventListener('mousedown', closePopoverOnOutsideClick, true);
};

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};

// it needs to link the fonts for the Shadow DOM separately, otherwise, they won't work
const loadPopoverFonts = async (): Promise<void> => {
  const regular = new FontFace('LoremGoogleSans', `url('${chrome.runtime.getURL('fonts/GoogleSans-Regular.woff2')}')`, {
    weight: '400',
    style: 'normal',
  });

  const medium = new FontFace('LoremGoogleSans', `url('${chrome.runtime.getURL('fonts/GoogleSans-Medium.woff2')}')`, {
    weight: '500',
    style: 'normal',
  });

  await Promise.all([regular.load(), medium.load()]);

  document.fonts.add(regular);
  document.fonts.add(medium);
};

export const showPopover = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageItems();

  await loadPopoverFonts();

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

  registerPopoverEvents(elements, storage, target);

  requestAnimationFrame(() => {
    elements.lengthInput?.focus();
    elements.lengthInput?.select();
  });
};
