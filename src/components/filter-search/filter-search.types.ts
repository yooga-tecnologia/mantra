import { SizeVariants, sizeVariantsArray, StateVariants, stateVariantsArray } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';
import { FormFieldBaseProps } from '../../shared/form-field/form-field.types';

export const filterSearchSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const filterSearchStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');

export interface FilterSearchProps extends FormFieldBaseProps {
  // Required
  inputName: string;

  // Optional
  color?: 'critical' | 'success' | 'neutral';
  state?: Exclude<StateVariants, 'warning'>;
  size?: SizeVariants;
  iconLeft?: ExtendedIconName;
  iconRight?: ExtendedIconName;
  required?: boolean;
  disabled?: boolean;
}
