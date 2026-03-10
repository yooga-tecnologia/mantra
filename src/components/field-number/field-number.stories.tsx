import type { StoryObj } from '@storybook/html-vite';
import { FieldNumberProps, fieldNumberVariantsArray } from './field-number.types';

type Story = StoryObj;

export default {
  title: 'Forms/FieldNumber',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente \`mnt-field-number\` é um elemento de formulário utilizado para inserir valores numéricos.

### Características:
- Variants: Suporta três variantes: \`default\`, \`plain\` e \`simple\`

> **ATENÇÃO:**
> A propriedade \`size\` ainda não está implementada.

### Eventos:
- \`fieldNumberChange\`: Disparado quando o valor do campo é alterado.
- \`fieldNumberBlur\`: Disparado quando o campo perde o foco.
- \`fieldNumberFocus\`: Disparado quando o campo recebe o foco.
- \`fieldNumberIncrement\`: Disparado quando o usuário incrementa o valor do campo (botão de incremento)
- \`fieldNumberDecrement\`: Disparado quando o usuário decrementa o valor do campo (botão de decremento)
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return FieldNumberTemplate(storyContext.args as FieldNumberProps);
        },
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: fieldNumberVariantsArray,
      description: 'Variante do campo de número',
      table: {
        type: { summary: fieldNumberVariantsArray.join(' | ') },
        defaultValue: { summary: 'plain' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto exibido acima do campo. Só é exibido se `variant="default"`.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Indica se o campo é obrigatório. Só é exibido se o label for informado.',
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
  },
  render: (args) => {
    return `
      <mnt-field-number ${args}></mnt-field-number>
    `;
  },
};

const FieldNumberTemplate = (props: FieldNumberProps) => {
  return `
    <mnt-field-number
      input-name="${props.inputName || ''}"
      label="${props.label || ''}"
      size="${props.size || 'medium'}"
      variant="${props.variant || 'plain'}"
      disabled="${props.disabled || false}"
      required="${props.required || false}"
    ></mnt-field-number>`;
};

/**
 * Exemplo de uso do campo de número com `variant="default"` (padrão).
 */
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: FieldNumberTemplate,
};

/**
 * Exemplo de uso do campo de número com `variant="plain"`.
 */
export const Plain: Story = {
  args: {
    variant: 'plain',
  },
  render: FieldNumberTemplate,
};

/**
 * Exemplo de uso do campo de número com `variant="simple"`.
 *
 * ATENÇÃO: Essa variante não funciona bem com números grandes ou negativos!
 */
export const Simple: Story = {
  args: {
    variant: 'simple',
  },
  render: FieldNumberTemplate,
};

/**
 * Exemplo de uso do campo de número desabilitado.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: () => `
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; gap: 12px;">
      ${FieldNumberTemplate({ disabled: true, variant: 'default', label: 'Valor', required: false } as FieldNumberProps)}
      ${FieldNumberTemplate({ disabled: true, variant: 'plain', required: false } as FieldNumberProps)}
      ${FieldNumberTemplate({ disabled: true, variant: 'simple', required: false } as FieldNumberProps)}
    </div>
  `,
};
