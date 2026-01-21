import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';
import { RadioBaseProps } from './radio.types';

const meta: Meta<RadioBaseProps> = {
  title: 'Forms/Radio',
  component: 'mnt-radio',
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do radio button (usado para agrupar radios)',
    },
    label: {
      control: 'text',
      description: 'Texto do label',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **mnt-radio** é um radio button personalizado com comportamento de toggle.

### 🎯 Características principais:

- **Toggle**: Pode ser desmarcado ao clicar novamente (comportamento customizado)
- **Grupos**: Radios com o mesmo \`name\` formam um grupo
- **Estados**: Unchecked, Checked, Disabled
- **Eventos**: Emite \`radioChange\` ao ser clicado
- **Acessível**: Label associado corretamente ao input
- **Customizável**: Estilos via CSS

### 💡 Comportamento Customizado:

⚠️ **Diferente do radio HTML nativo**, este componente permite **desmarcar** um radio clicando nele novamente.
Isso é útil para casos onde você quer permitir "nenhuma opção selecionada".

**Comportamento:**
- Primeiro clique → Marca o radio
- Segundo clique (no mesmo radio) → Desmarca o radio

### 📋 Evento radioChange:

O evento \`radioChange\` é emitido ao clicar no radio e contém:

\`\`\`typescript
{
  checked: boolean,  // true se foi marcado, false se foi desmarcado
  value: string      // o valor do radio (prop value ou name)
}
\`\`\`

### ♿ Acessibilidade:

- Label clicável associado ao input
- Suporte a navegação por teclado (Tab, Space)
- Estados visuais claros (checked, unchecked, disabled)
- Atributo \`disabled\` funcional
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: RadioBaseProps): HTMLString => {
  return `
    <div style="padding: 20px;">
      <mnt-radio
        name="${args.name || 'radio'}"
        label="${args.label || ''}"
      ></mnt-radio>
    </div>
  `;
};

/**
 * Exemplo básico do radio button
 */
export const Example = DefaultTemplate.bind({});
Example.args = {
  name: 'example',
  label: 'Radio Button Label',
} as RadioBaseProps;
Example.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico do radio button com configurações padrão.',
    },
  },
};

/**
 * Todos os estados
 */
export const AllStates: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Radio Button - Todos os Estados</h3>

    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Unchecked -->
      <div>
        <h4 style="margin-bottom: 12px;">Unchecked (não marcado)</h4>
        <mnt-radio name="state-unchecked" label="Opção não selecionada"></mnt-radio>
      </div>

      <!-- Checked -->
      <div>
        <h4 style="margin-bottom: 12px;">Checked (marcado)</h4>
        <mnt-radio name="state-checked" label="Opção selecionada" checked></mnt-radio>
      </div>

      <!-- Disabled Unchecked -->
      <div>
        <h4 style="margin-bottom: 12px;">Disabled Unchecked</h4>
        <mnt-radio name="state-disabled-unchecked" label="Opção desabilitada" disabled></mnt-radio>
      </div>

      <!-- Disabled Checked -->
      <div>
        <h4 style="margin-bottom: 12px;">Disabled Checked</h4>
        <mnt-radio name="state-disabled-checked" label="Opção desabilitada e selecionada" checked disabled></mnt-radio>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #f0f0f0; border-radius: 6px;">
      <strong>💡 Nota:</strong> Clique em um radio marcado para desmarcá-lo (comportamento customizado).
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de todos os estados disponíveis do radio button.',
    },
  },
};

/**
 * Grupo de radios simples
 */
export const RadioGroup: StoryFn = () => {
  setTimeout(() => {
    const radios = document.querySelectorAll('mnt-radio[name="simple-group"]');
    const output = document.getElementById('simple-group-output');
    let selectedValue = '';

    radios.forEach((radio) => {
      radio.addEventListener('radioChange', (e: any) => {
        const { checked, value } = e.detail;

        if (checked) {
          selectedValue = value;
        } else {
          selectedValue = '';
        }

        updateOutput();
      });
    });

    function updateOutput() {
      if (output) {
        if (selectedValue) {
          output.innerHTML = `
            <strong>Valor selecionado:</strong> <code style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px;">${selectedValue}</code>
          `;
        } else {
          output.innerHTML = '<em style="color: #666;">Nenhuma opção selecionada</em>';
        }
      }
    }

    updateOutput();
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Grupo de Radio Buttons</h3>

      <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px; max-width: 400px;">
        <h4 style="margin: 0 0 16px 0;">Escolha uma opção:</h4>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-radio name="simple-group" label="Opção A" value="a"></mnt-radio>
          <mnt-radio name="simple-group" label="Opção B" value="b"></mnt-radio>
          <mnt-radio name="simple-group" label="Opção C" value="c"></mnt-radio>
          <mnt-radio name="simple-group" label="Opção D" value="d"></mnt-radio>
        </div>

        <div id="simple-group-output" style="margin-top: 20px; padding: 12px; background: #f9fafb; border-radius: 6px; min-height: 24px;">
          <em style="color: #666;">Nenhuma opção selecionada</em>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 16px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px; max-width: 400px;">
        <strong>💡 Dica:</strong> Todos os radios têm o mesmo \`name="simple-group"\`,
        formando um grupo lógico.
      </div>
    </div>
  `;
};
RadioGroup.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de um grupo de radio buttons. Todos compartilham o mesmo `name`.',
    },
  },
};

/**
 * Grupo com opção pré-selecionada
 */
export const RadioGroupPreselected: StoryFn = () => {
  setTimeout(() => {
    const radios = document.querySelectorAll('mnt-radio[name="size-group"]');
    const output = document.getElementById('size-group-output');
    let selectedValue = 'M'; // Valor inicial (checked)

    radios.forEach((radio) => {
      radio.addEventListener('radioChange', (e: any) => {
        const { checked, value } = e.detail;

        if (checked) {
          selectedValue = value;
        } else {
          selectedValue = '';
        }

        updateOutput();
      });
    });

    function updateOutput() {
      if (output) {
        if (selectedValue) {
          const sizeNames: Record<string, string> = {
            S: 'Pequeno (P)',
            M: 'Médio (M)',
            G: 'Grande (G)',
            GG: 'Extra Grande (GG)',
          };
          output.innerHTML = `
            <strong>Tamanho selecionado:</strong> <code style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px;">${sizeNames[selectedValue] || selectedValue}</code>
          `;
        } else {
          output.innerHTML = '<em style="color: #666;">Nenhum tamanho selecionado</em>';
        }
      }
    }

    updateOutput();
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Grupo com Opção Pré-selecionada</h3>

      <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px; max-width: 400px;">
        <h4 style="margin: 0 0 16px 0;">Escolha o tamanho:</h4>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mnt-radio name="size-group" label="Pequeno (P)" value="S"></mnt-radio>
          <mnt-radio name="size-group" label="Médio (M)" value="M" checked></mnt-radio>
          <mnt-radio name="size-group" label="Grande (G)" value="G"></mnt-radio>
          <mnt-radio name="size-group" label="Extra Grande (GG)" value="GG"></mnt-radio>
        </div>

        <div id="size-group-output" style="margin-top: 20px; padding: 12px; background: #f9fafb; border-radius: 6px; min-height: 24px;">
          <strong>Tamanho selecionado:</strong> <code style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px;">Médio (M)</code>
        </div>
      </div>
    </div>
  `;
};
RadioGroupPreselected.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de grupo de radios com uma opção pré-selecionada usando o atributo `checked`.',
    },
  },
};

/**
 * Múltiplos grupos
 */
export const MultipleGroups: StoryFn = () => {
  setTimeout(() => {
    const groups = {
      color: { value: 'blue', label: 'Azul' },
      size: { value: 'G', label: 'Grande' },
      delivery: { value: 'normal', label: 'Normal' },
    };

    // Setup listeners for each group
    Object.keys(groups).forEach((groupName) => {
      const radios = document.querySelectorAll(`mnt-radio[name="${groupName}"]`);
      const output = document.getElementById(`${groupName}-output`);

      radios.forEach((radio) => {
        radio.addEventListener('radioChange', (e: any) => {
          const { checked, value } = e.detail;

          if (checked) {
            const radioLabel = (radio as any).label || value;
            groups[groupName as keyof typeof groups] = { value, label: radioLabel };
          } else {
            groups[groupName as keyof typeof groups] = { value: '', label: '' };
          }

          updateOutput(groupName, output);
          updateSummary();
        });
      });
    });

    function updateOutput(groupName: string, output: HTMLElement | null) {
      if (output) {
        const selection = groups[groupName as keyof typeof groups];
        if (selection.value) {
          output.innerHTML = `<code style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${selection.label}</code>`;
        } else {
          output.innerHTML = '<code style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Não selecionado</code>';
        }
      }
    }

    function updateSummary() {
      const summary = document.getElementById('selection-summary');
      if (summary) {
        const hasAllSelections = Object.values(groups).every((g) => g.value);
        const selections = [
          groups.color.value ? `Cor: ${groups.color.label}` : null,
          groups.size.value ? `Tamanho: ${groups.size.label}` : null,
          groups.delivery.value ? `Entrega: ${groups.delivery.label}` : null,
        ].filter(Boolean);

        if (hasAllSelections) {
          summary.innerHTML = `
            <strong style="color: #10b981;">✓ Configuração completa:</strong><br>
            <div style="margin-top: 8px; font-size: 14px;">
              ${selections.join(' • ')}
            </div>
          `;
          summary.style.background = '#d1fae5';
          summary.style.borderColor = '#10b981';
        } else {
          summary.innerHTML = `
            <strong style="color: #f59e0b;">⚠ Seleções:</strong><br>
            <div style="margin-top: 8px; font-size: 14px;">
              ${selections.length > 0 ? selections.join(' • ') : '<em>Nenhuma seleção feita</em>'}
            </div>
          `;
          summary.style.background = '#fef3c7';
          summary.style.borderColor = '#f59e0b';
        }
      }
    }

    // Initialize outputs
    Object.keys(groups).forEach((groupName) => {
      const output = document.getElementById(`${groupName}-output`);
      updateOutput(groupName, output);
    });
    updateSummary();
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Múltiplos Grupos de Radios</h3>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
        <!-- Grupo 1: Cor -->
        <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="margin: 0;">Cor:</h4>
            <div id="color-output"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <mnt-radio name="color" label="Vermelho" value="red"></mnt-radio>
            <mnt-radio name="color" label="Azul" value="blue" checked></mnt-radio>
            <mnt-radio name="color" label="Verde" value="green"></mnt-radio>
          </div>
        </div>

        <!-- Grupo 2: Tamanho -->
        <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="margin: 0;">Tamanho:</h4>
            <div id="size-output"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <mnt-radio name="size" label="Pequeno" value="S"></mnt-radio>
            <mnt-radio name="size" label="Médio" value="M"></mnt-radio>
            <mnt-radio name="size" label="Grande" value="G" checked></mnt-radio>
          </div>
        </div>

        <!-- Grupo 3: Entrega -->
        <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="margin: 0;">Entrega:</h4>
            <div id="delivery-output"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <mnt-radio name="delivery" label="Expressa" value="express"></mnt-radio>
            <mnt-radio name="delivery" label="Normal" value="normal" checked></mnt-radio>
            <mnt-radio name="delivery" label="Retirar" value="pickup"></mnt-radio>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div id="selection-summary" style="margin-top: 24px; padding: 16px; border-left: 4px solid; border-radius: 4px; transition: all 0.3s;">
        Carregando...
      </div>

      <div style="margin-top: 16px; padding: 16px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
        <strong>💡 Grupos independentes:</strong> Cada grupo tem um \`name\` diferente
        (color, size, delivery), permitindo seleções independentes.
      </div>
    </div>
  `;
};
MultipleGroups.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de múltiplos grupos de radios independentes na mesma página com feedback em tempo real.',
    },
  },
};

/**
 * Com labels longos
 */
export const WithLongLabels: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Radio Buttons com Labels Longos</h3>

    <div style="max-width: 600px; padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
      <h4 style="margin: 0 0 16px 0;">Escolha o plano:</h4>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <mnt-radio
          name="plan"
          label="Plano Básico - R$ 29,90/mês - Ideal para uso pessoal com recursos essenciais"
          value="basic"
        ></mnt-radio>

        <mnt-radio
          name="plan"
          label="Plano Pro - R$ 59,90/mês - Recursos avançados para profissionais e pequenas empresas"
          value="pro"
          checked
        ></mnt-radio>

        <mnt-radio
          name="plan"
          label="Plano Enterprise - R$ 199,90/mês - Solução completa com suporte prioritário 24/7 e recursos ilimitados"
          value="enterprise"
        ></mnt-radio>
      </div>
    </div>
  </div>
`;
WithLongLabels.parameters = {
  docs: {
    description: {
      story: 'Exemplo de radio buttons com textos longos, demonstrando como o layout se adapta.',
    },
  },
};

/**
 * Comportamento de toggle
 */
export const ToggleBehavior: StoryFn = () => {
  setTimeout(() => {
    const radio = document.getElementById('toggle-demo') as HTMLElement;
    const status = document.getElementById('toggle-status') as HTMLElement;
    const clickCount = document.getElementById('click-count') as HTMLElement;
    let clicks = 0;

    radio?.addEventListener('radioChange', (e: any) => {
      clicks++;
      const { checked } = e.detail;

      status.innerHTML = checked ? '<span style="color: #10b981;">✓ Marcado</span>' : '<span style="color: #ef4444;">○ Desmarcado</span>';

      clickCount.textContent = clicks.toString();
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px;">Comportamento de Toggle (Customizado)</h3>

      <div style="padding: 24px; background: white; border: 1px solid #ddd; border-radius: 8px; max-width: 500px;">
        <p style="margin: 0 0 20px 0; color: #666;">
          Clique no radio button abaixo várias vezes para ver o comportamento de toggle:
        </p>

        <mnt-radio
          id="toggle-demo"
          name="toggle"
          label="Clique em mim várias vezes!"
          value="demo"
        ></mnt-radio>

        <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>Status:</strong>
            <span id="toggle-status">○ Desmarcado</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <strong>Cliques:</strong>
            <span id="click-count">0</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; max-width: 500px;">
        <strong>⚠️ Comportamento customizado:</strong><br>
        Diferente do radio HTML nativo, este componente permite desmarcar clicando novamente.
        Isso é útil quando você quer permitir "nenhuma seleção".
      </div>
    </div>
  `;
};
ToggleBehavior.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração interativa do comportamento de toggle customizado do radio button.',
    },
  },
};
