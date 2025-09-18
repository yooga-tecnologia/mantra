import { ICON_DIRECTIONS, ICON_ANIMATION_ARRAY } from './icon.constants';
import { ICON_OPTIONS } from './icon.utils';

export const iconSizes = {
  tiny: 12,
  small: 16,
  medium: 24,
  large: 32,
  doubleLarge: 64,
} as const;

export type IconName = (typeof ICON_OPTIONS)[number];
export type Direction = (typeof ICON_DIRECTIONS)[number];
export type IconAnimation = (typeof ICON_ANIMATION_ARRAY)[number];
export type IconSize = keyof typeof iconSizes;

type DirectionalSuffix = `-${Direction}`;
export type ExtendedIconName = IconName | `${IconName}${DirectionalSuffix}`;

export type IconProps = {
  icon: ExtendedIconName;
  size?: number | IconSize;
  color?: string;
  background?: string;
  animation?: IconAnimation;
};
