import { DATA_TAB_TO_TYPE, DataTab } from 'src/modules/data-type/config/constants';
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
  const activeDataType = new FormData(form).get('dataType') as DataTab;

  const panels = form.querySelectorAll<HTMLElement>(`.${POPOVER_TAB_CLASSNAME}`);

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.dataTab === DATA_TAB_TO_TYPE[activeDataType]);
  });
};

export const syncElementsUI = (elements: PopoverGenerationElements) => {
  syncTabPanels(elements.form);

  if (getActiveDataTab(elements.form) === 'text') {
    syncTextCheckboxesWithLengthMode(elements.form);
  }
};
