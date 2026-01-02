import type { Meta, StoryObj } from '@storybook/html-vite';

import { themePalettesArray } from '../../../shared/theme/theme.types';
import { sizeVariantsArray } from '../../../shared/theme/theme.types';
import { IconBaseProps, IconProps, iconSizes } from '../icon.types';

type Story = StoryObj;

const meta = {
  title: 'Assets/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
      description: {
        component: `Componente para exibição de ícones simples.\n\nPara elementos mais complexos, use o componentes \`<mnt-icon-large>\` ou \`<mnt-illustration>\`.`,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Nome do ícone a ser exibido à esquerda do texto',
      table: {
        category: 'Content',
        type: { summary: 'ExtendedIconName' },
      },
    },
    size: {
      control: 'select',
      options: sizeVariantsArray,
      description: 'Tamanho do ícone',
      table: {
        category: 'Appearance',
        type: { summary: 'SizeVariants' },
      },
    },
    color: {
      control: 'color',
      options: themePalettesArray,
      description: 'Cor do ícone',
      table: {
        category: 'Appearance',
        type: { summary: 'ThemePalette' },
      },
    },
    background: {
      control: 'color',
      description: 'Cor do plano de fundo',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    bgShape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: 'Forma do plano de fundo',
      table: {
        category: 'Appearance',
        type: { summary: 'IconBackgroundShape' },
      },
    },
  },
} satisfies Meta<IconProps>;

export default meta;

const baseArgs = {
  size: 'medium',
  color: 'currentColor',
  icon: 'starOutline',
};

const IconTemplate = (props: IconProps) => {
  return `
    <mnt-icon
      icon="${props.icon}"
      size="${props.size}"
      color="${props.color}"
      background="${props.background || ''}"
      bg-shape="${props.bgShape || ''}"
    ></mnt-icon>
  `.trim();
};

// Story de exemplo com tamanhos pré-definidos
export const Sizing: Story = {
  args: {
    ...baseArgs,
    background: '#000',
    color: '#FFF',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso com tamanhos pré-definidos:',
      },
    },
    layout: 'centered',
  },
  render: (args: IconProps) => {
    const sizeContainer = sizeVariantsArray
      .map(
        (size) => `
        <span style="display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 20px;">
          <span style="font-size: 12px; color: #5F676C; text-transform: capitalize;">${size} (${iconSizes[size]}px)</span>
          ${IconTemplate({ ...args, size })}
        </span>
    `,
      )
      .join('');

    return `
      <div style="display: flex; flex-direction: row; gap: 24px; padding: 20px;">
        ${sizeContainer}
      </div>
    `.trim();
  },
};

// Story de exemplo com tamanhos personalizados
export const CustomSize: Story = {
  args: {
    ...baseArgs,
    background: '#000',
    color: '#FFF',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso com tamanhos personalizados:',
      },
    },
    layout: 'centered',
  },
  render: (args: IconProps) => {
    const customSizes = [10, 20, 40, 60, 80];
    const sizeContainer = customSizes
      .map(
        (size) => `
        <span style="display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 20px;">
          <span style="font-size: 12px; color: #5F676C; text-transform: capitalize;">${size}px</span>
          ${IconTemplate({ ...args, size })}
        </span>
    `,
      )
      .join('');

    return `
      <div style="display: flex; flex-direction: row; gap: 24px; padding: 20px;">
        ${sizeContainer}
      </div>
    `.trim();
  },
};

// Story de exemplo com background
export const Background: Story = {
  args: {
    ...baseArgs,
    background: '#000',
    color: '#FFF',
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualização de ícones com diferentes formas de plano de fundo: `rounded`, `square` e `circle`.',
      },
    },
    layout: 'centered',
  },
  render: (args: IconProps) => {
    return `
    <div style="display: flex; flex-direction: row; gap: 24px; padding: 20px;">
      ${IconTemplate({ ...args, bgShape: 'square' })}
      ${IconTemplate({ ...args, bgShape: 'rounded' })}
      ${IconTemplate({ ...args, bgShape: 'circle' })}
    </div>
  `.trim();
  },
};

// Story de exemplo com direção
export const Direction: Story = {
  args: {
    ...baseArgs,
    background: '#000',
    color: '#FFF',
  },
  parameters: {
    docs: {
      description: {
        story: `Exemplo de uso com ícones que possuem sufixos de direção: \`-left\`, \`-right\`, \`-up\` e \`-down\`.\n\nGeralmente atribuídos para ícones que representam direções, como setas, botões de navegação, etc.`,
      },
    },
    layout: 'centered',
  },
  render: (args: IconProps) => {
    return `
      <div style="display: flex; flex-direction: row; gap: 24px; padding: 20px;">
        ${IconTemplate({ ...args, icon: 'arrow-left' })}
        ${IconTemplate({ ...args, icon: 'arrow-right' })}
        ${IconTemplate({ ...args, icon: 'arrow-up' })}
        ${IconTemplate({ ...args, icon: 'arrow-down' })}
      </div>
    `.trim();
  },
};
