export const COMMANDS = {
  openGenerationPopover: 'open-generation-popover',
  openStatisticsPopover: 'open-statistics-popover',
} as const;

export type CommandType = keyof typeof COMMANDS;
