import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderBugIcon } from 'src/shared/ui/icons/bug';
import { renderFeedbackIcon } from 'src/shared/ui/icons/feedback';
import { renderGithubIcon } from 'src/shared/ui/icons/github';

export const renderFooter = (interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  return /* html */ `
    <div class="footer">
      <a
        href="https://github.com/kpako3rbp/lorem-browser-extension"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderGithubIcon()}
        <p>${t.github}</p>
      </a>

      <a
        href="https://github.com/kpako3rbp/lorem-browser-extension/issues/new"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderBugIcon()}
        <p>${t.reportBug}</p>
      </a>

      <!-- <a
        href="https://chromewebstore.google.com"
        target="_blank"
        class="caption link-with-icon"
      >
        ${renderFeedbackIcon()}
        <p>${t.feedback}</p>
      </a> -->
    </div>
  `;
};
