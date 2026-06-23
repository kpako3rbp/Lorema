import { isTextInputElement } from 'src/shared/lib/query-element';

const getSelectedTextFromInput = (element: HTMLInputElement | HTMLTextAreaElement): string => {
  const start = element.selectionStart;
  const end = element.selectionEnd;

  if (start === null || end === null || start === end) return '';

  return element.value.slice(start, end);
};

export const getSelectedText = (target?: EventTarget | null): string => {
  if (target instanceof Element && isTextInputElement(target)) {
    return getSelectedTextFromInput(target);
  }

  return window.getSelection()?.toString() ?? '';
};
