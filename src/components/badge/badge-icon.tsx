import { Component, Host, Prop, Watch, h } from '@stencil/core';
import { FunctionalComponent, HostAttributes } from '@stencil/core/internal';

import { COMPONENT_PREFIX, type BadgeBaseProps } from './badge.types';

@Component({
  tag: 'mnt-badge-icon',
  styleUrl: 'badge.scss',
  shadow: false,
})
export class BadgeIcon {
  // Base styles
  @Prop() size?: BadgeBaseProps['size'] = 'medium';
  @Prop() color?: BadgeBaseProps['color'] = 'primary';
  @Prop() tone?: BadgeBaseProps['tone'] = 'default';
  @Prop() label?: BadgeBaseProps['label'];

  // Structure
  @Prop() icon?: BadgeBaseProps['icon'];

  private badgeElement!: HTMLElement;

  @Watch('label')
  handleLabelChange(newValue: string): void {
    if (this.badgeElement) {
      this.badgeElement.setAttribute('aria-label', newValue);
    }
  }

  private getIconSize(): number {
    let iconSize = 16;

    switch (this.size) {
      case 'tiny':
        iconSize = 8;
        break;
      case 'small':
        iconSize = 12;
        break;
      case 'medium':
        iconSize = 16;
        break;
      case 'large':
        iconSize = 18;
        break;
    }

    return iconSize;
  }

  get badgeClass(): string {
    const sizeClass = `${COMPONENT_PREFIX}-icon-${this.size}`;
    const colorClass = `${COMPONENT_PREFIX}-icon-${this.color}`;
    const toneClass = `${COMPONENT_PREFIX}-icon-${this.tone}`;

    return `${sizeClass} ${colorClass} ${toneClass}`;
  }

  render(): FunctionalComponent<HostAttributes> {
    return (
      <Host>
        <div
          role="status"
          aria-label={this.label}
          class={this.badgeClass}
          ref={(el) => (this.badgeElement = el as HTMLElement)}
        >
          {this.icon && (
            <mnt-icon
              icon={this.icon}
              size={this.getIconSize()}
              class={`${COMPONENT_PREFIX}-icon`}
            />
          )}
        </div>
      </Host>
    );
  }
}
