import {
  UI_ACTIONS_ICONS,
  COMMUNICATION_ICONS,
  COMMON_ACTIONS_ICONS,
  BUSINESS_AND_PAYMENTS_ICONS,
  PRIVACY_AND_SECURITY_ICONS,
  HARDWARE_ICONS,
  MAPS_AND_TRANSPORTATION_ICONS,
} from './icon-base';

export const ICON_CATEGORIES = [
  UI_ACTIONS_ICONS,
  COMMUNICATION_ICONS,
  COMMON_ACTIONS_ICONS,
  BUSINESS_AND_PAYMENTS_ICONS,
  PRIVACY_AND_SECURITY_ICONS,
  HARDWARE_ICONS,
  MAPS_AND_TRANSPORTATION_ICONS,
];

export const ICON_OPTIONS = [
  ...Object.keys(UI_ACTIONS_ICONS),
  ...Object.keys(COMMUNICATION_ICONS),
  ...Object.keys(COMMON_ACTIONS_ICONS),
  ...Object.keys(BUSINESS_AND_PAYMENTS_ICONS),
  ...Object.keys(PRIVACY_AND_SECURITY_ICONS),
  ...Object.keys(HARDWARE_ICONS),
  ...Object.keys(MAPS_AND_TRANSPORTATION_ICONS),
];

export function getIconSvgByName(name: string): string | undefined {
  for (const category of ICON_CATEGORIES) {
    if (category[name]) return category[name];
  }
  return undefined;
}
