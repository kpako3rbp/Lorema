import { ExtensionMessage } from '../types';
import { createEmptyTargetSnapshot, getActiveTargetSnapshot, getEditableTargetSnapshot } from './editable-target';
import { insertQuickContent, showPopover } from './popover-controller';
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
    if (message.type !== 'INSERT_CONTENT') return;

    const target = message.mode === 'quick' ? latestTarget : latestTarget.element ? latestTarget : getActiveTargetSnapshot();

    if (message.mode === 'quick') {
      void insertQuickContent(message.contentType, target);
      return;
    }

    void showPopover(message.contentType, target);
  });
};

initContentScript();
