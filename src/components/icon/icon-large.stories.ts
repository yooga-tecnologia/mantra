import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { ICON_LARGE_OPTIONS } from './icon.utils';
import { iconLargeSizes, IconProps } from './icon.types';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

export default {
  title: 'Assets/IconLarge',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Componente para exibição de ícones SVG mais complexos do Design System.

Permite a estilização apenas de tamanho e cor do ícone.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return IconLargeTemplate(storyContext.args as IconProps);
        },
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ICON_LARGE_OPTIONS,
      description: 'Nome do ícone a ser exibido. Veja todas as opções de ícones na seção "All variants"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(iconLargeSizes),
      description: 'Tamanho do ícone.',
      table: {
        type: { summary: Object.keys(iconLargeSizes).join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: {
        type: 'color',
        defaultValue: '#000000',
      },
      description: 'Cor do ícone. Utilize valor hexadecimal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-icon-large ${args}></mnt-icon-large>
    `;
  },
};

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

const IconLargeTemplate = (props: IconProps) => {
  return `
    <mnt-icon-large
      icon="${props.icon}"
      size="${props.size}"
      color="${props.color}"
    ></mnt-icon-large>
  `;
};

export const Simple: Story = {
  args: {
    icon: 'placeholder',
    size: 'medium',
    color: '#000',
  },
  render: IconLargeTemplate,
};

const renderIconBox = (iconName: string): HTMLString => {
  return `
    <div class="sb-box">
      <mnt-icon-large icon="${iconName}" size="medium"></mnt-icon-large>
      <p class="label-regular-tiny">${iconName}</p>
    </div>
  `;
};

const renderAllIcons = (): HTMLString => {
  let html = ``;

  ICON_LARGE_OPTIONS.forEach((element) => {
    html += `
      ${renderIconBox(element)}
    `;
  });

  return html;
};

/**
 * Todas as variantes disponíveis
 */
export const AllVariants: StoryFn = () => {
  return `
  <div class="sb-section">
    <div class="sb-grid-6 sb-grid-stretch">
      ${renderAllIcons()}
    </div>
  </div>
  `;
};

AllVariants.parameters = disableArgs;
