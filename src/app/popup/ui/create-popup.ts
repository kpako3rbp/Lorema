import { APP_VERSION } from 'src/shared/config/version';
import { Language, Theme } from 'src/shared/model/types';

import { PopupView } from '../model/types';
import { renderFooter } from './footer/render-footer';
import { renderHeader } from './header/render-header';
import { renderSettingsView } from './view/render-settings-view';
import { renderSupportView } from './view/render-support-view';

type RenderPopupParams = {
  view: PopupView;
  interfaceLanguage: Language;
  theme: Theme;
};

export const createPopup = (params: RenderPopupParams): string => {
  const { interfaceLanguage, view, theme } = params;

  const mapViewToContent: Record<PopupView, () => string> = {
    settings: () => renderSettingsView(interfaceLanguage, theme),
    support: () => renderSupportView(interfaceLanguage),
  };

  return /* html */ `
    <div class="popup">
      ${renderHeader({ interfaceLanguage, version: APP_VERSION })}

      ${mapViewToContent[view]()}

      ${renderFooter(interfaceLanguage)}
    </div>
  `;
};
