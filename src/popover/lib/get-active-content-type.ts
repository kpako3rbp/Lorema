import { ContentType } from 'src/shared/model/types';

export const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};
