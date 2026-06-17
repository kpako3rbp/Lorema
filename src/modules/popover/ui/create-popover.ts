import { POPOVER_CLASSNAME, POPOVER_IDS } from '../config/constants';
import { CreatePopoverParams } from '../model/types';
import popoverStyles from './style.css?inline';

const createHost = (params: CreatePopoverParams): HTMLDivElement => {
  const host = document.createElement('div');

  host.id = POPOVER_IDS.popover;
  host.dataset.cursorX = String(params.position.x);
  host.dataset.cursorY = String(params.position.y);
  host.dataset.theme = params.theme;

  return host;
};

const createStyle = (): HTMLStyleElement => {
  const style = document.createElement('style');

  style.textContent = popoverStyles;

  return style;
};

export const createPopover = (params: CreatePopoverParams): HTMLDivElement => {
  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');

  popover.className = POPOVER_CLASSNAME; // TODO добавлять класс в самом рендере попопвера?
  popover.dataset.theme = params.theme;
  popover.innerHTML = params.content;

  shadowRoot.append(createStyle(), popover);

  return host;
};
