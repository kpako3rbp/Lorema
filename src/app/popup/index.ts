import { TRANSLATIONS } from 'src/i18n';
import { renderOptions } from 'src/popover/ui/render-options';
import { getNameByLanguage, THEMES } from 'src/shared/config/theme';
import { Language, Theme } from 'src/shared/model/types';
import { getStorageItem, setStorageItem } from 'src/shared/utils/storage';

import { LANGUAGES, NAME_BY_LANGUAGE } from './../../shared/config/language';

const CLOSE_DELAY = 600;

const title = document.getElementById('popup-title');
const languageLabel = document.getElementById('interface-language-label');
const donateLink = document.getElementById('donate');
const languageSelect = document.getElementById('interface-language') as HTMLSelectElement | null;
const themeSelect = document.getElementById('theme') as HTMLSelectElement | null;
const saveButton = document.getElementById('save') as HTMLButtonElement | null;

const renderTexts = (interfaceLanguage: Language): void => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  if (title) title.textContent = t.title;
  if (languageLabel) languageLabel.textContent = t.interfaceLanguage;
  if (saveButton) saveButton.textContent = t.save;
  if (donateLink) donateLink.textContent = `☕ ${t.donate}`;

  document.documentElement.lang = interfaceLanguage;
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
};

const renderLanguageSelect = (interfaceLanguage: Language): void => {
  if (!languageSelect) return;

  languageSelect.value = interfaceLanguage;
  languageSelect.innerHTML = renderOptions(LANGUAGES, interfaceLanguage, NAME_BY_LANGUAGE);
};

const renderThemeSelect = (theme: Theme, interfaceLanguage: Language): void => {
  if (!themeSelect) return;

  const names = getNameByLanguage(interfaceLanguage);

  themeSelect.value = theme;
  themeSelect.innerHTML = renderOptions(THEMES, theme, names);
};

const markSettingsChanged = (): void => {
  if (!languageSelect || !themeSelect || !saveButton) return;

  renderTexts(languageSelect.value as Language);
  applyTheme(themeSelect.value as Theme);
  saveButton.disabled = false;
};

const closePopupSoon = (): void => {
  setTimeout(() => {
    window.close();
  }, CLOSE_DELAY);
};

const saveSettings = async (): Promise<void> => {
  if (!languageSelect || !themeSelect || !saveButton) return;

  const interfaceLanguage = languageSelect.value as Language;
  const theme = themeSelect.value as Theme;

  await setStorageItem('interfaceLanguage', interfaceLanguage);
  await setStorageItem('theme', theme);
  await chrome.runtime.sendMessage({
    type: 'UPDATE_CONTEXT_MENU',
  });

  saveButton.textContent = TRANSLATIONS[interfaceLanguage].popup.saved;
  saveButton.disabled = true;

  closePopupSoon();
};

const initPopup = async (): Promise<void> => {
  if (saveButton) saveButton.disabled = true;

  const interfaceLanguage = await getStorageItem('interfaceLanguage');
  const theme = await getStorageItem('theme');

  renderLanguageSelect(interfaceLanguage);
  renderThemeSelect(theme, interfaceLanguage);
  renderTexts(interfaceLanguage);
  applyTheme(theme);
};

void initPopup();

languageSelect?.addEventListener('change', markSettingsChanged);
themeSelect?.addEventListener('change', markSettingsChanged);

saveButton?.addEventListener('click', () => {
  void saveSettings();
});
