import { type EditableTargetSnapshot, insertTextAtTarget } from 'src/entities/editable-target';
import { generateContent } from 'src/entities/generated-content';
import { ContentType } from 'src/entities/generated-content/model';
import { getStorageItems } from 'src/entities/generation-settings/lib/storage';

export const insertGeneratedContent = async (
  contentType: ContentType,
  target: EditableTargetSnapshot,
): Promise<void> => {
  const storage = await getStorageItems();

  insertTextAtTarget(target.element, generateContent(contentType, storage), target.savedRange);
};
