import { insertTextAtTarget } from 'src/entities/editable-target/insert-text-at-target';
import { EditableTargetSnapshot } from 'src/entities/editable-target/types';
import { generateContent, readContentSettings } from 'src/features/content-generation';
import { getContentSettingsKey } from 'src/features/content-generation/config/content';
import { setStorageItem } from 'src/features/content-generation/lib/storage';
import { ContentType, StorageSchema } from 'src/features/content-generation/model';
import { validatePhoneForm, validateTextForm } from 'src/features/content-insert-popover/model/validation';
import { Language } from 'src/shared/model/types';

import { getActiveContentType } from '../lib/get-active-content-type';
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
  const settingsKey = getContentSettingsKey(contentType);
  const nextStorage = {
    ...storage,
    generationLanguage: elements.languageSelect.value as Language,
    [settingsKey]: readContentSettings({
      contentType,
      form: elements.form,
      language: elements.languageSelect.value as Language,
    }),
  };

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
