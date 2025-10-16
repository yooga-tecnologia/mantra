import { getLibPrefix } from '../../utils/utils';
import type { ExtendedIconName } from '../icon/icon.types';

export const COMPONENT_PREFIX = getLibPrefix() + 'steps';

/** Possible step status values */
export const stepStatusArray = ['completed', 'active', 'disabled'] as const;

/** Possible step orientation values */
export const stepOrientationArray = ['horizontal', 'vertical'] as const;

/** Types derived from arrays */
export type StepStatus = (typeof stepStatusArray)[number];
export type StepOrientation = (typeof stepOrientationArray)[number];

export interface StepItem {
  label: string;
  status: StepStatus;
  icon?: number | ExtendedIconName; // Permite número ou ícone customizado
}

export interface StepsProps {
  orientation?: StepOrientation;
  steps: StepItem[];
}

