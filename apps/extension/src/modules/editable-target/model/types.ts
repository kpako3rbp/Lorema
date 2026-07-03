import { TextInputElement } from '@extension/shared/lib/query-element';
import { CursorPosition } from '@extension/shared/model/types';

export type EditableTarget = TextInputElement | HTMLElement;

export type EditableTargetSnapshot = {
  element: EditableTarget | null;
  position: CursorPosition;
  savedRange: Range | null;
};
