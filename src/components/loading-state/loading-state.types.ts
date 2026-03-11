export const loadingStateColorVariantsArray = ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'] as const;
export type LoadingStateColorVariant = (typeof loadingStateColorVariantsArray)[number];

export interface LoadingStateProps {
  label?: string;
  color?: LoadingStateColorVariant;
}
