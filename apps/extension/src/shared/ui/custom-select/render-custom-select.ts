import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';

import { renderChevronDownIcon } from '../icons/chevron-down';

type SelectOption<T extends string> = {
  value: T;
  label: string;
  iconMarkup?: string;
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

const renderOptionContent = <T extends string>(option: SelectOption<T> | undefined, fallbackText = ''): string => {
  if (!option) return `<span>${fallbackText}</span>`;

  return /*html*/ `
    ${option.iconMarkup ? option.iconMarkup : ''}
    <span>${option.label}</span>
  `;
};

export const renderCustomSelect = <T extends string>(params: RenderCustomSelectParams<T>): string => {
  const { id, label, options, selectedValues, interfaceLanguage, multiple = false, className } = params;
  const t = TRANSLATIONS[interfaceLanguage].customSelect;

  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const selectedOption = selectedOptions[0];

  const selectedLabels = selectedOptions.map((option) => option.label);
  const buttonText = selectedLabels.length ? selectedLabels.join(', ') : (label ?? '');

  const multipleButtonText = selectedLabels.length
    ? `${t.selected}: ${selectedLabels.length}/${options.length}`
    : t.random;

  const buttonContent = multiple ? multipleButtonText : renderOptionContent(selectedOption, buttonText);
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
        class="lorem-custom-select-button ${className ?? ''}"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span class="lorem-custom-select-value">${buttonContent}</span>
        <span class="lorem-custom-select-arrow">${renderChevronDownIcon()}</span>
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
                <span class="lorem-custom-select-option-content">
                  ${renderOptionContent(option)}
                </span>
                <span class="lorem-custom-select-check">✓</span>
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
};
