import type { SizeVariants, ThemePalette } from '@theme/theme.types';
import type { ExtendedIconName, IconAnimation } from '../icon/icon.types';

/** Possible button style variants */
export const buttonStyleArray = ['regular', 'emphasis', 'stroke', 'plain'] as const;

/** Types derived from arrays */
export type ButtonStyle = (typeof buttonStyleArray)[number];

export type ButtonProps = {
  label?: string;
  size?: SizeVariants;
  color?: ThemePalette;
  variant?: ButtonStyle;
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: ExtendedIconName;
  iconRight?: ExtendedIconName;
  iconAnimation?: IconAnimation;
};
