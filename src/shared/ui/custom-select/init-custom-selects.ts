import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';

const OPEN_CLASS = 'open';
const OPEN_UP_CLASS = 'open-up';

const getSelectedValues = (select: HTMLSelectElement): string[] => {
  return Array.from(select.selectedOptions).map((option) => option.value);
};

const getSelectedLabels = (select: HTMLSelectElement): string[] => {
  return Array.from(select.selectedOptions).map((option) => option.textContent?.trim() ?? '');
};

const getSelectedCustomOptionContent = (root: HTMLElement, value: string): string => {
  const option = root.querySelector<HTMLElement>(
    `.lorem-custom-select-option[data-value="${value}"] .lorem-custom-select-option-content`,
  );

  return option?.innerHTML ?? '';
};

const updateText = (root: HTMLElement, select: HTMLSelectElement, interfaceLanguage: Language): void => {
  const t = TRANSLATIONS[interfaceLanguage].customSelect;
  const valueElement = root.querySelector<HTMLElement>('.lorem-custom-select-value');

  if (!valueElement) return;

  const labels = getSelectedLabels(select);
  const selectedValues = getSelectedValues(select);

  const buttonText = labels.length ? labels.join(', ') : '';
  const multipleButtonText = labels.length ? `${t.selected}: ${labels.length}/${select.options.length}` : t.random;

  if (select.multiple) {
    valueElement.textContent = multipleButtonText;

    return;
  }

  const selectedValue = selectedValues[0];

  if (!selectedValue) {
    valueElement.textContent = buttonText;

    return;
  }

  const selectedContent = getSelectedCustomOptionContent(root, selectedValue);

  valueElement.innerHTML = selectedContent || buttonText;
};

const updateOptions = (root: HTMLElement, select: HTMLSelectElement): void => {
  const selectedValues = new Set(getSelectedValues(select));

  root.querySelectorAll<HTMLElement>('.lorem-custom-select-option').forEach((option) => {
    const value = option.dataset.value;

    option.setAttribute('aria-selected', String(value ? selectedValues.has(value) : false));
  });
};

const closeSelect = (root: HTMLElement): void => {
  const button = root.querySelector<HTMLButtonElement>('.lorem-custom-select-button');

  root.classList.remove(OPEN_CLASS, OPEN_UP_CLASS);
  button?.setAttribute('aria-expanded', 'false');
};

const updateDropdownDirection = (root: HTMLElement): void => {
  const button = root.querySelector<HTMLButtonElement>('.lorem-custom-select-button');
  const dropdown = root.querySelector<HTMLElement>('.lorem-custom-select-dropdown');

  if (!button || !dropdown) return;

  root.classList.remove(OPEN_UP_CLASS);

  const buttonRect = button.getBoundingClientRect();
  const dropdownHeight = Math.min(dropdown.scrollHeight, 220);

  const spaceBelow = window.innerHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;

  if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
    root.classList.add(OPEN_UP_CLASS);
  }
};

const openSelect = (root: HTMLElement): void => {
  const button = root.querySelector<HTMLButtonElement>('.lorem-custom-select-button');

  root.classList.add(OPEN_CLASS);
  button?.setAttribute('aria-expanded', 'true');

  updateDropdownDirection(root);
};

const toggleOption = (
  root: HTMLElement,
  select: HTMLSelectElement,
  value: string,
  interfaceLanguage: Language,
): void => {
  const option = Array.from(select.options).find((item) => item.value === value);

  if (!option) return;

  if (select.multiple) {
    option.selected = !option.selected;
  } else {
    option.selected = true;
    closeSelect(root);
  }

  updateText(root, select, interfaceLanguage);
  updateOptions(root, select);

  select.dispatchEvent(new Event('change', { bubbles: true }));
};

export const initCustomSelects = (rootNode: ParentNode, interfaceLanguage: Language): void => {
  const customSelects = rootNode.querySelectorAll<HTMLElement>('[data-custom-select]');

  customSelects.forEach((root) => {
    const select = root.querySelector<HTMLSelectElement>('select');
    const button = root.querySelector<HTMLButtonElement>('.lorem-custom-select-button');
    const dropdown = root.querySelector<HTMLElement>('.lorem-custom-select-dropdown');

    if (!select || !button || !dropdown) return;

    button.addEventListener('click', () => {
      const isOpen = root.classList.contains(OPEN_CLASS);

      customSelects.forEach(closeSelect);

      if (!isOpen) {
        openSelect(root);
      }
    });

    dropdown.addEventListener('click', (event) => {
      const option = (event.target as HTMLElement).closest<HTMLElement>('.lorem-custom-select-option');

      if (!option?.dataset.value) return;

      toggleOption(root, select, option.dataset.value, interfaceLanguage);
    });
  });

  document.addEventListener(
    'mousedown',
    (event) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      customSelects.forEach((root) => {
        const isInside = event.composedPath().includes(root);

        if (!isInside) {
          closeSelect(root);
        }
      });
    },
    true,
  );

  window.addEventListener('resize', () => {
    customSelects.forEach((root) => {
      if (root.classList.contains(OPEN_CLASS)) {
        updateDropdownDirection(root);
      }
    });
  });
};
