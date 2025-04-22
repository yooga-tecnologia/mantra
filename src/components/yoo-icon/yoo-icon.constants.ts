import type { Direction } from './yoo-icon.types';

export const directionTransformMap: Record<Direction, string> = {
  up: 'rotate(0)',
  down: 'rotate(180 0 0)',
  right: 'rotate(90 0 0)',
  left: 'rotate(-90 0 0)',
};
