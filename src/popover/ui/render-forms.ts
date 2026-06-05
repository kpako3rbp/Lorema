import { ContentType, Language, StorageSchema } from 'src/shared/model/types';

import { POPOVER_TAB_CLASSNAME } from '../config/constants';
import { renderEmailForm } from './render-email-form';
import { renderLinkForm } from './render-link-form';
import { renderTextForm } from './render-text-form';
import { renderTitleForm } from './render-title-form';

const FORM_RENDERERS: Record<ContentType, (storage: StorageSchema, interfaceLanguage: Language) => string> = {
  text: renderTextForm,
  title: renderTitleForm,
  email: renderEmailForm,
  link: renderLinkForm,
};

export const renderForms = (storage: StorageSchema, interfaceLanguage: Language): string => {
  return Object.entries(FORM_RENDERERS)
    .map(([contentType, renderForm]) => {
      return /*html*/ `
        <div class="${POPOVER_TAB_CLASSNAME}" data-content-type="${contentType}">
          ${renderForm(storage, interfaceLanguage)}
        </div>
      `;
    })
    .join('');
};
