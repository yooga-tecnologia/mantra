export interface DropdownMenuItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  /** Renders a visual divider before this item */
  separator?: boolean;
}

export type DropdownMenuRawItem =
  | string
  | { value: string; label: string; icon?: string; disabled?: boolean; separator?: boolean };

export interface DropdownMenuSelectPayload {
  value: string;
  label: string;
}

export function normalizeMenuItem(raw: DropdownMenuRawItem): DropdownMenuItem {
  if (typeof raw === 'string') {
    return { value: raw, label: raw };
  }
  return raw;
}

export function parseMenuItems(input: string | DropdownMenuRawItem[]): DropdownMenuItem[] {
  if (Array.isArray(input)) return input.map(normalizeMenuItem);
  if (!input) return [];

  try {
    const raw: DropdownMenuRawItem[] = JSON.parse(input);
    return Array.isArray(raw) ? raw.map(normalizeMenuItem) : [];
  } catch {
    return [];
  }
}
