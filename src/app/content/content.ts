import { movePopoverInsideViewport } from 'src/popover';
import { generateLorem } from 'src/utils/lorem';

import {
  POPOVER_CANCEL_BTN_ID,
  POPOVER_CHECKBOX_ID,
  POPOVER_INPUT_ID,
  POPOVER_INSERT_BTN_ID,
  POPOVER_LANG_SELECT_ID,
} from '../../popover/constants';
import { createPopover, removePopover } from '../../popover/create-popover';
import { ExtensionMessage, Language } from '../../types';
import { queryElement } from '../../utils/query-element';
import { getStorageItem, setStorageItem } from '../../utils/storage';

type TargetElement = HTMLInputElement | HTMLTextAreaElement | HTMLElement | null;

type ClickPosition = {
  x: number;
  y: number;
};

declare global {
  interface Window {
    __loremExtensionLoaded?: boolean;
  }
}

(() => {
  if (window.__loremExtensionLoaded) return;

  window.__loremExtensionLoaded = true;

  let targetElement: TargetElement = null;
  let clickPosition: ClickPosition = { x: 0, y: 0 };
  let savedRange: Range | null = null;

  const isTextField = (element: Element): element is HTMLInputElement | HTMLTextAreaElement => {
    return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
  };

  const saveContentEditableSelection = (element: HTMLElement): void => {
    const editableElement = element.closest<HTMLElement>('[contenteditable="true"]');

    if (!editableElement) {
      targetElement = null;
      savedRange = null;

      return;
    }

    targetElement = editableElement;

    const selection = window.getSelection();

    savedRange = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
  };

  const handleContextMenu = (event: MouseEvent): void => {
    const element = event.target;

    if (!(element instanceof HTMLElement)) return;

    clickPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    if (isTextField(element)) {
      targetElement = element;
      savedRange = null;

      return;
    }

    saveContentEditableSelection(element);
  };

  const closePopoverOnOutsideClick = (event: MouseEvent): void => {
    const host = document.getElementById('lorem-config-popover');

    if (!host) return;
    const target = event.target;

    if (!(target instanceof Node)) return;
    if (host.contains(target)) return;
    removePopover();
    document.removeEventListener('mousedown', closePopoverOnOutsideClick, true);
  };

  const insertIntoTextField = (element: HTMLInputElement | HTMLTextAreaElement, text: string): void => {
    element.focus();

    const start = element.selectionStart ?? element.value.length;
    const end = element.selectionEnd ?? element.value.length;

    const nativeValueSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value')?.set;

    const nextValue = element.value.slice(0, start) + text + element.value.slice(end);

    nativeValueSetter?.call(element, nextValue);

    const cursorPosition = start + text.length;

    element.setSelectionRange(cursorPosition, cursorPosition);

    element.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: text,
      }),
    );

    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const insertIntoContentEditable = (element: HTMLElement, text: string): void => {
    element.focus();

    const selection = window.getSelection();

    if (selection && savedRange) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }

    document.execCommand('insertText', false, text);

    element.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: text,
      }),
    );
  };

  const insertText = (element: TargetElement, text: string): void => {
    if (!element) return;

    if (isTextField(element)) {
      insertIntoTextField(element, text);

      return;
    }

    if (element.isContentEditable) {
      insertIntoContentEditable(element, text);
    }
  };

  const submitText = async (
    input: HTMLInputElement,
    checkbox: HTMLInputElement,
    languageSelect: HTMLSelectElement,
  ): Promise<void> => {
    const chars = Number(input.value);
    const withParagraphs = checkbox.checked;
    const language = languageSelect.value as Language;

    if (!Number.isFinite(chars) || chars <= 0) {
      input.focus();
      input.select();

      return;
    }

    const charsCount = Math.floor(chars);

    await setStorageItem('withParagraphs', withParagraphs);
    await setStorageItem('charsCount', charsCount);
    await setStorageItem('language', language);

    const text = generateLorem({ length: charsCount, language, withParagraphs });

    insertText(targetElement, text);
    removePopover();
  };

  const showPopover = async (): Promise<void> => {
    removePopover();

    const charsCount = await getStorageItem('charsCount');
    const withParagraphs = await getStorageItem('withParagraphs');
    const language = await getStorageItem('language');
    const interfaceLanguage = await getStorageItem('interfaceLanguage');

    const popover = createPopover({
      charsCount,
      withParagraphs,
      language,
      interfaceLanguage,
      position: clickPosition,
    });

    const shadowRoot = popover.shadowRoot;

    if (!shadowRoot) {
      throw new Error('Shadow root not found');
    }

    document.body.appendChild(popover);

    requestAnimationFrame(() => {
      movePopoverInsideViewport(popover);
    });

    const input = queryElement<HTMLInputElement>(shadowRoot, `#${POPOVER_INPUT_ID}`);
    const insertButton = queryElement<HTMLButtonElement>(shadowRoot, `#${POPOVER_INSERT_BTN_ID}`);
    const cancelButton = queryElement<HTMLButtonElement>(shadowRoot, `#${POPOVER_CANCEL_BTN_ID}`);
    const checkbox = queryElement<HTMLInputElement>(shadowRoot, `#${POPOVER_CHECKBOX_ID}`);
    const languageSelect = queryElement<HTMLSelectElement>(shadowRoot, `#${POPOVER_LANG_SELECT_ID}`);

    insertButton.addEventListener('click', () => {
      void submitText(input, checkbox, languageSelect);
    });

    cancelButton.addEventListener('click', removePopover);
    document.addEventListener('mousedown', closePopoverOnOutsideClick, true);

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        void submitText(input, checkbox, languageSelect);
      }

      if (event.key === 'Escape') {
        removePopover();
      }
    });

    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  };

  document.addEventListener('contextmenu', handleContextMenu, true);

  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (message.type !== 'INSERT_LOREM') return;

    void showPopover();
  });
})();
