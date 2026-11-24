export const yoogaOrbStates = ['idle', 'thinking', 'settled'] as const;

export const yoogaOrbSizes = {
  sm: 32,
  md: 40,
  lg: 64,
} as const;

export type YoogaOrbState = (typeof yoogaOrbStates)[number];
export type YoogaOrbSize = keyof typeof yoogaOrbSizes | number;

export const YOOGA_ORB_BLOOM_DURATION_MS = 1000;

export const yoogaOrbDefaultLabels: Record<YoogaOrbState, string> = {
  idle: 'Maya',
  thinking: 'Maya está pensando',
  settled: 'Maya',
};

// Mask radii are padded, so they only need to fully cover each lobe of the icon.
export const YOOGA_ORB_MOLECULES = [
  { key: 'a', cx: 13.64, cy: 4.55, r: 3.05 },
  { key: 'b', cx: 23.14, cy: 13.95, r: 3.6 },
  { key: 'c', cx: 8.84, cy: 19.25, r: 3.55 },
  { key: 'd', cx: 21.75, cy: 26.2, r: 3.55 },
] as const;

export const YOOGA_ORB_MASK_RADIUS_PAD = 1.4;

// Neck centerlines calibrated against a pixel diff of the full-mask state vs the plain icon.
export const YOOGA_ORB_CONNECTIONS = [
  'M13.64 4.55 C14.3 8.6 17.4 12.3 23.14 13.95',
  'M23.14 13.95 C18.85 13.05 17.6 17.85 13.15 18.35 C11.55 18.55 10.25 18.95 8.84 19.25',
  'M8.84 19.25 C13.4 19.6 18.2 21.3 21.75 26.2',
] as const;

export interface YoogaOrbProps {
  state?: YoogaOrbState;
  size?: YoogaOrbSize;
  bloom?: boolean;
  decorative?: boolean;
  label?: string;
}
