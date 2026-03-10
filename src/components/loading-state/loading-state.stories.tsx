import type { StoryObj } from '@storybook/html-vite';
import { loadingStateColorVariantsArray, LoadingStateProps } from './loading-state.types';

type Story = StoryObj;

export default {
  title: 'Feedback/LoadingState',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-loading-state\` é um elemento de feedback utilizado para indicar que uma ação está em andamento.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return LoadingStateTemplate(storyContext.args as LoadingStateProps);
        },
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido abaixo do spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: 'select',
      options: loadingStateColorVariantsArray,
      description: 'Cor do spinner',
      table: {
        type: { summary: loadingStateColorVariantsArray.join(' | ') },
        defaultValue: { summary: 'neutral' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-field-number ${args}></mnt-field-number>
    `;
  },
};

const LoadingStateTemplate = (props: LoadingStateProps) => {
  return `
    <mnt-loading-state
      label="${props.label || ''}"
      color="${props.color || 'neutral'}"
    ></mnt-loading-state>`;
};

/**
 * Exemplo de uso do campo de número com `variant="default"` (padrão).
 */
export const Default: Story = {
  args: {
    label: 'Carregando...',
    color: 'primary',
  },
  render: LoadingStateTemplate,
};
