import { DataType } from '../data-type';
import { StorageSchema } from '../storage';
import { GENERATOR_BY_DATA_TYPE } from './config/generator-by-data-type';

export const generateData = (dataType: DataType, storage: StorageSchema): string => {
  return GENERATOR_BY_DATA_TYPE[dataType].generate(storage);
};
