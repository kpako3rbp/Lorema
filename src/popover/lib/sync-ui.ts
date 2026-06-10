import { PopoverElements } from 'src/popover/lib/get-popover-elements';
import { queryElement } from 'src/shared/utils/query-element';

import { POPOVER_IDS, POPOVER_TAB_CLASSNAME } from '../config/constants';
import { getActiveContentType } from './form-utils';

const syncTextCheckboxesWithLengthMode = (form: HTMLFormElement): void => {
  const lengthMode = new FormData(form).get('lengthMode');

  const shouldDisableCheckboxes = lengthMode === 'exact';

  const trimTextCheckbox = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.keepWholeWords}`);
  const paragraphsCheckbox = queryElement<HTMLInputElement>(form, `#${POPOVER_IDS.paragraphsCheckbox}`);

  trimTextCheckbox.disabled = shouldDisableCheckboxes;
  paragraphsCheckbox.disabled = shouldDisableCheckboxes;

  if (shouldDisableCheckboxes) {
    trimTextCheckbox.checked = false;
    paragraphsCheckbox.checked = false;
  }
};

const syncTabPanels = (form: HTMLFormElement): void => {
  const activeContentType = new FormData(form).get('contentType');

  const panels = form.querySelectorAll<HTMLElement>(`.${POPOVER_TAB_CLASSNAME}`);

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.contentType === activeContentType);
  });
};

export const syncElementsUI = (elements: PopoverElements) => {
  syncTabPanels(elements.form);

  if (getActiveContentType(elements.form) === 'text') {
    syncTextCheckboxesWithLengthMode(elements.form);
  }
};
