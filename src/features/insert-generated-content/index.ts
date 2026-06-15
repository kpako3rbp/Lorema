import { type EditableTargetSnapshot, insertTextAtTarget } from 'src/entities/editable-target';
import { generateContent } from 'src/features/content-generation';
import { getStorageItems } from 'src/features/content-generation/lib/storage';
import { ContentType } from 'src/features/content-generation/model';

export const insertGeneratedContent = async (
  contentType: ContentType,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};
