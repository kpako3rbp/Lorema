export const DATA_TYPES = ['text', 'title', 'email', 'link', 'phone', 'address', 'firstName', 'lastName'] as const;

export const DEFAULT_DATA_TYPE: DataType = 'text';

export type DataType = (typeof DATA_TYPES)[number];
