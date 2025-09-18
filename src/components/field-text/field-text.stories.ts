import type { Meta, StoryFn } from '@storybook/html';
import { FieldTextProps } from './field-text.types';
import { ICON_OPTIONS } from '../icon/icon.utils';

type HTMLString = string;

const sizeVariants = ['small', 'medium', 'large'] as const;
const stateVariants = ['default', 'error', 'success'] as const;

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const meta: Meta<FieldTextProps> = {
  title: 'Components/FieldText',
  component: 'mnt-field-text',
  argTypes: {
    inputName: { control: 'text', description: 'Nome do input' },
    labelText: { control: 'text', description: 'Texto do label' },
    placeholder: { control: 'text', description: 'Placeholder do input' },
    required: { control: 'boolean', description: 'Campo obrigatório' },
    disabled: { control: 'boolean', description: 'Campo desabilitado' },
    iconLeft: {
      control: 'select',
      description: 'Ícone à esquerda',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
    iconRight: {
      control: 'select',
      description: 'Ícone à direita',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
    state: {
      control: 'select',
      options: stateVariants,
      description: 'Estado visual',
    },
    size: {
      control: 'select',
      options: sizeVariants,
      description: 'Tamanho',
    },
    inlineMessage: {
      control: 'text',
      description: 'Mensagem inline',
    },
    hasActionButton: {
      control: 'boolean',
      description: 'Exibe slot de ação',
    },
    hasInfoButton: {
      control: 'boolean',
      description: 'Exibe slot de info',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'O componente <mnt-field-text> é um campo de texto flexível e personalizável. Além das props visuais, ele aceita atributos nativos do input (como maxLength, minLength, max, min, value) e propaga eventos nativos (onInput, onChange, etc.), permitindo integração total com formulários e validações.',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: FieldTextProps): HTMLString => `
  <mnt-field-text
    input-name="${args.inputName || 'input'}"
    label-text="${args.labelText || ''}"
    placeholder="${args.placeholder || ''}"
    ${args.required ? 'required' : ''}
    ${args.disabled ? 'disabled' : ''}
    icon-left="${args.iconLeft || ''}"
    icon-right="${args.iconRight || ''}"
    state="${args.state || 'default'}"
    size="${args.size || 'medium'}"
    inline-message="${args.inlineMessage || ''}"
    ${args.hasActionButton ? 'has-action-button' : ''}
    ${args.hasInfoButton ? 'has-info-button' : ''}
  >
    ${args.hasActionButton ? '<mnt-button-icon slot="action-button" size="tiny" color="primary" variant="emphasis" icon="plus"></mnt-button-icon>' : ''}
    ${args.hasInfoButton ? '<mnt-button-icon slot="info-button" size="tiny" color="primary" variant="plain" icon="info"></mnt-button-icon>' : ''}
  </mnt-field-text>
`;

export const Playground = DefaultTemplate.bind({});
Playground.args = {
  inputName: 'input',
  labelText: 'Label',
  placeholder: 'Digite algo',
  required: false,
  disabled: false,
  iconLeft: '',
  iconRight: '',
  state: 'default',
  size: 'medium',
  inlineMessage: '',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextProps;

const getAllVariants = (): HTMLString => {
  let html = '';
  sizeVariants.forEach((size) => {
    stateVariants.forEach((state) => {
      html += DefaultTemplate({
        inputName: `${size}-${state}`,
        labelText: `${size} ${state}`,
        size,
        state,
        iconLeft: 'plus',
        iconRight: 'minus',
        inlineMessage: state !== 'default' ? `Mensagem [${state}]` : '',
        required: state === 'error',
        hasActionButton: true,
        hasInfoButton: true,
      });
    });
  });
  return `
<div class="sb-grid-3">
  ${html}
</div>
  `;
};

export const AllVariants: StoryFn = () => getAllVariants();
AllVariants.parameters = {
  controls: { disable: true },
};
