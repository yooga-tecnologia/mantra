import { Component, Host, Prop, Watch, h } from '@stencil/core';
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

  // Structure

  private checkboxElement!: HTMLElement;

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

    if (this.host.hasAttribute('disabled')) {
      componentClass += ` ${setComponentClass(`checkbox-disabled`)}`;
    }

    return componentClass;
  }

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
            class={`${LIB_PREFIX}checkbox-input`}
            checked={this.host.hasAttribute('checked')}
            disabled={this.host.hasAttribute('disabled')}
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
