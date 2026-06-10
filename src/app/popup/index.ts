import { TRANSLATIONS } from 'src/i18n';
import { LANGUAGES, NAME_BY_LANGUAGE } from 'src/shared/config/language';
import { getNameByLanguage, THEMES } from 'src/shared/config/theme';
import { Language, Theme } from 'src/shared/model/types';
import { initCustomSelects } from 'src/shared/ui/custom-select/init-custom-selects';
import { renderCustomSelect } from 'src/shared/ui/custom-select/render-custom-select';
import { getStorageItem, setStorageItem } from 'src/shared/utils/storage';

const CLOSE_DELAY = 600;

const title = document.getElementById('popup-title');
const languageSelectContainer = document.getElementById('interface-language-field');
const themeSelectContainer = document.getElementById('theme-field');

const saveButton = document.getElementById('save') as HTMLButtonElement | null;
const donateLink = document.getElementById('donate');

const renderTexts = (interfaceLanguage: Language): void => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  if (title) title.textContent = t.title;
  if (saveButton) saveButton.textContent = t.save;
  if (donateLink) donateLink.textContent = `☕ ${t.donate}`;

  document.documentElement.lang = interfaceLanguage;
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
};

const renderLanguageSelect = (interfaceLanguage: Language): void => {
  if (!languageSelectContainer) return;

  const t = TRANSLATIONS[interfaceLanguage].popup;

  languageSelectContainer.innerHTML = renderCustomSelect({
    id: 'interface-language',
    label: t.interfaceLanguage,
    selectedValues: [interfaceLanguage],
    interfaceLanguage: interfaceLanguage,
    options: LANGUAGES.map((language) => ({
      value: language,
      label: NAME_BY_LANGUAGE[language],
    })),
  });

  initCustomSelects(languageSelectContainer, interfaceLanguage);
};

const getLanguageSelect = (): HTMLSelectElement | null => {
  return document.getElementById('interface-language') as HTMLSelectElement | null;
};

const renderThemeSelect = (theme: Theme, interfaceLanguage: Language): void => {
  if (!themeSelectContainer) return;

  const t = TRANSLATIONS[interfaceLanguage].popup;

  const names = getNameByLanguage(interfaceLanguage);

  themeSelectContainer.innerHTML = renderCustomSelect({
    id: 'theme',
    label: t.theme,
    selectedValues: [theme],
    interfaceLanguage: interfaceLanguage,
    options: THEMES.map((th) => ({
      value: th,
      label: names[th],
    })),
  });

  initCustomSelects(themeSelectContainer, interfaceLanguage);
};

const getThemeSelect = (): HTMLSelectElement | null => {
  return document.getElementById('theme') as HTMLSelectElement | null;
};

const previewSettingsChanges = (): void => {
  const languageSelect = getLanguageSelect();
  const themeSelect = getThemeSelect();

  if (!languageSelect || !themeSelect || !saveButton) return;

  const interfaceLanguage = languageSelect.value as Language;
  const theme = themeSelect.value as Theme;

  renderTexts(interfaceLanguage);
  renderLanguageSelect(interfaceLanguage);
  renderThemeSelect(theme, interfaceLanguage);
  applyTheme(theme);

  saveButton.disabled = false;
};

const closePopupSoon = (): void => {
  setTimeout(() => {
    window.close();
  }, CLOSE_DELAY);
};

const saveSettings = async (): Promise<void> => {
  const languageSelect = getLanguageSelect();
  const themeSelect = getThemeSelect();

  if (!languageSelect || !themeSelect || !saveButton) return;

  const interfaceLanguage = languageSelect.value as Language;
  const theme = themeSelect.value as Theme;

  await setStorageItem('interfaceLanguage', interfaceLanguage);
  await setStorageItem('generationLanguage', interfaceLanguage);
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

languageSelectContainer?.addEventListener('change', previewSettingsChanges);
themeSelectContainer?.addEventListener('change', previewSettingsChanges);

saveButton?.addEventListener('click', () => {
  void saveSettings();
});
