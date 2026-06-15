import { MAX_TEXT_CHARS } from 'src/generators/text/config/constants';
import { TRANSLATIONS } from 'src/i18n';
import { POPOVER_IDS } from 'src/popover/config/constants';
import { numberWithSpaces } from 'src/shared/lib/string';
import { Language, StorageSchema } from 'src/shared/model/types';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

export const renderTextForm = (storage: StorageSchema, interfaceLanguage: Language) => {
  const t = TRANSLATIONS[interfaceLanguage].popover;
  const settings = storage.textSettings;
  const isExactMode = settings.lengthMode === 'exact';

  return /*html*/ `
    <div class="lorem-form-wrapper">
      <span class="lorem-descriptor with-line">${t.textParams}</span>

      <div class="lorem-length-input-wrapper">
        <div class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.lengthMode}
            ${renderTooltip(t.lengthModeTooltip, 150)}
          </span>

          <div class="lorem-length-mode-wrapper">
            <label class="lorem-segment">
              <input
                type="radio"
                name="lengthMode"
                value="lte"
                ${settings.lengthMode === 'lte' ? 'checked' : ''}
              />
              <span>≤</span>
            </label>

            <label class="lorem-segment">
              <input
                type="radio"
                name="lengthMode"
                value="exact"
                ${settings.lengthMode === 'exact' ? 'checked' : ''}
              />
              <span>=</span>
            </label>            
          </div>
        </div>    
        
        <label class="lorem-form-el-with-label">
          <span class="lorem-label">
            ${t.length}
            ${renderTooltip(`${t.max} ${numberWithSpaces(MAX_TEXT_CHARS)}.\n${t.maxWarning}`, 200)}
          </span>
          <input
            class="lorem-input"
            id="${POPOVER_IDS.textLengthInput}"
            type="number"
            value="${settings.length}"
            placeholder="${t.length}"
          /> 
          <p id="${POPOVER_IDS.textLengthError}" class="lorem-error"></p>
        </label>
      </div>

      <div class="lorem-checkbox-group">
        <label class="lorem-checkbox">
          <input
            class="lorem-checkbox-input"
            id="${POPOVER_IDS.keepWholeSentencies}"
            type="checkbox"
            ${!isExactMode && settings.keepWholeSentencies ? 'checked' : ''}
            ${isExactMode ? 'disabled' : ''}
          />
          <span class="lorem-label">          
            ${t.keepWholeSentencies}
            ${renderTooltip(t.keepWholeSentenciesTooltip, 140)}
          </span>          
        </label>

        <label class="lorem-checkbox">
          <input
            class="lorem-checkbox-input"
            id="${POPOVER_IDS.paragraphsCheckbox}"
            type="checkbox"
            ${settings.withParagraphs ? 'checked' : ''}
            ${isExactMode ? 'disabled' : ''}
          />
          <span class="lorem-label">
            ${t.paragraphs}
            ${renderTooltip(t.paragraphsCheckboxTooltip, 130)}
          </span>          
        </label>
      </div>
    </div>
  `;
};
