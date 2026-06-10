import { ContentType } from 'src/shared/model/types';
import { queryElementById } from 'src/shared/utils/query-element';

export const getSelectedValues = <T extends string>(form: HTMLFormElement, id: string): T[] => {
  const select = queryElementById<HTMLSelectElement>(form, id);

  return Array.from(select.selectedOptions, (option) => option.value as T);
};

export const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};

export const parsePositiveIntegerFromInput = (input: HTMLInputElement): number | null => {
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
