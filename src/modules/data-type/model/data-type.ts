export const DATA_TYPES = ['text', 'title', 'email', 'link', 'phone', 'address', 'firstName', 'lastName'] as const;

export type DataType = (typeof DATA_TYPES)[number];
