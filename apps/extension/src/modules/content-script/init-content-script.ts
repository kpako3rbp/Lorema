import { showGenerationPopover, showTextStatisticsPopover } from 'src/modules/popover';
import { calculateTextStatistics } from 'src/modules/text-statistics';
import { CursorPosition } from 'src/shared/model/types';

import { insertQuickData } from '../data-insertion';
import {
  createEmptyInsertionTargetSnapshot,
  EditableTargetSnapshot,
  getActiveInsertionTargetSnapshot,
  getInsertionTargetSnapshot,
} from '../editable-target';
import { ExtensionMessage } from '../messages';
import { getSelectedText } from './lib/get-selected-text';

type InsertMessage = Extract<ExtensionMessage, { type: 'INSERT_DATA_FROM_CONTEXT_MENU' | 'INSERT_DATA_FROM_HOTKEY' }>;
type StatisticsMessage = Extract<ExtensionMessage, { type: 'SHOW_TEXT_STATISTICS' }>;

const isInsertMessage = (message: ExtensionMessage): message is InsertMessage => {
  return message.type === 'INSERT_DATA_FROM_CONTEXT_MENU' || message.type === 'INSERT_DATA_FROM_HOTKEY';
};

const isTextStatisticsMessage = (message: ExtensionMessage): message is StatisticsMessage => {
  return message.type === 'SHOW_TEXT_STATISTICS';
};

const markContentScriptAsLoaded = (): boolean => {
  const windowWithFlag = window as Window & {
    __loremBrowserExtensionLoaded?: boolean;
  };

  if (windowWithFlag.__loremBrowserExtensionLoaded) {
    return false;
  }

  windowWithFlag.__loremBrowserExtensionLoaded = true;

  return true;
};

const getTargetForInsertMessage = (
  message: InsertMessage,
  latestTarget: EditableTargetSnapshot,
): EditableTargetSnapshot => {
  if (message.type === 'INSERT_DATA_FROM_HOTKEY') {
    return getActiveInsertionTargetSnapshot();
  }

  if (message.mode === 'quick') {
    return latestTarget;
  }

  if (latestTarget.element) {
    return latestTarget;
  }

  return getActiveInsertionTargetSnapshot();
};

export const initContentScript = (): void => {
  const shouldInit = markContentScriptAsLoaded();

  if (!shouldInit) return;

  let latestTarget: EditableTargetSnapshot = createEmptyInsertionTargetSnapshot();
  let latestContextMenuTarget: EventTarget | null = null;
  let latestContextMenuPosition: CursorPosition | null = null;

  document.addEventListener(
    'contextmenu',
    (event) => {
      latestTarget = getInsertionTargetSnapshot(event);
      latestContextMenuTarget = event.target;
      latestContextMenuPosition = {
        x: event.clientX,
        y: event.clientY,
      };
    },
    true,
  );

  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (isTextStatisticsMessage(message)) {
      const selectedText = getSelectedText(latestContextMenuTarget) || message.selectedText || '';

      if (!selectedText) return;

      const statistics = calculateTextStatistics(selectedText);

      void showTextStatisticsPopover(statistics, latestContextMenuPosition);

      return;
    }

    if (isInsertMessage(message)) {
      const target = getTargetForInsertMessage(message, latestTarget);

      if (message.mode === 'quick') {
        void insertQuickData(message.dataType, target);

        return;
      }

      void showGenerationPopover(message.dataType, target);

      return;
    }
  });
};
