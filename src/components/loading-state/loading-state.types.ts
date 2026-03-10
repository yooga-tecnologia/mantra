export const loadingStateColorVariantsArray = ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'] as const;
export type LoadingStateColorVariant = (typeof loadingStateColorVariantsArray)[number];

export interface LoadingStateProps {
  // size?: 'small' | 'medium' | 'large';
  label?: string;
  color?: LoadingStateColorVariant;
}
