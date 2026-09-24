import { themePalettesArray, type ThemePalette } from '@theme/theme.types';

export const componentPrefix = 'progress-bar';
export const COMPONENT_PREFIX = 'mnt-progress-bar';

export const progressBarTypeArray = ['percent', 'steps'] as const;
export const progressBarLabelPositionArray = ['top', 'bottom', 'left', 'right'] as const;
export const progressBarColorArray = themePalettesArray;

export type ProgressBarType = (typeof progressBarTypeArray)[number];
export type ProgressBarLabelPosition = (typeof progressBarLabelPositionArray)[number];

export interface ProgressBarProps {
  type?: ProgressBarType;
  value?: number | [number, number];
  label?: string;
  labelPosition?: ProgressBarLabelPosition;
  color?: ThemePalette;
  fullWidth?: boolean;
  rounded?: boolean;
}
