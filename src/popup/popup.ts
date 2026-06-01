import { TRANSLATIONS } from '../i18n';
import { renderLanguageOptions } from '../popover';
import { Language } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

const title = document.getElementById('popup-title');
const languageLabel = document.getElementById('interface-language-label');
const instruction = document.getElementById('instruction');
const donateLink = document.getElementById('donate');
const languageSelect = document.getElementById('interface-language') as HTMLSelectElement | null;

const renderTexts = (interfaceLanguage: Language): void => {
  const t = TRANSLATIONS[interfaceLanguage].popup;

  if (title) title.textContent = t.title;
  if (languageLabel) languageLabel.textContent = t.interfaceLanguage;
  if (instruction) instruction.textContent = t.instruction;
  if (donateLink) donateLink.textContent = `☕ ${t.donate}`;

  document.documentElement.lang = interfaceLanguage;
};

const renderLanguageSelect = (interfaceLanguage: Language): void => {
  if (!languageSelect) return;

  languageSelect.value = interfaceLanguage;
  languageSelect.innerHTML = renderLanguageOptions(interfaceLanguage);
};

const saveInterfaceLanguage = async (interfaceLanguage: Language): Promise<void> => {
  await setStorageItem('interfaceLanguage', interfaceLanguage);
  await chrome.runtime.sendMessage({ type: 'UPDATE_CONTEXT_MENU' });
};

const initPopup = async (): Promise<void> => {
  const interfaceLanguage = await getStorageItem('interfaceLanguage');

  renderLanguageSelect(interfaceLanguage);
  renderTexts(interfaceLanguage);
};

void initPopup();

languageSelect?.addEventListener('change', () => {
  const interfaceLanguage = languageSelect.value as Language;
  renderTexts(interfaceLanguage);
  void saveInterfaceLanguage(interfaceLanguage);
});
