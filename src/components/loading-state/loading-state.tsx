import { Component, Host, Prop, h } from '@stencil/core';

import { getLibPrefix } from '../../utils/utils';

const LIB_PREFIX = getLibPrefix();

export interface LoadingStateProps {
  // size?: 'small' | 'medium' | 'large';
  label?: string;
  color?: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

@Component({
  tag: 'mnt-loading-state',
  styleUrl: 'loading-state.scss',
  shadow: false,
})
export class LoadingState {
  // Base styles
  // @Prop() size: LoadingStateProps['size'] = 'medium';
  @Prop() color: LoadingStateProps['color'] = 'neutral';
  // @Prop() variant: ButtonProps['variant'] = 'regular';
  // @Prop() fullWidth: ButtonProps['fullWidth'] = false;

  // Structure
  @Prop() label?: LoadingStateProps['label'];

  private get loadingClass() {
    return `${LIB_PREFIX}loading-state`;
  }

  private get containerClass() {
    return `${LIB_PREFIX}loading-state-container ${LIB_PREFIX}loading-state-${this.color}`;
  }

  render() {
    return (
      <Host class={this.containerClass}>
        <span class={this.loadingClass + '-spinner '}></span>
        {this.label && <p class={this.loadingClass + '-label'}>{this.label}</p>}
      </Host>
    );
  }
}
