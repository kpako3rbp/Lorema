export const renderTooltip = (text: string, width = 140): string => {
  return /*html*/ `
    <span class="lorem-tooltip-wrapper">
      <span class="lorem-tooltip-trigger" aria-label="${text}" tabindex="0">i</span>

      <span
        class="lorem-tooltip"
        role="tooltip"
        style="--tooltip-width: ${width}px"
      >
        ${text}
      </span>
    </span>
  `;
};
