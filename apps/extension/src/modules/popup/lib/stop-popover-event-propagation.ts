const POPOVER_EVENT_NAMES = [
  'pointerdown',
  'pointerup',
  'mousedown',
  'mouseup',
  'click',
  'dblclick',
  'contextmenu',

  'keydown',
  'keyup',
  'keypress',

  'beforeinput',
  'input',
  'change',
  'paste',
  'cut',
  'copy',

  'compositionstart',
  'compositionupdate',
  'compositionend',
] as const;

export const stopPopoverEventPropagation = (root: ShadowRoot): void => {
  POPOVER_EVENT_NAMES.forEach((eventName) => {
    root.addEventListener(eventName, (event) => {
      event.stopPropagation();
    });
  });
};
