import { DATA_TYPE_TO_TAB, DataType, isDataTab } from '@lorema/core';

import { InsertMode } from '../data-insertion';

const isInsertMode = (value: string): value is InsertMode => {
  return value === 'quick' || value === 'custom';
};

export const parseMenuItemId = (menuItemId: string): { mode: InsertMode; dataType: DataType } | null => {
  const [mode, dataType] = menuItemId.split(':') as [InsertMode, DataType];

  if (!mode || !dataType) return null;
  if (!isInsertMode(mode)) return null;
  if (!isDataTab(DATA_TYPE_TO_TAB[dataType])) return null;

  return {
    mode,
    dataType,
  };
};
