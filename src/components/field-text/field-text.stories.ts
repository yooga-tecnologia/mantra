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
  title: 'Forms/FieldText',
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

export const Example = DefaultTemplate.bind({});
Example.args = {
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
    html += `<h4>${size}</h4>`;
    stateVariants.forEach((state) => {
      html += `<div>
        ${DefaultTemplate({
          inputName: `${size}-${state}`,
          labelText: `Label [${state}]`,
          size,
          state,
          iconLeft: 'plus',
          iconRight: 'minus',
          inlineMessage: state !== 'default' ? `Mensagem [${state}]` : '',
          required: state === 'error',
          hasActionButton: true,
          hasInfoButton: true,
        })}
      </div>`;
    });
  });
  // <h4>${color}</h4>
  return `
<div class="sb-section-box">
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    ${html}
  </div>
</div>
  `;
};

export const AllVariants: StoryFn = () => getAllVariants();
AllVariants.parameters = {
  controls: { disable: true },
};

// Currency Mask Stories
export const CurrencyMask: StoryFn = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <h3 style="margin: 0;">Currency Mask - Exemplos</h3>
    <p style="margin: 0; color: #666; font-size: 14px;">
      O campo com <code>mask="currency"</code> formata valores monetários <strong>em tempo real</strong> durante a digitação:
    </p>

    <div>
      <h4 style="margin: 0 0 8px 0;">Comportamento (tipo calculadora):</h4>
      <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
        <li><strong>Formatação instantânea:</strong> Cada dígito é tratado como centavo acumulando</li>
        <li><strong>Sem separadores manuais:</strong> Você digita apenas números, a formatação é automática</li>
        <li><strong>Fácil correção:</strong> Apague ou digite novos dígitos naturalmente</li>
        <li><strong>Valor inicial do backend:</strong> Aceita números com decimal (100.50 ou 100,50)</li>
      </ul>
    </div>

    <mnt-field-text
      input-name="currency-example"
      label-text="Valor (experimente digitar números)"
      placeholder="R$ 0,00"
      size="medium"
      mask="currency"
    ></mnt-field-text>

    <mnt-field-text
      input-name="currency-with-icon"
      label-text="Valor pré-preenchido"
      placeholder="R$ 0,00"
      size="medium"
      mask="currency"
      icon-left="dollar"
      value="1500.50"
    ></mnt-field-text>

    <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">Como digitar:</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #ddd;">
            <th style="padding: 8px;">Você digita</th>
            <th style="padding: 8px;">Resultado</th>
            <th style="padding: 8px;">Raw value</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><code>1</code></td>
            <td style="padding: 8px;">R$ 0,01</td>
            <td style="padding: 8px;">0.01</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><code>11</code></td>
            <td style="padding: 8px;">R$ 0,11</td>
            <td style="padding: 8px;">0.11</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><code>111</code></td>
            <td style="padding: 8px;">R$ 1,11</td>
            <td style="padding: 8px;">1.11</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><code>1111</code></td>
            <td style="padding: 8px;">R$ 11,11</td>
            <td style="padding: 8px;">11.11</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><code>11111</code></td>
            <td style="padding: 8px;">R$ 111,11</td>
            <td style="padding: 8px;">111.11</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><code>111111</code></td>
            <td style="padding: 8px;">R$ 1.111,11</td>
            <td style="padding: 8px;">1111.11</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background: #fff3cd; padding: 16px; border-radius: 8px; border-left: 4px solid #ffc107;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #856404;">⚠️ Importante: Valores iniciais do backend</h4>
      <p style="margin: 0; font-size: 14px; color: #856404;">
        Ao carregar dados do backend, passe valores numéricos com decimais:
      </p>
      <pre style="background: #fff; padding: 8px; border-radius: 4px; margin: 8px 0 0 0; overflow-x: auto;"><code>// Angular - Correto ✅
&lt;mnt-field-text
  mask="currency"
  [value]="product.price"  // ex: 1500.50
&gt;&lt;/mnt-field-text&gt;

// O componente formata automaticamente para R$ 1.500,50</code></pre>
    </div>

    <div style="background: #e3f2fd; padding: 16px; border-radius: 8px; border-left: 4px solid #2196f3;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1976d2;">💡 Dica de Uso</h4>
      <p style="margin: 0; font-size: 14px; color: #1565c0;">
        Use o evento <code>valueChange</code> para capturar tanto o valor formatado quanto o raw:
      </p>
      <pre style="background: #fff; padding: 8px; border-radius: 4px; margin: 8px 0 0 0; overflow-x: auto;"><code>// Angular
handleValueChange(event: CustomEvent) {
  const { formattedValue, rawValue } = event.detail;
  console.log(formattedValue); // "R$ 1.111,11"
  console.log(rawValue);       // "1111.11"

  // Enviar para backend
  this.payload.value = parseFloat(rawValue);
}

// Ou use o método getRawValue()
const fieldText = document.querySelector('mnt-field-text');
const rawValue = fieldText.getRawValue(); // "1111.11"</code></pre>
    </div>
  </div>
`;

CurrencyMask.parameters = {
  docs: {
    description: {
      story: 'Demonstração completa da máscara de moeda com formatação em tempo real tipo calculadora.',
    },
  },
};
