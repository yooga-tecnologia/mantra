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
    if (newValue !== undefined && newValue !== null && this.inputRef) {
      if (this.mask === 'currency' && newValue) {
        // Se é máscara de currency, formata o valor
        const result = this.processCurrencyInput(newValue);
        this.inputRef.value = result.formatted;
        this.rawCurrencyValue = result.raw;
      } else {
        this.inputRef.value = newValue;
      }
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
  private inputRef?: HTMLInputElement;

  /**
   * Retorna o valor raw (sem formatação) quando usa currency mask
   * @returns Valor raw como string decimal (ex: "1000.50")
   */
  getRawValue(): string {
    return this.mask === 'currency' ? this.rawCurrencyValue : this.value || '';
  }

  componentDidLoad() {
    // Seta valor inicial se houver
    if (this.value && this.inputRef) {
      if (this.mask === 'currency') {
        const result = this.processCurrencyInput(this.value);
        this.inputRef.value = result.formatted;
        this.rawCurrencyValue = result.raw;
      } else {
        this.inputRef.value = this.value;
      }
    }
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
    const inputEl = event.target as HTMLInputElement;
    const inputValue = inputEl.value;

    if (!this.mask) {
      this.value = inputValue;
      this.valueChange.emit({ formattedValue: this.value, rawValue: this.value });
    } else if (this.mask === 'currency') {
      // Formata em tempo real como moeda (dígitos acumulam como centavos)
      const result = this.formatCurrencyRealtime(inputValue);
      // Garante que não há caracteres HTML ou estranhos
      const sanitized = result.formatted.replace(/[<>]/g, '');

      // Atualiza o input diretamente no DOM (evita re-render do Stencil)
      inputEl.value = sanitized;

      // Mantém cursor no final (comportamento natural para calculadora)
      const cursorPos = sanitized.length;
      inputEl.setSelectionRange(cursorPos, cursorPos);

      // NÃO atualiza this.value para evitar re-render
      // Apenas salva para referência interna
      this.rawCurrencyValue = result.raw;
      this.valueChange.emit({ formattedValue: sanitized, rawValue: result.raw });
    } else if (this.mask === 'custom' && this.customMask) {
      this.value = inputValue;
      const raw = this.value;
      inputEl.value = this.customMask(this.value);
      this.valueChange.emit({ formattedValue: this.value, rawValue: raw });
    } else {
      // Sem máscara ou máscara não implementada
      this.value = inputValue;
      this.valueChange.emit({ formattedValue: this.value, rawValue: this.value });
    }
  }

  /**
   * Formata moeda em tempo real durante a digitação
   * Dígitos acumulam como centavos (comportamento de calculadora)
   *
   * @param value - Valor do input (pode conter formatação prévia)
   * @returns Objeto com valor formatado e valor raw
   *
   * @example
   * formatCurrencyRealtime('1') // { formatted: 'R$ 0,01', raw: '0.01' }
   * formatCurrencyRealtime('11') // { formatted: 'R$ 0,11', raw: '0.11' }
   * formatCurrencyRealtime('111') // { formatted: 'R$ 1,11', raw: '1.11' }
   * formatCurrencyRealtime('1111') // { formatted: 'R$ 11,11', raw: '11.11' }
   * formatCurrencyRealtime('111111') // { formatted: 'R$ 1.111,11', raw: '1111.11' }
   */
  private formatCurrencyRealtime(value: string): { formatted: string; raw: string } {
    if (!value) return { formatted: '', raw: '0.00' };

    // Sanitiza e remove tudo exceto dígitos
    const cleanValue = String(value).trim();
    const onlyDigits = cleanValue.replace(/\D/g, '');

    if (!onlyDigits || onlyDigits === '0') {
      return { formatted: '', raw: '0.00' };
    }

    // Trata os dígitos como centavos
    const cents = parseInt(onlyDigits, 10);
    const numericValue = cents / 100;

    // Formata para moeda brasileira
    const formatted = numericValue
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\u00A0/g, ' ') // Remove &nbsp; (non-breaking space) e substitui por espaço comum
      .trim(); // Remove espaços extras no início/fim

    const rawDecimal = numericValue.toFixed(2);

    return {
      formatted,
      raw: rawDecimal,
    };
  }

  /**
   * Converte valor inicial/externo para moeda (usado no carregamento)
   * Aceita números ou strings com decimal para inicializar o campo
   *
   * @param value - Valor a ser convertido
   * @returns Objeto com valor formatado e valor raw
   *
   * @example
   * processCurrencyInput(100.50) // { formatted: 'R$ 100,50', raw: '100.50' }
   * processCurrencyInput('100.50') // { formatted: 'R$ 100,50', raw: '100.50' }
   */
  private processCurrencyInput(value: string | number): { formatted: string; raw: string } {
    if (!value && value !== 0) return { formatted: '', raw: '0.00' };

    let numericValue: number;

    if (typeof value === 'number') {
      numericValue = value;
    } else {
      // Remove formatação e converte para número
      const cleanValue = value.replace(/[^\d.,]/g, '');

      if (!cleanValue) return { formatted: '', raw: '0.00' };

      // Normaliza separadores (. ou ,) para ponto decimal
      const normalized = cleanValue.replace(',', '.');
      numericValue = parseFloat(normalized);

      if (isNaN(numericValue)) {
        return { formatted: '', raw: '0.00' };
      }
    }

    const formatted = numericValue
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\u00A0/g, ' ') // Remove &nbsp; (non-breaking space) e substitui por espaço comum
      .trim(); // Remove espaços extras no início/fim

    const rawDecimal = numericValue.toFixed(2);

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

    const formatted = numericValue
      .toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\u00A0/g, ' ') // Remove &nbsp; (non-breaking space) e substitui por espaço comum
      .trim(); // Remove espaços extras

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
      // Se o valor já está formatado (começa com R$), retorna direto
      if (typeof value === 'string' && value.startsWith('R$')) {
        return value;
      }
      // Caso contrário, formata valor inicial vindo do backend/prop
      const result = this.processCurrencyInput(value);
      this.rawCurrencyValue = result.raw;
      return result.formatted;
    } else if (this.mask === 'custom' && this.customMask) {
      const formatted = this.customMask(value);
      return formatted;
    } else {
      // Sem máscara ou máscara não implementada, retorna valor original
      return value;
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
          ref={(el) => (this.inputRef = el)}
          type={this.host.getAttribute('type') || 'text'}
          id={this.name + '-input'}
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
