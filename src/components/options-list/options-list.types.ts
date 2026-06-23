import { FormFieldBaseProps } from '../../shared/form-field/form-field.types';

export type OptionsListRawItem = string | { value: string; label: string } | Record<string, string>;

export interface OptionsListItem {
  value: string;
  label: string;
}

export interface OptionsListChangeDetail {
  value: string;
  label: string;
}

export type OptionsListSelectPayload = OptionsListChangeDetail | null;

export interface OptionsListProps extends FormFieldBaseProps {
  /** Accepts a JSON string OR a direct array (e.g. Angular property binding). */
  items?: string | OptionsListRawItem[];
  value?: string;
}

export function normalizeItem(raw: OptionsListRawItem): OptionsListItem {
  if (typeof raw === 'string') {
    return { value: raw, label: raw };
  }

  if ('value' in raw && 'label' in raw) {
    return { value: raw.value, label: raw.label };
  }

  const entries = Object.entries(raw);
  if (entries.length === 0) return { value: '', label: '' };

  const [value, label] = entries[0];
  return { value, label };
}

export function parseItems(input: string | OptionsListRawItem[]): OptionsListItem[] {
  // Support direct array binding (e.g. Angular [items]="array")
  if (Array.isArray(input)) {
    return input.map(normalizeItem);
  }

  if (!input) return [];

  try {
    const raw: OptionsListRawItem[] = JSON.parse(input);
    return Array.isArray(raw) ? raw.map(normalizeItem) : [];
  } catch {
    return [];
  }
}
