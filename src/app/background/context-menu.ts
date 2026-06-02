import { TRANSLATIONS } from 'src/i18n';
import { COMMAND_NAME } from 'src/popover/config/constants';
import { CONTENT_TYPES } from 'src/shared/config/content';
import { ContentType, InsertMode } from 'src/shared/model/types';
import { getStorageItem } from 'src/shared/utils/storage';

const ROOT_MENU_ID = 'quick-insert-text';
const SEPARATOR_MENU_ID = 'context-menu-separator';

export const CUSTOM_MENU_ID = 'custom-insert-text';

export const getMenuItemId = (mode: InsertMode, contentType: ContentType): string => {
  return `${mode}:${contentType}`;
};

const getCommandShortcut = async () => {
  const commands = await chrome.commands.getAll();
  const command = commands.find((item) => item.name === COMMAND_NAME);

  return command?.shortcut;
};

const getRootTitle = async (): Promise<string> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const shortcut = await getCommandShortcut();
  const title = TRANSLATIONS[interfaceLanguage].context.paste;

  return shortcut ? `${title} (${shortcut})` : title;
};

export const createContextMenu = async (): Promise<void> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;

  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: ROOT_MENU_ID,
    title: await getRootTitle(),
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
    contexts: ['editable'],
  });

  chrome.contextMenus.create({
    id: CUSTOM_MENU_ID,
    parentId: ROOT_MENU_ID,
    title: t.setupAndPaste,
    contexts: ['editable'],
  });
};

export const updateContextMenu = async (): Promise<void> => {
  await createContextMenu();
};

// export const createContextMenu = async (): Promise<void> => {
//   chrome.contextMenus.create({
//     id: MENU_ID,
//     title: await getTitle(),
//     contexts: ['editable'],
//   });
// };

// export const updateContextMenu = async (): Promise<void> => {
//   const title = await getTitle();

//   await chrome.contextMenus.update(MENU_ID, {
//     title,
//   });
// };

// export { MENU_ID };
