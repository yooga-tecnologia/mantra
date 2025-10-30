import type { ColorTone, SizeVariants, ThemePalette } from '@theme/theme.types';
import { getLibPrefix } from 'src/utils/utils';

import type { ExtendedIconName } from '../icon/icon.types';

export const COMPONENT_PREFIX = getLibPrefix() + 'badge';

export interface BadgeBaseProps {
  label: string;
  icon?: ExtendedIconName;
  size?: Exclude<SizeVariants, 'large'>;
  color?: ThemePalette;
  tone?: ColorTone;
  disabled?: boolean;
}
