import type { Meta, StoryFn } from '@storybook/html';

import { colorTonesArray, sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';

import { BadgeBaseProps } from './badge.types';
import { Badge } from './badge';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const filteredSizeVariantsArray = sizeVariantsArray;

const meta: Meta<BadgeBaseProps> = {
  title: 'Components/Badge/Default',
  component: 'mnt-badge',
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido dentro da Badge',
    },
    size: {
      control: 'select',
      options: filteredSizeVariantsArray,
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
      },
    },
    tone: {
      control: 'select',
      options: colorTonesArray,
      description: 'Variação de tonalidade, baseado na cor selecionada',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: colorTonesArray.join(' | ') },
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

const DefaultTemplate = (args: BadgeBaseProps): HTMLString => `
  <mnt-badge
    icon=${args.icon}
    color=${args.color}
    size=${args.size}
    label="${args.label}"
    tone=${args.tone}
  ></mnt-badge>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  color: 'primary',
  size: 'tiny',
  icon: 'plus',
  tone: 'default',
  label: 'Badge Label',
} as BadgeBaseProps;

const getColorVariants = (color: ThemePalette): HTMLString => {
  const badgeVariants: HTMLString[] = [];

  colorTonesArray.map((tone) => {
    badgeVariants.push(`<span>${tone}</span>`);
    filteredSizeVariantsArray.map((size) => {
      const label = `${tone} ${size}`;
      badgeVariants.push(DefaultTemplate({ color, tone, size, icon: 'clock', label }));
    });
  });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    ${badgeVariants.join('')}
  </div>
</div>`;
};

export const AllVariants: StoryFn<typeof Badge> = () => {
  const badgeVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    badgeVariants.push(getColorVariants(color));
  });
  return `
<div>
  ${badgeVariants.join('')}
</div>
`;
};

AllVariants.parameters = {
  controls: { disable: true },
};
