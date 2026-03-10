import { SizeVariants, sizeVariantsArray, StateVariants, stateVariantsArray } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';

export const filterSearchSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const filterSearchStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');
export interface FilterSearchProps {
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
  labelText?: string;
  placeholder?: string;
  fullWidth?: boolean;
}
