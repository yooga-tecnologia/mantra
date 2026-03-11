import { Component, Host, Prop, h } from '@stencil/core';

import { MessageInlineProps } from './message-inline.types';
import { getLibPrefix } from 'src/utils/utils';

@Component({
  tag: 'mnt-message-inline',
  styleUrl: 'message-inline.scss',
  shadow: false,
})
export class MessageInline {
  @Prop() label: MessageInlineProps['label'] = '';
  @Prop() variant: MessageInlineProps['variant'] = 'neutral';
  @Prop() hasPadding: MessageInlineProps['hasPadding'] = false;
  @Prop() icon?: MessageInlineProps['icon'];

  readonly LIB_PREFIX = getLibPrefix();

  private get componentPrefix() {
    return `${this.LIB_PREFIX}message-inline`;
  }

  private componentClass(): string {
    const variantClass = `${this.componentPrefix}-${this.variant}`;
    const hasPaddingClass = this.hasPadding ? `${this.componentPrefix}-has-padding` : '';
    return `${this.componentPrefix} ${variantClass} ${hasPaddingClass}`;
  }

  private getIcon(): any {
    let iconName = '';

    switch (this.variant) {
      case 'neutral':
        iconName = 'info';
        break;
      case 'success':
        iconName = 'signalingCheckCircle';
        break;
      case 'error':
        iconName = 'signalingErrorCircle';
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
