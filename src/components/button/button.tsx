import { Component, Host, Prop, State, Watch, Event, EventEmitter, h } from '@stencil/core';

import { getLibPrefix } from '../../utils/utils';
import type { ButtonProps } from './button.types';

const LIB_PREFIX = getLibPrefix();
const LOADING_ICON = 'loading';

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
  @Prop() state?: ButtonProps['state'] = 'default';

  // Structure
  @Prop() label?: ButtonProps['label'];
  @Prop() iconLeft?: ButtonProps['iconLeft'];
  @Prop() iconRight?: ButtonProps['iconRight'];

  // States
  @Prop() disabled: ButtonProps['disabled'] = false;
  @Prop() loading: ButtonProps['loading'] = false;

  // Events
  @Event() buttonClick: EventEmitter<MouseEvent>;

  // Internal state
  @State() private frozenWidth?: number;

  // Refs
  private buttonRef?: HTMLButtonElement;

  @Watch('loading')
  handleLoadingChange(newValue: boolean, oldValue: boolean) {
    if (newValue && !oldValue) {
      this.frozenWidth = this.buttonRef?.getBoundingClientRect().width;
      return;
    }

    if (!newValue && oldValue) {
      this.frozenWidth = undefined;
    }
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }

  get iconSize(): number {
    let iconSize = 18;

    switch (this.size) {
      case 'tiny':
        iconSize = 14;
        break;
      case 'small':
        iconSize = 16;
        break;
      case 'medium':
        iconSize = 18;
        break;
      case 'large':
        iconSize = 20;
        break;
      default:
        iconSize = 18;
    }

    return iconSize;
  }

  get buttonClass() {
    let colorClass = '';
    let sizeClass = '';

    if (this.variant === 'filter' && (this.color !== 'primary' || this.color === undefined)) {
      console.warn('[MANTRA] The "primary" color is the only supported color for the "filter" variant. Please use a different color.');
      this.color = 'primary';
    }

    if (this.variant === 'emphasis' && this.color === 'neutral') {
      console.warn('[MANTRA] The "neutral" color is not supported for the "emphasis" variant. Please use a different color.');
      colorClass = `${LIB_PREFIX}button-primary`;
    } else {
      colorClass = `${LIB_PREFIX}button-${this.color}`;
    }

    if (this.size !== 'medium' && this.size !== 'large' && this.size !== 'small' && this.size !== 'tiny') {
      console.warn('[MANTRA] This size is not supported for this type of button. Please use a different value.');
      sizeClass = `${LIB_PREFIX}button-small`;
    } else {
      sizeClass = `${LIB_PREFIX}button-${this.size}`;
    }

    const variantClass = `${LIB_PREFIX}button-${this.variant}`;
    const disabledClass = this.disabled ? `${LIB_PREFIX}button-disabled` : '';
    const fullWidthClass = this.fullWidth ? `${LIB_PREFIX}button-full-width` : '';
    const stateClass = this.state ? `${LIB_PREFIX}button-${this.state}` : '';
    const loadingClass = this.loading ? `${LIB_PREFIX}button-loading` : '';

    return `${fullWidthClass} ${variantClass} ${sizeClass} ${colorClass} ${disabledClass} ${stateClass} ${loadingClass}`;
  }

  private renderLoadingContent() {
    return (
      <mnt-icon
        icon={LOADING_ICON}
        size={this.iconSize}
        class="icon-loading"
      />
    );
  }

  private renderIdleContent() {
    return [
      this.iconLeft && (
        <mnt-icon
          icon={this.iconLeft}
          size={this.iconSize}
          class="icon-left"
        />
      ),
      this.label ? (
        <span class="label">{this.label}</span>
      ) : (
        <span class="label">
          <slot></slot>
        </span>
      ),
      this.iconRight && (
        <mnt-icon
          icon={this.iconRight}
          size={this.iconSize}
          class="icon-right"
        />
      ),
    ];
  }

  render() {
    const inlineStyle = this.frozenWidth ? { minWidth: `${this.frozenWidth}px` } : undefined;

    return (
      <Host>
        <button
          ref={(el) => (this.buttonRef = el as HTMLButtonElement)}
          class={this.buttonClass}
          disabled={this.disabled}
          aria-busy={this.loading ? 'true' : null}
          style={inlineStyle}
          onClick={(event) => this.handleClick(event)}
          part="button"
        >
          {this.loading ? this.renderLoadingContent() : this.renderIdleContent()}
        </button>
      </Host>
    );
  }
}
