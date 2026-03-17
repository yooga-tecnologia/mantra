import type { StoryObj } from '@storybook/html-vite';

import { ICON_OPTIONS } from '../icon/icon.utils';
import { messageHighlightColorVariantsArray, MessageHighlightProps, messageHighlightTypeVariantsArray } from './message-highlight.types';

type Story = StoryObj;

export default {
  title: 'Feedback/MessageHighlight',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      codePanel: true,
      description: {
        component: `
O componente \`mnt-message-highlight\` é um elemento de feedback utilizado para exibir mensagens de informação, aviso ou erro.
        `,
      },
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
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Distribuição do conteúdo do componente',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'left' },
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
      align="${props.align || 'left'}"
    ></mnt-message-highlight>`;
};

/**
 * Exemplo simples de uso do componente `mnt-message-highlight`.
 */
export const Default: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    type: 'default',
    icon: 'info',
    fullWidth: false,
    marginBottom: false,
    align: 'left',
  },
  render: MessageHighlightTemplate,
};

export const FullWidth: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    type: 'default',
    icon: 'info',
    fullWidth: true,
    marginBottom: false,
    align: 'left',
  },
  render: MessageHighlightTemplate,
};

export const WithMarginBottom: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    type: 'default',
    icon: 'info',
    fullWidth: false,
    marginBottom: true,
    align: 'left',
  },
  render: MessageHighlightTemplate,
};

export const WithAlignCenter: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'success',
    type: 'emphasis',
    icon: 'info',
    fullWidth: true,
    marginBottom: false,
    align: 'center',
  },
  render: MessageHighlightTemplate,
};
