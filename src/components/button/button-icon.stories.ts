import type { Meta, StoryFn } from '@storybook/html';

import { sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';

import { type ButtonIconProps, buttonStyleArray } from './button.types';
import { ButtonIcon } from './button-icon';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const meta: Meta<ButtonIconProps> = {
  title: 'Components/Button/ButtonIcon',
  component: 'mnt-button-icon',
  argTypes: {
    size: {
      control: 'select',
      options: sizeVariantsArray,
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: sizeVariantsArray.join(' | ') },
      },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'select',
      options: themePalettesArray,
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: themePalettesArray.join(' | ') },
      },
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Variantes de estilo',
      table: {
        defaultValue: { summary: 'emphasis' },
        type: { summary: buttonStyleArray.join(' | ') },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
  },
};

export default meta;

const DefaultTemplate = (args: ButtonIconProps): HTMLString => `
  <mnt-button-icon
    icon=${args.icon}
    variant=${args.variant}
    color=${args.color}
    size=${args.size}
  ></mnt-button-icon>
`;

const getColorVariants = (color: ThemePalette): HTMLString => {
  const buttonVariants: HTMLString[] = [];

  buttonStyleArray.map((variant) => {
    buttonVariants.push(`<span>${variant}</span>`);
    sizeVariantsArray.map((size) => {
      buttonVariants.push(DefaultTemplate({ color, variant, size, icon: 'plus' }));
    });
  });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    ${buttonVariants.join('')}
  </div>
</div>
`;
};

export const Example = DefaultTemplate.bind({});
Example.args = {
  variant: 'regular',
  color: 'primary',
  size: 'tiny',
  icon: 'plus',
  disabled: false,
} as ButtonIconProps;

export const AllVariants: StoryFn<typeof ButtonIcon> = () => {
  const buttonVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    buttonVariants.push(getColorVariants(color));
  });

  return `
<div>
  ${buttonVariants.join('')}
</div>
`;
};
