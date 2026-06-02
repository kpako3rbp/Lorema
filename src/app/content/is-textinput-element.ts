import { TextInputElement } from './types';

export const isTextInputElement = (element: Element): element is TextInputElement => {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
};
