import { ensureDefaultStorage } from 'src/modules/storage';
import { COMMANDS } from 'src/shared/config/commands';

import { createContextMenu, CUSTOM_MENU_ID, updateContextMenu } from './context-menu';
import { parseMenuItemId } from './parse-menu-item-id';
import { sendInsertMessage } from './send-insert-message';

export const initBackgroundMenu = () => {
  chrome.runtime.onInstalled.addListener(async () => {
    await ensureDefaultStorage();
    await createContextMenu();
  });

  chrome.runtime.onStartup.addListener(async () => {
    await ensureDefaultStorage();
    await createContextMenu();
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (!changes.interfaceLanguage) return;

    void updateContextMenu();
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id || typeof info.menuItemId !== 'string') return;

    if (info.menuItemId === CUSTOM_MENU_ID) {
      void sendInsertMessage(tab.id, {
        type: 'INSERT_DATA_FROM_CONTEXT_MENU',
        mode: 'custom',
        dataType: 'text',
      });

      return;
    }

    const parsedMenuItem = parseMenuItemId(info.menuItemId);

    if (!parsedMenuItem) return;

    void sendInsertMessage(tab.id, {
      type: 'INSERT_DATA_FROM_CONTEXT_MENU',
      mode: parsedMenuItem.mode,
      dataType: parsedMenuItem.dataType,
    });
  });

  chrome.commands.onCommand.addListener((command, tab) => {
    if (command !== COMMANDS.openLoremPopover || !tab?.id) return;

    void sendInsertMessage(tab.id, {
      type: 'INSERT_DATA_FROM_HOTKEY',
      mode: 'custom',
      dataType: 'text',
    });
  });
};
