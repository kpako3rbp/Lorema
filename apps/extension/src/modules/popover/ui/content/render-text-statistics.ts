import { Translation, TRANSLATIONS } from '@extension/i18n';
import { TextStatistics } from '@extension/modules/text-statistics/model/types';
import { numberWithSpaces } from '@extension/shared/lib/string';
import { renderCharacterIcon } from '@extension/shared/ui/icons/character';
import { renderCloseIcon } from '@extension/shared/ui/icons/close';
import { renderNoSpaceIcon } from '@extension/shared/ui/icons/no-space';
import { renderSentenceIcon } from '@extension/shared/ui/icons/sentence';
import { renderSpaceIcon } from '@extension/shared/ui/icons/space';
import { renderWordIcon } from '@extension/shared/ui/icons/word';
import { InterfaceLanguage } from '@lorema/core';

import { POPOVER_IDS } from '../../config/constants';

type RenderTextStatisticsParams = {
  statistics: TextStatistics;
  interfaceLanguage: InterfaceLanguage;
};

type TextStatisticsKey = keyof TextStatistics;
type TextStatisticsTranslation = Translation['popover']['textStatistics'];

type StatisticsItem = {
  key: TextStatisticsKey;
  icon: string;
  isGeneral?: boolean;
};

const MAIN_STATISTICS_ITEMS: StatisticsItem[] = [{ key: 'characters', icon: renderCharacterIcon(), isGeneral: true }];

const DETAIL_STATISTICS_ITEMS: StatisticsItem[] = [
  { key: 'charactersWithoutSpaces', icon: renderNoSpaceIcon() },
  { key: 'spaces', icon: renderSpaceIcon() },
  { key: 'words', icon: renderWordIcon() },
  { key: 'sentences', icon: renderSentenceIcon() },
];

const renderStatisticsItem = (
  item: StatisticsItem,
  statistics: TextStatistics,
  translation: TextStatisticsTranslation,
): string => {
  const { key, icon, isGeneral } = item;

  const containerClass = isGeneral ? 'lorem-statistics-box general' : 'lorem-statistics-box';

  return /*html*/ `
    <div class="${containerClass}">
      <div class="item">
        <div class="svg">${icon}</div>

        <div class="info">
          <span class="count">${numberWithSpaces(statistics[key])}</span>
          <span class="label">${translation[key]}</span>
        </div>
      </div>
    </div>
  `;
};

const renderItems = (
  items: StatisticsItem[],
  statistics: TextStatistics,
  translation: TextStatisticsTranslation,
): string => {
  return items.map((item) => renderStatisticsItem(item, statistics, translation)).join('');
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
        ${renderItems(MAIN_STATISTICS_ITEMS, statistics, t)}

        <div class="lorem-grid tc-2">
          ${renderItems(DETAIL_STATISTICS_ITEMS, statistics, t)}
        </div>
      </div>
    </div>
  `;
};
