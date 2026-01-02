import { Component, Host, Prop, Watch, h } from '@stencil/core';

import { COMPONENT_PREFIX, type BadgeBaseProps } from './badge.types';
import { FunctionalComponent, HostAttributes } from '@stencil/core/internal';

@Component({
  tag: 'mnt-badge',
  styleUrl: 'badge.scss',
  shadow: false,
})
export class Badge {
  // Base styles
  @Prop() size?: BadgeBaseProps['size'] = 'medium';
  @Prop() color?: BadgeBaseProps['color'] = 'primary';
  @Prop() tone?: BadgeBaseProps['tone'] = 'default';

  // Structure
  @Prop() label: BadgeBaseProps['label'];
  @Prop() icon?: BadgeBaseProps['icon'];

  private badgeElement!: HTMLElement;

  @Watch('label')
  handleLabelChange(newValue: string): void {
    if (this.badgeElement && newValue) {
      this.badgeElement.setAttribute('aria-label', newValue);
    }
  }

  get badgeClass(): string {
    if (!this.label && !this.icon) {
      console.warn('[MANTRA] Either "label" or "icon" property is required for the badge component.');
      return '';
    }

    const sizeClass = `${COMPONENT_PREFIX}-${this.size}`;
    const colorClass = `${COMPONENT_PREFIX}-${this.color}`;
    const toneClass = `${COMPONENT_PREFIX}-${this.tone}`;
    const iconOnlyClass = this.icon && !this.label ? `${COMPONENT_PREFIX}-icon-only` : '';

    return `${sizeClass} ${colorClass} ${toneClass} ${iconOnlyClass}`.trim();
  }

  get iconSize(): number {
    let iconSize = 16;

    switch (this.size) {
      case 'tiny':
        iconSize = 12;
        break;
      case 'small':
        iconSize = 16;
        break;
      case 'medium':
        iconSize = 16;
        break;
      case 'large':
        iconSize = 20;
        break;
      default:
        iconSize = 16;
    }

    return iconSize;
  }

  render(): FunctionalComponent<HostAttributes> {
    return (
      <Host>
        <div
          role="status"
          aria-label={this.label || (this.icon ? `Badge com ícone ${this.icon}` : '')}
          class={this.badgeClass}
          ref={(el) => (this.badgeElement = el as HTMLElement)}
        >
          {this.icon && (
            <mnt-icon
              icon={this.icon}
              size={this.iconSize}
              class={`${COMPONENT_PREFIX}-icon`}
            />
          )}

          {this.label && <span class={`${COMPONENT_PREFIX}-label`}>{this.label}</span>}
        </div>
      </Host>
    );
  }
}
