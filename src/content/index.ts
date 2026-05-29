import { ExtensionMessage } from '../types';
import { createEmptyTargetSnapshot, getEditableTargetSnapshot } from './editable-target';
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
    if (message.type !== 'INSERT_LOREM') return;

    void showPopover(latestTarget);
  });
};

initContentScript();
