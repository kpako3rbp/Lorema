import { DataTab, InterfaceLanguage } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';
import { getRequiredElement } from 'src/shared/lib/query-element';

import { POPOVER_IDS, POPOVER_TAB_CLASSNAME } from '../config/constants';
import { PopoverGenerationElements } from '../model/types';
import { getActiveDataTab } from './get-active-data-type';

const syncTextCheckboxesWithLengthMode = (form: HTMLFormElement): void => {
  const lengthMode = new FormData(form).get('lengthMode');

  const shouldDisableCheckboxes = lengthMode === 'exact';

  const trimTextCheckbox = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.keepWholeSentencies}`);
  const paragraphsCheckbox = getRequiredElement<HTMLInputElement>(form, `#${POPOVER_IDS.paragraphsCheckbox}`);

  trimTextCheckbox.disabled = shouldDisableCheckboxes;
  paragraphsCheckbox.disabled = shouldDisableCheckboxes;

  if (shouldDisableCheckboxes) {
    trimTextCheckbox.checked = false;
    paragraphsCheckbox.checked = false;
  }
};

const syncTabPanels = (form: HTMLFormElement): void => {
  const activeDataTab = new FormData(form).get('dataTab') as DataTab;

  const panels = form.querySelectorAll<HTMLElement>(`.${POPOVER_TAB_CLASSNAME}`);

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.dataTab === activeDataTab);
  });
};

export const syncTitleTopicSelectWithLanguage = (
  elements: PopoverGenerationElements,
  interfaceLanguage: InterfaceLanguage,
): void => {
  const isLatin = elements.languageSelect.value === 'la';
  const topicSelect = elements.form.querySelector<HTMLSelectElement>(`#${POPOVER_IDS.topicSelect}`);

  if (!topicSelect) return;

  topicSelect.disabled = isLatin;

  if (isLatin) {
    Array.from(topicSelect.options).forEach((option) => {
      option.selected = false;
    });
  }

  const root = topicSelect.closest<HTMLElement>('[data-custom-select]');
  const button = root?.querySelector<HTMLButtonElement>('.lorem-custom-select-button');
  const value = root?.querySelector<HTMLElement>('.lorem-custom-select-value');
  const options = root?.querySelectorAll<HTMLElement>('.lorem-custom-select-option');

  root?.classList.toggle('disabled', isLatin);
  root?.classList.remove('open', 'open-up');

  if (button) {
    button.disabled = isLatin;
    button.setAttribute('aria-expanded', 'false');
  }

  options?.forEach((option) => {
    option.setAttribute('aria-selected', 'false');
  });

  if (value && !topicSelect.selectedOptions.length) {
    value.textContent = TRANSLATIONS[interfaceLanguage].customSelect.random;
  }
};

export const syncElementsUI = (elements: PopoverGenerationElements) => {
  syncTabPanels(elements.form);

  if (getActiveDataTab(elements.form) === 'text') {
    syncTextCheckboxesWithLengthMode(elements.form);
  }
};
