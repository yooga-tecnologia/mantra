import { Component, h, Prop, State, Element, Listen, Host } from '@stencil/core';
import { TooltipProps } from './yoo-tooltip.types';

@Component({
  tag: 'yoo-tooltip',
  styleUrl: 'yoo-tooltip.scss',
  shadow: false,
})
export class YooTooltip {
  @Element() el: HTMLElement;

  @Prop() text: TooltipProps['text'];
  @Prop() position: TooltipProps['position'] = 'top';

  @State() isVisible: boolean = false;

  private tooltipId = `tooltip-${Math.random().toString(36).substring(2, 8)}`;

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
            'tooltip-wrapper': true,
            'visible': this.isVisible,
            'hidden': !this.isVisible,
          }}
        >
          <slot name="trigger" />
          <span
            id={this.tooltipId}
            class={{
              'tooltip-content': true,
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
