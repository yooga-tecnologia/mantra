import { SizeVariants } from '@theme/theme.types';

export const fieldNumberVariantsArray = ['default', 'plain', 'simple'] as const;
export type FieldNumberVariant = (typeof fieldNumberVariantsArray)[number];

export interface FieldNumberProps {
  // Required
  inputName: string;
  variant?: FieldNumberVariant;
  // Optional
  size?: Exclude<SizeVariants, 'tiny'>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}
