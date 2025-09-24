import type { SizeVariants, ThemePalette } from '@theme/theme.types';
import type { ExtendedIconName, IconAnimation } from '../icon/icon.types';

export const componentPrefix = 'button';

/** Possible button style variants */
export const buttonStyleArray = ['regular', 'emphasis', 'stroke', 'plain'] as const;

/** Types derived from arrays */
export type ButtonStyle = (typeof buttonStyleArray)[number];

export interface ButtonBaseProps {
  size?: SizeVariants;
  color?: ThemePalette;
  variant?: ButtonStyle;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonBaseProps {
  label?: string;
  fullWidth?: boolean;
  iconLeft?: ExtendedIconName;
  iconRight?: ExtendedIconName;
  iconAnimation?: IconAnimation;
}

export interface ButtonIconProps extends ButtonBaseProps {
  icon?: ExtendedIconName;
}
