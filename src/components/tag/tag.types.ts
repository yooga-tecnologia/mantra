import { SizeVariants } from '@theme/theme.types';
import { ExtendedIconName } from '../icon/icon.types';

export interface TagProps {
  label: string;
  tagId?: string;
  size?: SizeVariants;
  state?: 'default' | 'selected' | 'disabled';
  icon?: ExtendedIconName | undefined;
}

export interface TagRemovedEvent {
  tagId: string;
  label: string;
}

export const tagIconSizesMap = {
  tiny: 12,
  small: 14,
  medium: 18,
  large: 20,
};

/**
 * Duração total das duas fases de animação de saída em ms:
 *   Phase 1 (fade + scale-down): 250ms
 *   Phase 2 (collapse de largura): 200ms após phase 1
 * Deve ser mantida em sincronia com os valores em _variant-removable.scss.
 */
export const TAG_REMOVE_ANIMATION_DURATION_MS = 450;
