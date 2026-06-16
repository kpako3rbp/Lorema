import { InsertMode } from '../data-insertion';
import { DATA_TYPES, DataType } from '../data-type';

const isInsertMode = (value: string): value is InsertMode => {
  return value === 'quick' || value === 'custom';
};

const isDataType = (value: string): value is DataType => {
  return DATA_TYPES.includes(value as DataType);
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
