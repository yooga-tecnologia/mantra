export interface FieldNumberProps {
  // Required
  inputName: string;
  variant: 'default' | 'plain';

  // Optional
  label?: string;
  required?: boolean;
  disabled?: boolean;
}
