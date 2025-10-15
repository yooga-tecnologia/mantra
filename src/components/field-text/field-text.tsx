import { Component, EventEmitter, Host, Prop, Event, h } from '@stencil/core';
import { classNames, setComponentClass } from 'src/utils/utils';
import { FieldTextProps } from './field-text.types';

@Component({
  tag: 'mnt-field-text',
  styleUrl: 'field-text.scss',
  shadow: false,
})
export class FieldText {
  @Prop({ reflect: true }) inputName: string;

  // Base styles
  @Prop() size?: FieldTextProps['size'] = 'medium';
  @Prop() state?: FieldTextProps['state'] = 'default';
  @Prop() disabled?: FieldTextProps['disabled'] = false;
  @Prop() required?: FieldTextProps['required'] = false;
  @Prop() placeholder?: FieldTextProps['placeholder'];

  // Input Props
  @Prop() mask?: 'currency' | 'custom';
  @Prop() maxLength?: number;
  @Prop() minLength?: number;
  @Prop() max?: number;
  @Prop() min?: number;
  @Prop({ mutable: true, reflect: true }) value?: string;

  // Structure
  @Prop() iconLeft?: FieldTextProps['iconLeft'];
  @Prop() iconRight?: FieldTextProps['iconRight'];
  @Prop() labelText?: FieldTextProps['labelText'];
  @Prop() inlineMessage?: FieldTextProps['inlineMessage'];
  @Prop() hasActionButton?: FieldTextProps['hasActionButton'];
  @Prop() hasInfoButton?: FieldTextProps['hasInfoButton'];

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

  private readonly componentPrefix = setComponentClass('field-text', '');
  private readonly iconSizeMap = { small: 16, medium: 20, large: 24 };

  private get fieldTextClass() {
    return classNames(this.componentPrefix, `${this.componentPrefix}-${this.size}`, `${this.componentPrefix}-${this.state}`);
  }

  private get inputClass() {
    return classNames(`${this.componentPrefix}-input`, this.iconLeft && `${this.componentPrefix}-icon-left`, this.iconRight && `${this.componentPrefix}-icon-right`);
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    let rawValue: string = value;
    if (this.mask === 'currency') {
      value = this.formatCurrency(value);
      // Atualiza o input com o valor formatado
      if (this.inputEl) {
        this.inputEl.value = value;
      }
      rawValue = this.removeCurrencyMask(value);
    }
    this.value = value;
    this.valueChange.emit(this.value);
    this.rawValueChange.emit(rawValue);
  }

  /**
   * Converte string formatada (R$ 1.234,56) para número (1234.56)
   */
  private removeCurrencyMask(valorFormatado: string): string {
    if (!valorFormatado) return '';
    // Remove tudo que não for número ou vírgula
    const limpo = valorFormatado.replace(/[^\d,]/g, '').replace(',', '.');
    return limpo;
  }

  private formatCurrency(value: string): string {
    // Remove tudo que não for número
    let v = value.replace(/\D/g, '');
    if (!v) return '';
    v = (Number(v) / 100).toFixed(2);
    v = v.replace('.', ',');
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + v;
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

        {this.hasInfoButton && (
          <div class={`${this.componentPrefix}-info-button`}>
            <slot name="info-button"></slot>
          </div>
        )}

        {this.hasActionButton && (
          <div class={`${this.componentPrefix}-action-button`}>
            <slot name="action-button"></slot>
          </div>
        )}
      </div>
    );
  }

  private renderInput() {
    return (
      <div class={this.inputClass}>
        {this.iconLeft && (
          <mnt-icon
            class="icon-left"
            icon={this.iconLeft}
            size={this.iconSizeMap[this.size]}
          ></mnt-icon>
        )}

        <input
          type="text"
          id={this.inputName}
          placeholder={this.placeholder}
          required={this.required}
          maxLength={this.maxLength}
          minLength={this.minLength}
          max={this.max}
          min={this.min}
          value={this.value}
          onInput={(e) => this.handleInput(e)}
          ref={(el) => (this.inputEl = el)}
        />

        {this.state === 'error' && (
          <mnt-icon
            class="icon-state"
            icon="signalingErrorCircle"
            size={this.iconSizeMap[this.size]}
          ></mnt-icon>
        )}
        {this.state === 'success' && (
          <mnt-icon
            class="icon-state"
            icon="signalingCheckCircle"
            size={this.iconSizeMap[this.size]}
          ></mnt-icon>
        )}

        {this.iconRight && (
          <mnt-icon
            class="icon-right"
            icon={this.iconRight}
            size={this.iconSizeMap[this.size]}
          ></mnt-icon>
        )}
      </div>
    );
  }

  private renderInlineMessage() {
    if (!this.inlineMessage) return null;
    return (
      <div class={this.componentPrefix + '-inline-message'}>
        {this.state === 'error' ? (
          <mnt-icon
            icon="signalingErrorCircle"
            size="small"
          ></mnt-icon>
        ) : this.state === 'success' ? (
          <mnt-icon
            icon="signalingCheckCircle"
            size="small"
          ></mnt-icon>
        ) : (
          <mnt-icon
            icon="info"
            size="small"
          ></mnt-icon>
        )}
        <span>{this.inlineMessage}</span>
      </div>
    );
  }

  render() {
    return (
      <Host class={this.fieldTextClass}>
        {this.renderLabel()}
        {this.renderInput()}
        {this.renderInlineMessage()}
      </Host>
    );
  }
}
