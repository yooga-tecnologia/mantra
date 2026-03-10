import { SizeVariants, sizeVariantsArray, stateVariantsArray } from '@theme/theme.types';
import { DatePickerBaseProps } from '../date-picker/date-picker.types';

export const fieldDateSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const fieldDateStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');

export interface FieldDateProps {
  // Required
  inputName: string;

  // Optional
  size?: Exclude<SizeVariants, 'tiny'>;
  required?: boolean;
  disabled?: boolean;
  labelText?: string;
  placeholder?: string;
  datePickerConfig?: DatePickerBaseProps;
  value?: string;
}
