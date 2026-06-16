import { InsertMode } from '../data-insertion';
import { DataType, isDataType } from '../data-type';

const isInsertMode = (value: string): value is InsertMode => {
  return value === 'quick' || value === 'custom';
};

export const parseMenuItemId = (menuItemId: string): { mode: InsertMode; dataType: DataType } | null => {
  const [mode, dataType] = menuItemId.split(':') as [InsertMode, DataType];

  if (!mode || !dataType) return null;
  if (!isInsertMode(mode)) return null;
  if (!isDataType(dataType)) return null;

  return {
    mode,
    dataType,
  };
};
