import { SizeVariants } from '@theme/theme.types';
import { DatePickerBaseProps } from '../date-picker/date-picker.types';

export interface FieldDateProps {
  // Required
  inputName: string;

  // Optional
  size?: SizeVariants;
  required?: boolean;
  disabled?: boolean;
  labelText?: string;
  placeholder?: string;
  datePickerConfig?: DatePickerBaseProps;
  value?: string;
}
