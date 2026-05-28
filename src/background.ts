import { ExtensionMessage } from './types';

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

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'insert-russian-lorem',
    title: 'Вставить текст-рыбу',
    contexts: ['editable'],
  });

  chrome.storage.sync.set({
    charsCount: 200,
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'insert-russian-lorem' || !tab?.id) return;

  // const { charsCount } = await chrome.storage.sync.get(['charsCount']);

  // await chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['content.js'],
  // });

  // chrome.tabs.sendMessage(tab.id, {
  //   type: 'INSERT_LOREM',
  //   charsCount: Number(charsCount) || 200,
  // });
  await sendInsertMessage(tab.id);
});
