import { Component, Host, Prop, h } from '@stencil/core';

import { SizeVariants, ThemePalette } from '@theme/theme.types';
import { ButtonStyle } from './yoo-button.types';

export type ButtonProps = {
  label: string;
  size: SizeVariants;
  color: ThemePalette;
  variant: ButtonStyle;
  fullWidth: boolean;
  disabled: boolean;
};

@Component({
  tag: 'yoo-button',
  styleUrl: 'yoo-button.scss',
  shadow: false,
})
export class YooButton {
  // Base styles
  @Prop() size: SizeVariants = 'medium';
  @Prop() color: ThemePalette = 'primary';
  @Prop() variant: ButtonStyle = 'regular';
  @Prop() fullWidth: boolean = false;

  // Structure
  @Prop() label?: string | undefined = undefined;
  @Prop() iconRight?: string | undefined = undefined;
  @Prop() iconLeft?: string | undefined = undefined;
  @Prop() iconAnimation?: any = undefined; // TODO: Adicionar um type

  // States
  @Prop() disabled?: boolean = false;

  get buttonClass() {
    const sizeClass = `button-${this.size}`;
    const variantClass = `button-${this.variant}`;
    const colorClass = `button-${this.color}`;
    const disabledClass = this.disabled ? 'button-disabled' : '';
    const fullWidthClass = this.fullWidth ? 'button-full-width' : '';

    return `${fullWidthClass} ${variantClass} ${sizeClass} ${colorClass} ${disabledClass}`;
  }

  render() {
    if (this.label) {
      return (
        <Host>
          <button class={this.buttonClass} disabled={this.disabled} part="button">
            <span>{this.label}</span>
          </button>
        </Host>
      );
    }

    return (
      <Host>
        <button class={this.buttonClass} disabled={this.disabled} part="button">
          <slot />
        </button>
      </Host>
    );
  }
}
