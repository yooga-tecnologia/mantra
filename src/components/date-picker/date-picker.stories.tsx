import type { StoryObj } from '@storybook/html-vite';
import { DatePickerBaseProps, DateSelectedEventDetail } from './date-picker.types';

type Story = StoryObj;

export default {
  title: 'Forms/DatePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente \`mnt-date-picker\` é um elemento de formulário utilizado para inserir data.

### Características:
- Modos Single e Range: Suporta seleção de data única ou intervalo (range)
- Data Mínima e Máxima: Define datas mínima e máxima selecionáveis
- Mês Inicial: Define o mês inicial exibido
- Locale: Define o locale utilizado para formatação da data (ex.: 'pt-BR', 'en-US')
- Desabilitar Datas Passadas: Desabilita seleção de datas passadas
- Acessível: Labels associados e atributos adequados

### Eventos:
- \`datePickerSelected\`: Disparado quando uma data (ou range) é selecionada
- \`datePickerCancel\`: Disparado quando o usuário cancela a seleção
- \`datePickerMonthChange\`: Disparado quando o usuário navega entre meses
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return DatePickerTemplate(storyContext.args as DatePickerBaseProps);
        },
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Modo de seleção de data',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'single' },
      },
    },
    disablePastDates: {
      control: 'boolean',
      description: 'Desabilita seleção de datas passadas',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minDate: {
      control: 'date',
      description: 'Data mínima selecionável.',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      control: 'date',
      description: 'Data máxima selecionável',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'null' },
      },
    },
    initialMonth: {
      control: 'date',
      description: 'Mês inicial',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'null' },
      },
    },
    locale: {
      control: 'text',
      description: 'Locale utilizado para formatação da data',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pt-BR' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-field-date ${args}></mnt-field-date>
    `;
  },
};

const DatePickerTemplate = (props: DatePickerBaseProps) => {
  return `
    <mnt-date-picker
      mode="${props.mode || 'single'}"
      selected-date="${props.selectedDate || ''}"
      selected-range="${props.selectedRange || ''}"
      min-date="${props.minDate || ''}"
      max-date="${props.maxDate || ''}"
      initial-month="${props.initialMonth || ''}"
      locale="${props.locale || 'pt-BR'}"
      disabled="${props.disabled || false}"
      required="${props.required || false}"
      placeholder="${props.placeholder || ''}"
      first-day-of-week="${props.firstDayOfWeek || 0}"
      disable-past-dates="${props.disablePastDates || false}"
    ></mnt-date-picker>`;
};

export const Default: Story = {
  args: {},
  render: DatePickerTemplate,
};

/**
 * Exemplo de integração com eventos emitidos pelo componente.
 * Selecione uma data (modo single) ou um período (modo range) para ver o resultado atualizado.
 *
 * Os eventos `datePickerSelected`, `datePickerCancel` e `datePickerMonthChange` são disparados
 * conforme o usuário interage com o calendário.
 */
export const Events: Story = {
  render: () => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div>
          <p style="font-weight: 600; font-size: 16px; margin: 0 0 12px;">Modo Single</p>
          <mnt-date-picker id="picker-single" mode="single"></mnt-date-picker>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
            <p style="font-weight: 600; margin: 0 0 4px;">Data Selecionada:</p>
            <p id="single-result" style="margin: 0;">Nenhuma</p>
          </div>
        </div>
        <div>
          <p style="font-weight: 600; font-size: 16px; margin: 0 0 12px;">Modo Range</p>
          <mnt-date-picker id="picker-range" mode="range"></mnt-date-picker>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
            <p style="font-weight: 600; margin: 0 0 4px;">Período Selecionado:</p>
            <p id="range-result" style="margin: 0;">Nenhum</p>
          </div>
        </div>
      </div>
      <div style="margin-top: 24px; padding: 12px 16px; background: #fffbeb; border-radius: 8px;">
        💡 <strong>Dica:</strong> Abra o Console para ver os eventos detalhados!
      </div>
    `;

    const singlePicker = wrapper.querySelector('#picker-single');
    const rangePicker = wrapper.querySelector('#picker-range');
    const singleResult = wrapper.querySelector<HTMLElement>('#single-result');
    const rangeResult = wrapper.querySelector<HTMLElement>('#range-result');

    singlePicker?.addEventListener('datePickerSelected', (event: Event) => {
      const detail = (event as CustomEvent<DateSelectedEventDetail>).detail;
      console.log('datePickerSelected (single):', detail);
      if (singleResult) singleResult.textContent = detail.formattedDate || 'Nenhuma';
    });

    rangePicker?.addEventListener('datePickerSelected', (event: Event) => {
      const detail = (event as CustomEvent<DateSelectedEventDetail>).detail;
      console.log('datePickerSelected (range):', detail);
      if (!rangeResult || !detail.range) return;
      const format = (d: Date | null) => (d ? d.toLocaleDateString('pt-BR') : '...');
      rangeResult.textContent = `${format(detail.range.start)} → ${format(detail.range.end)}`;
    });

    return wrapper;
  },
};

Events.parameters = {
  controls: { disable: true },
  actions: { disable: true },
  interactions: { disable: true },
  docs: {
    source: {
      code: `<mnt-date-picker id="my-picker" mode="single"></mnt-date-picker>

<script>
  const picker = document.querySelector('#my-picker');

  picker.addEventListener('datePickerSelected', (event) => {
    const { date, formattedDate, range, mode } = event.detail;
    console.log('Data selecionada:', formattedDate);
  });

  picker.addEventListener('datePickerMonthChange', (event) => {
    const { month, year } = event.detail;
    console.log('Mês alterado:', month, year);
  });
</script>`,
    },
  },
};
