import type { Meta } from '@storybook/html';
import { buttonStyleArray, type ButtonProps } from './yoo-button.types';
import { sizeVariantsArray, themePaletteArray } from '../../shared/theme/theme.types';
import { ICONS } from '../yoo-icon/yoo-icon-base';
import { ICON_ANIMATION_ARRAY } from '../yoo-icon/yoo-icon.constants';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: 'yoo-button',
  argTypes: {
    label: { control: 'text' },
    iconLeft: { control: 'select', options: Object.keys(ICONS) },
    iconRight: { control: 'select', options: Object.keys(ICONS) },
    iconAnimation: { control: 'select', options: ICON_ANIMATION_ARRAY },
    variant: { control: 'select', options: buttonStyleArray },
    color: { control: 'select', options: themePaletteArray },
    size: { control: 'select', options: sizeVariantsArray },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

const Template = (args: ButtonProps) => `
  <yoo-button
    label="${args.label ?? ''}"
    icon-left="${args.iconLeft ?? ''}"
    icon-right="${args.iconRight ?? ''}"
    icon-animation="${args.iconAnimation ?? ''}"
    variant="${args.variant}"
    color="${args.color}"
    size="${args.size}"
    disabled="${args.disabled}"
    full-width="${args.fullWidth}"
  ></yoo-button>
`;
export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
  variant: 'emphasis',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  iconLeft: undefined,
  iconRight: undefined,
} as ButtonProps;
