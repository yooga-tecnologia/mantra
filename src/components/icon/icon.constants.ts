import type { Direction } from './icon.types';

export const ICON_ANIMATION_ARRAY: readonly ['rotation', undefined] = ['rotation', undefined];
export const ICON_DIRECTIONS = ['up', 'down', 'left', 'right'] as const;
export const ICON_DIRECTION_SUFFIX_REGEX = /-(up|down|left|right)$/;

export const directionTransformMap: Record<Direction, string> = {
  up: 'rotate(0)',
  down: 'rotate(180 0 0)',
  right: 'rotate(90 0 0)',
  left: 'rotate(-90 0 0)',
};
