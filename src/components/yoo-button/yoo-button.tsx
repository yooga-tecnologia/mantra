import { Component, Host, Prop, h } from '@stencil/core';
import type { ButtonProps } from './yoo-button.types';

@Component({
  tag: 'yoo-button',
  styleUrl: 'yoo-button.scss',
  shadow: false,
})
export class YooButton {
  // Base styles
  @Prop() size: ButtonProps['size'] = 'medium';
  @Prop() color: ButtonProps['color'] = 'primary';
  @Prop() variant: ButtonProps['variant'] = 'regular';
  @Prop() fullWidth: ButtonProps['fullWidth'] = false;

  // Structure
  @Prop() label?: ButtonProps['label'];
  @Prop() iconLeft?: ButtonProps['iconLeft'];
  @Prop() iconRight?: ButtonProps['iconRight'];
  @Prop() iconAnimation?: ButtonProps['iconAnimation'];

  // States
  @Prop() disabled: ButtonProps['disabled'] = false;

  get buttonClass() {
    const sizeClass = `button-${this.size}`;
    const variantClass = `button-${this.variant}`;
    const colorClass = `button-${this.color}`;
    const disabledClass = this.disabled ? 'button-disabled' : '';
    const fullWidthClass = this.fullWidth ? 'button-full-width' : '';

    return `${fullWidthClass} ${variantClass} ${sizeClass} ${colorClass} ${disabledClass}`;
  }

  render() {
    const hasIcon = this.iconLeft || this.iconRight;

    return (
      <Host>
        <button class={this.buttonClass} disabled={this.disabled} part="button">
          {this.iconLeft && <yoo-icon icon={this.iconLeft} animation={this.iconAnimation} class="icon-left" />}

          {this.label && <span class="label">{this.label}</span>}

          {this.iconRight && <yoo-icon icon={this.iconRight} animation={this.iconAnimation} class="icon-right" />}

          {!this.label && !hasIcon && <slot />}
        </button>
      </Host>
    );
  }
}
