import { TRANSLATIONS } from './i18n';
import { COMMAND_NAME } from './popover/constants';
import { ContentType, ExtensionMessage, InsertMode } from './types';
import { ensureDefaultStorage, getStorageItem } from './utils/storage';

const QUICK_ROOT_MENU_ID = 'quick-insert-text';
const CUSTOM_ROOT_MENU_ID = 'custom-insert-text';
const CONTENT_TYPES: ContentType[] = ['text', 'title', 'email', 'link', 'phone', 'address', 'firstName', 'lastName'];

const getMenuItemId = (mode: InsertMode, contentType: ContentType): string => `${mode}:${contentType}`;

const createContextMenu = async (): Promise<void> => {
  await chrome.contextMenus.removeAll();

  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;

  chrome.contextMenus.create({ id: QUICK_ROOT_MENU_ID, title: t.quickRoot, contexts: ['editable'] });
  chrome.contextMenus.create({ id: CUSTOM_ROOT_MENU_ID, title: t.customRoot, contexts: ['editable'] });

  for (const contentType of CONTENT_TYPES) {
    chrome.contextMenus.create({
      id: getMenuItemId('quick', contentType),
      parentId: QUICK_ROOT_MENU_ID,
      title: t.items[contentType],
      contexts: ['editable'],
    });

    chrome.contextMenus.create({
      id: getMenuItemId('custom', contentType),
      parentId: CUSTOM_ROOT_MENU_ID,
      title: t.items[contentType],
      contexts: ['editable'],
    });
  }
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
  await createContextMenu();
};

chrome.runtime.onInstalled.addListener(async () => {
  await ensureDefaultStorage();
  await createContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
  void ensureDefaultStorage().then(updateContextMenu);
});

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'UPDATE_CONTEXT_MENU') void updateContextMenu();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id || typeof info.menuItemId !== 'string') return;

  const [mode, contentType] = info.menuItemId.split(':') as [InsertMode, ContentType];
  if ((mode !== 'quick' && mode !== 'custom') || !CONTENT_TYPES.includes(contentType)) return;

  void sendInsertMessage(tab.id, { type: 'INSERT_CONTENT', mode, contentType });
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command !== COMMAND_NAME || !tab?.id) return;

  void sendInsertMessage(tab.id, { type: 'INSERT_CONTENT', mode: 'custom', contentType: 'text' });
});
