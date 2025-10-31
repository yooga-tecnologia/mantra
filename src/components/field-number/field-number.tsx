import { Component, h, Prop, AttachInternals, Host, Watch, Element } from '@stencil/core';
import { setComponentClass } from 'src/utils/utils';
import { SizeVariants } from '@theme/theme.types';

import type { FieldNumberVariant } from './field-number.types';

@Component({
  tag: 'mnt-field-number',
  styleUrl: 'field-number.scss',
  shadow: false,
  formAssociated: true,
})
export class FieldNumber {
  @Prop() inputName!: string;
  @Prop() variant?: FieldNumberVariant = 'plain';
  @Prop() size?: Exclude<SizeVariants, 'tiny'>;
  @Prop() label?: string;
  @Prop() required?: boolean;
  @Prop() disabled?: boolean;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() step?: number;

  @Prop({ mutable: true, reflect: true }) value: string = '0';

  @Element() el!: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  @Watch('value')
  valueWatcher(newValue: string) {
    if (this.value === newValue && this.inputEl && this.inputEl.value === newValue) {
      return;
    }

    if (this.value !== newValue) {
      this.value = newValue;
    }

    if (this.inputEl && this.inputEl.value !== newValue) {
      this.inputEl.value = newValue;
      this.internals.setFormValue(newValue);
    }
  }

  inputEl?: HTMLInputElement;
  containerEl?: HTMLDivElement;
  componentPrefix: string = setComponentClass('field-number');
  private readonly containerId = `${this.componentPrefix}-input-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  constructor() {}

  private getContainerEl(): HTMLDivElement | null {
    if (this.containerEl) {
      return this.containerEl;
    }
    return document.getElementById(this.containerId) as HTMLDivElement;
  }

  private addFocusClass(): void {
    const container = this.getContainerEl();
    if (container) {
      container.classList.add(`${this.componentPrefix}-input-container-focused`);
    }
  }

  private removeFocusClass(): void {
    const container = this.getContainerEl();
    if (container) {
      container.classList.remove(`${this.componentPrefix}-input-container-focused`);
    }
  }

  componentWillLoad(): void {
    this.internals.setFormValue(this.value);
  }

  componentDidLoad(): void {
    if (this.inputEl && this.inputEl.value !== this.value) {
      this.inputEl.value = this.value;
      this.internals.setFormValue(this.value);
    }
  }

  private handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.value = newValue;
    this.internals.setFormValue(this.value);

    // Disparar evento customizado no elemento do componente para Angular capturar
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      cancelable: true,
      detail: { value: newValue },
    });
    this.el.dispatchEvent(changeEvent);
  }

  private decrementValue(): void {
    const stepValue = this.step || 1;
    const newValue = Number(this.value) - stepValue;
    const minValue = this.min || Number.NEGATIVE_INFINITY;

    if (newValue >= minValue) {
      const newValueStr = newValue.toString();

      if (this.inputEl) {
        this.inputEl.value = newValueStr;
      }

      this.value = newValueStr;
      this.internals.setFormValue(this.value);

      if (this.inputEl) {
        this.inputEl.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        const changeEvent = new CustomEvent('change', {
          bubbles: true,
          cancelable: true,
          detail: { value: newValueStr },
        });
        this.el.dispatchEvent(changeEvent);
      }
    }
  }

  private incrementValue(): void {
    const stepValue = this.step || 1;
    const currentValue = Number(this.value) || 0;
    const newValue = currentValue + stepValue;
    const maxValue = this.max !== undefined ? Number(this.max) : Number.POSITIVE_INFINITY;

    if (newValue <= maxValue) {
      const newValueStr = newValue.toString();

      if (this.inputEl) {
        this.inputEl.value = newValueStr;
      }

      this.value = newValueStr;
      this.internals.setFormValue(this.value);

      if (this.inputEl) {
        this.inputEl.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        const changeEvent = new CustomEvent('change', {
          bubbles: true,
          cancelable: true,
          detail: { value: newValueStr },
        });
        this.el.dispatchEvent(changeEvent);
      }
    }
  }

  private isDecrementDisabled(): boolean {
    return this.min !== undefined && Number(this.value) <= this.min;
  }

  private isIncrementDisabled(): boolean {
    return this.max !== undefined && Number(this.value) >= this.max;
  }

  get containerClass() {
    const baseClass = `${this.componentPrefix}-input-container`;
    const variantClass = `${this.componentPrefix}-variant-${this.variant}`;
    const sizeClass = this.size ? `${this.componentPrefix}-size-${this.size}` : '';
    return `${baseClass} ${variantClass} ${sizeClass}`.trim();
  }

  get buttonVariant(): 'plain' | 'regular' {
    switch (this.variant) {
      case 'plain':
        return 'plain';
      case 'default':
        return 'regular';
    }
  }

  renderLabel() {
    if (!this.label) return null;

    return (
      <label
        class={`${this.componentPrefix}-label`}
        htmlFor={this.inputName}
      >
        {this.label}
        {this.required && <span class="text-color-primary">*</span>}
      </label>
    );
  }

  renderInput() {
    const inputId = this.inputName || `${this.componentPrefix}-input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <input
        onInput={(event) => this.handleInputChange(event)}
        onFocus={() => this.addFocusClass()}
        onBlur={() => this.removeFocusClass()}
        ref={(el) => (this.inputEl = el)}
        type="number"
        id={inputId}
        name={inputId}
        required={this.required}
        min={this.min}
        max={this.max}
        step={this.step}
        value={this.value}
        disabled={this.disabled}
        data-size={this.size}
      />
    );
  }

  renderDecrementButton() {
    return (
      <mnt-button-icon
        icon="minus"
        variant={this.buttonVariant}
        color="neutral"
        size="small"
        disabled={this.isDecrementDisabled() || this.disabled}
        onButtonClick={() => this.decrementValue()}
      />
    );
  }

  renderIncrementButton() {
    return (
      <mnt-button-icon
        icon="plus"
        variant={this.buttonVariant}
        color="neutral"
        size="small"
        disabled={this.isIncrementDisabled() || this.disabled}
        onButtonClick={() => this.incrementValue()}
      />
    );
  }

  renderPlainVariant() {
    return (
      <div
        ref={(el) => (this.containerEl = el)}
        id={this.containerId}
        class={this.containerClass}
      >
        {this.renderDecrementButton()}
        {this.renderInput()}
        {this.renderIncrementButton()}
      </div>
    );
  }

  renderSimpleVariant() {
    return (
      <div
        ref={(el) => (this.containerEl = el)}
        id={this.containerId}
        class={this.containerClass}
      >
        {this.renderDecrementButton()}
        {this.renderInput()}
        {this.renderIncrementButton()}
      </div>
    );
  }

  renderDefaultVariant() {
    return (
      <div>
        {this.renderLabel()}
        <div
          ref={(el) => (this.containerEl = el)}
          id={this.containerId}
          class={this.containerClass}
        >
          <div
            class={`${this.componentPrefix}-input-wrapper`}
            data-size={this.size}
          >
            {this.renderInput()}
          </div>
          <div class={`${this.componentPrefix}-actions`}>
            {this.renderDecrementButton()}
            {this.renderIncrementButton()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const content =
      {
        plain: this.renderPlainVariant(),
        simple: this.renderSimpleVariant(),
        default: this.renderDefaultVariant(),
      }[this.variant] || this.renderPlainVariant();

    return <Host>{content}</Host>;
  }
}
