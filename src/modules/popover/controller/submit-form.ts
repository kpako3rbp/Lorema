import { generateData } from 'src/modules/data-generation';
import { DataType } from 'src/modules/data-type';
import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { validatePhoneForm, validateTextForm } from 'src/modules/popover/model/validation';
import { setStorageItem, StorageSchema } from 'src/modules/storage';
import { Language } from 'src/shared/model/types';

import { getActiveDataType } from '../lib/get-active-data-type';
import { readDataSettingsFromForm } from '../lib/read-data-settings-from-form';
import { PopoverGenerationElements } from '../model/types';
import { closeActivePopover } from './close-popover';

const saveSettingsForDataType = async (dataType: DataType, storage: StorageSchema): Promise<void> => {
  await setStorageItem('generationLanguage', storage.generationLanguage);
  await setStorageItem(`${dataType}Settings`, storage[`${dataType}Settings`]);
};

const validateFormByDataType = (dataType: DataType, form: HTMLFormElement, interfaceLanguage: Language): boolean => {
  const validators: Partial<Record<DataType, () => boolean>> = {
    text: () => validateTextForm(form, interfaceLanguage),
    phone: () => validatePhoneForm(form, interfaceLanguage),
  };

  return validators[dataType]?.() ?? true;
};

const submitData = async (
  dataType: DataType,
  elements: PopoverGenerationElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const nextStorage = readDataSettingsFromForm(dataType, elements.form, elements.languageSelect, storage);

  if (!nextStorage) return;

  await saveSettingsForDataType(dataType, nextStorage);
  insertTextAtTarget(target.element, generateData(dataType, nextStorage), target.savedRange);
  closeActivePopover();
};

export const submitForm = (
  elements: PopoverGenerationElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): void => {
  const dataType = getActiveDataType(elements.form);
  const isValid = validateFormByDataType(dataType, elements.form, storage.interfaceLanguage);

  if (!isValid) return;

  void submitData(dataType, elements, storage, target);
};
