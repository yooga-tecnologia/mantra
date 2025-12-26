import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';
import { DatePickerBaseProps } from './date-picker.types';

const meta: Meta<DatePickerBaseProps> = {
  title: 'Forms/DatePicker',
  component: 'mnt-date-picker',
  parameters: {
    docs: {
      description: {
        component:
          '**DatePicker** é o componente de seleção de datas que permite escolher uma data única ou um intervalo de datas.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Dual mode:** Suporta seleção única (single) ou intervalo (range)\n' +
          '- **Integração nativa:** Participação automática em formulários HTML\n' +
          '- **Validação integrada:** Suporte a required e custom validity via ElementInternals\n' +
          '- **Eventos customizados:** Emite eventos detalhados para integração com frameworks\n' +
          '- **Acessibilidade completa:** ARIA attributes, navegação via teclado\n' +
          '- **Internacionalização:** Suporte a diferentes locales (pt-BR, en-US, etc.)\n\n' +
          '### 🎨 **Funcionalidades:**\n' +
          '- **Modo Single:** Seleção de uma única data\n' +
          '- **Modo Range:** Seleção de intervalo entre duas datas\n' +
          '- **Min/Max Date:** Restrição de datas selecionáveis\n' +
          '- **Navegação de meses:** Controles para navegar entre meses/anos\n' +
          '- **Data atual destacada:** Indicação visual da data de hoje\n' +
          '- **Formatação customizada:** Suporta diferentes formatos de data por locale\n\n' +
          '### 📋 **Casos de uso:**\n' +
          '- Seleção de data de nascimento\n' +
          '- Agendamento de eventos\n' +
          '- Filtros de período (data início/fim)\n' +
          '- Reservas e disponibilidade\n' +
          '- Relatórios com intervalo de datas\n\n' +
          '### 🔌 **Integração Angular:**\n' +
          'Use diretamente com eventos `(datePickerSelected)` e binding `[selectedDate]`.\n' +
          'Sem necessidade de wrappers complexos!\n\n' +
          'Para ver exemplos de integração, consulte FRAMEWORK_INTEGRATION.md.\n\n',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Mode of date selection',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: 'single | range' },
      },
    },
    locale: {
      control: 'select',
      options: ['pt-BR', 'en-US', 'es-ES', 'fr-FR'],
      description: 'Locale for date formatting',
      table: {
        defaultValue: { summary: 'pt-BR' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the date picker is required for form validation',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1, 6],
      description: 'First day of the week (0=Sunday, 1=Monday, 6=Saturday)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    disablePastDates: {
      control: 'boolean',
      description: 'Disables selection of dates before today',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: Partial<DatePickerBaseProps>): HTMLString => `
  <div style="display: flex; justify-content: center; padding: 40px;">
    <mnt-date-picker
      mode="${args.mode || 'single'}"
      ${args.locale ? `locale="${args.locale}"` : ''}
      ${args.disabled ? 'disabled' : ''}
      ${args.required ? 'required' : ''}
      ${args.firstDayOfWeek !== undefined ? `first-day-of-week="${args.firstDayOfWeek}"` : ''}
      ${args.disablePastDates ? 'disable-past-dates' : ''}
    ></mnt-date-picker>
  </div>
`;

export const SingleMode = DefaultTemplate.bind({});
SingleMode.args = {
  mode: 'single',
  locale: 'pt-BR',
} as Partial<DatePickerBaseProps>;
SingleMode.parameters = {
  docs: {
    description: {
      story: 'Modo de seleção única (single). ' + 'Permite selecionar apenas uma data por vez. ' + 'Ideal para data de nascimento, vencimentos, agendamentos únicos.',
    },
  },
};

export const RangeMode = DefaultTemplate.bind({});
RangeMode.args = {
  mode: 'range',
  locale: 'pt-BR',
} as Partial<DatePickerBaseProps>;
RangeMode.parameters = {
  docs: {
    description: {
      story:
        'Modo de seleção de intervalo (range). ' +
        'Permite selecionar uma data inicial e uma data final. ' +
        'Clique na primeira data e depois na segunda para definir o período. ' +
        'Ideal para filtros de relatórios, reservas, períodos de disponibilidade.',
    },
  },
};

export const DifferentLocales: StoryFn = (): HTMLString => {
  return `
    <div style="padding: 20px;">
      <h3>Diferentes Locales</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-top: 20px;">
        <div>
          <h4 style="margin-bottom: 12px;">Português (pt-BR)</h4>
          <mnt-date-picker locale="pt-BR"></mnt-date-picker>
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">English (en-US)</h4>
          <mnt-date-picker locale="en-US"></mnt-date-picker>
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Español (es-ES)</h4>
          <mnt-date-picker locale="es-ES"></mnt-date-picker>
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Français (fr-FR)</h4>
          <mnt-date-picker locale="fr-FR"></mnt-date-picker>
        </div>
      </div>
    </div>
  `;
};

DifferentLocales.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de diferentes locales suportados. ' + 'O componente automaticamente formata datas, nomes de meses e dias da semana de acordo com o locale especificado.',
    },
  },
};

export const WithMinMaxDates: StoryFn = (): HTMLString => {
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

  return `
    <div style="display: flex; justify-content: center; padding: 40px; flex-direction: column; align-items: center;">
      <div style="margin-bottom: 20px; text-align: center;">
        <h3>Date Picker com Restrições</h3>
        <p style="color: #666;">Apenas datas dos próximos 3 meses são selecionáveis</p>
      </div>
      <mnt-date-picker
        min-date="${minDate.toISOString()}"
        max-date="${maxDate.toISOString()}"
      ></mnt-date-picker>
    </div>
  `;
};

WithMinMaxDates.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Exemplo com restrições de min-date e max-date. ' +
        'Datas fora do intervalo permitido aparecem desabilitadas e não são selecionáveis. ' +
        'Útil para reservas, agendamentos com disponibilidade limitada.',
    },
  },
};

export const IntegrationExample: StoryFn = (): HTMLString => {
  return `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
      <h3>Exemplo de Integração com Eventos</h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 20px;">
        <!-- Single Mode -->
        <div>
          <h4>Modo Single</h4>
          <mnt-date-picker
            id="single-picker"
            mode="single"
          ></mnt-date-picker>
          <div id="single-output" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; min-height: 60px;">
            <strong>Data Selecionada:</strong>
            <div id="single-date">Nenhuma</div>
          </div>
        </div>

        <!-- Range Mode -->
        <div>
          <h4>Modo Range</h4>
          <mnt-date-picker
            id="range-picker"
            mode="range"
          ></mnt-date-picker>
          <div id="range-output" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; min-height: 60px;">
            <strong>Período Selecionado:</strong>
            <div id="range-dates">Nenhum</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-radius: 4px;">
        <strong>💡 Dica:</strong> Abra o Console para ver os eventos detalhados!
      </div>
    </div>

    <script>
      // Single mode listener
      const singlePicker = document.getElementById('single-picker');
      const singleOutput = document.getElementById('single-date');

      singlePicker.addEventListener('datePickerSelected', (event) => {
        console.log('Single Date Selected:', event.detail);
        singleOutput.textContent = event.detail.formattedDate || 'Nenhuma';
      });

      singlePicker.addEventListener('datePickerCancel', () => {
        console.log('Single Picker Cancelled');
      });

      // Range mode listener
      const rangePicker = document.getElementById('range-picker');
      const rangeOutput = document.getElementById('range-dates');

      rangePicker.addEventListener('datePickerSelected', (event) => {
        console.log('Range Selected:', event.detail);
        if (event.detail.range) {
          const start = event.detail.range.start ? new Date(event.detail.range.start).toLocaleDateString('pt-BR') : '?';
          const end = event.detail.range.end ? new Date(event.detail.range.end).toLocaleDateString('pt-BR') : '?';
          rangeOutput.textContent = start + ' até ' + end;
        }
      });

      rangePicker.addEventListener('datePickerCancel', () => {
        console.log('Range Picker Cancelled');
      });
    </script>
  `;
};

IntegrationExample.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        '**Exemplo completo de integração** demonstrando:\n\n' +
        '- Evento `datePickerSelected` para capturar seleções\n' +
        '- Evento `datePickerCancel` quando usuário cancela\n' +
        '- Modo single e range funcionando simultaneamente\n' +
        '- Display em tempo real dos valores selecionados\n\n' +
        'Todos os eventos são logados no console para debugging.',
    },
  },
};

export const AngularExample: StoryFn = (): HTMLString => {
  return `
    <div style="padding: 20px; max-width: 900px; margin: 0 auto;">
      <h3>Exemplo de Uso no Angular</h3>

      <div style="background: #2d2d2d; color: #f8f8f2; padding: 20px; border-radius: 8px; overflow-x: auto;">
        <pre style="margin: 0; font-family: 'Monaco', 'Courier New', monospace; font-size: 13px;"><code>&lt;!-- Template --&gt;
&lt;mnt-date-picker
  [mode]="'single'"
  [selectedDate]="selectedDate"
  (datePickerSelected)="handleDateSelected($event)"
  (datePickerCancel)="handleCancel()"
&gt;&lt;/mnt-date-picker&gt;

&lt;!-- Range Mode --&gt;
&lt;mnt-date-picker
  [mode]="'range'"
  [selectedRange]="selectedRange"
  [minDate]="minDate"
  [disablePastDates]="true"
  (datePickerSelected)="handleRangeSelected($event)"
&gt;&lt;/mnt-date-picker&gt;

// Componente TypeScript
export class MyComponent {
  selectedDate: Date | null = null;
  selectedRange = { start: null, end: null };
  minDate = new Date();

  handleDateSelected(event: any): void {
    console.log('Data selecionada:', event.detail);
    this.selectedDate = event.detail.date;
  }

  handleRangeSelected(event: any): void {
    console.log('Período selecionado:', event.detail);
    this.selectedRange = event.detail.range;
  }

  handleCancel(): void {
    console.log('Seleção cancelada');
  }
}</code></pre>
      </div>

      <div style="margin-top: 20px; padding: 16px; background: #e7f3ff; border-left: 4px solid #0066ff; border-radius: 4px;">
        <strong>✅ Simples assim!</strong>
        <p style="margin: 8px 0 0 0;">
          Não precisa de wrappers ou diretivas complexas.
          Use diretamente com eventos <code>(datePickerSelected)</code> e binding <code>[selectedDate]</code>.
        </p>
      </div>
    </div>
  `;
};

AngularExample.parameters = {
  controls: { disable: true },
};

// Story: Disable Past Dates
export const DisablePastDates = DefaultTemplate.bind({});
DisablePastDates.args = {
  mode: 'single',
  locale: 'pt-BR',
  disablePastDates: true,
} as Partial<DatePickerBaseProps>;
DisablePastDates.parameters = {
  docs: {
    description: {
      story:
        '**Desabilita datas passadas**. ' +
        'Quando a propriedade `disable-past-dates` está ativa, apenas datas a partir de hoje podem ser selecionadas. ' +
        'Útil para agendamentos, reservas e qualquer situação onde datas passadas não fazem sentido.\n\n' +
        '```html\n' +
        '<mnt-date-picker disable-past-dates></mnt-date-picker>\n' +
        '```',
    },
  },
};
