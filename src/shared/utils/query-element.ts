export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;

export const queryElement = <T extends Element>(parent: ParentNode, selector: string): T => {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
};

export const queryElementById = <T extends Element>(parent: ParentNode, id: string): T => {
  return queryElement(parent, `#${id}`);
};

export const isTextInputElement = (element: Element): element is TextInputElement => {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
};
