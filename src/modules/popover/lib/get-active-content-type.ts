import { ContentType } from 'src/modules/content-type';

export const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};
