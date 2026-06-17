import { Translation, TRANSLATIONS } from 'src/i18n';
import { TextStatistics } from 'src/modules/text-statistics/model/types';
import { numberWithSpaces } from 'src/shared/lib/string';
import { Language } from 'src/shared/model/types';
import { renderCharacterIcon } from 'src/shared/ui/icons/character';
import { renderCloseIcon } from 'src/shared/ui/icons/close';
import { renderNoSpaceIcon } from 'src/shared/ui/icons/no-space';
import { renderSentenceIcon } from 'src/shared/ui/icons/sentence';
import { renderSpaceIcon } from 'src/shared/ui/icons/space';
import { renderWordIcon } from 'src/shared/ui/icons/word';

import { POPOVER_IDS } from '../../config/constants';

type RenderTextStatisticsParams = {
  statistics: TextStatistics;
  interfaceLanguage: Language;
};

const MAP_TYPE_TO_ICON: Record<keyof TextStatistics, string> = {
  spaces: renderSpaceIcon(),
  charactersWithoutSpaces: renderNoSpaceIcon(),
  words: renderWordIcon(),
  sentences: renderSentenceIcon(),
  characters: renderCharacterIcon(),
  // paragraphs: renderParagraphIcon(),
};

const renderItems = (statistics: Partial<TextStatistics>, translation: Translation['popover']['textStatistics']) => {
  return Object.entries(statistics)
    .map(([key, value]) => {
      const currentKey = key as unknown as keyof TextStatistics;

      const containerClass = `lorem-statistics-box ${currentKey === 'characters' ? 'general' : ''}`;

      return /*html*/ `
      <div class="${containerClass}">
        <div class="item">
          <div class="svg">${MAP_TYPE_TO_ICON[currentKey]}</div>
          <div class="info">
            <span class="count">${numberWithSpaces(value)}</span>
            <span class="label">${translation[currentKey]}</span>
          </div>
        </div>
      </div>
    `;
    })
    .filter(Boolean)
    .join('');
};

export const renderTextStatistics = (params: RenderTextStatisticsParams): string => {
  const { statistics, interfaceLanguage } = params;
  const t = TRANSLATIONS[interfaceLanguage].popover.textStatistics;

  return /*html*/ `
    <div class="lorem-statistics-wrapper">
      <div class="lorem-header">
        <p class="lorem-title">
          ${t.title}
        </p>

        <button class="lorem-cancel close-button" id="${POPOVER_IDS.cancelButton}">
          ${renderCloseIcon()}
        </button>
      </div>  

      <div class="lorem-grid">
        ${renderItems(
          {
            characters: statistics.characters,
          },
          t,
        )}
        
        <div class="lorem-grid tc-2">
          ${renderItems(
            {
              charactersWithoutSpaces: statistics.charactersWithoutSpaces,
              spaces: statistics.spaces,
              words: statistics.words,
              sentences: statistics.sentences,
            },
            t,
          )}
        </div> 
      </div>
    </div>
  `;
};
