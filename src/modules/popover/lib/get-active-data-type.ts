import { DataType } from 'src/modules/data-type';

export const getActiveDataType = (form: HTMLFormElement): DataType => {
  return new FormData(form).get('dataType') as DataType;
};
