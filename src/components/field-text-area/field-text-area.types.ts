export interface FieldTextAreaProps {
  // Required
  inputName: string;

  // Optional
  state?: 'default' | 'error' | 'success';
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  inlineMessage?: string;
  maxLength?: number;
  rows?: number;
  value?: string;
  hasActionButton?: boolean;
  hasInfoButton?: boolean;
}

