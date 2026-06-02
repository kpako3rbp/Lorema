import { TRANSLATIONS } from 'src/i18n';
import { Language, StorageSchema } from 'src/shared/model/types';

import { MAX_CHARS, POPOVER_IDS } from '../config/constants';

export const renderTextForm = (storage: StorageSchema, interfaceLanguage: Language) => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.textSettings;

  return /*html*/ `
    <div class="lorem-field">
      <div class="lorem-segmented">
        <label><input type="radio" name="lengthMode" value="lte" ${settings.lengthMode === 'lte' ? 'checked' : ''} />≤</label>
        <label><input type="radio" name="lengthMode" value="exact" ${settings.lengthMode === 'exact' ? 'checked' : ''} />=</label>
      </div>
    </div>
    
    <input
      class="lorem-input"
      id="${POPOVER_IDS.lengthInput}"
      type="number"
      min="1"
      max="${MAX_CHARS}"
      value="${settings.length}"
      placeholder="${t.length}"
    />

    <label class="lorem-checkbox"><input id="noTrimText" type="checkbox" ${settings.trimToWord ? '' : 'checked'} /><span>${t.trimToWord}</span></label>
    <label class="lorem-checkbox"><input id="withParagraphs" type="checkbox" ${settings.withParagraphs ? 'checked' : ''} ${settings.lengthMode === 'exact' ? 'disabled' : ''} /><span>${t.paragraphs}</span></label>
  `;
};
