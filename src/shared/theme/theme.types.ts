/** Possible color palette values */
export const themePalettesArray = ['primary', 'secondary', 'neutral', 'success', 'warning', 'critical'] as const;
/** Color accents variants */
export const colorTonesArray = ['default', 'highlight', 'emphasis'] as const;
/** Components sizing variants */
export const sizeVariantsArray = ['tiny', 'small', 'medium', 'large'] as const;

/** Types derived from arrays */
export type ThemePalette = (typeof themePalettesArray)[number];
export type ColorTone = (typeof colorTonesArray)[number];
export type SizeVariants = (typeof sizeVariantsArray)[number];

export enum ButtonIconSizeMap {
  small = 16,
  medium = 20,
  large = 24,
}
