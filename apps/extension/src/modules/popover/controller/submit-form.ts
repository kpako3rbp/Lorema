import { DATA_TAB_TO_TYPE, DataTab, DataType, InterfaceLanguage } from '@lorema/core';
import { generateData } from 'src/modules/data-generation';
import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { StorageSchema } from 'src/modules/storage';
import { setStorageItems } from 'src/modules/storage/api/extension-storage';

import { DATA_TAB_CONFIG } from '../config/data-tab-registry';
import { getActiveDataTab } from '../lib/get-active-data-type';
import { readDataSettingsFromForm } from '../lib/read-data-settings-from-form';
import { PopoverGenerationElements } from '../model/types';
import { closeActivePopover } from './close-popover';

const saveSettingsForDataType = async (storage: StorageSchema): Promise<void> => {
  const { theme, interfaceLanguage, ...generationSettings } = storage;

  await setStorageItems(generationSettings);
};

const validateFormByDataTab = (
  dataTab: DataTab,
  form: HTMLFormElement,
  interfaceLanguage: InterfaceLanguage,
): boolean => {
  return DATA_TAB_CONFIG[dataTab].validateForm?.(form, interfaceLanguage) ?? true;
};

const submitData = async (
  dataType: DataType,
  elements: PopoverGenerationElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const nextStorage = readDataSettingsFromForm(elements.form, elements.languageSelect, storage);

  if (!nextStorage) return;

  await saveSettingsForDataType(nextStorage);
  insertTextAtTarget(target.element, generateData(dataType, nextStorage), target.savedRange);
  closeActivePopover();
};

export const submitForm = (
  elements: PopoverGenerationElements,
  storage: StorageSchema,
  target: EditableTargetSnapshot,
): void => {
  const dataTab = getActiveDataTab(elements.form);

  const isValid = validateFormByDataTab(dataTab, elements.form, storage.interfaceLanguage);

  if (!isValid) return;

  const dataType = DATA_TAB_TO_TYPE[dataTab];

  void submitData(dataType, elements, storage, target);
};
