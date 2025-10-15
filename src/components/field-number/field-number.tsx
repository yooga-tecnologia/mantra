import { Component, EventEmitter, h, Prop, Event } from '@stencil/core';
import { FieldNumberProps } from './field-number.types';

@Component({
  tag: 'mnt-field-number',
  styleUrl: 'field-number.scss',
  shadow: false,
})
export class FieldNumber {
  @Prop() inputName!: string;
  @Prop() variant: FieldNumberProps['variant'] = 'default';
  @Prop({ mutable: true }) value: number | string = 0;
  @Prop() required: boolean = false;

  @Prop() label?: FieldNumberProps['label'];
  @Prop() step?: number = 0.1;
  @Prop() toFixed?: number | undefined;
  @Prop() min?: number;
  @Prop() max?: number;

  // Events
  @Event() valueChange: EventEmitter<string>;
  /**
   * Evento emitido com o valor numérico (sem formatação) quando o campo é alterado
   */
  @Event() rawValueChange: EventEmitter<string>;

  private inputEl?: HTMLInputElement;

  public getInput(): HTMLInputElement | undefined {
    return this.inputEl;
  }

  private handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    let rawValue: string = value;

    this.rawValueChange.emit(rawValue);
    this.valueChange.emit(value);
  }

  private formatDecimal(value: number): void {
    if (this.toFixed !== undefined) {
      this.value = Number(value.toFixed(this.toFixed));
    }
  }

  private incrementValue(): void {
    this.value = Number(this.value) + Number(this.step);
    this.formatDecimal(this.value as number);
  }

  private decrementValue(): void {
    this.value = Number(this.value) - Number(this.step);
    this.formatDecimal(this.value as number);
  }

  private renderLabel(): void {
    return (
      this.label && (
        <label
          class="mnt-field-number-label"
          htmlFor={this.inputName}
        >
          {this.label}
          {this.required && <span class="text-color-primary">*</span>}
        </label>
      )
    );
  }

  private renderActionButtons(): void {
    return (
      <div class="mnt-field-number-actions">
        <mnt-button-icon
          variant={this.variant === 'plain' ? 'plain' : 'regular'}
          color="neutral"
          icon="minus"
          size="small"
          disabled={this.min !== undefined && Number(this.value) <= this.min}
          onButtonClick={() => this.decrementValue()}
        ></mnt-button-icon>
        <mnt-button-icon
          variant={this.variant === 'plain' ? 'plain' : 'regular'}
          color="neutral"
          icon="plus"
          size="small"
          disabled={this.max !== undefined && Number(this.value) >= this.max}
          onButtonClick={() => this.incrementValue()}
        ></mnt-button-icon>
      </div>
    );
  }

  private renderInput() {
    return (
      <input
        type="number"
        id={this.inputName}
        value={this.value}
        required={this.required}
        min={this.min}
        max={this.max}
        step={this.step}
        onInput={(e) => this.handleInput(e)}
        ref={(el) => (this.inputEl = el)}
      />
    );
  }

  private renderDefaultVariant() {
    return (
      <>
        {this.renderLabel()}

        <div class="mnt-field-number-input-container">
          {this.renderInput()}
          {this.renderActionButtons()}
        </div>
      </>
    );
  }

  // TODO: implementar o variant simple
  // private renderSimpleVariant() {
  //   return (
  //     <input
  //       type="number"
  //       class="simple"
  //     />
  //   );
  // }

  private renderPlainVariant() {
    return (
      <div class="mnt-field-number-input-container">
        {this.renderInput()}
        {this.renderActionButtons()}
      </div>
    );
  }

  private renderContainer() {
    let container;
    switch (this.variant) {
      // TODO: implementar o variant simple
      // case 'simple':
      //   container = this.renderSimpleVariant();
      //   break;
      case 'plain':
        container = this.renderPlainVariant();
        break;
      default:
        container = this.renderDefaultVariant();
    }

    return container;
  }

  render() {
    return <div class={`mnt-field-number mnt-field-number-${this.variant}`}>{this.renderContainer()}</div>;
  }
}
