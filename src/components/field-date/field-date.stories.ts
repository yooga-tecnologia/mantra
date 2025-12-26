import type { Meta, StoryFn } from '@storybook/html';
import { FieldDateProps } from './field-date.types';

type HTMLString = string;

const sizeVariants = ['small', 'medium', 'large'] as const;

const meta: Meta<FieldDateProps> = {
  title: 'Forms/FieldDate',
  component: 'mnt-field-date',
  argTypes: {
    inputName: { control: 'text', description: 'Nome do input (ID)' },
    labelText: { control: 'text', description: 'Texto do label' },
    placeholder: { control: 'text', description: 'Placeholder do input' },
    required: { control: 'boolean', description: 'Campo obrigatório' },
    disabled: { control: 'boolean', description: 'Campo desabilitado' },
    size: {
      control: 'select',
      options: sizeVariants,
      description: 'Tamanho do campo',
    },
    value: {
      control: 'text',
      description: 'Valor atual do campo',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **mnt-field-date** é um campo de seleção de data que integra um date-picker interativo.

### Características principais:

- **Integração com Date Picker**: Abre automaticamente o date-picker ao clicar
- **Modos Single e Range**: Suporta seleção de data única ou intervalo
- **Readonly Input**: Previne digitação manual, força uso do picker
- **Eventos Customizados**: Emite \`valueChange\` e \`rawValueChange\`
- **Click Outside**: Fecha automaticamente ao clicar fora
- **Responsivo**: Adapta-se a diferentes tamanhos (small, medium, large)
- **Acessível**: Labels associados e atributos adequados

### Como usar:

\`\`\`html
<mnt-field-date
  input-name="birthDate"
  label-text="Data de Nascimento"
  placeholder="dd/mm/yyyy"
  required
></mnt-field-date>
\`\`\`

### Uso em Angular:

**⚠️ Importante:** Em Angular, use **kebab-case** para atributos HTML e **camelCase** para property binding ou JavaScript.

#### Básico - Template Driven

\`\`\`typescript
// component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html'
})
export class DateFormComponent {
  selectedDate: string = '';

  handleDateChange(event: any): void {
    this.selectedDate = event.detail;
    console.log('Data selecionada:', this.selectedDate);
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<mnt-field-date
  input-name="birthDate"
  label-text="Data de Nascimento"
  placeholder="dd/mm/yyyy"
  [value]="selectedDate"
  (valueChange)="handleDateChange($event)"
  required
></mnt-field-date>

<!-- Ou usando property binding (camelCase): -->
<mnt-field-date
  [inputName]="'birthDate'"
  [labelText]="'Data de Nascimento'"
  [placeholder]="'dd/mm/yyyy'"
  [value]="selectedDate"
  (valueChange)="handleDateChange($event)"
  [required]="true"
></mnt-field-date>
\`\`\`

#### Modo Range (Período)

\`\`\`typescript
// component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html'
})
export class DateRangeComponent implements AfterViewInit {
  @ViewChild('rangeDateField', { static: false }) rangeDateField!: ElementRef;

  selectedPeriod: string = '';

  ngAfterViewInit(): void {
    // ⚠️ Em JavaScript: use camelCase
    if (this.rangeDateField?.nativeElement) {
      this.rangeDateField.nativeElement.datePickerConfig = {
        mode: 'range',
        disablePastDates: true
      };
    }
  }

  handlePeriodChange(event: any): void {
    this.selectedPeriod = event.detail;
    console.log('Período selecionado:', this.selectedPeriod);
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<!-- Usando atributos HTML (kebab-case): -->
<mnt-field-date
  #rangeDateField
  input-name="period"
  label-text="Período"
  placeholder="Selecione um intervalo"
  [value]="selectedPeriod"
  (valueChange)="handlePeriodChange($event)"
></mnt-field-date>

<!-- OU usando property binding (camelCase): -->
<mnt-field-date
  #rangeDateField
  [inputName]="'period'"
  [labelText]="'Período'"
  [placeholder]="'Selecione um intervalo'"
  [value]="selectedPeriod"
  (valueChange)="handlePeriodChange($event)"
></mnt-field-date>
\`\`\`

#### Com Reactive Forms

\`\`\`typescript
// component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      console.log('Formulário alterado:', values);
    });
  }

  handleStartDateChange(event: any): void {
    this.form.patchValue({ startDate: event.detail });
  }

  handleEndDateChange(event: any): void {
    this.form.patchValue({ endDate: event.detail });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    }
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Usando atributos HTML (kebab-case) com property binding para value: -->
  <mnt-field-date
    input-name="startDate"
    label-text="Data de Início"
    placeholder="dd/mm/yyyy"
    [value]="form.get('startDate')?.value"
    (valueChange)="handleStartDateChange($event)"
    required
  ></mnt-field-date>

  <mnt-field-date
    input-name="endDate"
    label-text="Data de Término"
    placeholder="dd/mm/yyyy"
    [value]="form.get('endDate')?.value"
    (valueChange)="handleEndDateChange($event)"
    required
  ></mnt-field-date>

  <!-- OU usando apenas property binding (tudo em camelCase): -->
  <mnt-field-date
    [inputName]="'startDate'"
    [labelText]="'Data de Início'"
    [placeholder]="'dd/mm/yyyy'"
    [value]="form.get('startDate')?.value"
    (valueChange)="handleStartDateChange($event)"
    [required]="true"
  ></mnt-field-date>

  <button type="submit" [disabled]="form.invalid">
    Enviar
  </button>
</form>
\`\`\`

### Com configuração de Date Picker:

\`\`\`javascript
// Vanilla JS - use camelCase
const fieldDate = document.querySelector('mnt-field-date');
fieldDate.datePickerConfig = {  // camelCase ✓
  mode: 'range',
  minDate: new Date(),
  disablePastDates: true
};
\`\`\`

\`\`\`typescript
// Angular com ViewChild - use camelCase
@ViewChild('fieldDate') fieldDate!: ElementRef;

ngAfterViewInit() {
  this.fieldDate.nativeElement.datePickerConfig = {  // camelCase ✓
    mode: 'range',
    disablePastDates: true
  };
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: FieldDateProps): HTMLString => {
  const id = args.inputName || 'dateInput';
  return `
    <div style="padding: 20px;">
      <mnt-field-date
        id="${id}"
        input-name="${args.inputName || 'dateInput'}"
        label-text="${args.labelText || ''}"
        placeholder="${args.placeholder || ''}"
        ${args.required ? 'required' : ''}
        ${args.disabled ? 'disabled' : ''}
        size="${args.size || 'medium'}"
        value="${args.value || ''}"
      ></mnt-field-date>
    </div>
  `;
};

/**
 * Exemplo básico de uso do campo de data
 */
export const Example = DefaultTemplate.bind({});
Example.args = {
  inputName: 'exampleDate',
  labelText: 'Data',
  placeholder: 'Selecione uma data',
  required: false,
  disabled: false,
  size: 'medium',
  value: '',
} as FieldDateProps;
Example.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico do campo de data com configurações padrão. Clique no input para abrir o date-picker.',
    },
  },
};

/**
 * Campo de data obrigatório com label
 */
export const Required: StoryFn = () => `
  <div style="padding: 20px;">
    <mnt-field-date
      input-name="requiredDate"
      label-text="Data de Nascimento"
      placeholder="dd/mm/yyyy"
      required
    ></mnt-field-date>
  </div>
`;
Required.parameters = {
  docs: {
    description: {
      story: 'Campo obrigatório com indicador visual (asterisco vermelho).',
    },
  },
};

/**
 * Todos os tamanhos disponíveis
 */
export const AllSizes: StoryFn = () => `
  <div style="display: flex; flex-direction: column; gap: 80px; padding: 20px;">
    <div>
      <h4>Small</h4>
      <mnt-field-date
        input-name="dateSmall"
        label-text="Data (Small)"
        placeholder="dd/mm/yyyy"
        size="small"
      ></mnt-field-date>
    </div>
    <div>
      <h4>Medium (Default)</h4>
      <mnt-field-date
        input-name="dateMedium"
        label-text="Data (Medium)"
        placeholder="dd/mm/yyyy"
        size="medium"
      ></mnt-field-date>
    </div>
    <div>
      <h4>Large</h4>
      <mnt-field-date
        input-name="dateLarge"
        label-text="Data (Large)"
        placeholder="dd/mm/yyyy"
        size="large"
      ></mnt-field-date>
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de todos os tamanhos disponíveis: small, medium e large.',
    },
  },
};

/**
 * Campo com modo Range (seleção de intervalo)
 */
export const RangeMode: StoryFn = () => {
  setTimeout(() => {
    const fieldDate = document.getElementById('rangeDateField') as any;
    if (fieldDate) {
      fieldDate.datePickerConfig = { mode: 'range' };
    }
  }, 100);

  return `
    <div style="padding: 20px;">
      <mnt-field-date
        id="rangeDateField"
        input-name="rangeDateInput"
        label-text="Período"
        placeholder="Selecione um intervalo"
        size="medium"
      ></mnt-field-date>
    </div>
  `;
};
RangeMode.parameters = {
  docs: {
    description: {
      story: `Campo configurado para seleção de intervalo de datas (range mode).

O date-picker permite selecionar data inicial e final.`,
    },
  },
};

/**
 * Campo com valor pré-definido
 */
export const WithValue: StoryFn = () => `
  <div style="padding: 20px;">
    <mnt-field-date
      input-name="prefilledDate"
      label-text="Data Pré-preenchida"
      value="26/12/2024"
      size="medium"
    ></mnt-field-date>
  </div>
`;
WithValue.parameters = {
  docs: {
    description: {
      story: 'Campo com valor inicial já definido.',
    },
  },
};

/**
 * Integração com eventos
 */
export const WithEvents: StoryFn = () => {
  setTimeout(() => {
    const fieldDate = document.getElementById('eventDateField') as HTMLElement;
    const output = document.getElementById('eventOutput') as HTMLElement;

    fieldDate?.addEventListener('valueChange', (e: CustomEvent) => {
      output.textContent = `Data selecionada: ${e.detail}`;
      console.log('valueChange:', e.detail);
    });

    fieldDate?.addEventListener('rawValueChange', (e: CustomEvent) => {
      console.log('rawValueChange:', e.detail);
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <mnt-field-date
        id="eventDateField"
        input-name="eventDate"
        label-text="Data com Eventos"
        placeholder="Selecione uma data"
      ></mnt-field-date>
      <div id="eventOutput" style="margin-top: 20px; padding: 12px; background: #f0f0f0; border-radius: 6px;">
        Aguardando seleção...
      </div>
      <small style="display: block; margin-top: 8px; color: #666;">
        Abra o console para ver os eventos sendo emitidos
      </small>
    </div>
  `;
};
WithEvents.parameters = {
  docs: {
    description: {
      story: `Demonstração dos eventos \`valueChange\` e \`rawValueChange\` emitidos quando uma data é selecionada.

Os eventos contêm a data formatada como string.`,
    },
  },
};

/**
 * Formulário completo
 */
export const InForm: StoryFn = () => {
  setTimeout(() => {
    const form = document.getElementById('dateForm') as HTMLFormElement;
    const output = document.getElementById('formOutput') as HTMLElement;

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const startDate = (document.getElementById('startDateField') as any)?.value || 'Não preenchido';
      const endDate = (document.getElementById('endDateField') as any)?.value || 'Não preenchido';

      output.innerHTML = `
        <strong>Formulário Enviado:</strong><br>
        Data Início: ${startDate}<br>
        Data Término: ${endDate}
      `;
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <form id="dateForm" style="display: flex; flex-direction: column; gap: 80px; max-width: 400px;">
        <mnt-field-date
          id="startDateField"
          input-name="startDate"
          label-text="Data de Início"
          placeholder="dd/mm/yyyy"
          required
          size="medium"
        ></mnt-field-date>

        <mnt-field-date
          id="endDateField"
          input-name="endDate"
          label-text="Data de Término"
          placeholder="dd/mm/yyyy"
          required
          size="medium"
        ></mnt-field-date>

        <button type="submit" style="padding: 12px 24px; background: #0066cc; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
          Enviar Formulário
        </button>
      </form>

      <div id="formOutput" style="margin-top: 20px; padding: 12px; background: #f0f0f0; border-radius: 6px;">
        Preencha o formulário e clique em enviar
      </div>
    </div>
  `;
};
InForm.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de uso do campo de data dentro de um formulário completo com validação de campos obrigatórios.',
    },
  },
};

/**
 * Exemplo de uso em Angular - Básico
 */
export const AngularBasicUsage: StoryFn = () => {
  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Uso Básico</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <mnt-field-date
          id="angularBasicDate"
          input-name="basicDate"
          label-text="Data de Nascimento"
          placeholder="dd/mm/yyyy"
          required
          size="medium"
        ></mnt-field-date>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html'
})
export class DateFormComponent {
  selectedDate: string = '';

  handleDateChange(event: any): void {
    this.selectedDate = event.detail;
    console.log('Data selecionada:', this.selectedDate);
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;mnt-field-date
  input-name="birthDate"
  label-text="Data de Nascimento"
  placeholder="dd/mm/yyyy"
  [value]="selectedDate"
  (valueChange)="handleDateChange($event)"
  required
&gt;&lt;/mnt-field-date&gt;</code></pre>
      </details>
    </div>
  `;
};
AngularBasicUsage.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo completo de integração com Angular usando template-driven approach.',
    },
  },
};

/**
 * Exemplo de uso em Angular - Reactive Forms
 */
export const AngularReactiveForms: StoryFn = () => {
  setTimeout(() => {
    const startField = document.getElementById('reactiveStartDate') as HTMLElement;
    const endField = document.getElementById('reactiveEndDate') as HTMLElement;
    const submitBtn = document.getElementById('reactiveSubmitBtn') as HTMLButtonElement;
    const output = document.getElementById('reactiveOutput') as HTMLElement;

    let formValues = { startDate: '', endDate: '' };

    startField?.addEventListener('valueChange', (e: CustomEvent) => {
      formValues.startDate = e.detail;
      updateSubmitButton();
    });

    endField?.addEventListener('valueChange', (e: CustomEvent) => {
      formValues.endDate = e.detail;
      updateSubmitButton();
    });

    function updateSubmitButton() {
      submitBtn.disabled = !formValues.startDate || !formValues.endDate;
    }

    submitBtn?.addEventListener('click', () => {
      output.innerHTML = `
        <strong>Formulário Enviado:</strong><br>
        Data de Início: ${formValues.startDate}<br>
        Data de Término: ${formValues.endDate}
      `;
    });
  }, 100);

  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Reactive Forms</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <div style="display: flex; flex-direction: column; gap: 80px; margin-bottom: 20px;">
          <mnt-field-date
            id="reactiveStartDate"
            input-name="reactiveStart"
            label-text="Data de Início"
            placeholder="dd/mm/yyyy"
            required
            size="medium"
          ></mnt-field-date>

          <mnt-field-date
            id="reactiveEndDate"
            input-name="reactiveEnd"
            label-text="Data de Término"
            placeholder="dd/mm/yyyy"
            required
            size="medium"
          ></mnt-field-date>
        </div>

        <button
          id="reactiveSubmitBtn"
          type="button"
          disabled
          style="padding: 12px 24px; background: #0066cc; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;"
        >
          Enviar Formulário
        </button>

        <div id="reactiveOutput" style="margin-top: 20px; padding: 12px; background: #f0f0f0; border-radius: 6px;">
          Preencha os campos e clique em enviar
        </div>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      console.log('Formulário alterado:', values);
    });
  }

  handleStartDateChange(event: any): void {
    this.form.patchValue({ startDate: event.detail });
  }

  handleEndDateChange(event: any): void {
    this.form.patchValue({ endDate: event.detail });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    }
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html (atributos HTML - kebab-case)</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;form [formGroup]="form" (ngSubmit)="onSubmit()"&gt;
  &lt;mnt-field-date
    input-name="startDate"
    label-text="Data de Início"
    placeholder="dd/mm/yyyy"
    [value]="form.get('startDate')?.value"
    (valueChange)="handleStartDateChange($event)"
    required
  &gt;&lt;/mnt-field-date&gt;

  &lt;button type="submit" [disabled]="form.invalid"&gt;
    Enviar
  &lt;/button&gt;
&lt;/form&gt;</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html (property binding - camelCase)</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;form [formGroup]="form" (ngSubmit)="onSubmit()"&gt;
  &lt;mnt-field-date
    [inputName]="'startDate'"
    [labelText]="'Data de Início'"
    [placeholder]="'dd/mm/yyyy'"
    [value]="form.get('startDate')?.value"
    (valueChange)="handleStartDateChange($event)"
    [required]="true"
  &gt;&lt;/mnt-field-date&gt;

  &lt;button type="submit" [disabled]="form.invalid"&gt;
    Enviar
  &lt;/button&gt;
&lt;/form&gt;</code></pre>
      </details>
    </div>
  `;
};
AngularReactiveForms.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de integração com Angular Reactive Forms, incluindo validação e binding bidirecional.',
    },
  },
};

/**
 * Exemplo de uso em Angular - Modo Range
 */
export const AngularRangeMode: StoryFn = () => {
  setTimeout(() => {
    const rangeField = document.getElementById('angularRangeField') as any;
    const output = document.getElementById('angularRangeOutput') as HTMLElement;

    if (rangeField) {
      rangeField.datePickerConfig = { mode: 'range' };

      rangeField.addEventListener('valueChange', (e: CustomEvent) => {
        output.innerHTML = `<strong>Período selecionado:</strong><br>${e.detail}`;
      });
    }
  }, 100);

  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Modo Range</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <mnt-field-date
          id="angularRangeField"
          input-name="angularRange"
          label-text="Período"
          placeholder="Selecione um intervalo"
          size="medium"
        ></mnt-field-date>

        <div id="angularRangeOutput" style="margin-top: 20px; padding: 12px; background: #f0f0f0; border-radius: 6px;">
          Selecione um período no date-picker
        </div>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html'
})
export class DateRangeComponent implements AfterViewInit {
  @ViewChild('rangeDateField', { static: false }) rangeDateField!: ElementRef;

  selectedPeriod: string = '';

  ngAfterViewInit(): void {
    // Configura o date-picker para modo range
    if (this.rangeDateField?.nativeElement) {
      this.rangeDateField.nativeElement.datePickerConfig = {
        mode: 'range',
        disablePastDates: true // Opcional
      };
    }
  }

  handlePeriodChange(event: any): void {
    this.selectedPeriod = event.detail;
    console.log('Período selecionado:', this.selectedPeriod);
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html (atributos HTML - kebab-case)</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;mnt-field-date
  #rangeDateField
  input-name="period"
  label-text="Período"
  placeholder="Selecione um intervalo"
  [value]="selectedPeriod"
  (valueChange)="handlePeriodChange($event)"
&gt;&lt;/mnt-field-date&gt;</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html (property binding - camelCase)</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;mnt-field-date
  #rangeDateField
  [inputName]="'period'"
  [labelText]="'Período'"
  [placeholder]="'Selecione um intervalo'"
  [value]="selectedPeriod"
  (valueChange)="handlePeriodChange($event)"
&gt;&lt;/mnt-field-date&gt;</code></pre>
      </details>

      <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 6px; margin-top: 12px;">
        <strong>💡 Dicas Angular:</strong><br>
        • Use <code>ViewChild</code> + <code>AfterViewInit</code> para configurar via JavaScript<br>
        • Em JavaScript: sempre use <strong>camelCase</strong> (ex: <code>datePickerConfig</code>)<br>
        • Em HTML: atributos = <strong>kebab-case</strong>, property binding = <strong>camelCase</strong>
      </div>
    </div>
  `;
};
AngularRangeMode.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de configuração do modo range (intervalo de datas) em Angular, usando ViewChild para acessar o elemento e configurar o date-picker.',
    },
  },
};
