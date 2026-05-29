import { DEFAULT_STORAGE_VALUES } from './constants';
import { TRANSLATIONS } from './i18n';
import { ExtensionMessage } from './types';
import { getStorageItem, setStorageItem } from './utils/storage';

const MENU_ID = 'insert-lorem';

const getTitle = async () => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');

  return TRANSLATIONS[interfaceLanguage].context.paste;
};

const createContextMenu = async (): Promise<void> => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: await getTitle(),
    contexts: ['editable'],
  });
};

const sendInsertMessage = async (tabId: number): Promise<void> => {
  try {
    await chrome.tabs.sendMessage<ExtensionMessage>(tabId, {
      type: 'INSERT_LOREM',
    });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js'],
    });

    await chrome.tabs.sendMessage<ExtensionMessage>(tabId, {
      type: 'INSERT_LOREM',
    });
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

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'UPDATE_CONTEXT_MENU') {
    void updateContextMenu();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) return;

  void sendInsertMessage(tab.id);
});
