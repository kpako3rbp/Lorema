import { ExtensionMessage } from '../messages';

type InsertMessage = Extract<ExtensionMessage, { type: 'INSERT_DATA_FROM_CONTEXT_MENU' | 'INSERT_DATA_FROM_HOTKEY' }>;

const getContentScriptFile = (): string | null => {
  const manifest = chrome.runtime.getManifest();
  const contentScript = manifest.content_scripts?.[0];

  return contentScript?.js?.[0] ?? null;
};

export const sendInsertMessage = async (tabId: number, message: InsertMessage): Promise<void> => {
  try {
    await chrome.tabs.sendMessage(tabId, message);

    return;
  } catch {
    const contentScriptFile = getContentScriptFile();

    if (!contentScriptFile) {
      console.warn('Content script file was not found in manifest');

      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: [contentScriptFile],
      });

      await chrome.tabs.sendMessage(tabId, message);
    } catch (error) {
      console.warn('Failed to inject content script and send insert message', error);
    }
  }
};
