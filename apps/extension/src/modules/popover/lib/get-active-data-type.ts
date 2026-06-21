import { DataTab, DEFAULT_DATA_TAB, isDataTab } from '@lorema/core';

export const getActiveDataTab = (form: HTMLFormElement): DataTab => {
  const value = new FormData(form).get('dataTab');

  if (!isDataTab(value)) {
    return DEFAULT_DATA_TAB;
  }

  return value;
};
