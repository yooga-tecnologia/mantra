import type { StoryFn, StoryObj } from '@storybook/html-vite';
import { ThemePalette, themePalettesArray } from '@theme/theme.types';

import { BadgeBaseProps, badgeColorVariantsArray, badgeSizeVariantsArray, badgeToneVariantsArray } from './badge.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

const disableArgs = {
  controls: {
    disable: true,
  },
  actions: {
    disable: true,
  },
  interactions: {
    disable: true,
  },
};

export default {
  title: 'Components/Badge/BadgeIcon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-badge-icon\` é uma versão simplificada do \`mnt-badge\`, utilizada para exibir **badges que contenham apenas ícones (sem texto)**.

Assim como o \`mnt-badge\`, ele possui variantes de cores, tonalidades e tamanhos.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: themePalettesArray,
      description: 'Variante de cor',
      table: {
        type: { summary: badgeColorVariantsArray.join(' | ') },
        defaultValue: { summary: 'neutral' },
      },
    },
    tone: {
      control: 'select',
      options: badgeToneVariantsArray,
      description: 'Variante de tonalidade',
      table: {
        type: { summary: badgeToneVariantsArray.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: badgeSizeVariantsArray,
      description: 'Tamanho do badge',
      table: {
        type: { summary: badgeSizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido no badge. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-badge ${args}></mnt-badge>
    `;
  },
};

const BadgeTemplate = (props: BadgeBaseProps) => {
  return `
    <mnt-badge-icon
      color="${props.color}"
      tone="${props.tone}"
      size="${props.size}"
      icon="${props.icon || ''}"
    ></mnt-badge-icon>
    `;
};

/**
 * Variante de tonalidade "default"
 */
export const Default: Story = {
  args: {
    color: 'primary',
    tone: 'default',
    size: 'medium',
    icon: 'plus',
  },
  render: BadgeTemplate,
};

/**
 * Variante de tonalidade "highlight"
 */
export const Highlight: Story = {
  args: {
    color: 'primary',
    tone: 'highlight',
    size: 'medium',
    icon: 'plus',
  },
  render: BadgeTemplate,
};

/**
 * Variante de tonalidade "emphasis"
 */
export const Emphasis: Story = {
  args: {
    color: 'primary',
    tone: 'emphasis',
    size: 'medium',
    icon: 'plus',
  },
  render: BadgeTemplate,
};

const getColorVariants = (color: ThemePalette) => {
  const badgeVariants: string[] = [];

  badgeToneVariantsArray.map((variant) => {
    badgeVariants.push(`<span class="label-medium-small text-color-title">${variant}</span>`);
    badgeSizeVariantsArray.map((size) => {
      badgeVariants.push(BadgeTemplate({ label: 'Click me', color, tone: variant, size, icon: 'plus' }));
    });
  });
  return `
<div class="sb-section-box">
  <h4 class="title-medium text-color-title mb-8">color: ${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    <span class="label-medium-medium text-color-title">Tone variant</span>
    <span class="label-medium-medium text-color-title">Size: tiny</span>
    <span class="label-medium-medium text-color-title">Size: small</span>
    <span class="label-medium-medium text-color-title">Size: medium</span>
    <span class="label-medium-medium text-color-title">Size: large</span>
    ${badgeVariants.join('')}
  </div>
</div>
`;
};

/**
 * Todas as variantes
 */
export const AllVariants: StoryFn = () => {
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

AllVariants.parameters = disableArgs;
