import { Component, Host, Prop, Watch, State, Event, EventEmitter, h } from '@stencil/core';
import { Element, FunctionalComponent, HostAttributes } from '@stencil/core/internal';
import { CheckboxBaseProps } from './checkbox.types';

import { getLibPrefix, setComponentClass } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
@Component({
  tag: 'mnt-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: false,
})
export class Checkbox {
  @Element() host: HTMLElement;

  // Base styles
  @Prop() name?: CheckboxBaseProps['name'];
  @Prop() label?: CheckboxBaseProps['label'];
  @Prop({ reflect: true, mutable: true }) variant?: CheckboxBaseProps['variant'] = 'check';
  @Prop() checked?: boolean = false;
  @Prop() value?: string;

  @State() internalChecked: boolean = false;

  // Events
  @Event() checkboxChange: EventEmitter<{ checked: boolean; value: string }>;

  // Structure
  private checkboxElement!: HTMLInputElement;

  componentWillLoad() {
    this.internalChecked = this.checked || this.host.hasAttribute('checked');
  }

  componentDidLoad() {
    if (this.checkboxElement) {
      this.checkboxElement.checked = this.internalChecked;
      if (this.variant === 'indeterminate') {
        this.checkboxElement.indeterminate = true;
      }
    }
  }

  @Watch('checked')
  watchCheckedProp(newValue: boolean) {
    this.internalChecked = newValue;
    if (this.checkboxElement) {
      this.checkboxElement.checked = newValue;
    }
  }

  @Watch('label')
  handleLabelChange(newValue: string): void {
    if (this.checkboxElement) {
      this.checkboxElement.setAttribute('aria-label', newValue);
    }
  }

  private get iconName(): string {
    if (this.variant === 'indeterminate') {
      return 'minus';
    }
    return 'check'; // default
  }

  private get checkboxClass(): string {
    let componentClass = setComponentClass(`checkbox-${this.variant}`);

    if (this.internalChecked) {
      componentClass += ` ${setComponentClass('checkbox-checked')}`;
    }

    if (this.host.hasAttribute('disabled')) {
      componentClass += ` ${setComponentClass(`checkbox-disabled`)}`;
    }

    return componentClass;
  }

  // Handlers
  private handleChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.internalChecked = target.checked;

    if (this.internalChecked) {
      this.host.setAttribute('checked', '');
    } else {
      this.host.removeAttribute('checked');
    }

    this.checkboxChange.emit({
      checked: this.internalChecked,
      value: this.value || this.name || '',
    });
  };

  render(): FunctionalComponent<HostAttributes> {
    return (
      <Host class={this.checkboxClass}>
        <label
          class={`${LIB_PREFIX}checkbox-wrapper`}
          htmlFor={this.name}
        >
          <input
            type="checkbox"
            id={this.name}
            ref={(el) => (this.checkboxElement = el as HTMLInputElement)}
            class={`${LIB_PREFIX}checkbox-input`}
            checked={this.internalChecked}
            disabled={this.host.hasAttribute('disabled')}
            name={this.name}
            value={this.value}
            onChange={(e) => this.handleChange(e)}
          />

          <div class={`${LIB_PREFIX}checkbox-input-container`}>
            <mnt-icon
              icon={this.iconName}
              size="small"
              color="currentColor"
            />
          </div>

          <div class={`${LIB_PREFIX}checkbox-label-wrapper`}>
            <span class={`${LIB_PREFIX}checkbox-label`}>{this.label}</span>
          </div>
        </label>
      </Host>
    );
  }
}
