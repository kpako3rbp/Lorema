import { DATA_TABS, DATA_TYPES, DataTab, DataType } from '../config/constants';

export const isDataType = (value: unknown): value is DataType => {
  return typeof value === 'string' && DATA_TYPES.includes(value as DataType);
};

export const isDataTab = (value: unknown): value is DataTab => {
  return typeof value === 'string' && DATA_TABS.includes(value as DataTab);
};
