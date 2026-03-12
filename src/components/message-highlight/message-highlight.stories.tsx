import type { StoryFn, StoryObj } from '@storybook/html-vite';

import {
  MessageHighlightColorVariants,
  messageHighlightColorVariantsArray,
  MessageHighlightProps,
  MessageHighlightTypeVariants,
  messageHighlightTypeVariantsArray,
} from './message-highlight.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

export default {
  title: 'Feedback/MessageHighlight',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente \`mnt-message-highlight\` é um elemento de feedback utilizado para exibir uma mensagem de destaque.

## Recomendações
- Por padrão, o ícone é exibido de acordo com a variante da mensagem
- É possível adicionar um ícone personalizado utilizando a propriedade \`icon\`
- Geralmente é utilizado para exibir mensagens de destaque.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return MessageHighlightTemplate(storyContext.args as MessageHighlightProps);
        },
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido à direita do ícone',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: messageHighlightTypeVariantsArray,
      description: 'Tipo de mensagem',
      table: {
        type: { summary: messageHighlightTypeVariantsArray.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: messageHighlightColorVariantsArray,
      description: 'Variante de cor da mensagem',
      table: {
        type: { summary: messageHighlightColorVariantsArray.join(' | ') },
        defaultValue: { summary: 'neutral' },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à direita do texto',
      table: {
        type: { summary: ICON_OPTIONS.join(' | ') },
        defaultValue: { summary: 'undefined' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Adiciona largura 100% ao componente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    marginBottom: {
      control: 'boolean',
      description: 'Adiciona margem inferior ao componente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-message-highlight ${args}></mnt-message-highlight>
    `;
  },
};

const MessageHighlightTemplate = (props: MessageHighlightProps) => {
  return `
    <mnt-message-highlight
      label="${props.label || ''}"
      variant="${props.variant || 'neutral'}"
      type="${props.type || 'default'}"
      icon="${props.icon}"
      full-width="${props.fullWidth || false}"
      margin-bottom="${props.marginBottom || false}"
    ></mnt-message-inline>`;
};

export const Default: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    type: 'default',
    icon: '',
    fullWidth: false,
    marginBottom: false,
  },
  render: MessageHighlightTemplate,
};

/**
 * Exemplo de uso com largura 100%
 */
export const FullWidth: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    type: 'emphasis',
    icon: '',
    fullWidth: true,
    marginBottom: false,
  },
  render: MessageHighlightTemplate,
};

/**
 * Exemplo de uso com margem inferior
 */
export const MarginBottom: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    icon: '',
    type: 'emphasis',
    fullWidth: true,
    marginBottom: true,
  },
  render: MessageHighlightTemplate,
};

const getColorVariants = (color: MessageHighlightColorVariants, type: MessageHighlightTypeVariants, fullWidth: boolean): HTMLString => {
  return `
    <mnt-message-highlight label="${color + '/' + type + ' message'}" variant="${color}" type="${type}" full-width="${fullWidth}" margin-bottom="false"></mnt-message-highlight>
  `;
};

/**
 * Todas as variantes e estados
 */
export const AllVariants: StoryFn = () => {
  const variants: HTMLString[] = [];

  messageHighlightColorVariantsArray.forEach((color) => {
    variants.push(`<h2>${color}</h2>`);
    variants.push(`<h3>Inline</h3>`);
    variants.push(getColorVariants(color, 'default', false));
    variants.push(getColorVariants(color, 'emphasis', false));
    variants.push(`<h3>Full Width</h3>`);
    variants.push(getColorVariants(color, 'default', true));
    variants.push(getColorVariants(color, 'emphasis', true));
  });

  return `
<div>
${variants.join('')}
</div>
`;
};

AllVariants.parameters = {
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
