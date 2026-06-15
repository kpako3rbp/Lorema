import { ContentType } from 'src/features/content-generation/model';

export const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};
