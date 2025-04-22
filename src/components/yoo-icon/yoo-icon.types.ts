import { ICONS } from './yoo-icon-base';

export const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
  doubleLarge: 64,
} as const;

export type IconName = keyof typeof ICONS;
export type Direction = 'up' | 'down' | 'left' | 'right';
export type IconAnimation = 'rotation' | undefined;
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
