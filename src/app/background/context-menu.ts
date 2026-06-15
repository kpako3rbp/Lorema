import { InsertMode } from 'src/app/model/messages';
import { CONTENT_TYPES } from 'src/features/content-generation/config/content';
import { getStorageItem } from 'src/features/content-generation/lib/storage';
import { ContentType } from 'src/features/content-generation/model';
import { TRANSLATIONS } from 'src/i18n';
import { COMMAND_NAME } from 'src/shared/config/command';

const ROOT_MENU_ID = 'quick-insert-text';
const SEPARATOR_MENU_ID = 'context-menu-separator';

export const CUSTOM_MENU_ID = 'custom-insert-text';

const getMenuItemId = (mode: InsertMode, contentType: ContentType): string => {
  return `${mode}:${contentType}`;
};

const getCommandShortcut = async () => {
  const commands = await chrome.commands.getAll();
  const command = commands.find((item) => item.name === COMMAND_NAME);

  return command?.shortcut;
};

const getRootTitle = async (shortcut?: string): Promise<string> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const title = TRANSLATIONS[interfaceLanguage].context.paste;

  return shortcut ? `${title} (${shortcut})` : title;
};

export const createContextMenu = async (): Promise<void> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;
  const shortcut = await getCommandShortcut();

  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: ROOT_MENU_ID,
    title: await getRootTitle(shortcut),
    contexts: ['editable'],
  });

  for (const contentType of CONTENT_TYPES) {
    chrome.contextMenus.create({
      id: getMenuItemId('quick', contentType),
      parentId: ROOT_MENU_ID,
      title: t.items[contentType],
      contexts: ['editable'],
    });
  }

  chrome.contextMenus.create({
    id: SEPARATOR_MENU_ID,
    parentId: ROOT_MENU_ID,
    type: 'separator',
    title: '',
    contexts: ['editable'],
  });

  chrome.contextMenus.create({
    id: CUSTOM_MENU_ID,
    parentId: ROOT_MENU_ID,
    title: shortcut ? `${t.setupAndPaste} (${shortcut})` : t.setupAndPaste,
    contexts: ['editable'],
  });
};

export const updateContextMenu = async (): Promise<void> => {
  await createContextMenu();
};
