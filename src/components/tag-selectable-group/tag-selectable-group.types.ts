import { ExtendedIconName } from '../icon/icon.types';
import { TagProps } from '../tag/tag.types';

export const componentPrefix = 'tag-selectable-group';

export interface TagItem {
  id: string;
  label: string;
  icon?: ExtendedIconName;
}

export type SelectionMode = 'single' | 'multiple';

export interface TagSelectableGroupProps {
  tags: TagItem[];
  size?: TagProps['size'];
  mode?: SelectionMode;
  selectedId?: string;
  selectedIds?: string[];
  fullWidth?: boolean;
}

export interface TagGroupChangeEvent {
  selectedId?: string;
  selectedIds?: string[];
}
