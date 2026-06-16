import { showPopover } from 'src/modules/popover';

import { insertQuickData } from '../data-insertion';
import {
  createEmptyInsertionTargetSnapshot,
  EditableTargetSnapshot,
  getActiveInsertionTargetSnapshot,
  getInsertionTargetSnapshot,
} from '../editable-target';
import { ExtensionMessage } from '../messages';

type InsertMessage = Extract<ExtensionMessage, { type: 'INSERT_DATA_FROM_CONTEXT_MENU' | 'INSERT_DATA_FROM_HOTKEY' }>;

const isInsertMessage = (message: ExtensionMessage): message is InsertMessage => {
  return message.type === 'INSERT_DATA_FROM_CONTEXT_MENU' || message.type === 'INSERT_DATA_FROM_HOTKEY';
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

const getTargetForMessage = (message: InsertMessage, latestTarget: EditableTargetSnapshot): EditableTargetSnapshot => {
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

  document.addEventListener(
    'contextmenu',
    (event) => {
      latestTarget = getInsertionTargetSnapshot(event);
    },
    true,
  );

  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (!isInsertMessage(message)) return;

    const target = getTargetForMessage(message, latestTarget);

    if (message.mode === 'quick') {
      void insertQuickData(message.dataType, target);

      return;
    }

    void showPopover(message.dataType, target);
  });
};
