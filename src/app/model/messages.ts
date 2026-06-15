import { ContentType } from 'src/entities/generated-content/model';

export type InsertMode = 'quick' | 'custom';

export type ExtensionMessage =
  | {
      type: 'INSERT_CONTENT_FROM_CONTEXT_MENU';
      mode: InsertMode;
      contentType: ContentType;
    }
  | {
      type: 'INSERT_CONTENT_FROM_HOTKEY';
      mode: InsertMode;
      contentType: ContentType;
    }
  | {
      type: 'UPDATE_CONTEXT_MENU';
    };
