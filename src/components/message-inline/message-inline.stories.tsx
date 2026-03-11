import type { StoryObj } from '@storybook/html-vite';

import { messageInlineColorVariantsArray, MessageInlineProps } from './message-inline.types';
import { ICON_OPTIONS } from '../icon/icon.utils';

type Story = StoryObj;

export default {
  title: 'Feedback/MessageInline',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-message-inline\` é um elemento de feedback utilizado para exibir uma mensagem inline.

## Recomendações
- Por padrão, o ícone é exibido de acordo com a variante da mensagem
- É possível adicionar um ícone personalizado utilizando a propriedade \`icon\`
- Geralmente é utilizado para exibir mensagens de erro, sucesso ou informação em campos de formulário ou outros elementos da interface.

        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return MessageInlineTemplate(storyContext.args as MessageInlineProps);
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
        defaultValue: { summary: 'undefined' },
      },
    },
    variant: {
      control: 'select',
      options: messageInlineColorVariantsArray,
      description: 'Variante de cor da mensagem',
      table: {
        type: { summary: messageInlineColorVariantsArray.join(' | ') },
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
    hasPadding: {
      control: 'boolean',
      description: 'Adiciona padding ao componente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-message-inline ${args}></mnt-message-inline>
    `;
  },
};

const MessageInlineTemplate = (props: MessageInlineProps) => {
  return `
    <mnt-message-inline
      label="${props.label || ''}"
      variant="${props.variant || 'neutral'}"
      icon="${props.icon}"
      ${props.hasPadding ? 'has-padding' : ''}
    ></mnt-message-inline>`;
};

export const Default: Story = {
  args: {
    label: 'Mensagem de informação',
    variant: 'neutral',
    icon: '',
    hasPadding: false,
  },
  render: MessageInlineTemplate,
};
