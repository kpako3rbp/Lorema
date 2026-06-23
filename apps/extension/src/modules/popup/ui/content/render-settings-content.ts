import { INTERFACE_LANGUAGES, InterfaceLanguage, NAME_BY_LANGUAGE } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';
import { getNameByLanguage, ICON_BY_LANGUAGE, ICON_BY_THEME, THEMES } from 'src/shared/config/theme';
import { Theme } from 'src/shared/model/types';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { renderHeartIcon } from 'src/shared/ui/icons/heart';
import { renderInfoIcon } from 'src/shared/ui/icons/info';

import { POPUP_IDS } from '../../config/constants';

export const renderSettingsContent = (interfaceLanguage: InterfaceLanguage, theme: Theme): string => {
  const t = TRANSLATIONS[interfaceLanguage].popup.settings;
  const themeNames = getNameByLanguage(interfaceLanguage);

  return /* html */ `
    <hr>

    <div class="info">
      ${renderInfoIcon()}
      <p class="caption">${t.description}</p>
    </div>

    <hr>

    <div class="settings-block">
      <div class="select-group">
        ${renderCustomSelect({
          id: POPUP_IDS.interfaceLanguageSelect,
          label: t.interfaceLanguage,
          selectedValues: [interfaceLanguage],
          interfaceLanguage,
          options: INTERFACE_LANGUAGES.map((language) => ({
            value: language,
            label: NAME_BY_LANGUAGE[language],
            iconMarkup: ICON_BY_LANGUAGE[language],
          })),
        })}

        ${renderCustomSelect({
          id: POPUP_IDS.themeSelect,
          label: t.theme,
          selectedValues: [theme],
          interfaceLanguage,
          options: THEMES.map((thm) => ({
            value: thm,
            label: themeNames[thm],
            iconMarkup: ICON_BY_THEME[thm],
          })),
        })}
      </div>

      <button id="${POPUP_IDS.saveButton}" class="lorem-submit">
        ${t.save}
      </button>

      <button id="${POPUP_IDS.showSupportButton}" class="lorem-box donate-wrapper" type="button">
        <div class="text-wrapper">
          <div class="coffee">
            <img src="/icons/coffee4.svg" alt="coffee">
          </div>
          <p class="description">
            ${t.supportDeveloper}
          </p>
        </div>
        ${renderHeartIcon()}
      </button>
    </div>
  `;
};
