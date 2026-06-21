import { APP_VERSION } from 'src/shared/config/version';
import { Language, Theme } from 'src/shared/model/types';

import { PopupView } from '../model/types';
import { renderSettingsContent } from './content/render-settings-content';
import { renderSupportContent } from './content/render-support-content';
import { renderFooter } from './footer/render-footer';
import { renderHeader } from './header/render-header';

type RenderPopupParams = {
  view: PopupView;
  interfaceLanguage: Language;
  theme: Theme;
};

export const createPopup = (params: RenderPopupParams): string => {
  const { interfaceLanguage, view, theme } = params;

  const mapViewToContent: Record<PopupView, () => string> = {
    settings: () => renderSettingsContent(interfaceLanguage, theme),
    support: () => renderSupportContent(interfaceLanguage),
  };

  return /* html */ `
    <div class="popup">
      ${renderHeader({ interfaceLanguage, version: APP_VERSION })}

      ${mapViewToContent[view]()}

      ${renderFooter(interfaceLanguage)}
    </div>
  `;
};
