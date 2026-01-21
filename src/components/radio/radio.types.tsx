export const componentPrefix = 'radio';

/** Possible checkbox variants */
export const radioVariantArray = ['radio'] as const;

/** Types derived from arrays */
export type RadioVariant = (typeof radioVariantArray)[number];

/** Base props for the checkbox component */
export interface RadioBaseProps {
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
}
