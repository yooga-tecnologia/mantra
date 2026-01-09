import { Component, Element, EventEmitter, Host, Prop, Event, Watch, h } from '@stencil/core';
import { classNames, setComponentClass } from 'src/utils/utils';
import { FieldTextProps } from './field-text.types';

@Component({
  tag: 'mnt-field-text',
  styleUrl: 'field-text.scss',
  shadow: false,
  formAssociated: true,
})
export class FieldText {
  @Element() host: HTMLElement;

  // Base styles
  @Prop() name: string;
  @Prop() fullWidth?: boolean = false;
  @Prop() size?: FieldTextProps['size'] = 'medium';
  @Prop() placeholder?: FieldTextProps['placeholder'];
  @Prop({ mutable: true, reflect: true }) state?: FieldTextProps['state'] = 'default';

  // Input Props
  @Prop() mask?: 'currency' | 'custom' | null;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Watch('value')
  watchValueProp(newValue: string) {
    // Força atualização quando o valor muda externamente
    if (newValue !== undefined && newValue !== null) {
      this.value = newValue;
    }
  }

  // Structure
  @Prop() iconLeft?: FieldTextProps['iconLeft'];
  @Prop() iconRight?: FieldTextProps['iconRight'];
  @Prop() labelText?: FieldTextProps['labelText'];
  @Prop() hasActionButton?: FieldTextProps['hasActionButton'];
  @Prop() hasInfoButton?: FieldTextProps['hasInfoButton'];
  @Prop({ mutable: true, reflect: true }) inlineMessage?: FieldTextProps['inlineMessage'];

  @Prop() customMask?: (value: string) => string;

  // Events
  @Event() valueChange: EventEmitter<{ formattedValue: string; rawValue?: string }>;

  private readonly componentPrefix = setComponentClass('field-text', '');
  private readonly iconSizeMap = { small: 16, medium: 20, large: 24 };
  private rawCurrencyValue: string = '';
  private isFocused: boolean = false;

  /**
   * Retorna o valor raw (sem formatação) quando usa currency mask
   * @returns Valor raw como string decimal (ex: "1000.50")
   */
  getRawValue(): string {
    return this.mask === 'currency' ? this.rawCurrencyValue : this.value || '';
  }

  private get fieldTextClass() {
    return classNames(
      this.componentPrefix,
      `${this.componentPrefix}-${this.size}`,
      `${this.componentPrefix}-${this.state}`,
      this.fullWidth && `${this.componentPrefix}-full-width`,
    );
  }

  private get inputClass() {
    return classNames(
      `${this.componentPrefix}-input`,
      this.iconLeft && `${this.componentPrefix}-icon-left`,
      this.iconRight && `${this.componentPrefix}-icon-right`,
      this.fullWidth && `${this.componentPrefix}-full-width`,
    );
  }

  onInput(event: any) {
    this.value = event.target.value;
    const inputEl = event.target as HTMLInputElement;

    if (!this.mask) {
      this.valueChange.emit({ formattedValue: this.value, rawValue: this.value });
    } else if (this.mask === 'currency') {
      // Durante digitação: NÃO formata, apenas armazena o valor
      this.rawCurrencyValue = this.value;
      this.valueChange.emit({ formattedValue: this.value, rawValue: this.value });
    } else {
      const raw = this.value;
      inputEl.value = this.customMask(this.value);
      this.valueChange.emit({ formattedValue: this.value, rawValue: raw });
    }
  }

  onBlur(event: any) {
    this.isFocused = false;
    const inputEl = event.target as HTMLInputElement;

    if (this.mask === 'currency' && this.value) {
      const result = this.processCurrencyInput(this.value);
      inputEl.value = result.formatted;
      this.value = result.formatted;
      this.rawCurrencyValue = result.raw;
      this.valueChange.emit({ formattedValue: result.formatted, rawValue: result.raw });
    }
  }

  onFocus(event: any) {
    this.isFocused = true;
    const inputEl = event.target as HTMLInputElement;

    if (this.mask === 'currency' && this.rawCurrencyValue) {
      // AO ENTRAR no campo: mostra valor raw para facilitar edição
      inputEl.value = this.rawCurrencyValue;
      this.value = this.rawCurrencyValue;
    }
  }

  /**
   * Processa input de moeda enquanto o usuário digita ou cola valores
   *
   * Detecta automaticamente se é valor com decimal ou valor inteiro
   *
   * @param value - Valor do input (pode incluir formatação prévia)
   *
   * @returns Objeto com valor formatado e valor raw (decimal como string)
   *
   * @example
   * // Valor inteiro (sem decimal) - interpreta como REAIS
   * processCurrencyInput('100') // { formatted: 'R$ 100,00', raw: '100.00' }
   * processCurrencyInput('30000') // { formatted: 'R$ 30.000,00', raw: '30000.00' }
   *
   * @example
   * // Valor com decimal (. ou ,)
   * processCurrencyInput('1000.5') // { formatted: 'R$ 1.000,50', raw: '1000.50' }
   * processCurrencyInput('1000,50') // { formatted: 'R$ 1.000,50', raw: '1000.50' }
   */
  private processCurrencyInput(value: string): { formatted: string; raw: string } {
    if (!value) return { formatted: '', raw: '' };

    const cleanValue = value.replace(/[^\d.,]/g, ''); // Remove tudo exceto dígitos, ponto e vírgula

    if (!cleanValue) return { formatted: '', raw: '0' };

    const hasDecimalSeparator = cleanValue.includes('.') || cleanValue.includes(',');

    let numericValue: number;
    let rawDecimal: string;

    if (hasDecimalSeparator) {
      // Caso 1: Valor completo com decimal
      const normalized = cleanValue
        .replace(/\./g, (_match, offset) => {
          const hasCommaAfter = cleanValue.indexOf(',', offset) > offset;
          return hasCommaAfter ? '' : '.';
        })
        .replace(',', '.');

      numericValue = parseFloat(normalized);

      if (isNaN(numericValue)) {
        return { formatted: '', raw: '0' };
      }

      rawDecimal = numericValue.toFixed(2);
    } else {
      // Caso 2: Apenas dígitos (sem decimal)
      const onlyDigits = cleanValue.replace(/\D/g, '');

      if (!onlyDigits || onlyDigits === '0') {
        return { formatted: '', raw: '0' };
      }

      numericValue = parseInt(onlyDigits, 10);
      rawDecimal = numericValue.toFixed(2);
    }

    const formatted = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      formatted,
      raw: rawDecimal,
    };
  }

  /**
   * Máscara de moeda BRL para formatação inicial/externa
   * Aceita múltiplos formatos: strings, numbers, com ou sem separadores decimais
   * @param value - Valor a ser formatado (string ou number)
   * @returns Valor formatado com a máscara de moeda
   *
   * @example
   * currencyMask('10') // R$ 10,00
   * currencyMask('10.1') // R$ 10,10
   * currencyMask('11,01') // R$ 11,01
   * currencyMask('10000.01') // R$ 10.000,01
   * currencyMask('1000000000.01') // R$ 1.000.000.000,01
   * currencyMask(10) // R$ 10,00
   * currencyMask(10.5) // R$ 10,50
   */
  currencyMask(value: string | number): string {
    if (value === null || value === undefined || value === '') return '';

    let numericValue: number;

    if (typeof value === 'number') {
      numericValue = value;
    } else {
      const stringValue = String(value).trim();

      const hasDecimalSeparator = stringValue.includes('.') || stringValue.includes(',');

      if (hasDecimalSeparator) {
        const normalized = stringValue.replace(/\./g, '').replace(',', '.');
        numericValue = parseFloat(normalized);
      } else {
        numericValue = parseFloat(stringValue);
      }
    }

    if (isNaN(numericValue)) return '';

    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `R$ ${formatted}`;
  }

  private getInputValue() {
    const value = this.value ?? this.host.getAttribute('value');

    if (!value) {
      return '';
    }

    if (!this.mask) {
      return value;
    }

    if (this.mask === 'currency') {
      if (this.isFocused) {
        return this.rawCurrencyValue || value;
      }

      // Se não está focado, formata o valor
      const result = this.processCurrencyInput(String(value));
      this.rawCurrencyValue = result.raw;
      return result.formatted;
    } else {
      const formatted = this.customMask(value);
      return formatted;
    }
  }

  // Render Methods

  private renderLabel() {
    if (!this.labelText) return null;
    return (
      <div class={`${this.componentPrefix}-label`}>
        <label htmlFor={this.host.id + '-input'}>
          {this.labelText}
          {this.host.hasAttribute('required') && <span class="text-color-primary">*</span>}
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
          type={this.host.getAttribute('type') || 'text'}
          id={this.host.id + '-input'}
          name={this.name}
          minLength={Number(this.host.getAttribute('minlength')) || undefined}
          maxLength={Number(this.host.getAttribute('maxlength')) || undefined}
          min={Number(this.host.getAttribute('min')) || undefined}
          max={Number(this.host.getAttribute('max')) || undefined}
          placeholder={this.host.getAttribute('placeholder') || undefined}
          disabled={this.host.hasAttribute('disabled')}
          required={this.host.hasAttribute('required')}
          autocomplete={this.host.getAttribute('autocomplete') || 'off'}
          autoFocus={this.host.hasAttribute('autofocus') || false}
          value={this.getInputValue()}
          onInput={(e) => this.onInput(e)}
          onBlur={(e) => this.onBlur(e)}
          onFocus={(e) => this.onFocus(e)}
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
