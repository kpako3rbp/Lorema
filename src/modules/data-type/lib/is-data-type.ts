import { DATA_TYPES, DataType } from '../config/constants';

export const isDataType = (value: unknown): value is DataType => {
  return typeof value === 'string' && DATA_TYPES.includes(value as DataType);
};
