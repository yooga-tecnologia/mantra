import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { HTMLString } from 'src/utils/utils';
import { ILLUSTRATIONS } from './illustration-base';
import { IllustrationProps } from './illustration.types';

type Story = StoryObj;

export default {
  title: 'Assets/Illustration',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Componente para exibição de ilustrações em SVG.

Permite a estilização apenas de tamanho.
        `,
      },
      codePanel: false,
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ILLUSTRATIONS),
      description: 'Nome da ilustração a ser exibida. Veja todas as opções de ilustrações na seção "All variants"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: 'number',
      description: 'Largura da ilustração.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '140' },
      },
    },
    height: {
      control: 'number',
      description: 'Altura da ilustração.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '140' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-illustration ${args}></mnt-illustration>
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

const IllustrationTemplate = (props: IllustrationProps) => {
  return `
    <mnt-illustration
      name="${props.name}"
      width="${props.width}"
      height="${props.height}"
    ></mnt-illustration>
  `;
};

export const Simple: Story = {
  args: {
    name: 'happy',
    width: 140,
    height: 140,
  },
  render: IllustrationTemplate,
};

const renderIconBox = (name: string): HTMLString => {
  return `
    <div class="sb-box">
      <mnt-illustration name="${name}" width="140" height="140"></mnt-illustration>
      <p class="label-regular-tiny">${name}</p>
    </div>
  `;
};

const renderAllIcons = (): HTMLString => {
  let html = ``;

  Object.keys(ILLUSTRATIONS).forEach((element) => {
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
    <div class="sb-grid-4 sb-grid-stretch">
      ${renderAllIcons()}
    </div>
  </div>
  `;
};

AllVariants.parameters = disableArgs;
