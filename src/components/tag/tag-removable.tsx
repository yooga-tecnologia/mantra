import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { getLibPrefix } from '../../utils/utils';

import { TAG_REMOVE_ANIMATION_DURATION_MS, tagIconSizesMap, TagProps, TagRemovedEvent } from './tag.types';

const LIB_PREFIX = getLibPrefix();

@Component({
  tag: 'mnt-tag-removable',
  styleUrl: 'tag.scss',
  shadow: false,
})
export class TagRemovable {
  @Prop() label: TagProps['label'];
  @Prop() size?: TagProps['size'] = 'medium';
  @Prop() icon?: TagProps['icon'];
  @Prop() tagId?: string;
  @Prop() disabled?: boolean = false;

  @State() private removing: boolean = false;

  @Event() tagRemoved: EventEmitter<TagRemovedEvent>;

  private buttonRef?: HTMLButtonElement;

  private get tagClass() {
    const removingClass = this.removing ? `${LIB_PREFIX}tag-removing` : '';
    return `${LIB_PREFIX}tag ${LIB_PREFIX}tag-removable ${LIB_PREFIX}tag-${this.size} ${removingClass}`.trim();
  }

  handleRemove(event: MouseEvent): void {
    if (this.disabled || this.removing) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Capture current dimensions so the collapse animation starts from the
    // real rendered size, regardless of size variant or content length.
    if (this.buttonRef) {
      const rect = this.buttonRef.getBoundingClientRect();
      const computed = window.getComputedStyle(this.buttonRef);
      this.buttonRef.style.setProperty('--tag-width', `${rect.width}px`);
      this.buttonRef.style.setProperty('--tag-pl', computed.paddingLeft);
      this.buttonRef.style.setProperty('--tag-pr', computed.paddingRight);
      this.buttonRef.style.setProperty('--tag-mr', computed.marginRight);
    }

    this.removing = true;

    // Emit after both animation phases complete (exit 250ms + collapse 200ms).
    setTimeout(() => {
      this.tagRemoved.emit({ tagId: this.tagId, label: this.label });
    }, TAG_REMOVE_ANIMATION_DURATION_MS);
  }

  render() {
    if (!this.tagId) {
      console.warn('[MANTRA][tag-removable]: prop "id" is required');
      return null;
    }

    return (
      <Host>
        <button
          ref={(el) => (this.buttonRef = el as HTMLButtonElement)}
          id={this.tagId}
          class={`${this.tagClass} ${LIB_PREFIX}tag-removable-button`}
          onClick={(event) => this.handleRemove(event)}
          disabled={this.disabled}
          aria-label={`Remover ${this.label}`}
          part="button"
        >
          {this.icon && (
            <mnt-icon
              icon={this.icon}
              size={tagIconSizesMap[this.size]}
              color="currentColor"
            ></mnt-icon>
          )}
          <span>{this.label}</span>
          <mnt-icon
            icon="close"
            size={tagIconSizesMap[this.size]}
            color="currentColor"
          ></mnt-icon>
        </button>
      </Host>
    );
  }
}
