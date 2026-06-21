import { getRequiredElementById } from './query-element';

export const getSelectedValue = <T extends string>(form: ParentNode, id: string): T => {
  const select = getRequiredElementById<HTMLSelectElement>(form, id);

  return select.value as T;
};

export const getSelectedValues = <T extends string>(parent: ParentNode, id: string): T[] => {
  const select = getRequiredElementById<HTMLSelectElement>(parent, id);

  return Array.from(select.selectedOptions, (option) => option.value as T);
};

export const getInputValue = (parent: ParentNode, id: string): string => {
  return getRequiredElementById<HTMLInputElement>(parent, id).value;
};

export const getCheckboxValue = (parent: ParentNode, id: string): boolean => {
  return getRequiredElementById<HTMLInputElement>(parent, id).checked;
};
