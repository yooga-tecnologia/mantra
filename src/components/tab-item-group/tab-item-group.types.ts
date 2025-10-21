import type { TabOrientation } from '../tab-item/tab-item.types';

export const componentPrefix = 'tab-item-group';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface TabItemGroupProps {
  tabs: TabItem[];
  selectedId?: string;
  orientation?: TabOrientation;
}
