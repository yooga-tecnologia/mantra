import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';
import { CheckboxBaseProps, checkboxVariantArray } from './checkbox.types';

const meta: Meta = {
  title: 'Forms/Checkbox',
  component: 'mnt-checkbox',
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do checkbox (ID do input)',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto do label',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Valor do checkbox (emitido no evento)',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Se o checkbox está marcado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: checkboxVariantArray,
      description: 'Variante visual do checkbox (ícone exibido)',
      table: {
        defaultValue: { summary: 'check' },
        type: { summary: checkboxVariantArray.join(' | ') },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Se o checkbox está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // Eventos
    checkboxChange: {
      action: 'checkboxChange',
      description: 'Evento emitido quando o estado do checkbox muda',
      table: {
        category: 'Events',
        type: { summary: '(event: CustomEvent<{ checked: boolean; value: string }>) => void' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **mnt-checkbox** é um checkbox personalizado com estados visuais claros.

### 🎯 Características principais:

- **Variantes**: Check (✓) para marcado, Minus (−) para indeterminado
- **Eventos**: Emite \`checkboxChange\` ao ser alterado
- **Estados**: Checked, Unchecked, Indeterminate, Disabled
- **Acessível**: Label associado corretamente ao input
- **Customizável**: Estilos via CSS

### 💡 Quando usar Indeterminate:

O estado **indeterminate** é ideal para:
- Checkbox "Selecionar todos" quando apenas alguns itens estão selecionados
- Hierarquias de checkboxes (pai/filhos)
- Estados parcialmente completos

### 📚 Documentação completa:

Veja o story **"Usage Documentation"** para exemplos detalhados de uso em JavaScript e Angular.
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
 * Documentação de Uso
 */
export const UsageDocumentation: StoryFn = () => `
  <div style="padding: 40px; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
    <h1 style="margin-top: 0; color: #1f2937;">📚 Como Usar o Componente Checkbox</h1>

    <div style="padding: 16px; background: #e0e7ff; border-left: 4px solid #6366f1; border-radius: 4px; margin-bottom: 32px;">
      <strong style="color: #4338ca;">ℹ️ Props e Eventos</strong>
      <p style="margin: 8px 0 0 0; color: #4338ca;">
        Veja todas as props e eventos disponíveis na tabela de <strong>Controls</strong> acima 
        (aba ao lado de "Canvas").
      </p>
    </div>

    <!-- HTML Básico -->
    <section style="margin-bottom: 48px;">
      <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📖 HTML Básico</h2>
      
      <h3 style="color: #4b5563; margin-top: 24px;">Checkbox simples</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb;"><code>&lt;mnt-checkbox
  name="terms"
  label="Aceito os termos"
  value="terms"
&gt;&lt;/mnt-checkbox&gt;</code></pre>

      <h3 style="color: #4b5563; margin-top: 24px;">Checkbox pré-marcado</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb;"><code>&lt;mnt-checkbox
  name="newsletter"
  label="Receber newsletter"
  value="newsletter"
  checked
&gt;&lt;/mnt-checkbox&gt;</code></pre>

      <h3 style="color: #4b5563; margin-top: 24px;">Checkbox desabilitado</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb;"><code>&lt;mnt-checkbox
  name="disabled"
  label="Opção desabilitada"
  disabled
&gt;&lt;/mnt-checkbox&gt;</code></pre>
    </section>

    <!-- Evento checkboxChange -->
    <section style="margin-bottom: 48px;">
      <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🔄 Evento checkboxChange</h2>
      
      <p style="color: #6b7280; line-height: 1.6;">
        O componente emite o evento customizado <code style="background: #fef3c7; padding: 2px 6px; border-radius: 4px;">checkboxChange</code> quando o estado muda.
      </p>

      <h3 style="color: #4b5563; margin-top: 24px;">Estrutura do evento</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb;"><code>{
  detail: {
    checked: boolean,  // true se foi marcado, false se desmarcado
    value: string      // o valor do checkbox (prop value ou name)
  }
}</code></pre>

      <h3 style="color: #4b5563; margin-top: 24px;">JavaScript/HTML</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb;"><code>const checkbox = document.querySelector('mnt-checkbox');

checkbox.addEventListener('checkboxChange', (event) => {
  const { checked, value } = event.detail;
  console.log(\`Checkbox \${value} is now \${checked ? 'checked' : 'unchecked'}\`);
});</code></pre>
    </section>

    <!-- Angular -->
    <section style="margin-bottom: 48px;">
      <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🚀 Uso em Angular</h2>

      <div style="padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 24px;">
        <strong style="color: #92400e;">⚠️ IMPORTANTE:</strong>
        <p style="margin: 8px 0 0 0; color: #78350f;">
          Use <code style="background: white; padding: 2px 6px; border-radius: 4px;">(checkboxChange)</code> e <strong>NÃO</strong> <code style="background: white; padding: 2px 6px; border-radius: 4px;">(click)</code>!
        </p>
        <ul style="margin: 8px 0 0 20px; color: #78350f; line-height: 1.8;">
          <li>❌ <code style="background: white; padding: 2px 6px; border-radius: 4px;">(click)="handleChange()"</code> → Causa double-click (event bubbling)</li>
          <li>✅ <code style="background: white; padding: 2px 6px; border-radius: 4px;">(checkboxChange)="handleChange($event)"</code> → Funciona corretamente</li>
        </ul>
      </div>

      <h3 style="color: #4b5563; margin-top: 24px;">TypeScript Component</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb; font-size: 14px;"><code>// component.ts
import { Component } from '@angular/core';

interface FilterSettings {
  discountType: string[];
}

@Component({
  selector: 'app-voucher-filter',
  templateUrl: './voucher-filter.component.html'
})
export class VoucherFilterComponent {
  filterSettings: FilterSettings = {
    discountType: []
  };

  voucherTypeList = ['PERCENTAGE', 'VALUE', 'FREE_SHIPPING'];

  handleSelectVoucherType(event: any): void {
    const { checked, value } = event.detail;

    console.log('[FILTER] Checkbox changed:', { checked, value });

    if (checked) {
      // Adicionar se não existe
      if (!this.filterSettings.discountType.includes(value)) {
        this.filterSettings.discountType.push(value);
      }
    } else {
      // Remover se existe
      this.filterSettings.discountType = 
        this.filterSettings.discountType.filter(type => type !== value);
    }

    console.log('[FILTER] Updated settings:', this.filterSettings);
  }

  getVoucherTypeLabel(type: string): string {
    const labels = {
      PERCENTAGE: 'Desconto em %',
      VALUE: 'Desconto em R$',
      FREE_SHIPPING: 'Frete grátis'
    };
    return labels[type] || type;
  }
}</code></pre>

      <h3 style="color: #4b5563; margin-top: 24px;">Template HTML</h3>
      <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #e5e7eb; font-size: 14px;"><code>&lt;!-- component.html --&gt;
&lt;div class="filter-section"&gt;
  &lt;h3&gt;Tipo de cupom:&lt;/h3&gt;

  &lt;div class="checkbox-group" *ngFor="let voucherType of voucherTypeList"&gt;
    &lt;mnt-checkbox
      [name]="voucherType"
      [value]="voucherType"
      [label]="getVoucherTypeLabel(voucherType)"
      (checkboxChange)="handleSelectVoucherType($event)"
      [checked]="filterSettings.discountType.includes(voucherType)"
      variant="check"
    &gt;&lt;/mnt-checkbox&gt;
  &lt;/div&gt;

  &lt;p&gt;Selecionados: {{ filterSettings.discountType.join(', ') || 'Nenhum' }}&lt;/p&gt;
&lt;/div&gt;</code></pre>
    </section>

    <!-- Dicas -->
    <section>
      <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">💡 Dicas e Boas Práticas</h2>
      
      <div style="margin-top: 16px;">
        <div style="padding: 16px; background: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 16px;">
          <strong style="color: #1e40af;">✓ Use value para identificar checkboxes</strong>
          <p style="margin: 8px 0 0 0; color: #1e3a8a;">
            Sempre defina um <code style="background: white; padding: 2px 6px; border-radius: 4px;">value</code> único 
            para facilitar a identificação no evento.
          </p>
        </div>

        <div style="padding: 16px; background: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 16px;">
          <strong style="color: #1e40af;">✓ Sincronize o estado com checked</strong>
          <p style="margin: 8px 0 0 0; color: #1e3a8a;">
            Use <code style="background: white; padding: 2px 6px; border-radius: 4px;">[checked]</code> para 
            refletir o estado atual da sua aplicação.
          </p>
        </div>

        <div style="padding: 16px; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 4px;">
          <strong style="color: #991b1b;">✗ Não use (click) para detectar mudanças</strong>
          <p style="margin: 8px 0 0 0; color: #7f1d1d;">
            O evento <code style="background: white; padding: 2px 6px; border-radius: 4px;">(click)</code> 
            causa double-click. Sempre use <code style="background: white; padding: 2px 6px; border-radius: 4px;">(checkboxChange)</code>.
          </p>
        </div>
      </div>
    </section>
  </div>
`;
UsageDocumentation.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Documentação completa de uso do componente checkbox com exemplos em JavaScript e Angular.',
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

/**
 * Demonstração do evento checkboxChange
 */
export const EventDemo: StoryFn = () => {
  setTimeout(() => {
    const checkbox = document.getElementById('event-demo-checkbox');
    const statusOutput = document.getElementById('event-status');
    const valueOutput = document.getElementById('event-value');
    const clickCount = document.getElementById('event-clicks');
    let clicks = 0;

    checkbox?.addEventListener('checkboxChange', (e: any) => {
      clicks++;
      const { checked, value } = e.detail;

      statusOutput.innerHTML = checked
        ? '<span style="color: #10b981; font-weight: bold;">✓ Marcado</span>'
        : '<span style="color: #ef4444; font-weight: bold;">○ Desmarcado</span>';
      valueOutput.innerHTML = `<code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${value}</code>`;
      clickCount.textContent = clicks.toString();
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Evento checkboxChange</h3>

      <div style="padding: 24px; background: white; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
        <p style="margin: 0 0 20px 0; color: #666;">
          Clique no checkbox abaixo para ver o evento <code>checkboxChange</code> em ação:
        </p>

        <mnt-checkbox
          id="event-demo-checkbox"
          name="demo"
          label="Clique em mim e veja os dados do evento!"
          value="demo-value"
        ></mnt-checkbox>

        <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">Dados do evento:</h4>

          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between;">
              <strong>Status (checked):</strong>
              <span id="event-status" style="color: #ef4444; font-weight: bold;">○ Desmarcado</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <strong>Valor (value):</strong>
              <span id="event-value"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">demo-value</code></span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <strong>Total de cliques:</strong>
              <span id="event-clicks">0</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 16px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px; max-width: 600px;">
        <strong>💡 Estrutura do evento:</strong>
        <pre style="margin: 8px 0 0 0; padding: 12px; background: #f8fafc; border-radius: 4px; overflow-x: auto;">event.detail = {
  checked: boolean,  // true ou false
  value: string      // valor do checkbox
}</pre>
      </div>
    </div>
  `;
};
EventDemo.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração interativa do evento `checkboxChange` mostrando os dados emitidos em tempo real.',
    },
  },
};

/**
 * Múltiplos checkboxes (exemplo de filtro)
 */
export const MultipleCheckboxes: StoryFn = () => {
  setTimeout(() => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const output = document.getElementById('filter-output');
    const selectedList = document.getElementById('selected-list');
    const selectedOptions: string[] = [];

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('checkboxChange', (e: any) => {
        const { checked, value } = e.detail;

        if (checked) {
          if (!selectedOptions.includes(value)) {
            selectedOptions.push(value);
          }
        } else {
          const index = selectedOptions.indexOf(value);
          if (index > -1) {
            selectedOptions.splice(index, 1);
          }
        }

        updateOutput();
      });
    });

    function updateOutput() {
      if (output) {
        if (selectedOptions.length > 0) {
          output.style.background = '#d1fae5';
          output.style.borderColor = '#10b981';
          output.innerHTML = `
            <strong style="color: #10b981;">✓ \${selectedOptions.length} opç\${selectedOptions.length === 1 ? 'ão' : 'ões'} selecionada\${selectedOptions.length === 1 ? '' : 's'}:</strong>
          `;
        } else {
          output.style.background = '#fef3c7';
          output.style.borderColor = '#f59e0b';
          output.innerHTML = '<strong style="color: #f59e0b;">⚠ Nenhuma opção selecionada</strong>';
        }
      }

      if (selectedList) {
        if (selectedOptions.length > 0) {
          const labels: Record<string, string> = {
            PERCENTAGE: 'Desconto em %',
            VALUE: 'Desconto em R$',
            FREE_SHIPPING: 'Frete grátis',
          };

          selectedList.innerHTML = selectedOptions
            .map(
              (opt: string) => `
              <li style="padding: 8px 12px; background: #f3f4f6; border-radius: 4px; display: flex; align-items: center; gap: 8px;">
                <span style="color: #10b981; font-size: 18px;">✓</span>
                <span>${labels[opt] || opt}</span>
                <code style="margin-left: auto; background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-size: 11px;">\${opt}</code>
              </li>
            `,
            )
            .join('');
        } else {
          selectedList.innerHTML = '<li style="color: #9ca3af; font-style: italic;">Nenhuma opção selecionada</li>';
        }
      }
    }

    updateOutput();
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Múltiplos Checkboxes (Exemplo: Filtro de Cupons)</h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
        <!-- Formulário -->
        <div style="padding: 24px; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0;">Tipo de cupom:</h4>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <mnt-checkbox
              class="filter-checkbox"
              name="voucher-percentage"
              label="Desconto em %"
              value="PERCENTAGE"
            ></mnt-checkbox>

            <mnt-checkbox
              class="filter-checkbox"
              name="voucher-value"
              label="Desconto em R$"
              value="VALUE"
            ></mnt-checkbox>

            <mnt-checkbox
              class="filter-checkbox"
              name="voucher-shipping"
              label="Frete grátis"
              value="FREE_SHIPPING"
            ></mnt-checkbox>
          </div>
        </div>

        <!-- Feedback -->
        <div style="padding: 24px; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0;">Seleções:</h4>

          <div id="filter-output" style="padding: 12px; border-left: 4px solid; border-radius: 4px; margin-bottom: 16px; transition: all 0.3s;">
            Carregando...
          </div>

          <ul id="selected-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
            <li style="color: #9ca3af; font-style: italic;">Nenhuma opção selecionada</li>
          </ul>
        </div>
      </div>

      <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; max-width: 900px;">
        <strong>💡 Exemplo de uso em Angular:</strong>
        <pre style="margin: 8px 0 0 0; padding: 12px; background: white; border-radius: 4px; overflow-x: auto; font-size: 13px;">handleSelectVoucherType(event: any): void {
  const { checked, value } = event.detail;

  if (checked) {
    this.filterSettings.discountType.push(value);
  } else {
    this.filterSettings.discountType =
      this.filterSettings.discountType.filter(type => type !== value);
  }
}</pre>
      </div>
    </div>
  `;
};
MultipleCheckboxes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo prático de múltiplos checkboxes trabalhando juntos, similar a um filtro de cupons em uma aplicação real.',
    },
  },
};
