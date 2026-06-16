import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { getStorageItems } from 'src/modules/storage';

import { generateData } from '../data-generator';
import { DataType } from '../data-type';

export const insertQuickData = async (dataType: DataType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateData(dataType, storage), target.savedRange);
};
