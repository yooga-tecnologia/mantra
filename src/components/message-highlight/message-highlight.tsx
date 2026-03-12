import { Component, Host, Prop, h } from '@stencil/core';

import { MessageHighlightProps } from './message-highlight.types';
import { getLibPrefix } from 'src/utils/utils';

@Component({
  tag: 'mnt-message-highlight',
  styleUrl: 'message-highlight.scss',
  shadow: false,
})
export class MessageHighlight {
  @Prop() label: MessageHighlightProps['label'] = '';

  @Prop({ mutable: true, reflect: true }) type: MessageHighlightProps['type'] = 'default';
  @Prop({ mutable: true, reflect: true }) variant: MessageHighlightProps['variant'] = 'neutral';
  @Prop({ mutable: true, reflect: true }) icon: MessageHighlightProps['icon'] = '';
  @Prop({ mutable: true, reflect: true }) fullWidth: MessageHighlightProps['fullWidth'] = false;
  @Prop({ mutable: true, reflect: true }) marginBottom: MessageHighlightProps['marginBottom'] = false;

  readonly LIB_PREFIX = getLibPrefix();

  private get componentPrefix() {
    return `${this.LIB_PREFIX}message-highlight`;
  }

  private componentClass(): string {
    const variantClass = `${this.componentPrefix}-${this.variant}`;
    const fullWidthClass = this.fullWidth ? `${this.componentPrefix}-full-width` : '';
    const marginBottomClass = this.marginBottom ? `${this.componentPrefix}-margin-bottom` : '';
    const typeClass = this.type ? `${this.componentPrefix}-${this.type}` : '';

    return `${this.componentPrefix} ${variantClass} ${typeClass} ${fullWidthClass} ${marginBottomClass}`;
  }

  private getIcon(): any {
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

  render() {
    return (
      <Host class={this.componentClass()}>
        {this.getIcon()}
        {this.label && (
          <span
            class={`${this.componentPrefix}-label`}
            aria-label={this.label}
          >
            {this.label}
          </span>
        )}
      </Host>
    );
  }
}
