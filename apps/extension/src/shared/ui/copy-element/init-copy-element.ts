import { copyToClipboard } from 'src/shared/lib/copy-to-clipboard';

import {
  COPY_ELEMENT_CLASSNAME,
  COPY_ELEMENT_CONTENT_CLASSNAME,
  COPY_ELEMENT_DEFAULT_RESET_DELAY,
  COPY_ELEMENT_SUCCESS_CLASSNAME,
} from './constants';

type InitCopyElementsParams = {
  root: ParentNode;
  resetDelay?: number;
};

export const initCopyElements = (params: InitCopyElementsParams): void => {
  const { root, resetDelay = COPY_ELEMENT_DEFAULT_RESET_DELAY } = params;

  root.querySelectorAll<HTMLButtonElement>(`.${COPY_ELEMENT_CLASSNAME}`).forEach((button) => {
    button.addEventListener('click', () => {
      void handleCopyElementClick(button, resetDelay);
    });
  });
};

const handleCopyElementClick = async (button: HTMLButtonElement, resetDelay: number): Promise<void> => {
  const value = button.dataset.copyValue;

  if (!value || button.disabled) return;

  const content = button.querySelector<HTMLElement>(`.${COPY_ELEMENT_CONTENT_CLASSNAME}`);
  const successTemplate = button.querySelector<HTMLTemplateElement>(`.${COPY_ELEMENT_SUCCESS_CLASSNAME}`);

  if (!content || !successTemplate) return;

  const originalContent = content.innerHTML;

  try {
    button.disabled = true;

    await copyToClipboard(value);

    content.innerHTML = successTemplate.innerHTML;

    window.setTimeout(() => {
      content.innerHTML = originalContent;
      button.disabled = false;
    }, resetDelay);
  } catch {
    button.disabled = false;
  }
};
