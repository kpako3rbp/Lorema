import { TextInputElement } from 'src/shared/lib/query-element';
import { CursorPosition } from 'src/shared/model/types';

export type EditableTarget = TextInputElement | HTMLElement;

export type EditableTargetSnapshot = {
  element: EditableTarget | null;
  position: CursorPosition;
  savedRange: Range | null;
};
