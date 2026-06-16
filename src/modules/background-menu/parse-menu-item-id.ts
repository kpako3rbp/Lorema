import { InsertMode } from '../content-insertion';
import { CONTENT_TYPES, ContentType } from '../content-type';

const isInsertMode = (value: string): value is InsertMode => {
  return value === 'quick' || value === 'custom';
};

const isContentType = (value: string): value is ContentType => {
  return CONTENT_TYPES.includes(value as ContentType);
};

export const parseMenuItemId = (menuItemId: string): { mode: InsertMode; contentType: ContentType } | null => {
  const [mode, contentType] = menuItemId.split(':') as [InsertMode, ContentType];

  if (!mode || !contentType) return null;
  if (!isInsertMode(mode)) return null;
  if (!isContentType(contentType)) return null;

  return {
    mode,
    contentType,
  };
};
