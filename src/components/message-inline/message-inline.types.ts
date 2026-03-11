import { ExtendedIconName } from '../icon/icon.types';

export const messageInlineColorVariantsArray = ['neutral', 'success', 'error'] as const;
export type MessageInlineColorVariants = (typeof messageInlineColorVariantsArray)[number];

export interface MessageInlineProps {
  variant?: MessageInlineColorVariants;
  icon?: ExtendedIconName;
  label?: string;
  hasPadding?: boolean;
}
