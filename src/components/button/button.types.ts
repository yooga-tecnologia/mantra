import { sizeVariantsArray, themePalettesArray, type SizeVariants, type ThemePalette } from '@theme/theme.types';
import type { ExtendedIconName, IconAnimation } from '../icon/icon.types';

export const componentPrefix = 'button';

/** Possible button style variants */
export const buttonStyleArray = ['regular', 'emphasis', 'stroke', 'plain', 'filter', 'link'] as const;
export const buttonColorVariantsArray = themePalettesArray;
export const buttonSizeVariantsArray = sizeVariantsArray.filter(size => size !== 'tiny');

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
  state?: 'default' | 'pressed';
}

export interface ButtonIconProps extends ButtonBaseProps {
  icon?: ExtendedIconName;
}
