import { DataTab, DEFAULT_DATA_TAB } from 'src/modules/data-type';
import { isDataTab } from 'src/modules/data-type/lib/is-data-tab';

export const getActiveDataTab = (form: HTMLFormElement): DataTab => {
  const value = new FormData(form).get('dataTab');

  if (!isDataTab(value)) {
    return DEFAULT_DATA_TAB;
  }

  return value;
};
