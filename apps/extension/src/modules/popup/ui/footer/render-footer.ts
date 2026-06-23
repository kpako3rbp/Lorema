import { InterfaceLanguage } from '@lorema/core';
import { TRANSLATIONS } from 'src/i18n';
import { renderBugIcon } from 'src/shared/ui/icons/bug';
import { renderFeedbackIcon } from 'src/shared/ui/icons/feedback';
import { renderGithubIcon } from 'src/shared/ui/icons/github';

const GITHUB_LINK = 'https://github.com/kpako3rbp/lorem-browser-extension';
const ISSUE_LINK = 'https://github.com/kpako3rbp/lorem-browser-extension/issues/new';
const FEEDBACK_LINK =
  'https://chromewebstore.google.com/detail/lorema/dognadbjkfmnogefijfmcajhihpjefnj?hl=ru&authuser=0';

export const renderFooter = (interfaceLanguage: InterfaceLanguage): string => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  return /* html */ `
    <div class="footer">
      <a
        href="${GITHUB_LINK}"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderGithubIcon()}
        <p>${t.github}</p>
      </a>

      <a
        href="${ISSUE_LINK}"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderBugIcon()}
        <p>${t.reportBug}</p>
      </a>

      <a
        href="${FEEDBACK_LINK}"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderFeedbackIcon()}
        <p>${t.feedback}</p>
      </a>
    </div>
  `;
};
