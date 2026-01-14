import { Component, Host, Prop, Event, EventEmitter, h, State, Watch, Element } from '@stencil/core';
import { AttachInternals, FunctionalComponent, HostAttributes } from '@stencil/core/internal';

import { COMPONENT_PREFIX, SwitchBaseProps, SwitchChangeEventDetail, SwitchType } from './switch.types';

let switchIdCounter = 0;

@Component({
  tag: 'mnt-switch',
  styleUrl: 'switch.scss',
  shadow: false,
  formAssociated: true,
})
export class Switch {
  private inputEl?: HTMLInputElement;
  private generatedId: string;

  @Element() el: HTMLElement;
  @AttachInternals() internals: ElementInternals;

  // Props
  @Prop() inputId?: SwitchBaseProps['inputId'];
  @Prop() name?: SwitchBaseProps['name'];
  @Prop() value?: SwitchBaseProps['value'] = '';
  @Prop() type?: SwitchType = 'checkbox';
  @Prop() label?: SwitchBaseProps['label'];
  @Prop() description?: SwitchBaseProps['description'];
  @Prop() disabled?: SwitchBaseProps['disabled'] = false;
  @Prop({ mutable: true, reflect: true }) checked?: SwitchBaseProps['checked'] = false;
  @Prop() required?: SwitchBaseProps['required'] = false;

  // State
  @State() private internalChecked: boolean = false;

  // Events
  @Event({ eventName: 'switchChange' }) switchChange: EventEmitter<SwitchChangeEventDetail>;
  @Event({ eventName: 'switchBlur' }) switchBlur: EventEmitter<FocusEvent>;
  @Event({ eventName: 'switchFocus' }) switchFocus: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.generatedId = this.inputId || this.el.id || `mnt-switch-${++switchIdCounter}`;
    this.validateProps();
    this.internalChecked = this.checked ?? false;
    this.updateFormValue();
  }

  componentDidLoad() {
    // Adiciona listener de evento nativo para garantir que o clique no label funcione
    if (this.inputEl) {
      this.inputEl.addEventListener('change', this.handleChange);
    }
  }

  disconnectedCallback() {
    // Remove listener ao desmontar
    if (this.inputEl) {
      this.inputEl.removeEventListener('change', this.handleChange);
    }
  }

  @Watch('checked')
  watchCheckedProp(newValue: boolean) {
    if (this.internalChecked !== newValue) {
      this.internalChecked = newValue;
      this.updateFormValue();

      if (this.inputEl && this.inputEl.checked !== newValue) {
        this.inputEl.checked = newValue;
      }
    }
  }

  private validateProps(): void {
    if (this.type === 'radio' && !this.name) {
      console.warn('[mnt-switch] The "name" prop is required when type="radio"');
    }

    if (this.type === 'radio' && !this.value) {
      console.warn('[mnt-switch] The "value" prop is recommended when type="radio"');
    }
  }

  private updateFormValue(): void {
    if (this.type === 'checkbox') {
      // For checkbox, send the value only if checked, otherwise null
      this.internals.setFormValue(this.internalChecked ? this.value || 'on' : null);
    } else {
      // For radio, send the value only if checked
      this.internals.setFormValue(this.internalChecked ? this.value : null);
    }

    // Update validity
    if (this.required && !this.internalChecked) {
      this.internals.setValidity({ valueMissing: true }, 'Please check this box if you want to proceed.', this.inputEl);
    } else {
      this.internals.setValidity({});
    }
  }

  private handleChange = (event: Event): void => {
    // console.log('[mnt-switch] handleChange disparado!', event);
    const target = event.target as HTMLInputElement;
    this.internalChecked = target.checked;
    this.checked = target.checked;

    this.updateFormValue();

    // Emit custom event with detailed information
    this.switchChange.emit({
      checked: this.internalChecked,
      value: this.value,
      id: this.generatedId,
      name: this.name,
    });

    // Emit native-like events for better framework integration
    // This allows frameworks to listen to standard 'change' and 'input' events
    this.el.dispatchEvent(
      new CustomEvent('switchChange', {
        bubbles: true,
        composed: true,
        detail: { checked: this.internalChecked, value: this.value },
      }),
    );

    this.el.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { checked: this.internalChecked, value: this.value },
      }),
    );
  };

  private handleBlur = (event: FocusEvent): void => {
    this.switchBlur.emit(event);
  };

  private handleFocus = (event: FocusEvent): void => {
    this.switchFocus.emit(event);
  };

  /**
   * Public method to get the native input element
   */
  public getInput(): HTMLInputElement | undefined {
    return this.inputEl;
  }

  /**
   * Public method to get the current checked state
   */
  public getChecked(): boolean {
    return this.internalChecked;
  }

  /**
   * Public method to set the checked state programmatically
   */
  public setChecked(checked: boolean): void {
    this.checked = checked;
  }

  /**
   * Simple checked setter for framework integration
   * Use: element.checkedValue = true/false
   */
  public set checkedValue(val: any) {
    const checked = val === true || val === 'true' || val === 1;
    this.setChecked(checked);
  }

  /**
   * Simple checked getter for framework integration
   * Use: const val = element.checkedValue
   */
  public get checkedValue(): boolean {
    return this.internalChecked;
  }

  private getSwitchElement(): FunctionalComponent<HostAttributes> {
    return (
      <input
        ref={(el) => (this.inputEl = el)}
        id={this.name + '-switch-input'}
        value={this.value}
        type={this.type}
        class={`${COMPONENT_PREFIX}-switch`}
        disabled={this.disabled}
        checked={this.internalChecked}
        required={this.required}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        aria-checked={this.internalChecked ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
        role="switch"
      />
    );
  }

  render(): FunctionalComponent<HostAttributes> {
    const hasContent = this.label || this.description;

    if (!hasContent) {
      return <Host>{this.getSwitchElement()}</Host>;
    }

    return (
      <Host>
        <div class={`${COMPONENT_PREFIX}-group`}>
          {this.getSwitchElement()}
          <label
            class={`${COMPONENT_PREFIX}-label-wrapper`}
            htmlFor={this.name + '-switch-input'}
            onClick={(e) => {
              // console.log('[mnt-switch] Label clicado! Tentando toggle...');
              e.preventDefault(); // Previne comportamento padrão para evitar duplo clique
              if (this.inputEl && !this.disabled) {
                this.inputEl.click();
              }
            }}
          >
            {this.label && <span class={`${COMPONENT_PREFIX}-label`}>{this.label}</span>}
            {this.description && <span class={`${COMPONENT_PREFIX}-description`}>{this.description}</span>}
          </label>
        </div>
      </Host>
    );
  }
}
