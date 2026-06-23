export const DATA_TYPES = [
  'text',
  'title',
  'email',
  'link',
  'phone',
  'address',
  'firstName',
  'lastName',
  'fullName',
  'list',
  'number',
  'date',
] as const;
export type DataType = (typeof DATA_TYPES)[number];

export const DATA_TABS = [
  'text',
  'title',
  'list',
  'address',
  'person',
  'email',
  'link',
  'phone',
  'number',
  'date',
] as const;
export type DataTab = (typeof DATA_TABS)[number];

export const DEFAULT_DATA_TAB: DataTab = 'text';

export const DATA_TYPE_TO_TAB: Record<DataType, DataTab> = {
  text: 'text',
  title: 'title',
  email: 'email',
  link: 'link',
  phone: 'phone',
  address: 'address',
  firstName: 'person',
  lastName: 'person',
  fullName: 'person',
  list: 'list',
  number: 'number',
  date: 'date',
};

export const DATA_TAB_TO_TYPE: Record<DataTab, DataType> = {
  text: 'text',
  title: 'title',
  person: 'fullName',
  email: 'email',
  link: 'link',
  phone: 'phone',
  address: 'address',
  list: 'list',
  number: 'number',
  date: 'date',
};
