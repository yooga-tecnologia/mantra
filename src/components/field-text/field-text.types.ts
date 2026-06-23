import { SizeVariants, sizeVariantsArray, StateVariants, stateVariantsArray } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';
import { FormFieldBaseProps } from '../../shared/form-field/form-field.types';

export const fieldTextSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const fieldTextStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');

export interface FieldTextProps extends FormFieldBaseProps {
  // Required
  inputName: string;

  // Optional
  color?: 'critical' | 'success' | 'neutral';
  state?: Exclude<StateVariants, 'warning'>;
  size?: Exclude<SizeVariants, 'tiny'>;
  iconLeft?: ExtendedIconName;
  iconRight?: ExtendedIconName;
  required?: boolean;
  disabled?: boolean;
  inlineMessage?: string;
  hasActionButton?: boolean;
  hasInfoButton?: boolean;
}
