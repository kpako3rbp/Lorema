import { getRequiredElement } from 'src/shared/lib/query-element';

import { POPOVER_IDS, POPOVER_TAB_CLASSNAME } from '../config/constants';
import { PopoverElements } from '../model/types';
import { getActiveDataType } from './get-active-data-type';

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
  const activeDataType = new FormData(form).get('dataType');

  const panels = form.querySelectorAll<HTMLElement>(`.${POPOVER_TAB_CLASSNAME}`);

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.dataType === activeDataType);
  });
};

export const syncElementsUI = (elements: PopoverElements) => {
  syncTabPanels(elements.form);

  if (getActiveDataType(elements.form) === 'text') {
    syncTextCheckboxesWithLengthMode(elements.form);
  }
};
