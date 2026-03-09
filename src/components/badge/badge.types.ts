import { colorTonesArray, sizeVariantsArray, themePalettesArray, type ColorTone, type SizeVariants, type ThemePalette } from '@theme/theme.types';
import { getLibPrefix } from '../../utils/utils';

import type { ExtendedIconName } from '../icon/icon.types';

export const COMPONENT_PREFIX = getLibPrefix() + 'badge';

export const badgeColorVariantsArray = themePalettesArray;
export const badgeToneVariantsArray = colorTonesArray;
export const badgeSizeVariantsArray = sizeVariantsArray;

export interface BadgeBaseProps {
  label: string;
  icon?: ExtendedIconName;
  size?: SizeVariants;
  color?: ThemePalette;
  tone?: ColorTone;
  disabled?: boolean;
}
