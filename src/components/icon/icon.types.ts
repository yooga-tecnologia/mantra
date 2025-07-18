import { ICONS } from './icon-base';
import { ICON_DIRECTIONS, ICON_ANIMATION_ARRAY } from './icon.constants';

export const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
  doubleLarge: 64,
} as const;

export type IconName = keyof typeof ICONS;
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
