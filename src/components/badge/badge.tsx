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
    if (this.badgeElement) {
      this.badgeElement.setAttribute('aria-label', newValue);
    }
  }

  get badgeClass(): string {
    if (!this.label) {
      console.warn('[MANTRA] The "label" property is required for the badge component.');
      return '';
    }

    const sizeClass = `${COMPONENT_PREFIX}-${this.size}`;
    const colorClass = `${COMPONENT_PREFIX}-${this.color}`;
    const toneClass = `${COMPONENT_PREFIX}-${this.tone}`;

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
              size={this.size}
              class={`${COMPONENT_PREFIX}-icon`}
            />
          )}

          <span class={`${COMPONENT_PREFIX}-label`}>{this.label}</span>
        </div>
      </Host>
    );
  }
}
