import { DataType } from '@lorema/core';

import { generateData } from '../data-generation';
import { EditableTargetSnapshot, insertTextAtTarget } from '../editable-target';
import { getStorageItems } from '../storage';

export const insertQuickData = async (dataType: DataType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateData(dataType, storage), target.savedRange);
};
