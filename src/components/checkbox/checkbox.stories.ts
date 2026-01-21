import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';
import { CheckboxBaseProps, checkboxVariantArray } from './checkbox.types';

const meta: Meta<CheckboxBaseProps> = {
  title: 'Forms/Checkbox',
  component: 'mnt-checkbox',
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do checkbox (ID do input)',
    },
    label: {
      control: 'text',
      description: 'Texto do label',
    },
    variant: {
      control: 'select',
      options: checkboxVariantArray,
      description: 'Variante visual do checkbox',
      table: {
        defaultValue: { summary: 'check' },
        type: { summary: checkboxVariantArray.join(' | ') },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **mnt-checkbox** é um checkbox personalizado com estados visuais claros.

### 🎯 Características principais:

- **Variantes**: Variante visual do checkbox, configura o tipo de ícone a ser exibido => Check (✓) para marcado, Minus (−) para indeterminado
- **Disabled**: Suporta estado desabilitado
- **Acessível**: Label associado corretamente ao input
- **Customizável**: Estilos via CSS

### 💡 Quando usar Indeterminate:

O estado **indeterminate** é ideal para:
- Checkbox "Selecionar todos" quando apenas alguns itens estão selecionados
- Hierarquias de checkboxes (pai/filhos)
- Estados parcialmente completos

### ♿ Acessibilidade:

- Label clicável associado ao input
- Suporte a navegação por teclado (Tab, Space)
- Estados visuais claros (checked, unchecked, disabled)
- Atributo \`disabled\` funcional
\`\`\`
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: CheckboxBaseProps): HTMLString => {
  return `
    <div style="padding: 20px;">
      <mnt-checkbox
        name="${args.name || 'checkbox'}"
        label="${args.label || ''}"
        variant="${args.variant || 'check'}"
      ></mnt-checkbox>
    </div>
  `;
};

/**
 * Exemplo básico do checkbox
 */
export const Example = DefaultTemplate.bind({});
Example.args = {
  name: 'example',
  label: 'Checkbox Label',
  variant: 'check',
} as CheckboxBaseProps;
Example.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico do checkbox com configurações padrão.',
    },
  },
};

/**
 * Todas as variantes e estados
 */
export const AllVariants: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Checkbox - Todas as Variantes</h3>

    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Check Variant -->
      <div>
        <h4 style="margin-bottom: 12px;">Variante: Check (Padrão)</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-checkbox name="check-unchecked" label="Unchecked (não marcado)"></mnt-checkbox>
          <mnt-checkbox name="check-checked" label="Checked (marcado)" checked></mnt-checkbox>
        </div>
      </div>

      <!-- Indeterminate Variant -->
      <div>
        <h4 style="margin-bottom: 12px;">Variante: Indeterminate (Estado Intermediário)</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-checkbox name="indeterminate-1" label="Estado Indeterminado" variant="indeterminate"></mnt-checkbox>
        </div>
      </div>

      <!-- Disabled States -->
      <div>
        <h4 style="margin-bottom: 12px;">Estados Desabilitados</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-checkbox name="disabled-unchecked" label="Unchecked Disabled" disabled></mnt-checkbox>
          <mnt-checkbox name="disabled-checked" label="Checked Disabled" checked disabled></mnt-checkbox>
          <mnt-checkbox name="disabled-indeterminate" label="Indeterminate Disabled" variant="indeterminate" disabled></mnt-checkbox>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #f0f0f0; border-radius: 6px;">
      <strong>💡 Nota:</strong> O estado <code>indeterminate</code> é útil para representar seleções parciais,
      como quando um checkbox pai controla vários checkboxes filhos e apenas alguns estão marcados.
    </div>
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de todas as variantes e estados disponíveis do checkbox.',
    },
  },
};

/**
 * Exemplo com labels longos
 */
export const WithLongLabels: StoryFn = () => `
  <div style="padding: 20px; max-width: 600px;">
    <h3 style="margin-bottom: 20px;">Checkboxes com Labels Longos</h3>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mnt-checkbox
        name="long-1"
        label="Aceito os termos e condições de uso, política de privacidade e todas as diretrizes estabelecidas"
      ></mnt-checkbox>

      <mnt-checkbox
        name="long-2"
        label="Desejo receber emails promocionais, newsletters e comunicações sobre novos produtos e ofertas especiais"
        checked
      ></mnt-checkbox>

      <mnt-checkbox
        name="long-3"
        label="Li e concordo com as políticas de tratamento de dados pessoais conforme LGPD"
      ></mnt-checkbox>
    </div>
  </div>
`;
WithLongLabels.parameters = {
  docs: {
    description: {
      story: 'Exemplo de checkboxes com textos longos, demonstrando como o layout se adapta.',
    },
  },
};

/**
 * Comparação: Check vs Indeterminate
 */
export const CheckVsIndeterminate: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Comparação: Check vs Indeterminate</h3>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h4 style="margin-top: 0;">Check (Padrão)</h4>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Estado binário (marcado/desmarcado)</li>
          <li>Ícone: Check (✓)</li>
          <li>Uso: Opções simples</li>
        </ul>
        <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
          <mnt-checkbox name="check-demo-1" label="Unchecked"></mnt-checkbox>
          <mnt-checkbox name="check-demo-2" label="Checked" checked></mnt-checkbox>
        </div>
      </div>

      <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h4 style="margin-top: 0;">Indeterminate</h4>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Estado intermediário</li>
          <li>Ícone: Minus (−)</li>
          <li>Uso: Seleção parcial</li>
        </ul>
        <div style="margin-top: 16px;">
          <mnt-checkbox name="indet-demo" label="Indeterminate" variant="indeterminate"></mnt-checkbox>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
      <strong>💡 Quando usar cada um:</strong>
      <ul style="margin: 8px 0 0 20px; padding: 0;">
        <li><strong>Check:</strong> Para opções únicas e independentes</li>
        <li><strong>Indeterminate:</strong> Para checkboxes que controlam sub-opções (hierarquia)</li>
      </ul>
    </div>
  </div>
`;
CheckVsIndeterminate.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Comparação visual e de uso entre as variantes Check e Indeterminate.',
    },
  },
};
