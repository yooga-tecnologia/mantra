import { Component, Host, Prop, State, Listen, Element, h, EventEmitter, Event, Watch } from '@stencil/core';
import { classNames, setComponentClass } from 'src/utils/utils';
import { FieldDateProps } from './field-date.types';
import { DateSelectedEventDetail } from 'src/components';

@Component({
  tag: 'mnt-field-date',
  styleUrl: 'field-date.scss',
  shadow: false,
})
export class FieldDate {
  @Element() el: HTMLElement;
  @Prop({ reflect: true }) inputName: string;

  // Base styles
  @Prop() size?: FieldDateProps['size'] = 'medium';
  @Prop() disabled?: FieldDateProps['disabled'] = false;
  @Prop() required?: FieldDateProps['required'] = false;
  @Prop() placeholder?: FieldDateProps['placeholder'];
  @Prop() datePickerConfig?: FieldDateProps['datePickerConfig'];

  // Input Props
  @Prop({ mutable: true, reflect: true }) value?: string;

  // Structure
  @Prop() labelText?: FieldDateProps['labelText'];

  // Events
  @Event() valueChange: EventEmitter<string>;
  /**
   * Evento emitido com o valor numérico (sem formatação) quando o campo é alterado
   */
  @Event() rawValueChange: EventEmitter<string>;

  private readonly componentPrefix = setComponentClass('field-date', '');
  private readonly iconSizeMap = { small: 16, medium: 20, large: 24 };

  @State() private showDatePicker: boolean = false;

  private get fieldDateClass(): string {
    return classNames(this.componentPrefix, `${this.componentPrefix}-${this.size}`);
  }

  private get inputClass(): string {
    return classNames(`${this.componentPrefix}-input`);
  }

  private handleInput(event: CustomEvent<DateSelectedEventDetail>): void {
    const { formattedDate } = event.detail;

    this.value = formattedDate;
    this.valueChange.emit(this.value);
    this.rawValueChange.emit(formattedDate);
  }

  private handleToggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  private handleCloseDatePicker(): void {
    this.showDatePicker = false;
  }

  private getInputValue() {
    const value = this.value ?? this.el.getAttribute('value');
    if (!value) {
      return '';
    }
    return value;
  }

  @Watch('value')
  watchValueProp(newValue: string) {
    if (newValue !== undefined && newValue !== null) {
      this.value = newValue;
    }
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    if (!this.showDatePicker) return;
    const clickedInside = this.el.contains(event.target as Node);
    if (!clickedInside) {
      this.showDatePicker = false;
    }
  }

  // Render Methods

  private renderLabel() {
    if (!this.labelText) return null;
    return (
      <div class={`${this.componentPrefix}-label`}>
        <label htmlFor={this.inputName}>
          {this.labelText}
          {this.required && <span class="text-color-primary">*</span>}
        </label>
      </div>
    );
  }

  private renderInput() {
    return (
      <div>
        <div class={this.inputClass}>
          <input
            type="text"
            autocomplete="off"
            id={this.inputName}
            required={this.required}
            onClick={() => this.handleToggleDatePicker()}
            readonly
            value={this.value}
            placeholder={this.placeholder}
          />

          <mnt-icon
            class="icon-right"
            icon="calendar"
            size={this.iconSizeMap[this.size]}
          ></mnt-icon>
        </div>
      </div>
    );
  }

  private renderDatePicker() {
    if (!this.showDatePicker) return null;
    return (
      <div class={`${this.componentPrefix}-picker-dropdown`}>
        <mnt-date-picker
          mode={this.datePickerConfig?.mode}
          selectedDate={this.getInputValue()}
          disablePastDates={this.datePickerConfig?.disablePastDates}
          initialMonth={this.datePickerConfig?.initialMonth}
          locale={this.datePickerConfig?.locale}
          maxDate={this.datePickerConfig?.maxDate}
          minDate={this.datePickerConfig?.minDate}
          placeholder={this.datePickerConfig?.placeholder}
          required={this.datePickerConfig?.required}
          onDatePickerSelected={(e) => {
            this.handleInput(e);
            this.handleCloseDatePicker();
          }}
        ></mnt-date-picker>
      </div>
    );
  }

  render() {
    return (
      <Host class={this.fieldDateClass}>
        {this.renderLabel()}
        {this.renderInput()}
        {this.renderDatePicker()}
      </Host>
    );
  }
}
