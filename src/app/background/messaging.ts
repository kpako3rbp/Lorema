import { ExtensionMessage } from 'src/shared/model/types';

export const sendInsertMessage = async (tabId: number, message: ExtensionMessage): Promise<void> => {
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
