import { COMMAND_NAME } from 'src/shared/config/command';
import { CONTENT_TYPES } from 'src/shared/config/content';
import { ensureDefaultStorage } from 'src/shared/lib/storage';
import { ContentType, InsertMode } from 'src/shared/model/types';

import { createContextMenu, CUSTOM_MENU_ID, updateContextMenu } from './context-menu';
import { sendInsertMessage } from './messaging';

const isInsertMode = (value: string): value is InsertMode => {
  return value === 'quick' || value === 'custom';
};

const isContentType = (value: string): value is ContentType => {
  return CONTENT_TYPES.includes(value as ContentType);
};

const parseMenuItemId = (menuItemId: string): { mode: InsertMode; contentType: ContentType } | null => {
  const [mode, contentType] = menuItemId.split(':') as [InsertMode, ContentType];

  if (!mode || !contentType) return null;
  if (!isInsertMode(mode)) return null;
  if (!isContentType(contentType)) return null;

  return {
    mode,
    contentType,
  };
};

chrome.runtime.onInstalled.addListener(async () => {
  await ensureDefaultStorage();
  await createContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
  void ensureDefaultStorage().then(createContextMenu);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'sync') return;
  if (!changes.interfaceLanguage) return;

  void updateContextMenu();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id || typeof info.menuItemId !== 'string') return;

  if (info.menuItemId === CUSTOM_MENU_ID) {
    void sendInsertMessage(tab.id, {
      type: 'INSERT_CONTENT_FROM_CONTEXT_MENU',
      mode: 'custom',
      contentType: 'text',
    });

    return;
  }

  const parsedMenuItem = parseMenuItemId(info.menuItemId);

  if (!parsedMenuItem) return;

  void sendInsertMessage(tab.id, {
    type: 'INSERT_CONTENT_FROM_CONTEXT_MENU',
    mode: parsedMenuItem.mode,
    contentType: parsedMenuItem.contentType,
  });
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command !== COMMAND_NAME || !tab?.id) return;

  void sendInsertMessage(tab.id, {
    type: 'INSERT_CONTENT_FROM_HOTKEY',
    mode: 'custom',
    contentType: 'text',
  });
});
