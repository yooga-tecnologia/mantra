import type { Meta } from '@storybook/html';

import { sizeVariantsArray, themePaletteArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../yoo-icon/yoo-icon.constants';

import { buttonStyleArray, type ButtonProps } from './yoo-button.types';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
}

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: 'yoo-button',
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'select', options: sizeVariantsArray,
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'select',
      options: themePaletteArray,
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: themePaletteArray.join(' | ') },
      }
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Variantes de estilo',
      table: {
        defaultValue: { summary: 'emphasis' },
        type: { summary: buttonStyleArray.join(' | ') },
      }
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
  },
};

export default meta;

const Template = (args: ButtonProps) => `
  <yoo-button
    label="${args.label ?? ''}"
    icon-left="${args.iconLeft ?? ''}"
    icon-right="${args.iconRight ?? ''}"
    variant="${args.variant}"
    color="${args.color}"
    size="${args.size}"
    disabled="${args.disabled}"
    full-width="${args.fullWidth}"
  ></yoo-button>
`;

export const Playground = Template.bind({});
Playground.args = {
  label: 'Playground',
  variant: 'emphasis',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  iconLeft: undefined,
  iconRight: undefined,
} as ButtonProps;
