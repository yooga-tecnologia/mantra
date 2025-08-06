import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

import { setComponentClass } from '../../utils/utils';
import { componentPrefix, type ButtonIconProps } from './button.types';

// TODO - Button - Keep in track stencil's inheritance issues with the `@Component` decorator. https://github.com/stenciljs/core/issues/2844
@Component({
  tag: 'mnt-button-icon',
  styleUrl: 'button.scss',
  shadow: false,
})
export class ButtonIcon {
  // Base styles
  @Prop() size: ButtonIconProps['size'] = 'medium';
  @Prop() color: ButtonIconProps['color'] = 'primary';
  @Prop() variant: ButtonIconProps['variant'] = 'regular';
  @Prop() icon?: ButtonIconProps['icon'];

  // States
  @Prop() disabled: ButtonIconProps['disabled'] = false;

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

  get buttonClass() {
    const buttonIconPrefix = setComponentClass(componentPrefix, 'icon');
    let colorClass = '';

    if (this.variant === 'emphasis' && this.color === 'neutral') {
      console.warn('[MANTRA] The "neutral" colors is not supported for the "emphasis" variant. Please use a different color.');
      colorClass = setComponentClass(componentPrefix, 'primary');
    } else {
      colorClass = setComponentClass(componentPrefix, this.color);
    }

    const sizeClass = setComponentClass(componentPrefix, this.size);
    const variantClass = setComponentClass(componentPrefix, this.variant);
    const disabledClass = this.disabled ? setComponentClass(componentPrefix, 'disabled') : '';

    return `${buttonIconPrefix} ${variantClass} ${sizeClass} ${colorClass} ${disabledClass}`;
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
          <mnt-icon size={this.size} icon={this.icon} />
        </button>
      </Host>
    );
  }
}
