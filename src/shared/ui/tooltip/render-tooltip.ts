export const renderTooltip = (text: string, width: number | 'fit-content' = 140, trigger?: string): string => {
  return /* html */ `
    <span class="lorem-tooltip-wrapper">
      ${
        trigger
          ? /* html */ `
            ${trigger}
          `
          : /* html */ `
            <span
              class="lorem-tooltip-trigger"
              aria-label="${text}"
              tabindex="0"
            >
              i
            </span>
          `
      }

      <span
        class="lorem-tooltip"
        role="tooltip"
        style="--tooltip-width: ${width === 'fit-content' ? 'fit-content' : width + 'px'}"
      >
        ${text}
      </span>
    </span>
  `;
};
