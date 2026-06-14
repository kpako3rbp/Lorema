import { insertQuickContent, showPopover } from 'src/popover';
import { ExtensionMessage } from 'src/shared/model/types';

import { createEmptyTargetSnapshot, getActiveTargetSnapshot, getEditableTargetSnapshot } from './snapshot';
import { EditableTargetSnapshot } from './types';

const initContentScript = (): void => {
  const windowWithFlag = window as Window & {
    __loremBrowserExtensionLoaded?: boolean;
  };

  if (windowWithFlag.__loremBrowserExtensionLoaded) return;

  windowWithFlag.__loremBrowserExtensionLoaded = true;

  let latestTarget: EditableTargetSnapshot = createEmptyTargetSnapshot();

  document.addEventListener(
    'contextmenu',
    (event) => {
      latestTarget = getEditableTargetSnapshot(event);
    },
    true,
  );

  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (message.type !== 'INSERT_CONTENT_FROM_CONTEXT_MENU' && message.type !== 'INSERT_CONTENT_FROM_HOTKEY') {
      return;
    }

    const target =
      message.mode === 'quick' ? latestTarget : latestTarget.element ? latestTarget : getActiveTargetSnapshot();

    if (message.mode === 'quick') {
      void insertQuickContent(message.contentType, target);

      return;
    }

    void showPopover(message.contentType, target);
  });
};

initContentScript();
