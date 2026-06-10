import { TextInputElement } from 'src/shared/utils/query-element';

export type EditableTarget = TextInputElement | HTMLElement;

export type CursorPosition = {
  x: number;
  y: number;
};

export type EditableTargetSnapshot = {
  element: EditableTarget | null;
  position: CursorPosition;
  savedRange: Range | null;
};
