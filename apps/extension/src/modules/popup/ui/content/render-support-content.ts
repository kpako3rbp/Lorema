import { TRANSLATIONS } from 'src/i18n';
import { Language } from 'src/shared/model/types';
import { renderCopyElement } from 'src/shared/ui/copy-element/render-copy-element';
import { renderArrowUpRightIcon } from 'src/shared/ui/icons/arrow-up-right';
import { renderCheckIcon } from 'src/shared/ui/icons/check';
import { renderCopyIcon } from 'src/shared/ui/icons/copy';
import { renderTooltip } from 'src/shared/ui/tooltip/render-tooltip';

import { POPUP_IDS } from '../../config/constants';

const WALLET_EDGE_CHARS_COUNT = 6;

const formatWalletAddress = (wallet: string): string =>
  wallet.slice(0, WALLET_EDGE_CHARS_COUNT) + '...' + wallet.slice(-WALLET_EDGE_CHARS_COUNT);

const PAYMENT_LINK = 'https://pay.cloudtips.ru/p/4a128030';
const USDT_WALLET = 'UQD3U8hKAGcno2HKplsKwD6puiQiWAEY_0julucR2gEpDuuR';
const TON_WALLET = 'TXd8CXGpDBjnEAgp3acZXjCrHkPPQUXtqR';

export const renderSupportContent = (interfaceLanguage: Language): string => {
  const t = TRANSLATIONS[interfaceLanguage].popup.support;

  return /* html */ `
    <div class="support-block">
      <div class="back-wrapper">
        <button id="${POPUP_IDS.backButton}" class="back" type="button">
          ${t.back}
        </button>
        <hr>
      </div>

      <div>
        <p class="description">${t.thanks}</p>
        <p class="description">${t.description}</p>
      </div>

      <div>
        <span class="lorem-label">${t.rubles}</span>

        <a class="lorem-box" href="${PAYMENT_LINK}" target="_blank">
          <div class="text-wrapper">
            <img src="/icons/spb.svg" alt="card">
            <p class="description">${t.sbp}</p>
          </div>
          ${renderArrowUpRightIcon()}
        </a>
      </div>

      <div>
        <span class="lorem-label">${t.crypto}</span>
        ${renderCopyElement({
          value: USDT_WALLET,
          className: 'lorem-box',
          content: /*html*/ `
            <div class="text-wrapper">
              <img src="/icons/tether.svg" alt="tether">
              <p class="description">USDT (TRC20)</p>
              <p class="caption crypto-wallet">${formatWalletAddress(USDT_WALLET)}</p>
            </div>

            <div class="copy-button">
              ${renderTooltip(t.copy, 80, renderCopyIcon())}
            </div>
          `,
          successContent: /*html*/ `
            <div class="text-wrapper">
              <img src="/icons/tether.svg" alt="tether">
              <p class="description">USDT (TRC20)</p>
              <p class="caption crypto-wallet success">${t.copied}</p>
            </div>

            <div class="copy-button success">
              ${renderTooltip(t.copy, 80, renderCheckIcon())}
            </div>
          `,
        })}

        ${renderCopyElement({
          value: TON_WALLET,
          className: 'lorem-box',
          content: /*html*/ `
            <div class="text-wrapper">
              <img src="/icons/ton.svg" alt="ton">
              <p class="caption">TON</p>
              <p class="caption crypto-wallet">${formatWalletAddress(TON_WALLET)}</p>
            </div>

            <div class="copy-button">
              ${renderTooltip(t.copy, 'fit-content', renderCopyIcon())}
            </div>
          `,
          successContent: /*html*/ `
            <div class="text-wrapper">
              <img src="/icons/ton.svg" alt="ton">
              <p class="caption">TON</p>
              <p class="caption crypto-wallet success">${t.copied}</p>
            </div>

            <div class="copy-button success">
              ${renderTooltip(t.copy, 'fit-content', renderCheckIcon())}
            </div>
          `,
        })}
      </div>
    </div>
  `;
};
