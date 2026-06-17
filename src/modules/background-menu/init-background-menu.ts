import { ensureDefaultStorage } from 'src/modules/storage';
import { COMMANDS } from 'src/shared/config/commands';

import { DEFAULT_DATA_TYPE } from '../data-type';
import { CONTEXT_MENU_IDS } from './config/constants';
import { createContextMenu, updateContextMenu } from './context-menu';
import { parseMenuItemId } from './parse-menu-item-id';
import { sendContentMessage } from './send-content-message';

export const initBackgroundMenu = () => {
  chrome.runtime.onInstalled.addListener(async () => {
    await ensureDefaultStorage();
    await createContextMenu();
  });

  chrome.runtime.onStartup.addListener(async () => {
    await ensureDefaultStorage();
    await createContextMenu();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;

    const interfaceLanguageChange = changes.interfaceLanguage;

    if (!interfaceLanguageChange) return;
    if (interfaceLanguageChange.oldValue === undefined) return;
    if (interfaceLanguageChange.oldValue === interfaceLanguageChange.newValue) return;

    void updateContextMenu();
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id || typeof info.menuItemId !== 'string') return;

    if (info.menuItemId === CONTEXT_MENU_IDS.insertData) {
      void sendContentMessage(tab.id, {
        type: 'INSERT_DATA_FROM_CONTEXT_MENU',
        mode: 'custom',
        dataType: DEFAULT_DATA_TYPE,
      });

      return;
    }

    if (info.menuItemId === CONTEXT_MENU_IDS.countSelectedText) {
      void sendContentMessage(tab.id, {
        type: 'SHOW_TEXT_STATISTICS',
        selectedText: info.selectionText,
      });

      return;
    }

    const parsedMenuItem = parseMenuItemId(info.menuItemId);

    if (!parsedMenuItem) return;

    void sendContentMessage(tab.id, {
      type: 'INSERT_DATA_FROM_CONTEXT_MENU',
      mode: parsedMenuItem.mode,
      dataType: parsedMenuItem.dataType,
    });
  });

  chrome.commands.onCommand.addListener((command, tab) => {
    if (!tab?.id) return;

    if (command === COMMANDS.openGenerationPopover) {
      void sendContentMessage(tab.id, {
        type: 'INSERT_DATA_FROM_HOTKEY',
        mode: 'custom',
        dataType: DEFAULT_DATA_TYPE,
      });

      return;
    }

    if (command === COMMANDS.openStatisticsPopover) {
      void sendContentMessage(tab.id, {
        type: 'SHOW_TEXT_STATISTICS',
      });
    }
  });
};
