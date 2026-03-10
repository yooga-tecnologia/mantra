import type { StoryObj } from '@storybook/html-vite';

import { RadioBaseProps } from './radio.types';

type Story = StoryObj;

export default {
  title: 'Forms/Radio',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **mnt-radio** é um elemento de formulário utilizado para selecionar uma opção de um conjunto.

### Eventos:
- \`radioChange\`: Disparado quando o radio é marcado ou desmarcado.

### Recomendações de uso:
- Utilize apenas quando for necessário selecionar uma opção de um conjunto.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do radio utilizado para identificar o campo no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto a ser exibido ao lado do radio. Se clicar no texto, o radio será marcado.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Indica se o radio está marcado inicialmente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica se o radio está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'Valor do radio utilizado para enviar no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-radio ${args}></mnt-checkbox>
    `;
  },
};

const RadioTemplate = (props: RadioBaseProps) => {
  return `
    <mnt-radio
      name="${props.name}"
      label="${props.label}"
      value="${props.value}"
      ${props.checked ? 'checked' : ''}
      ${props.disabled ? 'disabled' : ''}
    ></mnt-radio>
    `;
};

/**
 * Exemplo simples de uso do radio
 */
export const Default: Story = {
  args: {
    name: 'checkbox-1',
    label: 'Clique para marcar o radio',
    checked: false,
  },
  render: RadioTemplate,
};

/**
 * Exemplo de uso do radio desabilitado
 */
export const Disabled: Story = {
  args: {
    name: 'checkbox-2',
    label: 'Radio desabilitado',
    checked: true,
    disabled: true,
  },
  render: RadioTemplate,
};

/**
 * Exemplo de uso do checkbox com valor inicial marcado:
 */
export const Checked: Story = {
  args: {
    name: 'checkbox-3',
    label: 'Radio marcado inicialmente',
    checked: true,
  },
  render: RadioTemplate,
};

/**
 * Exemplo de uso do checkbox com valor:
 */
export const Value: Story = {
  args: {
    name: 'checkbox-4',
    label: 'Checkbox com valor',
    checked: true,
    value: 'value-1',
    disabled: false,
  },
  render: (args: RadioBaseProps) => `
    ${RadioTemplate(args)}

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

/**
 * Grupo de radios com exibição do valor selecionado em tempo real.
 * Utilize o evento `radioChange` para reagir à seleção do usuário.
 *
 * > #### ATENÇÃO:
 * > Simulação de seleção de valor em tempo real será exibido apenas no Story "Group".
 * >
 * > Na visualização "Docs", o valor selecionado não terá efeito visual.
 */
export const Group: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${RadioTemplate({ name: 'group-X', label: 'Opção A', value: 'value-A', checked: false, disabled: false })}
      ${RadioTemplate({ name: 'group-X', label: 'Opção B', value: 'value-B', checked: false, disabled: false })}
      ${RadioTemplate({ name: 'group-X', label: 'Opção C', value: 'value-C', checked: false, disabled: false })}

      <p id="radio-group-output" style="margin-top: 8px; font-size: 14px; color: #6b7280;">
        Nenhum valor selecionado
      </p>
    </div>
  `,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const output = canvasElement.querySelector<HTMLElement>('#radio-group-output');
    const radios = Array.from(canvasElement.querySelectorAll('mnt-radio'));

    await customElements.whenDefined('mnt-radio');
    await Promise.all(radios.map((radio) => radio.componentOnReady()));

    radios.forEach((radio) => {
      radio.addEventListener('radioChange', (event: CustomEvent<{ checked: boolean; value: string }>) => {
        if (!output) return;

        const { checked, value } = (event as CustomEvent<{ checked: boolean; value: string }>).detail;

        output.textContent = checked ? `Valor selecionado: ${value}` : 'Nenhum valor selecionado';
      });
    });
  },
};

Group.parameters = {
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
