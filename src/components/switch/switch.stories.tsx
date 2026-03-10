import type { StoryObj } from '@storybook/html-vite';
import { SwitchBaseProps } from './switch.types';

type Story = StoryObj;

export default {
  title: 'Forms/Switch',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-switch\` é um elemento de interface utilizado para inserir valores booleanos.

Pode ser usado como um botão ou como um input de formulário.

### Características:
- Por padrão, ao clicar no switch, ele é marcado (checked = true).

### Eventos:
- \`switchChange\`: Disparado quando o valor do switch é alterado.
- \`switchBlur\`: Disparado quando o switch perde o foco.
- \`switchFocus\`: Disparado quando o switch recebe o foco.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return SwitchTemplate(storyContext.args as SwitchBaseProps);
        },
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido ao lado do switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      control: 'text',
      description: 'Texto exibido abaixo do label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-switch ${args}></mnt-switch>
    `;
  },
};

const SwitchTemplate = (props: SwitchBaseProps) => {
  return `
    <mnt-switch
      label="${props.label || ''}"
      description="${props.description || ''}"
      ${props.disabled ? 'disabled' : ''}
    ></mnt-switch>`;
};

/**
 * Exemplo de uso do switch com label + descrição.
 */
export const Default: Story = {
  args: {
    label: 'Aceitar termos',
    description: 'Você deve aceitar para continuar',
  },
  render: SwitchTemplate,
};

/**
 * Exemplo de uso do switch apenas.
 */
export const SwitchOnly: Story = {
  args: {},
  render: SwitchTemplate,
};

/**
 * Exemplo de uso do switch desabilitado.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: () => `
    <div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 32px;">
      ${SwitchTemplate({ disabled: true, label: 'Aceitar termos', description: 'Você deve aceitar para continuar' } as SwitchBaseProps)}
      ${SwitchTemplate({ disabled: true } as SwitchBaseProps)}
    </div>
  `,
};
