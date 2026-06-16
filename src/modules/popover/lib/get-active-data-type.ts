import { DataType, DEFAULT_DATA_TYPE, isDataType } from 'src/modules/data-type';

export const getActiveDataType = (form: HTMLFormElement): DataType => {
  const value = new FormData(form).get('dataType');

  if (!isDataType(value)) {
    return DEFAULT_DATA_TYPE;
  }

  return value;
};
