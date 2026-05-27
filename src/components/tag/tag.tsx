import { Component, h, Host, Prop } from '@stencil/core';
import { getLibPrefix } from '../../utils/utils';

import { tagIconSizesMap, TagProps } from './tag.types';

const LIB_PREFIX = getLibPrefix();

@Component({
  tag: 'mnt-tag',
  styleUrl: 'tag.scss',
  shadow: false,
})
export class Tag {
  // Base styles

  @Prop() label: TagProps['label'];
  @Prop() size?: TagProps['size'] = 'medium';
  @Prop() icon?: TagProps['icon'];

  // Structure

  // States

  // Events

  private get tagClass() {
    return `${LIB_PREFIX}tag ${LIB_PREFIX}tag-common ${LIB_PREFIX}tag-${this.size}`;
  }

  render() {
    // if (this.variant === 'removable') {
    //   return (
    //     <Host class={this.tagClass}>
    //       <span>{this.label}</span>
    //       <mnt-button-icon
    //         icon="close"
    //         size="tiny"
    //         variant="plain"
    //         color="neutral"
    //       ></mnt-button-icon>
    //     </Host>
    //   );
    // }

    return (
      <Host>
        <div class={this.tagClass}>
          {this.icon && (
            <mnt-icon
              icon={this.icon}
              size={tagIconSizesMap[this.size]}
              color="currentColor"
            ></mnt-icon>
          )}
          <span>{this.label}</span>
        </div>
      </Host>
    );
  }
}
