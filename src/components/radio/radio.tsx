import { Component, Host, Prop, Watch, State, Event, EventEmitter, h } from '@stencil/core';
import { Element, FunctionalComponent, HostAttributes } from '@stencil/core/internal';
import { RadioBaseProps } from './radio.types';

import { getLibPrefix, setComponentClass } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
@Component({
  tag: 'mnt-radio',
  styleUrl: 'radio.scss',
  shadow: false,
})
export class Radio {
  @Element() host: HTMLElement;

  // Base styles
  @Prop() name?: RadioBaseProps['name'];
  @Prop() label?: RadioBaseProps['label'];
  @Prop() value?: RadioBaseProps['value'];
  @Prop() checked?: RadioBaseProps['checked'] = false;

  @State() internalChecked: boolean = false;

  // Events
  @Event() radioChange: EventEmitter<{ checked: boolean; value: string }>;

  // Structure
  private radioElement!: HTMLInputElement;
  private uniqueId: string;

  componentWillLoad() {
    this.internalChecked = this.checked || this.host.hasAttribute('checked');
    // Generate unique ID once
    this.uniqueId = this.value ? `${this.name}-${this.value}` : `${this.name}-${Math.random().toString(36).substr(2, 9)}`;
  }

  componentDidLoad() {
    if (this.radioElement) {
      this.radioElement.checked = this.internalChecked;
    }
  }

  @Watch('checked')
  watchCheckedProp(newValue: boolean) {
    this.internalChecked = newValue;
    if (this.radioElement) {
      this.radioElement.checked = newValue;
    }
  }

  @Watch('label')
  handleLabelChange(newValue: string): void {
    if (this.radioElement) {
      this.radioElement.setAttribute('aria-label', newValue);
    }
  }

  private get radioClass(): string {
    let componentClass = setComponentClass('radio');

    if (this.internalChecked) {
      componentClass += ` ${setComponentClass('radio-checked')}`;
    }

    if (this.host.hasAttribute('disabled')) {
      componentClass += ` ${setComponentClass('radio-disabled')}`;
    }

    return componentClass;
  }

  // Handlers
  private handleChange = (event: Event): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    // If already checked, uncheck (custom behavior)
    if (this.internalChecked) {
      target.checked = false;
      this.internalChecked = false;
      this.host.removeAttribute('checked');

      this.radioChange.emit({
        checked: false,
        value: this.value || this.name || '',
      });
    } else {
      // If not checked, check this one and uncheck others in the same group
      this.uncheckOthersInGroup();

      target.checked = true;
      this.internalChecked = true;
      this.host.setAttribute('checked', '');

      this.radioChange.emit({
        checked: true,
        value: this.value || this.name || '',
      });
    }
  };

  // Uncheck other radios in the same group
  private uncheckOthersInGroup(): void {
    if (!this.name) return;

    // Find all mnt-radio elements with the same name
    const allRadios = document.querySelectorAll(`mnt-radio[name="${this.name}"]`);

    allRadios.forEach((radio) => {
      if (radio !== this.host) {
        const radioInput = radio.querySelector('input[type="radio"]') as HTMLInputElement;
        if (radioInput) {
          radioInput.checked = false;
        }
        radio.removeAttribute('checked');

        // Update internal state if it's a component instance
        const radioComponent = radio as any;
        if (radioComponent.internalChecked !== undefined) {
          radioComponent.internalChecked = false;
        }
      }
    });
  }

  render(): FunctionalComponent<HostAttributes> {
    return (
      <Host
        class={this.radioClass}
        name={this.name}
      >
        <label
          class={`${LIB_PREFIX}radio-wrapper`}
          htmlFor={this.uniqueId}
        >
          <input
            type="radio"
            id={this.uniqueId}
            ref={(el) => (this.radioElement = el as HTMLInputElement)}
            class={`${LIB_PREFIX}radio-input`}
            checked={this.internalChecked}
            disabled={this.host.hasAttribute('disabled')}
            name={this.name}
            value={this.value}
            onClick={(e) => this.handleChange(e)}
          />

          <div class={`${LIB_PREFIX}radio-input-container`}>
            <span class={`${LIB_PREFIX}radio-input-circle`}></span>
          </div>

          <span class={`${LIB_PREFIX}radio-label`}>{this.label}</span>
        </label>
      </Host>
    );
  }
}
