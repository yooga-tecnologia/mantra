import { ICONS } from './yoo-icon-base';

export const iconSizeArray = ["small", "medium", "large", "doubleLarge"] as const;

export type IconName = keyof typeof ICONS;
export type IconAnimation = 'rotation' | undefined;
export type Background = string[];
export type IconSize = typeof iconSizeArray[number]

export type IconProps = {
  icon: IconName,
  size: IconSize,
  color: string,
  background?: string,
}