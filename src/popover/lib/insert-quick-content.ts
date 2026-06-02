import { insertTextAtTarget } from 'src/app/content/insert-text-at-target';
import { EditableTargetSnapshot } from 'src/app/content/types';
import { generateContent } from 'src/generators';
import { ContentType } from 'src/shared/model/types';
import { getStorageItems } from 'src/shared/utils/storage';

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};
