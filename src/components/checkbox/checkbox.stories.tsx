import type { StoryObj } from '@storybook/html-vite';

import { CheckboxBaseProps, checkboxVariantArray } from './checkbox.types';

type Story = StoryObj;

export default {
  title: 'Forms/Checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **mnt-checkbox** é um elemento de formulário utilizado para selecionar uma ou mais opções de um conjunto.

### Recomendações de uso:
- **Variantes:**
  - \`check\`: Checkbox comum, exibindo ícone \`check\` (✓) quando marcado.
  - \`indeterminate\`: Checkbox com estado intermediário, exibindo ícone \`minus\` (−) quando marcado. Geralmente utilizado para indicar que um conjunto de checkboxes está marcado.

        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do checkbox utilizado para identificar o campo no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto a ser exibido ao lado do checkbox. Se clicar no texto, o checkbox será marcado.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    variant: {
      control: 'select',
      options: checkboxVariantArray,
      description: 'Variante do checkbox',
      table: {
        type: { summary: checkboxVariantArray.join(' | ') },
        defaultValue: { summary: 'check' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Indica se o checkbox está marcado inicialmente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica se o checkbox está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'Valor do checkbox utilizado para enviar no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-checkbox ${args}></mnt-checkbox>
    `;
  },
};

const CheckboxTemplate = (props: CheckboxBaseProps) => {
  return `
    <mnt-checkbox
      name="${props.name}"
      label="${props.label}"
      variant="${props.variant}"
      value="${props.value}"
      ${props.checked ? 'checked' : ''}
      ${props.disabled ? 'disabled' : ''}
    ></mnt-checkbox>
    `;
};

/**
 * Exemplo simples de uso do checkbox
 */
export const Default: Story = {
  args: {
    name: 'checkbox-1',
    label: 'Clique para marcar o checkbox',
    variant: 'check',
    checked: false,
  },
  render: CheckboxTemplate,
};

/**
 * Exemplo de uso do checkbox com variante `indeterminate`
 */
export const Indeterminate: Story = {
  args: {
    name: 'checkbox-2',
    label: 'Clique para marcar o checkbox indeterminado',
    variant: 'indeterminate',
    checked: false,
  },
  render: CheckboxTemplate,
};

/**
 * Exemplo de uso do checkbox desabilitado
 */
export const Disabled: Story = {
  args: {
    name: 'checkbox-2',
    label: 'Checkbox desabilitado',
    variant: 'indeterminate',
    checked: true,
    disabled: true,
  },
  render: CheckboxTemplate,
};

/**
 * Exemplo de uso do checkbox com valor inicial marcado:
 */
export const Checked: Story = {
  args: {
    name: 'checkbox-3',
    label: 'Checkbox marcado inicialmente',
    variant: 'check',
    checked: true,
  },
  render: CheckboxTemplate,
};

/**
 * Exemplo de uso do checkbox com valor:
 */
export const Value: Story = {
  args: {
    name: 'checkbox-4',
    label: 'Checkbox com valor',
    variant: 'check',
    checked: true,
    value: 'value-1',
    disabled: false,
  },
  render: (args: CheckboxBaseProps) => `
    ${CheckboxTemplate(args)}

    <p class="sb-">
      ${args.value ? `Valor: ${args.value}` : ''}
    </p>
  `,
};

Value.parameters = {
  docs: {
    codePanel: true,
  },
};
