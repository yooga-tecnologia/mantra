import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';
import { SwitchBaseProps } from './switch.types';

const meta: Meta<SwitchBaseProps> = {
  title: 'Forms/Switch',
  component: 'mnt-switch',
  parameters: {
    docs: {
      description: {
        component:
          '**Switch** é o componente de formulário que permite alternar entre estados ligado/desligado, funcionando como checkbox ou radio button.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Dual behavior:** Funciona como checkbox (múltipla seleção) ou radio (seleção única)\n' +
          '- **Integração nativa:** Participação automática em formulários HTML\n' +
          '- **Validação integrada:** Suporte a required e custom validity via ElementInternals\n' +
          '- **Eventos customizados:** Emite eventos detalhados para integração com frameworks\n' +
          '- **Acessibilidade completa:** ARIA attributes, navegação via teclado e estados visuais claros\n\n' +
          '### 🎨 **Funcionalidades:**\n' +
          '- **Label clicável:** Clique no texto do label para alternar o estado\n' +
          '- **Descrição opcional:** Texto adicional para contexto\n' +
          '- **Estados visuais:** Normal, checked, disabled, focus\n' +
          '- **ID inteligente:** Auto-geração ou uso de inputId/id do componente\n' +
          '- **Métodos públicos:** `getInput()`, `getChecked()`, `setChecked()` para controle programático\n\n' +
          '### 📋 **Tipos de uso:**\n' +
          '**Checkbox (type="checkbox"):**\n' +
          '- Aceitar termos e condições\n' +
          '- Preferências e configurações\n' +
          '- Múltiplas seleções independentes\n' +
          '- Toggle de features\n\n' +
          '**Radio (type="radio"):**\n' +
          '- Seleção única em grupos (ex: método de pagamento)\n' +
          '- Escolha de planos ou opções\n' +
          '- Configurações mutuamente exclusivas\n\n' +
          '### 📏 **Boas práticas:**\n' +
          '- **Checkbox:** Use `value` para definir o que será enviado quando checked\n' +
          '- **Radio:** Use o mesmo `name` para agrupar opções e `value` diferente para cada uma\n' +
          '- **Validação:** Use `required` para campos obrigatórios\n' +
          '- **Acessibilidade:** Sempre forneça `label` para melhor UX\n' +
          '- **Eventos:** Ouça `mntChange` para reagir a mudanças de estado\n\n' +
          '**Atenção:** Para radio buttons, todos os switches do mesmo grupo devem ter o mesmo `name` mas `value` e `id` únicos.\n\n' +
          'Para ver todos os estados e variações, explore as stories [Checkbox](#checkbox-default) e [Radio Group](#radio-group).\n\n',
      },
    },
  },
  argTypes: {
    inputId: {
      control: 'text',
      description: 'Unique identifier for the input element. If not provided, will use the component id or auto-generate one.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission (required for radio groups)',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Value attribute for form submission',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['checkbox', 'radio'],
      description: 'Type of switch behavior',
      table: {
        defaultValue: { summary: 'checkbox' },
        type: { summary: 'checkbox | radio' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text displayed below the label',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked by default',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the switch is required for form validation',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: SwitchBaseProps): HTMLString => `
  <mnt-switch
    ${args.inputId ? `input-id="${args.inputId}"` : ''}
    ${args.name ? `name="${args.name}"` : ''}
    ${args.value ? `value="${args.value}"` : ''}
    ${args.type ? `type="${args.type}"` : ''}
    ${args.label ? `label="${args.label}"` : ''}
    ${args.description ? `description="${args.description}"` : ''}
    ${args.disabled ? 'disabled' : ''}
    ${args.checked ? 'checked' : ''}
    ${args.required ? 'required' : ''}
  ></mnt-switch>
`;

export const CheckboxDefault = DefaultTemplate.bind({});
CheckboxDefault.args = {
  inputId: 'switch-checkbox-1',
  type: 'checkbox',
  label: 'Accept terms and conditions',
  description: 'You must accept the terms to continue',
  checked: false,
  disabled: false,
} as SwitchBaseProps;
CheckboxDefault.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico de checkbox com label e descrição. ' + 'Ideal para confirmações, aceites de termos, ou opções binárias. ' + 'O estado inicial é desmarcado.',
    },
  },
};

export const CheckboxChecked = DefaultTemplate.bind({});
CheckboxChecked.args = {
  inputId: 'switch-checkbox-2',
  type: 'checkbox',
  label: 'Enable notifications',
  checked: true,
} as SwitchBaseProps;
CheckboxChecked.parameters = {
  docs: {
    description: {
      story:
        'Checkbox iniciando no estado marcado (checked). ' +
        'Use quando a opção deve vir pré-selecionada por padrão, ' +
        'como configurações já ativas ou preferências recomendadas.',
    },
  },
};

export const CheckboxDisabled = DefaultTemplate.bind({});
CheckboxDisabled.args = {
  inputId: 'switch-checkbox-3',
  type: 'checkbox',
  label: 'Disabled option',
  description: 'This option is not available',
  disabled: true,
} as SwitchBaseProps;
CheckboxDisabled.parameters = {
  docs: {
    description: {
      story:
        'Checkbox desabilitado que não pode ser interagido. ' +
        'Use para opções temporariamente indisponíveis, bloqueadas por permissões, ' +
        'ou que dependem de outras condições. Mantém acessibilidade via aria-disabled.',
    },
  },
};

export const CheckboxRequired = DefaultTemplate.bind({});
CheckboxRequired.args = {
  inputId: 'switch-checkbox-4',
  type: 'checkbox',
  label: 'I agree to the privacy policy',
  required: true,
} as SwitchBaseProps;
CheckboxRequired.parameters = {
  docs: {
    description: {
      story:
        'Checkbox obrigatório (required) com validação integrada. ' +
        'Previne submissão do formulário se não estiver marcado. ' +
        'Essencial para aceites de termos, políticas de privacidade e confirmações críticas. ' +
        'Utiliza validação nativa do HTML5 e ElementInternals.',
    },
  },
};

export const CheckboxWithValue = DefaultTemplate.bind({});
CheckboxWithValue.args = {
  inputId: 'switch-checkbox-5',
  name: 'preferences',
  value: 'email-notifications',
  type: 'checkbox',
  label: 'Email notifications',
  description: 'Receive updates via email',
} as SwitchBaseProps;
CheckboxWithValue.parameters = {
  docs: {
    description: {
      story:
        'Checkbox com name e value definidos para submissão de formulário. ' +
        'O value ("email-notifications") será enviado quando marcado. ' +
        'Use quando precisar identificar exatamente qual opção foi selecionada no backend. ' +
        'Ideal para grupos de preferências ou configurações múltiplas.',
    },
  },
};

export const CheckboxWithoutLabel = DefaultTemplate.bind({});
CheckboxWithoutLabel.args = {
  inputId: 'switch-checkbox-6',
  type: 'checkbox',
  checked: true,
} as SwitchBaseProps;
CheckboxWithoutLabel.parameters = {
  docs: {
    description: {
      story:
        'Switch visual sem label ou descrição. ' +
        'Use apenas quando o contexto visual já deixa claro a função do switch, ' +
        'como em tabelas, cards ou interfaces minimalistas. ' +
        'Considere adicionar aria-label para acessibilidade.',
    },
  },
};

export const RadioGroup: StoryFn = (): HTMLString => {
  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <h3>Select your payment method</h3>
      <mnt-switch
        input-id="payment-credit"
        name="payment-method"
        value="credit-card"
        type="radio"
        label="Credit Card"
        description="Pay with Visa, Mastercard, or Amex"
        checked
      ></mnt-switch>

      <mnt-switch
        input-id="payment-debit"
        name="payment-method"
        value="debit-card"
        type="radio"
        label="Debit Card"
        description="Direct payment from your bank account"
      ></mnt-switch>

      <mnt-switch
        input-id="payment-paypal"
        name="payment-method"
        value="paypal"
        type="radio"
        label="PayPal"
        description="Pay securely with your PayPal account"
      ></mnt-switch>

      <mnt-switch
        input-id="payment-crypto"
        name="payment-method"
        value="crypto"
        type="radio"
        label="Cryptocurrency"
        description="Bitcoin, Ethereum, and more"
        disabled
      ></mnt-switch>
    </div>
    <script>
      document.querySelectorAll('mnt-switch[type="radio"]').forEach(el => {
        el.addEventListener('mntChange', (e) => {
          console.log('Payment method changed:', e.detail);
        });
      });
    </script>
  `;
};

RadioGroup.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        '**Grupo de Radio Buttons** demonstrando seleção única entre múltiplas opções.\n\n' +
        '**Pontos-chave:**\n' +
        '- Todos compartilham o mesmo `name="payment-method"` para criar o grupo\n' +
        '- Cada um tem `value` único (credit-card, debit-card, paypal, crypto)\n' +
        '- Apenas um pode estar marcado por vez (comportamento nativo de radio)\n' +
        '- O último está desabilitado (cryptocurrency)\n\n' +
        '**Quando usar:**\n' +
        '- Método de pagamento\n' +
        '- Escolha de planos (básico, pro, enterprise)\n' +
        '- Tipo de conta (pessoal, empresarial)\n' +
        '- Qualquer seleção onde apenas uma opção é permitida\n\n' +
        '**Escuta eventos:** Console logs exibem a mudança com id, value e name.',
    },
  },
};

export const FormIntegration: StoryFn = (): HTMLString => {
  return `
    <form id="demo-form" style="display: flex; flex-direction: column; gap: 20px; max-width: 500px;">
      <h3>User Preferences</h3>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <mnt-switch
          input-id="newsletter"
          name="newsletter"
          value="yes"
          type="checkbox"
          label="Subscribe to newsletter"
          description="Get weekly updates about new features"
        ></mnt-switch>

        <mnt-switch
          input-id="marketing"
          name="marketing"
          value="yes"
          type="checkbox"
          label="Marketing communications"
          description="Receive promotional emails and offers"
        ></mnt-switch>

        <mnt-switch
          input-id="terms"
          name="terms"
          value="accepted"
          type="checkbox"
          label="I accept the terms and conditions"
          required
        ></mnt-switch>
      </div>

      <div style="margin-top: 20px;">
        <h4>Account Type</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-switch
            input-id="account-personal"
            name="account-type"
            value="personal"
            type="radio"
            label="Personal"
            description="For individual use"
            checked
          ></mnt-switch>

          <mnt-switch
            input-id="account-business"
            name="account-type"
            value="business"
            type="radio"
            label="Business"
            description="For companies and organizations"
          ></mnt-switch>
        </div>
      </div>

      <button type="submit" style="padding: 10px 20px; margin-top: 10px;">Submit Form</button>
      <div id="form-output" style="padding: 10px; background: #f5f5f5; border-radius: 4px; display: none;"></div>
    </form>

    <script>
      const form = document.getElementById('demo-form');
      const output = document.getElementById('form-output');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
          if (data[key]) {
            if (Array.isArray(data[key])) {
              data[key].push(value);
            } else {
              data[key] = [data[key], value];
            }
          } else {
            data[key] = value;
          }
        }

        output.style.display = 'block';
        output.innerHTML = '<strong>Form Data:</strong><pre>' +
          JSON.stringify(data, null, 2) + '</pre>';
      });

      // Listen to custom events
      document.querySelectorAll('mnt-switch').forEach(el => {
        el.addEventListener('mntChange', (e) => {
          console.log('Switch changed:', {
            id: e.detail.id,
            checked: e.detail.checked,
            value: e.detail.value,
            name: e.detail.name
          });
        });
      });
    </script>
  `;
};

FormIntegration.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        '**Exemplo completo de integração com formulário HTML** demonstrando:\n\n' +
        '**Checkboxes para preferências:**\n' +
        '- Newsletter (name="newsletter", value="yes")\n' +
        '- Marketing (name="marketing", value="yes")\n' +
        '- Termos obrigatórios (required) - bloqueia submit se não marcado\n\n' +
        '**Radio group para tipo de conta:**\n' +
        '- Personal (checked por padrão)\n' +
        '- Business\n' +
        '- Compartilham name="account-type" com values únicos\n\n' +
        '**Funcionalidades demonstradas:**\n' +
        '- ✅ Submissão via FormData (integração nativa)\n' +
        '- ✅ Validação de required (previne submit)\n' +
        '- ✅ Eventos mntChange logados no console\n' +
        '- ✅ Display dos dados submetidos em JSON\n\n' +
        '**Use este padrão para:** Cadastros, configurações de conta, preferências de usuário, checkout.',
    },
  },
};

export const AllStates: StoryFn = (): HTMLString => {
  return `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; max-width: 900px;">
      <div>
        <h3>Checkbox States</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h4 style="margin-bottom: 8px;">Unchecked</h4>
            <mnt-switch
              input-id="cb-unchecked"
              type="checkbox"
              label="Unchecked state"
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Checked</h4>
            <mnt-switch
              input-id="cb-checked"
              type="checkbox"
              label="Checked state"
              checked
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Disabled Unchecked</h4>
            <mnt-switch
              input-id="cb-disabled-unchecked"
              type="checkbox"
              label="Disabled unchecked"
              disabled
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Disabled Checked</h4>
            <mnt-switch
              input-id="cb-disabled-checked"
              type="checkbox"
              label="Disabled checked"
              disabled
              checked
            ></mnt-switch>
          </div>
        </div>
      </div>

      <div>
        <h3>Radio States</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h4 style="margin-bottom: 8px;">Unchecked</h4>
            <mnt-switch
              input-id="radio-unchecked"
              type="radio"
              name="demo-1"
              value="opt1"
              label="Unchecked state"
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Checked</h4>
            <mnt-switch
              input-id="radio-checked"
              type="radio"
              name="demo-2"
              value="opt2"
              label="Checked state"
              checked
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Disabled Unchecked</h4>
            <mnt-switch
              input-id="radio-disabled-unchecked"
              type="radio"
              name="demo-3"
              value="opt3"
              label="Disabled unchecked"
              disabled
            ></mnt-switch>
          </div>

          <div>
            <h4 style="margin-bottom: 8px;">Disabled Checked</h4>
            <mnt-switch
              input-id="radio-disabled-checked"
              type="radio"
              name="demo-4"
              value="opt4"
              label="Disabled checked"
              disabled
              checked
            ></mnt-switch>
          </div>
        </div>
      </div>
    </div>
  `;
};

AllStates.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        '**Matriz visual completa de todos os estados** do componente Switch.\n\n' +
        '**Checkbox States:**\n' +
        '- ⚪ Unchecked - Estado inicial padrão\n' +
        '- 🟢 Checked - Estado ativo/selecionado\n' +
        '- ⚪ Disabled Unchecked - Desabilitado desmarcado\n' +
        '- 🟢 Disabled Checked - Desabilitado mas marcado\n\n' +
        '**Radio States:**\n' +
        '- ⚪ Unchecked - Opção não selecionada\n' +
        '- 🔵 Checked - Opção selecionada no grupo\n' +
        '- ⚪ Disabled Unchecked - Opção bloqueada\n' +
        '- 🔵 Disabled Checked - Seleção permanente/bloqueada\n\n' +
        '**Estados interativos não mostrados:**\n' +
        '- Hover - Destaque visual ao passar o mouse\n' +
        '- Focus - Outline ao navegar via teclado\n' +
        '- Active - Feedback ao clicar\n\n' +
        '**Use como referência** para verificar o comportamento visual em todos os cenários possíveis.',
    },
  },
};
