import { DataType } from '@lorema/core';
import { InsertMode } from 'src/modules/data-insertion';

export type ExtensionMessage =
  | {
      type: 'INSERT_DATA_FROM_CONTEXT_MENU';
      mode: InsertMode;
      dataType: DataType;
    }
  | {
      type: 'INSERT_DATA_FROM_HOTKEY';
      mode: InsertMode;
      dataType: DataType;
    }
  | {
      type: 'SHOW_TEXT_STATISTICS';
      selectedText?: string;
    }
  | {
      type: 'UPDATE_CONTEXT_MENU';
    };
