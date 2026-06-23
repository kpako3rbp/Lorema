import { DATA_TYPES, DataType } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';
import { getStorageItem } from 'src/modules/storage';
import { COMMANDS, CommandType } from 'src/shared/config/commands';

import { InsertMode } from '../data-insertion';
import { CONTEXT_MENU_IDS, ROOT_MENU_ID, SEPARATOR_MENU_ID } from './config/constants';

const getMenuItemId = (mode: InsertMode, dataType: DataType): string => {
  return `${mode}:${dataType}`;
};

const getCommandShortcut = async (type: CommandType): Promise<string | undefined> => {
  const commands = await chrome.commands.getAll();
  const command = commands.find((item) => item.name === COMMANDS[type]);

  return command?.shortcut || undefined;
};

const getTitleWithShortcut = (title: string, shortcut: string | undefined): string => {
  return shortcut ? `${title} (${shortcut})` : title;
};

const getContextMenuData = async () => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const t = TRANSLATIONS[interfaceLanguage].context;

  const openGenerationPopoverShortcut = await getCommandShortcut('openGenerationPopover');
  const openStatisticsPopoverShortcut = await getCommandShortcut('openStatisticsPopover');

  return {
    t,
    openGenerationPopoverShortcut,
    openStatisticsPopoverShortcut,
  };
};

export const createContextMenu = async (): Promise<void> => {
  const { t, openGenerationPopoverShortcut, openStatisticsPopoverShortcut } = await getContextMenuData();

  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: ROOT_MENU_ID,
    title: getTitleWithShortcut(t.paste, openGenerationPopoverShortcut),
    contexts: ['editable'],
  });

  chrome.contextMenus.create({
    id: CONTEXT_MENU_IDS.countSelectedText,
    title: getTitleWithShortcut(t.calculateTextStatistics, openStatisticsPopoverShortcut),
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
    title: getTitleWithShortcut(t.setupAndPaste, openGenerationPopoverShortcut),
    contexts: ['editable'],
  });
};

export const updateContextMenu = async (): Promise<void> => {
  const { t, openGenerationPopoverShortcut, openStatisticsPopoverShortcut } = await getContextMenuData();

  await chrome.contextMenus.update(ROOT_MENU_ID, {
    title: getTitleWithShortcut(t.paste, openGenerationPopoverShortcut),
  });

  await chrome.contextMenus.update(CONTEXT_MENU_IDS.countSelectedText, {
    title: getTitleWithShortcut(t.calculateTextStatistics, openStatisticsPopoverShortcut),
  });

  for (const dataType of DATA_TYPES) {
    await chrome.contextMenus.update(getMenuItemId('quick', dataType), {
      title: t.items[dataType],
    });
  }

  await chrome.contextMenus.update(CONTEXT_MENU_IDS.insertData, {
    title: getTitleWithShortcut(t.setupAndPaste, openGenerationPopoverShortcut),
  });
};
