import { generateContent } from '../generators';
import { createPopover, movePopoverInsideViewport, removePopover } from '../popover';
import { POPOVER_CANCEL_BTN_ID, POPOVER_ID, POPOVER_INSERT_BTN_ID } from '../popover/constants';
import {
  AddressFormat,
  ContentType,
  Language,
  LengthMode,
  LinkPrefix,
  StorageSchema,
  TitleTopic,
} from '../types';
import { queryElement } from '../utils/query-element';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { insertTextAtTarget } from './text-insertion';
import { EditableTargetSnapshot } from './types';

type PopoverElements = {
  form: HTMLFormElement;
  insertButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
};

const getPopoverElements = (shadowRoot: ShadowRoot): PopoverElements => ({
  form: queryElement(shadowRoot, '#popover-form'),
  insertButton: queryElement(shadowRoot, `#${POPOVER_INSERT_BTN_ID}`),
  cancelButton: queryElement(shadowRoot, `#${POPOVER_CANCEL_BTN_ID}`),
});

const closeActivePopover = (): void => {
  removePopover();
  document.removeEventListener('mousedown', closePopoverOnOutsideClick, true);
};

function closePopoverOnOutsideClick(event: MouseEvent): void {
  const host = document.getElementById(POPOVER_ID);
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

const getStorageSnapshot = async (): Promise<StorageSchema> => ({
  interfaceLanguage: await getStorageItem('interfaceLanguage'),
  textSettings: await getStorageItem('textSettings'),
  titleSettings: await getStorageItem('titleSettings'),
  emailSettings: await getStorageItem('emailSettings'),
  linkSettings: await getStorageItem('linkSettings'),
  phoneSettings: await getStorageItem('phoneSettings'),
  addressSettings: await getStorageItem('addressSettings'),
  firstNameSettings: await getStorageItem('firstNameSettings'),
  lastNameSettings: await getStorageItem('lastNameSettings'),
});

const readSettingsFromForm = (contentType: ContentType, form: HTMLFormElement, storage: StorageSchema): StorageSchema | null => {
  const nextStorage: StorageSchema = {
    ...storage,
    textSettings: { ...storage.textSettings },
    titleSettings: { ...storage.titleSettings },
    emailSettings: { ...storage.emailSettings },
    linkSettings: { ...storage.linkSettings },
    phoneSettings: { ...storage.phoneSettings },
    addressSettings: { ...storage.addressSettings },
    firstNameSettings: { ...storage.firstNameSettings },
    lastNameSettings: { ...storage.lastNameSettings },
  };

  switch (contentType) {
    case 'text': {
      const length = parsePositiveInteger(getInput(form, 'length'));
      if (length === null) return null;
      const lengthMode = new FormData(form).get('lengthMode') as LengthMode;
      nextStorage.textSettings = {
        language: getSelect(form, 'language').value as Language,
        length,
        lengthMode,
        trimToWord: !getInput(form, 'noTrimText').checked,
        withParagraphs: lengthMode === 'exact' ? false : getInput(form, 'withParagraphs').checked,
      };
      return nextStorage;
    }
    case 'title':
      nextStorage.titleSettings = {
        language: getSelect(form, 'language').value as Language,
        maxLength: Number(getSelect(form, 'maxLength').value),
        topic: getSelect(form, 'topic').value as TitleTopic,
      };
      return nextStorage;
    case 'email': {
      const loginMaxLength = parsePositiveInteger(getInput(form, 'loginMaxLength'));
      if (loginMaxLength === null) return null;
      nextStorage.emailSettings = { loginMaxLength };
      return nextStorage;
    }
    case 'link': {
      const maxLength = parsePositiveInteger(getInput(form, 'maxLength'));
      if (maxLength === null) return null;
      nextStorage.linkSettings = { prefix: getSelect(form, 'prefix').value as LinkPrefix, maxLength };
      return nextStorage;
    }
    case 'phone': {
      const digitsCount = parsePositiveInteger(getInput(form, 'digitsCount'));
      if (digitsCount === null) return null;
      nextStorage.phoneSettings = { countryCode: getInput(form, 'countryCode').value.trim() || '+7', digitsCount };
      return nextStorage;
    }
    case 'address':
      nextStorage.addressSettings = {
        language: getSelect(form, 'language').value as Language,
        format: getSelect(form, 'format').value as AddressFormat,
      };
      return nextStorage;
    case 'firstName':
      nextStorage.firstNameSettings = { language: getSelect(form, 'language').value as Language };
      return nextStorage;
    case 'lastName':
      nextStorage.lastNameSettings = { language: getSelect(form, 'language').value as Language };
      return nextStorage;
  }
};

const saveContentSettings = async (contentType: ContentType, storage: StorageSchema): Promise<void> => {
  switch (contentType) {
    case 'text':
      return setStorageItem('textSettings', storage.textSettings);
    case 'title':
      return setStorageItem('titleSettings', storage.titleSettings);
    case 'email':
      return setStorageItem('emailSettings', storage.emailSettings);
    case 'link':
      return setStorageItem('linkSettings', storage.linkSettings);
    case 'phone':
      return setStorageItem('phoneSettings', storage.phoneSettings);
    case 'address':
      return setStorageItem('addressSettings', storage.addressSettings);
    case 'firstName':
      return setStorageItem('firstNameSettings', storage.firstNameSettings);
    case 'lastName':
      return setStorageItem('lastNameSettings', storage.lastNameSettings);
  }
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
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    void submitContent(contentType, elements.form, storage, target);
  });

  elements.cancelButton.addEventListener('click', closeActivePopover);
  document.addEventListener('mousedown', closePopoverOnOutsideClick, true);

  elements.form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeActivePopover();
  });

  const lengthModeInputs = elements.form.querySelectorAll<HTMLInputElement>('input[name="lengthMode"]');
  const paragraphsInput = elements.form.querySelector<HTMLInputElement>('#withParagraphs');
  lengthModeInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (paragraphsInput) {
        paragraphsInput.disabled = input.value === 'exact' && input.checked;
      }
    });
  });
};

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageSnapshot();
  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};

export const showPopover = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  closeActivePopover();
  const storage = await getStorageSnapshot();

  const popover = createPopover({
    contentType,
    storage,
    interfaceLanguage: storage.interfaceLanguage,
    position: target.position,
  });

  const shadowRoot = popover.shadowRoot;
  if (!shadowRoot) throw new Error('Shadow root not found');

  document.body.appendChild(popover);
  requestAnimationFrame(() => movePopoverInsideViewport(popover));

  const elements = getPopoverElements(shadowRoot);
  registerPopoverEvents(contentType, elements, storage, target);

  requestAnimationFrame(() => elements.insertButton.focus());
};
