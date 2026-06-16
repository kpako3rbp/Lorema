import { InsertMode } from 'src/modules/content-insertion';
import { ContentType } from 'src/modules/content-type';

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
