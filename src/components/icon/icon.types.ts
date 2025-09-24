import { ICON_DIRECTIONS, ICON_ANIMATION_ARRAY } from './icon.constants';
import { ICON_OPTIONS } from './icon.utils';

export const iconSizes = {
  tiny: 12,
  small: 16,
  medium: 24,
  large: 32,
  doubleLarge: 64,
} as const;

export const iconLargeSizes = {
  tiny: 32,
  small: 48,
  medium: 64,
  large: 96,
  doubleLarge: 128,
} as const;

export type IconName = (typeof ICON_OPTIONS)[number];
export type Direction = (typeof ICON_DIRECTIONS)[number];
export type IconAnimation = (typeof ICON_ANIMATION_ARRAY)[number];
export type IconSize = keyof typeof iconSizes;
export type IconLargeSize = keyof typeof iconLargeSizes;

type DirectionalSuffix = `-${Direction}`;
export type ExtendedIconName = IconName | `${IconName}${DirectionalSuffix}`;

export interface IconBaseProps {
  size?: number | IconSize | undefined;
  color?: string;
}

export interface IconProps extends IconBaseProps {
  icon: ExtendedIconName;
  background?: string;
  animation?: IconAnimation;
}

export interface IconLargeProps extends IconBaseProps {
  icon: ExtendedIconName;
  size?: number | IconLargeSize;
}
