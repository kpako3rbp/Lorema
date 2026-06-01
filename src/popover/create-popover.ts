import { NAME_BY_LANGUAGE } from '../constants';
import { TRANSLATIONS } from '../i18n';
import { AddressFormat, ContentType, Language, LinkPrefix, StorageSchema, TitleTopic } from '../types';
import { MAX_CHARS, POPOVER_CANCEL_BTN_ID, POPOVER_CLASSNAME, POPOVER_ID, POPOVER_INSERT_BTN_ID } from './constants';
import popoverStyles from './style.css?inline';
import { CreatePopoverParams } from './types';

const TITLE_LENGTH_PRESETS = [10, 20, 30, 50, 80, 120];
const TITLE_TOPICS: TitleTopic[] = [
  'random',
  'business',
  'it',
  'project',
  'task',
  'art',
  'education',
  'science',
  'travel',
  'finance',
  'marketing',
  'health',
];
const ADDRESS_FORMATS: AddressFormat[] = ['short', 'medium', 'full'];
const LINK_PREFIXES: LinkPrefix[] = ['https://', 'http://', 'www.'];
const LANGUAGES: Language[] = [Language.ru, Language.en];

const createHost = (params: CreatePopoverParams): HTMLDivElement => {
  const host = document.createElement('div');
  host.id = POPOVER_ID;
  host.dataset.cursorX = String(params.position.x);
  host.dataset.cursorY = String(params.position.y);
  return host;
};

const createStyle = (): HTMLStyleElement => {
  const style = document.createElement('style');
  style.textContent = popoverStyles;
  return style;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const renderOptions = <T extends string>(items: readonly T[], selected: T, labels: Record<T, string>): string =>
  items
    .map((item) => `<option value="${escapeHtml(item)}" ${item === selected ? 'selected' : ''}>${escapeHtml(labels[item])}</option>`)
    .join('');

const renderLanguageSelect = (selected: Language, label: string): string => `
  <label class="lorem-field lorem-field-inline">
    <span>${label}</span>
    <select id="language" class="lorem-select">
      ${renderOptions(LANGUAGES, selected, NAME_BY_LANGUAGE)}
    </select>
  </label>
`;

const renderNumberInput = (id: string, label: string, value: number, min = 1): string => `
  <label class="lorem-field">
    <span>${label}</span>
    <input id="${id}" class="lorem-input" type="number" min="${min}" max="${MAX_CHARS}" value="${value}" />
  </label>
`;

const renderTextInput = (id: string, label: string, value: string): string => `
  <label class="lorem-field">
    <span>${label}</span>
    <input id="${id}" class="lorem-input" type="text" value="${escapeHtml(value)}" />
  </label>
`;

const renderTextForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.textSettings;

  return `
    ${renderLanguageSelect(settings.language, t.generationLanguage)}
    <div class="lorem-field">
      <span>${t.lengthMode}</span>
      <div class="lorem-segmented">
        <label><input type="radio" name="lengthMode" value="lte" ${settings.lengthMode === 'lte' ? 'checked' : ''} />≤</label>
        <label><input type="radio" name="lengthMode" value="exact" ${settings.lengthMode === 'exact' ? 'checked' : ''} />=</label>
      </div>
    </div>
    ${renderNumberInput('length', t.length, settings.length)}
    <label class="lorem-checkbox"><input id="noTrimText" type="checkbox" ${settings.trimToWord ? '' : 'checked'} /><span>${t.trimToWord}</span></label>
    <label class="lorem-checkbox"><input id="withParagraphs" type="checkbox" ${settings.withParagraphs ? 'checked' : ''} ${settings.lengthMode === 'exact' ? 'disabled' : ''} /><span>${t.paragraphs}</span></label>
  `;
};

const renderTitleForm = (storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.titleSettings;
  const presetLabels = Object.fromEntries(TITLE_LENGTH_PRESETS.map((value) => [String(value), `${interfaceLanguage === Language.ru ? 'до' : 'up to'} ${value}`])) as Record<string, string>;

  return `
    ${renderLanguageSelect(settings.language, t.generationLanguage)}
    <label class="lorem-field"><span>${t.titleLength}</span><select id="maxLength" class="lorem-select">${renderOptions(TITLE_LENGTH_PRESETS.map(String), String(settings.maxLength), presetLabels)}</select></label>
    <label class="lorem-field"><span>${t.titleTopic}</span><select id="topic" class="lorem-select">${renderOptions(TITLE_TOPICS, settings.topic, t.titleTopics)}</select></label>
  `;
};

const renderForm = (contentType: ContentType, storage: StorageSchema, interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popover;

  switch (contentType) {
    case 'text':
      return renderTextForm(storage, interfaceLanguage);
    case 'title':
      return renderTitleForm(storage, interfaceLanguage);
    case 'email':
      return renderNumberInput('loginMaxLength', t.maxLoginLength, storage.emailSettings.loginMaxLength);
    case 'link':
      return `<label class="lorem-field"><span>${t.prefix}</span><select id="prefix" class="lorem-select">${renderOptions(LINK_PREFIXES, storage.linkSettings.prefix, t.linkPrefixes)}</select></label>${renderNumberInput('maxLength', t.maxLinkLength, storage.linkSettings.maxLength)}`;
    case 'phone':
      return `${renderTextInput('countryCode', t.countryCode, storage.phoneSettings.countryCode)}${renderNumberInput('digitsCount', t.digitsCount, storage.phoneSettings.digitsCount)}`;
    case 'address':
      return `${renderLanguageSelect(storage.addressSettings.language, t.generationLanguage)}<label class="lorem-field"><span>${t.addressFormat}</span><select id="format" class="lorem-select">${renderOptions(ADDRESS_FORMATS, storage.addressSettings.format, t.addressFormats)}</select></label>`;
    case 'firstName':
      return renderLanguageSelect(storage.firstNameSettings.language, t.generationLanguage);
    case 'lastName':
      return renderLanguageSelect(storage.lastNameSettings.language, t.generationLanguage);
  }
};

export const createPopover = (params: CreatePopoverParams): HTMLDivElement => {
  const t = TRANSLATIONS[params.interfaceLanguage].popover;
  const host = createHost(params);
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const popover = document.createElement('div');
  popover.className = POPOVER_CLASSNAME;

  popover.innerHTML = `
    <div class="lorem-header">
      <p class="lorem-title">${t.contentTitles[params.contentType]}</p>
    </div>
    <form id="popover-form" class="lorem-form">
      ${renderForm(params.contentType, params.storage, params.interfaceLanguage)}
      <p class="lorem-hint">${t.saveHint}</p>
      <div class="lorem-actions">
        <button id="${POPOVER_INSERT_BTN_ID}" type="submit" class="lorem-insert">${t.insert}</button>
        <button id="${POPOVER_CANCEL_BTN_ID}" type="button" class="lorem-cancel">${t.cancel}</button>
      </div>
    </form>
  `;

  shadowRoot.append(createStyle(), popover);
  return host;
};

export const removePopover = (): void => {
  document.getElementById(POPOVER_ID)?.remove();
};
