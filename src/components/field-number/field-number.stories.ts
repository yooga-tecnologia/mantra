import type { Meta, StoryFn } from '@storybook/html';
import { FieldNumberProps } from './field-number.types';

type HTMLString = string;

const meta: Meta<FieldNumberProps> = {
  title: 'Forms/FieldNumber',
  component: 'mnt-field-number',
  parameters: {
    docs: {
      description: {
        component: `
O componente **FieldNumber** é um campo de entrada numérica com funcionalidades avançadas de incremento e decremento. Oferece diferentes variantes visuais e controles intuitivos para manipulação de valores numéricos.

## Características

- **Botões de incremento/decremento**: Controles visuais para ajustar valores
- **Múltiplas variantes**: Default, Plain e Simple
- **Múltiplos tamanhos**: Small (32px), Medium (42px), Large (56px)
- **Formatação decimal**: Suporte a casas decimais configuráveis
- **Validação**: Valores mínimos e máximos
- **Estados visuais**: Default, hover, focus, error, success, disabled
- **Eventos customizados**: Emissão de eventos para mudanças de valor
- **Acessibilidade**: Suporte completo a leitores de tela

## Uso

\`\`\`html
<mnt-field-number
  input-name="quantidade"
  label="Quantidade"
  value="1"
  min="0"
  max="100"
  step="1"
  variant="default">
</mnt-field-number>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'plain'],
      description: 'Variante visual do componente',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: '"default" | "plain"' },
      },
    },
    inputName: {
      control: { type: 'text' },
      description: 'Nome do campo para formulários',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto atribuído ao label do campo',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Indica se o campo é obrigatório',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Indica se o campo está desabilitado',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

const DefaultTemplate = (
  args: FieldNumberProps & {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    toFixed?: number;
    placeholder?: string;
  },
): HTMLString => `
  <mnt-field-number
    input-name="${args.inputName}"
    label="${args.label || ''}"
    value="${args.value || ''}"
    ${args.min !== undefined ? `min="${args.min}"` : ''}
    ${args.max !== undefined ? `max="${args.max}"` : ''}
    ${args.step !== undefined ? `step="${args.step}"` : ''}
    ${args.toFixed !== undefined ? `to-fixed="${args.toFixed}"` : ''}
    variant="${args.variant}"
    ${args.required ? 'required' : ''}
    ${args.disabled ? 'disabled' : ''}
    placeholder="${args.placeholder || ''}">
  </mnt-field-number>
`;

/**
 * Exemplo básico do FieldNumber com configuração padrão.
 * Inclui botões de incremento e decremento para facilitar a entrada de valores.
 */
export const Playground = DefaultTemplate.bind({});
Playground.args = {
  inputName: 'playground-field',
  label: 'Quantidade',
  value: 5,
  min: 0,
  max: 100,
  step: 1,
  variant: 'default',
} as FieldNumberProps & { value: number; min: number; max: number; step: number };

/**
 * Variante padrão com botões de incremento e decremento visíveis.
 * Ideal para casos onde o usuário precisa de controles visuais claros.
 */
export const Default = DefaultTemplate.bind({});
Default.args = {
  inputName: 'default-field',
  label: 'Valor padrão',
  value: 10,
  step: 1,
  variant: 'default',
} as FieldNumberProps & { value: number; step: number };

/**
 * Variante plain com estilo minimalista mas mantendo funcionalidades.
 * Oferece um visual mais discreto mantendo os controles disponíveis.
 */
export const Plain = DefaultTemplate.bind({});
Plain.args = {
  inputName: 'plain-field',
  label: 'Valor plain',
  value: 50,
  variant: 'plain',
} as FieldNumberProps & { value: number };

/**
 * Exemplo com valores decimais e formatação.
 * Demonstra o uso de casas decimais e incrementos fracionários.
 */
export const WithDecimals = DefaultTemplate.bind({});
WithDecimals.args = {
  inputName: 'decimal-field',
  label: 'Valor decimal',
  value: 3.14,
  step: 0.01,
  toFixed: 2,
  variant: 'default',
} as FieldNumberProps & { value: number; step: number; toFixed: number };

/**
 * Campo com validação de limites mínimos e máximos.
 * Os botões ficam desabilitados quando os limites são atingidos.
 */
export const WithLimits = DefaultTemplate.bind({});
WithLimits.args = {
  inputName: 'limits-field',
  label: 'Com limites (0-10)',
  value: 5,
  min: 0,
  max: 10,
  step: 1,
  variant: 'default',
} as FieldNumberProps & { value: number; min: number; max: number; step: number };

/**
 * Campo obrigatório com indicador visual.
 * Mostra o asterisco de campo obrigatório no label do input.
 */
export const Required = DefaultTemplate.bind({});
Required.args = {
  inputName: 'required-field',
  label: 'Campo obrigatório',
  value: 0,
  required: true,
  variant: 'default',
} as FieldNumberProps & { value: number };

/**
 * Campo desabilitado para demonstrar estado inativo.
 * Todos os controles ficam inacessíveis quando desabilitado.
 */
// export const Disabled = DefaultTemplate.bind({});
// Disabled.args = {
//   inputName: 'disabled-field',
//   label: 'Campo desabilitado',
//   value: 42,
//   disabled: true,
//   variant: 'default',
// } as FieldNumberProps & { value: number };

/**
 * Exemplo de múltiplos campos para formulários complexos.
 * Demonstra como diferentes configurações funcionam em conjunto.
 */
const MultipleFieldsTemplate = (): HTMLString => `
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
    <mnt-field-number
      input-name="quantity"
      label="Quantidade"
      value="1"
      min="1"
      max="99"
      step="1"
      variant="default">
    </mnt-field-number>

    <mnt-field-number
      input-name="price"
      label="Preço (R$)"
      value="19.99"
      step="0.01"
      to-fixed="2"
      variant="default">
    </mnt-field-number>

    <mnt-field-number
      input-name="weight"
      label="Peso (kg)"
      value="2.5"
      step="0.1"
      to-fixed="1"
      variant="plain">
    </mnt-field-number>
  </div>
`;

export const MultipleFields: StoryFn = MultipleFieldsTemplate;

/**
 * Demonstra as três variantes: Plain, Default e Simple
 */
const VariantsTemplate = (): HTMLString => `
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
    <div>
      <h3 style="margin-bottom: 1rem;">Variante PLAIN</h3>
      <mnt-field-number
        input-name="plain-example"
        variant="plain"
        value="0">
      </mnt-field-number>
    </div>

    <div>
      <h3 style="margin-bottom: 1rem;">Variante DEFAULT</h3>
      <mnt-field-number
        input-name="default-example"
        variant="default"
        label="Quantidade"
        value="1"
        required>
      </mnt-field-number>
    </div>

    <div>
      <h3 style="margin-bottom: 1rem;">Variante SIMPLE</h3>
      <mnt-field-number
        input-name="simple-example"
        variant="simple"
        value="10">
      </mnt-field-number>
    </div>
  </div>
`;

export const Variants: StoryFn = VariantsTemplate;

/**
 * Demonstra os três tamanhos em cada variante
 */
const SizesTemplate = (): HTMLString => `
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
    <div>
      <h3 style="margin-bottom: 1rem;">Tamanhos - PLAIN</h3>
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Small (32px)</p>
          <mnt-field-number input-name="plain-small" variant="plain" size="small" value="0"></mnt-field-number>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Medium (42px)</p>
          <mnt-field-number input-name="plain-medium" variant="plain" size="medium" value="0"></mnt-field-number>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Large (56px)</p>
          <mnt-field-number input-name="plain-large" variant="plain" size="large" value="0"></mnt-field-number>
        </div>
      </div>
    </div>

    <div>
      <h3 style="margin-bottom: 1rem;">Tamanhos - DEFAULT</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <mnt-field-number input-name="default-small" variant="default" size="small" label="Small (32px)" value="1"></mnt-field-number>
        <mnt-field-number input-name="default-medium" variant="default" size="medium" label="Medium (42px)" value="1"></mnt-field-number>
        <mnt-field-number input-name="default-large" variant="default" size="large" label="Large (56px)" value="1"></mnt-field-number>
      </div>
    </div>

    <div>
      <h3 style="margin-bottom: 1rem;">Tamanhos - SIMPLE</h3>
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Small (32x32px)</p>
          <mnt-field-number input-name="simple-small" variant="simple" size="small" value="5"></mnt-field-number>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Medium (42x42px)</p>
          <mnt-field-number input-name="simple-medium" variant="simple" size="medium" value="10"></mnt-field-number>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 0.5rem;">Large (56x56px)</p>
          <mnt-field-number input-name="simple-large" variant="simple" size="large" value="20"></mnt-field-number>
        </div>
      </div>
    </div>
  </div>
`;

export const Sizes: StoryFn = SizesTemplate;

/**
 * Demonstra os estados visuais: default, hover, focus, error, success, disabled
 */
const StatesTemplate = (): HTMLString => `
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
    <div>
      <h3 style="margin-bottom: 1rem;">Estados do INPUT</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <mnt-field-number
          input-name="state-default"
          variant="default"
          label="Estado Default"
          value="0">
        </mnt-field-number>
        
        <mnt-field-number
          input-name="state-disabled"
          variant="default"
          label="Estado Disabled"
          value="0"
          disabled>
        </mnt-field-number>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 0.5rem;">
        Nota: Estados de focus, error e success são aplicados via classes CSS. Adicione manualmente no container para testar.
      </p>
    </div>
  </div>
`;

export const States: StoryFn = StatesTemplate;
