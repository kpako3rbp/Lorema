import type { ExtensionMessage } from 'src/app/model/messages';
import type { EditableTargetSnapshot } from 'src/entities/editable-target';
import {
  createEmptyTargetSnapshot,
  getActiveTargetSnapshot,
  getEditableTargetSnapshot,
} from 'src/entities/editable-target';
import { openCustomInsertPopover } from 'src/features/custom-insert-content';
import { insertGeneratedContent } from 'src/features/quick-insert-content';

type InsertMessage = Extract<
  ExtensionMessage,
  { type: 'INSERT_CONTENT_FROM_CONTEXT_MENU' | 'INSERT_CONTENT_FROM_HOTKEY' }
>;

const isInsertMessage = (message: ExtensionMessage): message is InsertMessage => {
  return message.type === 'INSERT_CONTENT_FROM_CONTEXT_MENU' || message.type === 'INSERT_CONTENT_FROM_HOTKEY';
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
  if (message.type === 'INSERT_CONTENT_FROM_HOTKEY') {
    return getActiveTargetSnapshot();
  }

  if (message.mode === 'quick') {
    return latestTarget;
  }

  if (latestTarget.element) {
    return latestTarget;
  }

  return getActiveTargetSnapshot();
};

const initContentScript = (): void => {
  const shouldInit = markContentScriptAsLoaded();

  if (!shouldInit) return;

  let latestTarget: EditableTargetSnapshot = createEmptyTargetSnapshot();

  document.addEventListener(
    'contextmenu',
    (event) => {
      latestTarget = getEditableTargetSnapshot(event);
    },
    true,
  );

  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (!isInsertMessage(message)) return;

    const target = getTargetForMessage(message, latestTarget);

    if (message.mode === 'quick') {
      void insertGeneratedContent(message.contentType, target);

      return;
    }

    void openCustomInsertPopover(message.contentType, target);
  });
};

initContentScript();
