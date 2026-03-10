import type { StoryObj } from '@storybook/html-vite';

import { FieldDateProps, fieldDateSizeVariantsArray } from './field-date.types';

type Story = StoryObj;

export default {
  title: 'Forms/FieldDate',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente \`mnt-field-date\` é um elemento de formulário utilizado para inserir data.

### Características:
- Integração com \`mnt-date-picker\`: Abre automaticamente o date-picker ao clicar
- Modos Single e Range: Suporta seleção de data única ou intervalo
- Readonly Input: Previne digitação manual, força uso do picker
- Eventos Customizados: Emite \`valueChange\` e \`rawValueChange\`
- Click Outside: Fecha automaticamente ao clicar fora
- Acessível: Labels associados e atributos adequados

### Eventos:
- \`valueChange\`: Disparado quando o valor do campo é alterado
- \`rawValueChange\`: Disparado quando o valor do campo é alterado (sem formatação)

### Componentes relacionados:
- \`mnt-date-picker\`: Componente de seleção de data (single ou range)
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return FieldDateTemplate(storyContext.args as FieldDateProps);
        },
      },
    },
  },
  argTypes: {
    inputName: {
      control: 'text',
      description: 'Nome do campo utilizado para identificação no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    labelText: {
      control: 'text',
      description: 'Texto exibido ao lado do campo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'select',
      options: fieldDateSizeVariantsArray,
      description: 'Tamanho do campo',
      table: {
        type: { summary: fieldDateSizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido como placeholder no campo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    required: {
      control: 'boolean',
      description: 'Indica se o campo é obrigatório',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica se o campo está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inlineMessage: {
      control: 'text',
      description: 'Mensagem exibida abaixo do campo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-field-date ${args}></mnt-field-date>
    `;
  },
};

const FieldDateTemplate = (props: FieldDateProps) => {
  return `
    <mnt-field-date
      input-name="${props.inputName || ''}"
      label-text="${props.labelText || ''}"
      size="${props.size || 'medium'}"
      placeholder="${props.placeholder || ''}"
      ${props.required ? 'required' : ''}
      ${props.disabled ? 'disabled' : ''}
    ></mnt-field-date>`;
};

export const Default: Story = {
  args: {},
  render: FieldDateTemplate,
};
