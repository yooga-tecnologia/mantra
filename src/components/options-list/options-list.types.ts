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

export interface OptionsListProps {
  name?: string;
  placeholder?: string;
  items?: string;
  value?: string;
  fullWidth?: boolean;
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

export function parseItems(json: string): OptionsListItem[] {
  try {
    const raw: OptionsListRawItem[] = JSON.parse(json);
    return Array.isArray(raw) ? raw.map(normalizeItem) : [];
  } catch {
    return [];
  }
}
