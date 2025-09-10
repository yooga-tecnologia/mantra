import { SizeVariants } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';

export interface FieldTextProps {
  // Required
  inputName: string;

  // Optional
  // variant?: 'default' | 'filled';
  color?: 'critical' | 'success' | 'neutral';
  state?: 'default' | 'error' | 'success';
  size?: SizeVariants;
  iconLeft?: ExtendedIconName;
  iconRight?: ExtendedIconName;
  required?: boolean;
  disabled?: boolean;
  labelText?: string;
  placeholder?: string;
  inlineMessage?: string;
  hasActionButton?: boolean;
  hasInfoButton?: boolean;
}
