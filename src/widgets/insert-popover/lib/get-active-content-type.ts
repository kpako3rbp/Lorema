import { ContentType } from 'src/entities/generation-settings/model';

export const getActiveContentType = (form: HTMLFormElement): ContentType => {
  return new FormData(form).get('contentType') as ContentType;
};
