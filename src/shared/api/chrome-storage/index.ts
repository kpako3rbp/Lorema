export const getChromeStorageItems = async <Schema extends Record<string, unknown>, Key extends keyof Schema>(
  keys: Key[],
): Promise<Partial<Schema>> => {
  return (await chrome.storage.sync.get(keys as string[])) as Partial<Schema>;
};

export const setChromeStorageItems = async <Schema extends Record<string, unknown>>(
  values: Partial<Schema>,
): Promise<void> => {
  await chrome.storage.sync.set(values);
};
