import type { Meta, StoryFn } from '@storybook/html';

import { sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';

import { buttonStyleArray, type ButtonProps } from './button.types';
import { Button } from './button';
import { HTMLString } from 'src/utils/utils';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Default',
  component: 'mnt-button',
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'select',
      options: sizeVariantsArray,
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

const DefaultTemplate = (args: ButtonProps): HTMLString => `
  <mnt-button
    label="${args.label ?? ''}"
    icon-left="${args.iconLeft ?? ''}"
    icon-right="${args.iconRight ?? ''}"
    full-width="${args.fullWidth}"
    disabled="${args.disabled}"
    variant=${args.variant}
    color=${args.color}
    size=${args.size}
  ></mnt-button>
`;

const getColorVariants = (color: ThemePalette): HTMLString => {
  const buttonVariants: HTMLString[] = [];

  buttonStyleArray.map((variant) => {
    buttonVariants.push(`<span>${variant}</span>`);
    sizeVariantsArray.map((size) => {
      buttonVariants.push(
        DefaultTemplate({
          color: color,
          variant: variant,
          size: size,
          iconLeft: 'plus',
          iconRight: 'plus',
          label: 'Label',
          disabled: false,
          fullWidth: false,
        }),
      );
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
  label: 'Label',
  variant: 'emphasis',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  iconLeft: undefined,
  iconRight: undefined,
} as ButtonProps;

export const AllVariants: StoryFn<typeof Button> = () => {
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

AllVariants.parameters = {
  controls: { disable: true },
};
