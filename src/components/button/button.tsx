import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

import { getLibPrefix } from '../../utils/utils';
import type { ButtonProps } from './button.types';

const LIB_PREFIX = getLibPrefix();

@Component({
  tag: 'mnt-button',
  styleUrl: 'button.scss',
  shadow: false,
})
export class Button {
  // Base styles
  @Prop() size: ButtonProps['size'] = 'medium';
  @Prop() color: ButtonProps['color'] = 'neutral';
  @Prop() variant: ButtonProps['variant'] = 'regular';
  @Prop() fullWidth: ButtonProps['fullWidth'] = false;

  // Structure
  @Prop() label?: ButtonProps['label'];
  @Prop() iconLeft?: ButtonProps['iconLeft'];
  @Prop() iconRight?: ButtonProps['iconRight'];
  @Prop() iconAnimation?: ButtonProps['iconAnimation'];

  // States
  @Prop() disabled: ButtonProps['disabled'] = false;

  // Events
  @Event() buttonClick: EventEmitter<MouseEvent>;

  // Methods
  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }

  get iconSize(): number {
    let iconSize = 16;

    switch (this.size) {
      case 'small':
        iconSize = 16;
        break;
      case 'medium':
        iconSize = 20;
        break;
      case 'large':
        iconSize = 24;
        break;
      default:
        iconSize = 16;
    }

    return iconSize;
  }

  get buttonClass() {
    let colorClass = '';
    let sizeClass = '';

    if (this.variant === 'emphasis' && this.color === 'neutral') {
      console.warn('[MANTRA] The "neutral" color is not supported for the "emphasis" variant. Please use a different color.');
      colorClass = `${LIB_PREFIX}button-primary`;
    } else {
      colorClass = `${LIB_PREFIX}button-${this.color}`;
    }

    if (this.size === 'tiny') {
      console.warn('[MANTRA] The "tiny" size is not supported for this type of button. Please use a different value.');
      sizeClass = `${LIB_PREFIX}button-small`;
    } else {
      sizeClass = `${LIB_PREFIX}button-${this.size}`;
    }

    const variantClass = `${LIB_PREFIX}button-${this.variant}`;
    const disabledClass = this.disabled ? `${LIB_PREFIX}button-disabled` : '';
    const fullWidthClass = this.fullWidth ? `${LIB_PREFIX}button-full-width` : '';

    return `${fullWidthClass} ${variantClass} ${sizeClass} ${colorClass} ${disabledClass}`;
  }

  render() {
    return (
      <Host>
        <button
          class={this.buttonClass}
          disabled={this.disabled}
          onClick={(event) => this.handleClick(event)}
          part="button"
        >
          {this.iconLeft && (
            <mnt-icon
              icon={this.iconLeft}
              animation={this.iconAnimation}
              size={this.iconSize}
              class="icon-left"
            />
          )}

          {this.label ? (
            <span class="label">{this.label}</span>
          ) : (
            <span class="label">
              <slot></slot>
            </span>
          )}

          {this.iconRight && (
            <mnt-icon
              icon={this.iconRight}
              animation={this.iconAnimation}
              size={this.iconSize}
              class="icon-right"
            />
          )}
        </button>
      </Host>
    );
  }
}
