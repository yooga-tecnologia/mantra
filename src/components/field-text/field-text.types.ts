import { SizeVariants, sizeVariantsArray, StateVariants, stateVariantsArray } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';

export const fieldTextSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const fieldTextStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');

export interface FieldTextProps {
  // Required
  inputName: string;

  // Optional
  // variant?: 'default' | 'filled';
  color?: 'critical' | 'success' | 'neutral';
  state?: Exclude<StateVariants, 'warning'>;
  size?: Exclude<SizeVariants, 'tiny'>;
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
