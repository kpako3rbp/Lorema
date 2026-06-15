import { TRANSLATIONS } from 'src/i18n';
import { CONTENT_TYPES } from 'src/shared/config/content';
import { ContentType, Language } from 'src/shared/model/types';
import { renderAddressIcon } from 'src/shared/ui/icons/address';
import { renderEmailIcon } from 'src/shared/ui/icons/email';
import { renderFirstNameIcon } from 'src/shared/ui/icons/first-name';
import { renderLastNameIcon } from 'src/shared/ui/icons/last-name';
import { renderLinkIcon } from 'src/shared/ui/icons/link';
import { renderPhoneIcon } from 'src/shared/ui/icons/phone';
import { renderTextIcon } from 'src/shared/ui/icons/text';
import { renderTitleIcon } from 'src/shared/ui/icons/title';

const mapTypeToIcon: Record<ContentType, string> = {
  text: renderTextIcon(),
  title: renderTitleIcon(),
  email: renderEmailIcon(),
  link: renderLinkIcon(),
  phone: renderPhoneIcon(),
  address: renderAddressIcon(),
  firstName: renderFirstNameIcon(),
  lastName: renderLastNameIcon(),
};

export const renderTabs = (activeContentType: ContentType, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;

  return /*html*/ `
    <div class="lorem-tabs">
      ${CONTENT_TYPES.map(
        (contentType) => /*html*/ `
          <label class="lorem-tab">
            <input
              type="radio"
              name="contentType"
              value="${contentType}"
              ${activeContentType === contentType ? 'checked' : ''}
            />
            <span>
              ${mapTypeToIcon[contentType]}
              ${t.contentTitles[contentType]}
            </span>
          </label>
        `,
      ).join('')}
    </div>
  `;
};
