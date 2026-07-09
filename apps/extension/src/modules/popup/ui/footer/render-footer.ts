import { TRANSLATIONS } from '@extension/i18n';
import { renderBugIcon } from '@extension/shared/ui/icons/bug';
import { renderFeedbackIcon } from '@extension/shared/ui/icons/feedback';
import { renderGithubIcon } from '@extension/shared/ui/icons/github';
import { EXTENSION_LINK, GITHUB_LINK, InterfaceLanguage, ISSUE_LINK } from '@lorema/core';

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
        href="${EXTENSION_LINK}"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderFeedbackIcon()}
        <p>${t.feedback}</p>
      </a>
    </div>
  `;
};
