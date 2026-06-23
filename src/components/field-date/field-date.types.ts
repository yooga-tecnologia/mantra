import { SizeVariants, sizeVariantsArray, stateVariantsArray } from '@theme/theme.types';
import { DatePickerBaseProps } from '../date-picker/date-picker.types';
import { FormFieldBaseProps } from '../../shared/form-field/form-field.types';

export const fieldDateSizeVariantsArray = sizeVariantsArray.filter((size) => size !== 'tiny');
export const fieldDateStateVariantsArray = stateVariantsArray.filter((state) => state !== 'warning');

export interface FieldDateProps extends FormFieldBaseProps {
  // Required
  inputName: string;

  // Optional
  size?: Exclude<SizeVariants, 'tiny'>;
  required?: boolean;
  disabled?: boolean;
  datePickerConfig?: DatePickerBaseProps;
  value?: string;
}
