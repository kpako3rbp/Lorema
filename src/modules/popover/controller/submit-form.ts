import { generateContent } from 'src/modules/content-generator';
import { ContentType } from 'src/modules/content-type';
import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { validatePhoneForm, validateTextForm } from 'src/modules/popover/model/validation';
import { setStorageItem, StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';

import { getActiveContentType } from '../lib/get-active-content-type';
import { readContentSettingsFromForm } from '../lib/read-content-settings-from-form';
import { PopoverElements } from '../model/types';
import { closeActivePopover } from './close-popover';

const saveSettingsForContentType = async (contentType: ContentType, storage: StorageSchema): Promise<void> => {
  await setStorageItem('generationLanguage', storage.generationLanguage);
  await setStorageItem(`${contentType}Settings`, storage[`${contentType}Settings`]);
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
