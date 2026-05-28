// TODO в этом скрипте нельзя делать такие импорты, поэтому надо с этим что-то делать

// import { TRANSLATIONS } from '../i18n';
// import { Language } from '../types';
// import { getStorageItem, setStorageItem } from '../utils/storage';

// const title = document.getElementById('title');
// const interfaceLanguageLabel = document.getElementById('interfaceLanguageLabel');
// const languageLabel = document.getElementById('languageLabel');
// const donateLink = document.getElementById('donate');

// const interfaceLanguageSelect = document.getElementById('interfaceLanguage') as HTMLSelectElement | null;

// const languageSelect = document.getElementById('language') as HTMLSelectElement | null;

// const saveButton = document.getElementById('save') as HTMLButtonElement | null;

// const renderTexts = (interfaceLanguage: Language): void => {
//   const t = TRANSLATIONS[interfaceLanguage].popup;

//   if (title) title.textContent = t.title;
//   if (interfaceLanguageLabel) interfaceLanguageLabel.textContent = t.interfaceLanguage;
//   if (languageLabel) languageLabel.textContent = t.loremLanguage;
//   if (saveButton) saveButton.textContent = t.save;
//   if (donateLink) donateLink.textContent = `☕ ${t.donate}`;

//   document.documentElement.lang = interfaceLanguage;
// };

// const initPopup = async (): Promise<void> => {
//   const interfaceLanguage = await getStorageItem('interfaceLanguage');
//   const language = await getStorageItem('language');

//   if (interfaceLanguageSelect) {
//     interfaceLanguageSelect.value = interfaceLanguage;
//   }

//   if (languageSelect) {
//     languageSelect.value = language;
//   }

//   renderTexts(interfaceLanguage);
// };

// void initPopup();

// interfaceLanguageSelect?.addEventListener('change', () => {
//   renderTexts(interfaceLanguageSelect.value as Language);
// });

// saveButton?.addEventListener('click', async () => {
//   if (!interfaceLanguageSelect || !languageSelect) return;

//   const interfaceLanguage = interfaceLanguageSelect.value as Language;
//   const language = languageSelect.value as Language;

//   await setStorageItem('language', interfaceLanguage);
//   await setStorageItem('language', language);

//   alert(TRANSLATIONS[interfaceLanguage].popup.saved);
// });
