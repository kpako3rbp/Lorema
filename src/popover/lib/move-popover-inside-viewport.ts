import { POPOVER_CLASSNAME, POPOVER_OFFSET } from '../config/constants';

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};

export const movePopoverInsideViewport = (host: HTMLElement): void => {
  const popover = host.shadowRoot?.querySelector<HTMLElement>(`.${POPOVER_CLASSNAME}`);

  if (!popover) return;

  const rect = popover.getBoundingClientRect();

  const cursorX = Number(host.dataset.cursorX);
  const cursorY = Number(host.dataset.cursorY);

  const maxLeft = window.innerWidth - rect.width - POPOVER_OFFSET;
  const maxTop = window.innerHeight - rect.height - POPOVER_OFFSET;

  const left = clamp(cursorX + POPOVER_OFFSET, POPOVER_OFFSET, maxLeft);
  const top = clamp(cursorY + POPOVER_OFFSET, POPOVER_OFFSET, maxTop);

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
};
