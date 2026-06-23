export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;

export const getRequiredElement = <T extends Element>(parent: ParentNode, selector: string): T => {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
};

export const queryOptionalElement = <T extends Element>(parent: ParentNode, selector: string): T | null => {
  return parent.querySelector<T>(selector);
};

export const getRequiredElementById = <T extends Element>(parent: ParentNode, id: string): T => {
  return getRequiredElement(parent, `#${id}`);
};

export const queryOptionalElementById = <T extends Element>(parent: ParentNode, id: string): T | null => {
  return queryOptionalElement<T>(parent, `#${id}`);
};

export const isTextInputElement = (element: Element): element is TextInputElement => {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
};
