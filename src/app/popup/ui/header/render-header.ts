import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderLogo } from 'src/shared/ui/icons/logo';

type RenderHeaderParams = {
  interfaceLanguage: Language;
  version: string;
};

export const renderHeader = (params: RenderHeaderParams): string => {
  const { version, interfaceLanguage } = params;

  const t = TRANSLATIONS[interfaceLanguage].popup;

  return /* html */ `
    <div class="header">
      <div class="logo-wrapper">
        <div class="logo">
          ${renderLogo()}
        </div>

        <div class="name-wrapper">
          <p class="name">Lorema</p>
          <p class="descriptor">${t.descriptor}</p>
        </div>
      </div>

      <p class="version">v ${version}</p>
    </div>
  `;
};
