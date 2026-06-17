import { TRANSLATIONS } from 'src/i18n';
import { getStorageItem } from 'src/modules/storage';
import { COMMANDS, CommandType } from 'src/shared/config/commands';

import { InsertMode } from '../data-insertion';
import { DATA_TYPES, DataType } from '../data-type';
import { CONTEXT_MENU_IDS, ROOT_MENU_ID, SEPARATOR_MENU_ID } from './config/constants';

const getMenuItemId = (mode: InsertMode, dataType: DataType): string => {
  return `${mode}:${dataType}`;
};

const getCommandShortcut = async (type: CommandType) => {
  const commands = await chrome.commands.getAll();
  const command = commands.find((item) => item.name === COMMANDS[type]);

  return command?.shortcut || undefined;
};

const getMenuTitle = async (type: CommandType, shortcut: string | undefined): Promise<string> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;

  const mapTitleByType: Record<CommandType, string> = {
    openGenerationPopover: t.paste,
    openStatisticsPopover: t.calculateTextStatistics,
  };

  return shortcut ? `${mapTitleByType[type]} (${shortcut})` : mapTitleByType[type];
};

export const createContextMenu = async (): Promise<void> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;
  const openGenerationPopoverShortcut = await getCommandShortcut('openGenerationPopover');
  const openStatisticsPopoverShortcut = await getCommandShortcut('openStatisticsPopover');

  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: ROOT_MENU_ID,
    title: await getMenuTitle('openGenerationPopover', openGenerationPopoverShortcut),
    contexts: ['editable'],
  });

  chrome.contextMenus.create({
    id: CONTEXT_MENU_IDS.countSelectedText,
    title: await getMenuTitle('openStatisticsPopover', openStatisticsPopoverShortcut),
    contexts: ['selection'],
  });

  for (const dataType of DATA_TYPES) {
    chrome.contextMenus.create({
      id: getMenuItemId('quick', dataType),
      parentId: ROOT_MENU_ID,
      title: t.items[dataType],
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
    id: CONTEXT_MENU_IDS.insertData,
    parentId: ROOT_MENU_ID,
    title: openGenerationPopoverShortcut ? `${t.setupAndPaste} (${openGenerationPopoverShortcut})` : t.setupAndPaste,
    contexts: ['editable'],
  });
};

export const updateContextMenu = async (): Promise<void> => {
  await createContextMenu();
};
