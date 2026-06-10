import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type RenderCustomSelectParams<T extends string> = {
  id: string;
  label?: string;
  options: readonly SelectOption<T>[];
  selectedValues: readonly T[];
  interfaceLanguage: Language;
  multiple?: boolean;
  className?: string;
};

const chevron =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>';

export const renderCustomSelect = <T extends string>(params: RenderCustomSelectParams<T>): string => {
  const { id, label, options, selectedValues, interfaceLanguage, multiple = false, className } = params;
  const t = TRANSLATIONS[interfaceLanguage].customSelect;
  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  const buttonText = selectedLabels.length ? selectedLabels.join(', ') : label;
  const multipleButtonText = selectedLabels.length
    ? `${t.selected}: ${selectedLabels.length}/${options.length}`
    : t.random;

  const labelMarkup = label ? `<span class="lorem-label">${label}</span>` : '';

  return /*html*/ `
    <div class="lorem-custom-select" data-custom-select>
      ${labelMarkup}

      <select
        id="${id}"
        class="lorem-custom-select-native"
        ${multiple ? 'multiple' : ''}
      >
        ${options
          .map(
            (option) => /*html*/ `
              <option
                value="${option.value}"
                ${selectedValues.includes(option.value) ? 'selected' : ''}
              >
                ${option.label}
              </option>
            `,
          )
          .join('')}
      </select>

      <button
        class="lorem-custom-select-button ${className}"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span class="lorem-custom-select-value">${multiple ? multipleButtonText : buttonText}</span>
        <span class="lorem-custom-select-arrow">${chevron}</span>
      </button>

      <div
        class="lorem-custom-select-dropdown"
        role="listbox"
        ${multiple ? 'aria-multiselectable="true"' : ''}
      >
        ${options
          .map(
            (option) => /*html*/ `
              <button
                type="button"
                class="lorem-custom-select-option"
                role="option"
                data-value="${option.value}"
                aria-selected="${selectedValues.includes(option.value)}"
              >
                <span>${option.label}</span>
                <span class="lorem-custom-select-check">✓</span>
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
};
