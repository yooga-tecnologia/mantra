import { Component, Host, Prop, h } from '@stencil/core';

import { MessageHighlightProps } from './message-highlight.types';
import { getLibPrefix } from 'src/utils/utils';

@Component({
  tag: 'mnt-message-highlight',
  styleUrl: 'message-highlight.scss',
  shadow: false,
})
export class MessageHighlight {
  @Prop() text: MessageHighlightProps['text'] = '';
  @Prop() headline?: MessageHighlightProps['headline'] = '';

  @Prop({ mutable: true, reflect: true }) type: MessageHighlightProps['type'] = 'default';
  @Prop({ mutable: true, reflect: true }) variant: MessageHighlightProps['variant'] = 'neutral';
  @Prop({ mutable: true, reflect: true }) icon: MessageHighlightProps['icon'] = '';
  @Prop({ mutable: true, reflect: true }) fullWidth: MessageHighlightProps['fullWidth'] = false;
  @Prop({ mutable: true, reflect: true }) marginBottom: MessageHighlightProps['marginBottom'] = false;
  @Prop({ mutable: true, reflect: true }) align: MessageHighlightProps['align'] = 'left';

  readonly LIB_PREFIX = getLibPrefix();

  private get componentPrefix() {
    return `${this.LIB_PREFIX}message-highlight`;
  }

  private componentClass(): string {
    const variantClass = `${this.componentPrefix}-${this.variant}`;
    const fullWidthClass = this.fullWidth ? `${this.componentPrefix}-full-width` : '';
    const marginBottomClass = this.marginBottom ? `${this.componentPrefix}-margin-bottom` : '';
    const typeClass = this.type ? `${this.componentPrefix}-${this.type}` : '';
    const alignClass = this.align ? `${this.componentPrefix}-${this.align}` : '';
    const headlineClass = this.headline ? `${this.componentPrefix}-headline` : '';

    return `${this.componentPrefix} ${variantClass} ${typeClass} ${fullWidthClass} ${marginBottomClass} ${alignClass} ${headlineClass}`;
  }

  private getIcon(): HTMLMntIconElement {
    let iconName = '';

    switch (this.variant) {
      case 'success':
        iconName = 'signalingCheckCircle';
        break;
      case 'critical':
        iconName = 'signalingErrorCircle';
        break;
      case 'warning':
        iconName = 'signalingWarningCircle';
        break;
      default:
        iconName = 'signalingInfoCircle';
        break;
    }

    if (this.icon !== '') {
      iconName = this.icon;
    }

    return (
      <mnt-icon
        size={20}
        icon={iconName}
      ></mnt-icon>
    );
  }

  getHeadline(): HTMLHeadingElement {
    return (
      <h6
        class={`${this.componentPrefix}-headline`}
        aria-label={this.headline}
      >
        {this.headline}
      </h6>
    );
  }

  getText(): HTMLSpanElement {
    return (
      <span
        class={`${this.componentPrefix}-text`}
        aria-label={this.text}
      >
        {this.text}
      </span>
    );
  }

  render() {
    if (this.headline && this.text) {
      return (
        <Host class={this.componentClass() + ' align-flex-start'}>
          {this.getIcon()}

          <div class={this.componentPrefix + '-text-container'}>
            {this.getHeadline()}
            {this.getText()}
          </div>
        </Host>
      );
    }

    return (
      <Host class={this.componentClass()}>
        {this.getIcon()}
        {this.headline && this.getHeadline()}
        {this.text && this.getText()}
      </Host>
    );
  }
}
