import {
  UI_ACTIONS_ICONS,
  COMMUNICATION_AND_SOCIAL_ICONS,
  COMMON_ACTIONS_ICONS,
  BUSINESS_AND_PAYMENTS_ICONS,
  PRIVACY_AND_SECURITY_ICONS,
  HARDWARE_ICONS,
  MAPS_AND_TRANSPORTATION_ICONS,
  NUMBER_ICONS,
  USER_EMOTION_ICONS,
} from './icon-base';

import { ICON_LARGE } from './icon-large-base';

export const ICON_CATEGORIES = [
  UI_ACTIONS_ICONS,
  COMMUNICATION_AND_SOCIAL_ICONS,
  COMMON_ACTIONS_ICONS,
  USER_EMOTION_ICONS,
  NUMBER_ICONS,
  BUSINESS_AND_PAYMENTS_ICONS,
  PRIVACY_AND_SECURITY_ICONS,
  HARDWARE_ICONS,
  MAPS_AND_TRANSPORTATION_ICONS,
];

export const ICON_OPTIONS = [
  ...Object.keys(UI_ACTIONS_ICONS),
  ...Object.keys(COMMUNICATION_AND_SOCIAL_ICONS),
  ...Object.keys(COMMON_ACTIONS_ICONS),
  ...Object.keys(USER_EMOTION_ICONS),
  ...Object.keys(NUMBER_ICONS),
  ...Object.keys(BUSINESS_AND_PAYMENTS_ICONS),
  ...Object.keys(PRIVACY_AND_SECURITY_ICONS),
  ...Object.keys(HARDWARE_ICONS),
  ...Object.keys(MAPS_AND_TRANSPORTATION_ICONS),
];
export const ICON_LARGE_OPTIONS = [...Object.keys(ICON_LARGE)];

export function getIconSvgByName(name: string, isLarge?: boolean): string | undefined {
  if (isLarge) {
    return ICON_LARGE[name];
  } else {
    for (const category of ICON_CATEGORIES) {
      if (category[name]) return category[name];
    }
  }
  return undefined;
}
