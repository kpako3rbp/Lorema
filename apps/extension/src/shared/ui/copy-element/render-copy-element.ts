import { COPY_ELEMENT_CLASSNAME, COPY_ELEMENT_CONTENT_CLASSNAME, COPY_ELEMENT_SUCCESS_CLASSNAME } from './constants';

type RenderCopyElementParams = {
  value: string;
  content: string;
  successContent: string;
  className?: string;
};

export const renderCopyElement = (params: RenderCopyElementParams): string => {
  const { value, content, successContent, className = '' } = params;

  return /* html */ `
    <button
      type="button"
      class="${COPY_ELEMENT_CLASSNAME}"
      data-copy-value="${value}"
    >
      <div class="${COPY_ELEMENT_CONTENT_CLASSNAME} ${className}">
        ${content}
      </div>

      <template class="${COPY_ELEMENT_SUCCESS_CLASSNAME}">
        ${successContent}
      </template>
    </button>
  `;
};
