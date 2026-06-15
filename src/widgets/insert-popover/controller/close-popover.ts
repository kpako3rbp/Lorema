import { POPOVER_IDS } from 'src/widgets/insert-popover/config/constants';

export const closeActivePopover = (): void => {
  document.getElementById(POPOVER_IDS.popover)?.remove();
  document.removeEventListener('mousedown', closePopoverOnOutsideClick, true);
};

export function closePopoverOnOutsideClick(event: MouseEvent): void {
  const host = document.getElementById(POPOVER_IDS.popover);

  if (!host) return;

  const target = event.target;

  if (!(target instanceof Node)) return;
  if (host.contains(target)) return;

  closeActivePopover();
}
