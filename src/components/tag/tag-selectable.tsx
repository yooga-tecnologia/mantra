import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { getLibPrefix } from '../../utils/utils';

import { tagIconSizesMap, TagProps } from './tag.types';

const LIB_PREFIX = getLibPrefix();

@Component({
  tag: 'mnt-tag-selectable',
  styleUrl: 'tag.scss',
  shadow: false,
})
export class TagSelectable {
  // Base styles

  @Prop() label!: TagProps['label'];
  @Prop() size?: TagProps['size'] = 'medium';
  @Prop() icon?: TagProps['icon'];
  @Prop() tagId?: string;

  // States
  @State() selected?: boolean = false;

  // Events
  @Event() tagSelected!: EventEmitter<{ tagId: string; label: string }>;

  private get tagClass() {
    return `${LIB_PREFIX}tag ${LIB_PREFIX}tag-selectable ${LIB_PREFIX}tag-${this.size} ${this.selected ? `${LIB_PREFIX}tag-selected` : ''}`;
  }

  private handleSelect(tagId: string) {
    this.selected = !this.selected;
    this.tagSelected.emit({ tagId, label: this.label });
  }

  render() {
    if (!this.tagId) {
      console.warn('[MANTRA][tag-selectable]: prop "tagId" is required');
      return null;
    }

    return (
      <Host>
        <button
          id={this.tagId}
          aria-label={`Selecionar ${this.label}`}
          part="button"
          class={`${this.tagClass} ${LIB_PREFIX}tag-selectable-button`}
          onClick={() => this.handleSelect(this.tagId!)}
        >
          {this.icon && (
            <mnt-icon
              icon={this.icon}
              size={tagIconSizesMap[this.size!]}
              color="currentColor"
            ></mnt-icon>
          )}
          <span>{this.label}</span>
        </button>
      </Host>
    );
  }
}
