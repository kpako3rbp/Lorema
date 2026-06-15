import { EditableTargetSnapshot } from 'src/entities/editable-target';
import { ContentType } from 'src/entities/generated-content/model';
import { showPopover } from 'src/widgets/insert-popover';

export const openCustomInsertPopover = async (
  contentType: ContentType,
  target: EditableTargetSnapshot,
): Promise<void> => {
  await showPopover(contentType, target);
};
