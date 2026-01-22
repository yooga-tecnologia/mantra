export const componentPrefix = 'checkbox';

/** Possible checkbox variants */
export const checkboxVariantArray = ['check', 'indeterminate'] as const;

/** Types derived from arrays */
export type CheckboxVariant = (typeof checkboxVariantArray)[number];

/** Base props for the checkbox component */
export interface CheckboxBaseProps {
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  variant?: CheckboxVariant;
  disabled?: boolean;
}
