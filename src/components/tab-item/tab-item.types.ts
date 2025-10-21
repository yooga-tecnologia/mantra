export const componentPrefix = 'tab-item';

/** Possible tab item orientations */
export const tabOrientationArray = ['horizontal', 'vertical'] as const;

/** Types derived from arrays */
export type TabOrientation = (typeof tabOrientationArray)[number];

export interface TabItemProps {
  tabId: string;
  label: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  orientation?: TabOrientation;
}
