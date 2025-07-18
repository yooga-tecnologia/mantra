import { Component, h, Prop, State, Element, Listen, Host } from '@stencil/core';

import { TooltipProps } from './tooltip.types';
import { getLibPrefix } from 'src/utils/utils';

@Component({
  tag: 'mnt-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: false,
})
export class Tooltip {
  @Element() el: HTMLElement;

  @Prop() text: TooltipProps['text'];
  @Prop() position: TooltipProps['position'] = 'top';

  @State() isVisible: boolean = false;

  private readonly libPrefix = getLibPrefix();
  private readonly componentPrefix = `${this.libPrefix}tooltip-`;
  private readonly tooltipId = `${this.libPrefix}tooltip-${Math.random().toString(36).substring(2, 8)}`;

  @Listen('mouseenter')
  handleMouseEnter() {
    this.isVisible = true;
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    this.isVisible = false;
  }

  @Listen('focusin')
  handleFocusIn() {
    this.isVisible = true;
  }

  @Listen('focusout')
  handleFocusOut() {
    this.isVisible = false;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            [this.componentPrefix + 'container']: true,
            'visible': this.isVisible,
            'hidden': !this.isVisible,
          }}
        >
          <slot name="trigger" />
          <span
            id={this.tooltipId}
            class={{
              [this.componentPrefix + 'content']: true,
              [this.position]: true,
            }}
            role="tooltip"
          >
            {this.text}
          </span>
        </div>
      </Host>
    );
  }
}
