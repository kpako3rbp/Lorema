import { DEFAULT_STORAGE_VALUES } from './constants';
import { TRANSLATIONS } from './i18n';
import { COMMAND_NAME } from './popover/constants';
import { ExtensionMessage } from './types';
import { getStorageItem, setStorageItem } from './utils/storage';

const MENU_ID = 'insert-lorem';

const getCommandShortcut = async () => {
  const commands = await chrome.commands.getAll();
  const command = commands.find((item) => item.name === COMMAND_NAME);

  return command?.shortcut;
};

const getTitle = async () => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const shortcut = await getCommandShortcut();

  const title = TRANSLATIONS[interfaceLanguage].context.paste;

  return shortcut ? `${title} (${shortcut})` : title;
};

const createContextMenu = async (): Promise<void> => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: await getTitle(),
    contexts: ['editable'],
  });
};

const sendInsertMessage = async (tabId: number, message: ExtensionMessage): Promise<void> => {
  try {
    await chrome.tabs.sendMessage<ExtensionMessage>(tabId, message);
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js'],
    });

    await chrome.tabs.sendMessage<ExtensionMessage>(tabId, message);
  }
};

const updateContextMenu = async (): Promise<void> => {
  const title = await getTitle();

  await chrome.contextMenus.update(MENU_ID, {
    title,
  });
};

chrome.runtime.onInstalled.addListener(async () => {
  await createContextMenu();
  await setStorageItem('charsCount', DEFAULT_STORAGE_VALUES.charsCount);
});

chrome.runtime.onStartup.addListener(() => {
  void updateContextMenu();
});

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'UPDATE_CONTEXT_MENU') {
    void updateContextMenu();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) return;

  void sendInsertMessage(tab.id, {
    type: 'INSERT_LOREM_FROM_CONTEXT_MENU',
  });
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command !== COMMAND_NAME || !tab?.id) return;

  void sendInsertMessage(tab.id, {
    type: 'INSERT_LOREM_FROM_HOTKEY',
  });
});
