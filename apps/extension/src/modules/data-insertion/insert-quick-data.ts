import { DataType } from '@lorema/core';
import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { getStorageItems } from 'src/modules/storage';

import { generateData } from '../data-generation';

export const insertQuickData = async (dataType: DataType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateData(dataType, storage), target.savedRange);
};
