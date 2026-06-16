import { initCustomSelects } from 'src/shared/ui/custom-select/init-custom-selects';

import { POPOVER_CLASSNAME, POPOVER_IDS } from '../config/constants';
import { CreatePopoverParams } from '../model/types';
import { renderInsertContent } from './content/render-insert-content';
import popoverStyles from './style.css?inline';

const createHost = (params: CreatePopoverParams): HTMLDivElement => {
  const host = document.createElement('div');

  host.id = POPOVER_IDS.popover;
  host.dataset.cursorX = String(params.position.x);
  host.dataset.cursorY = String(params.position.y);

  return host;
};

const createStyle = (): HTMLStyleElement => {
  const style = document.createElement('style');

  style.textContent = popoverStyles;

  return style;
};

export const createPopover = (params: CreatePopoverParams): HTMLDivElement => {
  const { storage, interfaceLanguage } = params;

  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');

  popover.className = POPOVER_CLASSNAME;
  popover.dataset.theme = storage.theme;
  host.dataset.theme = storage.theme;

  popover.innerHTML = renderInsertContent(params);

  shadowRoot.append(createStyle(), popover);
  initCustomSelects(shadowRoot, interfaceLanguage);

  return host;
};
