import type { Meta, StoryFn } from '@storybook/html';

import { colorTonesArray, sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.constants';

import { BadgeBaseProps } from './badge.types';
import { Badge } from './badge';

type HTMLString = string;

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
}

const filteredSizeVariantsArray = sizeVariantsArray.filter(size => size !== 'large');

const meta: Meta<BadgeBaseProps> = {
  title: 'Components/Badge/Default',
  component: 'mnt-badge',
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido dentro da Badge',
    },
    size: {
      control: 'select', options: filteredSizeVariantsArray,
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: filteredSizeVariantsArray.join(' | ') },
      },
    },
    color: {
      control: 'select',
      options: themePalettesArray,
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: themePalettesArray.join(' | ') },
      }
    },
    tone: {
      control: 'select', options: colorTonesArray,
      description: 'Variação de tonalidade, baseado na cor selecionada',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: colorTonesArray.join(' | ') },
    } ,
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
  },
};

export default meta;

const DefaultTemplate = (args: BadgeBaseProps): HTMLString => `
  <mnt-badge
    icon=${args.icon}
    color=${args.color}
    size=${args.size}
    label="${args.label}"
    tone=${args.tone}
  ></mnt-badge>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  color: 'primary',
  size: 'tiny',
  icon: 'plus',
  tone: 'default',
  label: 'Badge Label',
} as BadgeBaseProps;

const getColorVariants = (color: ThemePalette): HTMLString => {
  const badgeVariants: HTMLString[] = [];

  colorTonesArray.map((tone) => {
    filteredSizeVariantsArray.map((size) => {
      const label = `${tone} ${size}`;
      badgeVariants.push(DefaultTemplate({ color, tone, size, icon: 'clock', label }));
    });
  });
  return `
<h4>${color}</h4>
<div class="sb-grid-3">
  ${badgeVariants.join('')}
</div>`;
}

export const Examples: StoryFn<typeof Badge> = () => {
  const badgeVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    badgeVariants.push(getColorVariants(color));
  });
  return (
`<div>
  <h3>Color Variants</h3>
  ${badgeVariants.join('')}
</div>
`);
};

Examples.parameters = {
  controls: { disable: true },
};