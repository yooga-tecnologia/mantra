import type { StoryObj } from '@storybook/html-vite';

import { FieldTextProps, fieldTextSizeVariantsArray, fieldTextStateVariantsArray } from './field-text.types';
import { ICON_OPTIONS } from '../icon/icon.utils';

type Story = StoryObj;

export default {
  title: 'Forms/FieldText',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-field-text\` é um elemento de formulário utilizado para inserir texto.
        `,
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
      options: fieldTextSizeVariantsArray,
      description: 'Tamanho do campo',
      table: {
        type: { summary: fieldTextSizeVariantsArray.join(' | ') },
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
    state: {
      control: 'select',
      options: fieldTextStateVariantsArray,
      description: 'Estado do campo',
      table: {
        type: { summary: fieldTextStateVariantsArray.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à esquerda do campo',
      table: {
        type: { summary: ICON_OPTIONS.join(' | ') },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à direita do campo',
      table: {
        type: { summary: ICON_OPTIONS.join(' | ') },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-field-text ${args}></mnt-field-text>
    `;
  },
};

const FieldTextTemplate = (props: FieldTextProps) => {
  return `
    <mnt-field-text
      input-name="${props.inputName}"
      label-text="${props.labelText}"
      size="${props.size}"
      placeholder="${props.placeholder}"
      state="${props.state}"
      icon-left="${props.iconLeft || ''}"
      icon-right="${props.iconRight || ''}"
      ${props.required ? 'required' : ''}
      ${props.disabled ? 'disabled' : ''}
    ></mnt-field-text>`;
};

/**
 * Exemplo simples de uso do radio
 */
export const Default: Story = {
  args: {
    inputName: 'field-text-1',
    size: 'medium',
    labelText: 'Label',
    placeholder: 'Placeholder',
    state: 'default',
    required: false,
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: FieldTextTemplate({
          inputName: 'field-text-1',
          size: 'medium',
          labelText: 'Label',
          placeholder: 'Placeholder',
          state: 'default',
          required: false,
          disabled: false,
        }),
      },
    },
  },
  render: () => {
    return FieldTextTemplate({
      inputName: 'field-text-1',
      size: 'medium',
      labelText: 'Label',
      placeholder: 'Placeholder',
      state: 'default',
      required: false,
      disabled: false,
    });
  },
};

const INFO_BUTTON_TEMPLATE = `
<mnt-field-text label-text="Label" placeholder="Placeholder" has-info-button>
  <mnt-tooltip text="Tooltip de informação" slot="info-button">
    <mnt-icon icon="info" size="tiny" slot="trigger"></mnt-icon>
  </mnt-tooltip>
</mnt-field-text>
`;
/**
 * Exemplo de uso do field-text com botão de informação + tooltip
 */
export const InfoButton: Story = {
  args: {
    inputName: 'field-text-info-button',
    size: 'medium',
    labelText: 'Label',
    placeholder: 'Placeholder',
    state: 'default',
    required: false,
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    hasActionButton: true,
  },
  parameters: {
    docs: {
      source: {
        code: INFO_BUTTON_TEMPLATE,
      },
    },
  },
  render: () => {
    return INFO_BUTTON_TEMPLATE;
  },
};

/**
 * Exemplo de uso do field-text com botões de ação
 */
export const ActionButton: Story = {
  args: {
    inputName: 'field-text-action-button',
    size: 'medium',
    labelText: 'Label',
    placeholder: 'Placeholder',
    state: 'default',
    required: false,
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    hasActionButton: true,
  },
  render: () => {
    return `
      <mnt-field-text label-text="Label" placeholder="Placeholder" has-action-button>
        <mnt-button size="small" slot="action-button">Ação 1</mnt-button>
        <mnt-button style="margin-left: 8px;" size="small" variant="emphasis" slot="action-button">Ação 2</mnt-button>
      </mnt-field-text>
    `;
  },
};
