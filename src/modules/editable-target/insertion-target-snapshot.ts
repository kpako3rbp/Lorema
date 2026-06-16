import { isTextInputElement } from 'src/shared/lib/query-element';

import { CursorPosition, EditableTargetSnapshot } from './model/types';

const DEFAULT_POSITION: CursorPosition = { x: 0, y: 0 };

const cloneCurrentSelectionRange = (): Range | null => {
  const selection = window.getSelection();

  return selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
};

export const getInsertionTargetSnapshot = (event: MouseEvent): EditableTargetSnapshot => {
  const position = {
    x: event.clientX,
    y: event.clientY,
  };

  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return {
      element: null,
      position,
      savedRange: null,
    };
  }

  if (isTextInputElement(target)) {
    return {
      element: target,
      position,
      savedRange: null,
    };
  }

  const editableElement = target.closest<HTMLElement>('[contenteditable]');

  return {
    element: editableElement?.isContentEditable ? editableElement : null,
    position,
    savedRange: editableElement?.isContentEditable ? cloneCurrentSelectionRange() : null,
  };
};

export const getActiveInsertionTargetSnapshot = (): EditableTargetSnapshot => {
  const activeElement = document.activeElement;

  if (activeElement && isTextInputElement(activeElement)) {
    const rect = activeElement.getBoundingClientRect();

    return {
      element: activeElement,
      savedRange: null,
      position: {
        x: rect.left,
        y: rect.bottom,
      },
    };
  }

  const editableElement =
    activeElement instanceof HTMLElement && activeElement.isContentEditable
      ? activeElement
      : activeElement instanceof HTMLElement
        ? activeElement.closest<HTMLElement>('[contenteditable]')
        : null;

  if (editableElement?.isContentEditable) {
    const rect = editableElement.getBoundingClientRect();
    const selection = window.getSelection();

    return {
      element: editableElement,
      savedRange: selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null,
      position: {
        x: rect.left,
        y: rect.bottom,
      },
    };
  }

  return createEmptyInsertionTargetSnapshot();
};

export const createEmptyInsertionTargetSnapshot = (): EditableTargetSnapshot => ({
  element: null,
  position: DEFAULT_POSITION,
  savedRange: null,
});
