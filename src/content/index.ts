import { ExtensionMessage } from '../types';
import { createEmptyTargetSnapshot, getActiveTargetSnapshot, getEditableTargetSnapshot } from './editable-target';
import { showPopover } from './popover-controller';
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
    if (message.type === 'INSERT_LOREM_FROM_CONTEXT_MENU') {
      void showPopover(latestTarget);

      return;
    }

    if (message.type === 'INSERT_LOREM_FROM_HOTKEY') {
      void showPopover(getActiveTargetSnapshot());
    }
  });
};

initContentScript();
