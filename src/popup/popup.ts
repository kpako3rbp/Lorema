import { NAME_BY_LANGUAGE } from '../constants';
import { TRANSLATIONS } from '../i18n';
import { Language } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

const title = document.getElementById('popup-title');
const languageLabel = document.getElementById('interface-language-label');
const donateLink = document.getElementById('donate');

const languageSelect = document.getElementById('interface-language') as HTMLSelectElement | null;

const saveButton = document.getElementById('save') as HTMLButtonElement | null;

if (saveButton) saveButton.disabled = true;

const renderTexts = (interfaceLanguage: Language): void => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  if (title) title.textContent = t.title;
  if (languageLabel) languageLabel.textContent = t.interfaceLanguage;
  if (saveButton) saveButton.textContent = t.save;
  if (donateLink) donateLink.textContent = `☕ ${t.donate}`;

  document.documentElement.lang = interfaceLanguage;
};

const initPopup = async (): Promise<void> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');

  if (languageSelect) {
    languageSelect.value = interfaceLanguage;
    languageSelect.innerHTML = `
    ${Object.values(Language).map(
      (value) =>
        `
          <option value="${value}" ${interfaceLanguage === value ? 'selected' : ''}>
          ${NAME_BY_LANGUAGE[value]}
          </option>
        `,
    )}
    `;
  }

  renderTexts(interfaceLanguage);
};

initPopup();

languageSelect?.addEventListener('change', () => {
  renderTexts(languageSelect.value as Language);
  if (saveButton) saveButton.disabled = false;
});

saveButton?.addEventListener('click', async () => {
  if (!languageSelect) return;

  const interfaceLanguage = languageSelect.value as Language;

  await setStorageItem('interfaceLanguage', interfaceLanguage);
  await chrome.runtime.sendMessage({
    type: 'UPDATE_CONTEXT_MENU',
  });

  saveButton.textContent = `✅ ${TRANSLATIONS[interfaceLanguage].popup.saved}`;

  saveButton.disabled = true;

  setTimeout(() => {
    window.close();
  }, 600);
});
