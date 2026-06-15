import { insertTextAtTarget } from 'src/app/content/insert-text-at-target';
import { EditableTargetSnapshot } from 'src/app/content/types';
import { generateContent } from 'src/generators';
import { validatePhoneForm, validateTextForm } from 'src/popover/model/validation';
import { getContentSettingsKey } from 'src/shared/config/content';
import { setStorageItem } from 'src/shared/lib/storage';
import { ContentType, Language, StorageSchema } from 'src/shared/model/types';

import { getActiveContentType } from '../lib/get-active-content-type';
import { readContentSettingsFromForm } from '../lib/read-content-settings-from-form';
import { PopoverElements } from '../model/types';
import { closeActivePopover } from './close-popover';

const saveSettingsForContentType = async (contentType: ContentType, storage: StorageSchema): Promise<void> => {
  const settingsKey = getContentSettingsKey(contentType);

  await setStorageItem('generationLanguage', storage.generationLanguage);
  await setStorageItem(settingsKey, storage[settingsKey]);
};

const validateFormByContentType = (
  contentType: ContentType,
  form: HTMLFormElement,
  interfaceLanguage: Language,
): boolean => {
  const validators: Partial<Record<ContentType, () => boolean>> = {
    text: () => validateTextForm(form, interfaceLanguage),
    phone: () => validatePhoneForm(form, interfaceLanguage),
  };

  return validators[contentType]?.() ?? true;
};

const submitContent = async (
  contentType: ContentType,
  elements: PopoverElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const nextStorage = readContentSettingsFromForm(contentType, elements.form, elements.languageSelect, storage);

  if (!nextStorage) return;

  await saveSettingsForContentType(contentType, nextStorage);
  insertTextAtTarget(target.element, generateContent(contentType, nextStorage), target.savedRange);
  closeActivePopover();
};

export const submitForm = (elements: PopoverElements, storage: StorageSchema, target: EditableTargetSnapshot): void => {
  const contentType = getActiveContentType(elements.form);
  const isValid = validateFormByContentType(contentType, elements.form, storage.interfaceLanguage);

  if (!isValid) return;

  void submitContent(contentType, elements, storage, target);
};
