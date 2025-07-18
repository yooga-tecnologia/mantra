export const tooltipPositions = ['top', 'bottom', 'left', 'right'] as const;

export type TooltipPosition = (typeof tooltipPositions)[number];

export type TooltipProps = {
  text: string;
  position?: TooltipPosition;
};
