import type { Meta, StoryFn } from '@storybook/html';
import { FieldTextAreaProps } from './field-text-area.types';

type HTMLString = string;

const stateVariants = ['default', 'error', 'success'] as const;

const meta: Meta<FieldTextAreaProps> = {
  title: 'Forms/FieldTextArea',
  component: 'mnt-field-text-area',
  argTypes: {
    inputName: { control: 'text', description: 'Nome do textarea' },
    labelText: { control: 'text', description: 'Texto do label' },
    placeholder: { control: 'text', description: 'Placeholder do textarea' },
    required: { control: 'boolean', description: 'Campo obrigatório' },
    disabled: { control: 'boolean', description: 'Campo desabilitado' },
    state: {
      control: 'select',
      options: stateVariants,
      description: 'Estado visual',
    },
    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres',
    },
    rows: {
      control: 'number',
      description: 'Número de linhas visíveis',
    },
    value: {
      control: 'text',
      description: 'Valor do textarea',
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
          'O componente <mnt-field-text-area> é um campo de texto multilinha (textarea) flexível e personalizável. Suporta estados visuais (default, error, success), contador de caracteres dinâmico, e aceita atributos nativos do textarea (como maxLength, rows, value). Emite evento valueChange com o valor atualizado.',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: FieldTextAreaProps): HTMLString => `
  <mnt-field-text-area
    input-name="${args.inputName || 'textarea'}"
    label-text="${args.labelText || ''}"
    placeholder="${args.placeholder || ''}"
    ${args.required ? 'required' : ''}
    ${args.disabled ? 'disabled' : ''}
    state="${args.state || 'default'}"
    max-length="${args.maxLength || 300}"
    rows="${args.rows || 5}"
    value="${args.value || ''}"
    inline-message="${args.inlineMessage || ''}"
    ${args.hasActionButton ? 'has-action-button' : ''}
    ${args.hasInfoButton ? 'has-info-button' : ''}
  >
    ${args.hasActionButton ? '<mnt-button-icon slot="action-button" size="tiny" color="primary" variant="emphasis" icon="plus"></mnt-button-icon>' : ''}
    ${args.hasInfoButton ? '<mnt-button-icon slot="info-button" size="tiny" color="primary" variant="plain" icon="info"></mnt-button-icon>' : ''}
  </mnt-field-text-area>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  inputName: 'textarea',
  labelText: 'Label',
  placeholder: 'Digite algo...',
  required: false,
  disabled: false,
  state: 'default',
  maxLength: 300,
  rows: 5,
  value: '',
  inlineMessage: '',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

export const WithValue = DefaultTemplate.bind({});
WithValue.args = {
  inputName: 'textarea-filled',
  labelText: 'Label',
  placeholder: 'Digite algo...',
  required: true,
  disabled: false,
  state: 'default',
  maxLength: 300,
  rows: 5,
  value: 'Este é um texto de exemplo que já está preenchido no campo.',
  inlineMessage: '',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

export const ErrorState = DefaultTemplate.bind({});
ErrorState.args = {
  inputName: 'textarea-error',
  labelText: 'Label',
  placeholder: 'Digite algo...',
  required: true,
  disabled: false,
  state: 'error',
  maxLength: 300,
  rows: 5,
  value: '',
  inlineMessage: 'Este campo é obrigatório',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

export const SuccessState = DefaultTemplate.bind({});
SuccessState.args = {
  inputName: 'textarea-success',
  labelText: 'Label',
  placeholder: 'Digite algo...',
  required: false,
  disabled: false,
  state: 'success',
  maxLength: 300,
  rows: 5,
  value: 'Texto validado com sucesso!',
  inlineMessage: 'Campo preenchido corretamente',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

export const DisabledState = DefaultTemplate.bind({});
DisabledState.args = {
  inputName: 'textarea-disabled',
  labelText: 'Label',
  placeholder: 'Campo desabilitado',
  required: false,
  disabled: true,
  state: 'default',
  maxLength: 300,
  rows: 5,
  value: '',
  inlineMessage: '',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

export const DisabledWithValue = DefaultTemplate.bind({});
DisabledWithValue.args = {
  inputName: 'textarea-disabled-filled',
  labelText: 'Label',
  placeholder: 'Campo desabilitado',
  required: true,
  disabled: true,
  state: 'default',
  maxLength: 300,
  rows: 5,
  value: 'Este campo está desabilitado mas possui conteúdo.',
  inlineMessage: '',
  hasActionButton: false,
  hasInfoButton: false,
} as unknown as FieldTextAreaProps;

const getAllVariants = (): HTMLString => {
  let html = '';
  
  // Default states
  html += '<h4>Default States</h4>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px;">';
  
  stateVariants.forEach((state) => {
    html += `
      <div>
        ${DefaultTemplate({
          inputName: `variant-${state}`,
          labelText: `Label [${state}]`,
          state,
          placeholder: 'Placeholder',
          inlineMessage: state !== 'default' ? `Mensagem [${state}]` : '',
          required: true,
          maxLength: 300,
          rows: 5,
          hasActionButton: true,
          hasInfoButton: true,
        })}
      </div>
    `;
  });
  
  // Disabled
  html += `
    <div>
      ${DefaultTemplate({
        inputName: 'variant-disabled',
        labelText: 'Label [disabled]',
        state: 'default',
        disabled: true,
        placeholder: 'Placeholder',
        required: true,
        maxLength: 300,
        rows: 5,
      })}
    </div>
  `;
  
  html += '</div>';
  
  // Filled states
  html += '<h4>Filled States</h4>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">';
  
  stateVariants.forEach((state) => {
    html += `
      <div>
        ${DefaultTemplate({
          inputName: `variant-filled-${state}`,
          labelText: `Label [${state}]`,
          state,
          value: 'Texto preenchido no campo',
          inlineMessage: state !== 'default' ? `Mensagem [${state}]` : '',
          required: true,
          maxLength: 300,
          rows: 5,
          hasActionButton: true,
          hasInfoButton: true,
        })}
      </div>
    `;
  });
  
  // Disabled filled
  html += `
    <div>
      ${DefaultTemplate({
        inputName: 'variant-disabled-filled',
        labelText: 'Label [disabled]',
        state: 'default',
        disabled: true,
        value: 'Texto preenchido no campo',
        required: true,
        maxLength: 300,
        rows: 5,
      })}
    </div>
  `;
  
  html += '</div>';

  return `
    <div class="sb-section-box">
      ${html}
    </div>
  `;
};

export const AllVariants: StoryFn = () => getAllVariants();
AllVariants.parameters = {
  controls: { disable: true },
};

