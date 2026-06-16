import { EditableTargetSnapshot, insertTextAtTarget } from 'src/modules/editable-target';
import { getStorageItems } from 'src/modules/storage';

import { generateContent } from '../content-generator';
import { ContentType } from '../content-type';

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};
