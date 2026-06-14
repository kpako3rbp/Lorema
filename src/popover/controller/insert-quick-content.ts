import { insertTextAtTarget } from 'src/app/content/insert-text-at-target';
import { EditableTargetSnapshot } from 'src/app/content/types';
import { generateContent } from 'src/generators';
import { getStorageItems } from 'src/shared/lib/storage';
import { ContentType } from 'src/shared/model/types';

export const insertQuickContent = async (contentType: ContentType, target: EditableTargetSnapshot): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};
