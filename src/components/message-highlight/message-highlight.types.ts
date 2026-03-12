import { themePalettesArray } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';

export const messageHighlightColorVariantsArray = themePalettesArray;
export type MessageHighlightColorVariants = (typeof messageHighlightColorVariantsArray)[number];

export const messageHighlightTypeVariantsArray = ['default', 'emphasis'] as const;
export type MessageHighlightTypeVariants = (typeof messageHighlightTypeVariantsArray)[number];

export interface MessageHighlightProps {
  label: string;
  type?: MessageHighlightTypeVariants;
  variant?: MessageHighlightColorVariants;
  icon?: ExtendedIconName;
  fullWidth?: boolean;
  marginBottom?: boolean;
}
