import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

import { setComponentClass } from '../../utils/utils';
import { TagGroupChangeEvent, TagItem, SelectionMode } from './tag-selectable-group.types';
import { TagProps } from 'src/components';

const MAX_TAGS = 5;

@Component({
  tag: 'mnt-tag-selectable-group',
  styleUrl: 'tag-selectable-group.scss',
  shadow: false,
})
export class TagSelectableGroup {
  @Prop() tags!: TagItem[];
  @Prop() mode: SelectionMode = 'single';
  @Prop() size: TagProps['size'] = 'medium';
  @Prop() selectedId?: string;
  @Prop() selectedIds?: string;
  @Prop() fullWidth: boolean = false;

  @State() internalSelected: Set<string> = new Set();

  @Event() selectedChange!: EventEmitter<TagGroupChangeEvent>;

  private classNames = setComponentClass('tag-selectable-group');

  private get parsedTags(): TagItem[] {
    if (typeof this.tags === 'string') {
      try {
        return JSON.parse(this.tags);
      } catch (e) {
        console.error('[MANTRA][tag-selectable-group]: falha ao fazer parse de "tags"', e);
        return [];
      }
    }
    return this.tags || [];
  }

  private get limitedTags(): TagItem[] {
    const tags = this.parsedTags;
    if (tags.length > MAX_TAGS) {
      console.warn(`[MANTRA][tag-selectable-group]: máximo de ${MAX_TAGS} itens permitido. Os itens excedentes foram ignorados.`);
      return tags.slice(0, MAX_TAGS);
    }
    return tags;
  }

  componentWillLoad() {
    this.initSelection();
  }

  @Watch('selectedId')
  @Watch('selectedIds')
  @Watch('mode')
  onSelectionPropsChange() {
    this.initSelection();
  }

  private initSelection() {
    if (this.mode === 'single' && this.selectedId) {
      this.internalSelected = new Set([this.selectedId]);
    } else if (this.mode === 'multiple' && this.selectedIds) {
      try {
        const ids: string[] = typeof this.selectedIds === 'string' ? JSON.parse(this.selectedIds) : this.selectedIds;
        this.internalSelected = new Set(ids);
      } catch {
        this.internalSelected = new Set();
      }
    } else {
      this.internalSelected = new Set();
    }
  }

  handleTagSelected = (event: CustomEvent<{ tagId: string; label: string }>) => {
    const { tagId } = event.detail;

    if (this.mode === 'single') {
      this.internalSelected = new Set([tagId]);
      this.selectedChange.emit({ selectedId: tagId });
    } else {
      const next = new Set(this.internalSelected);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      this.internalSelected = next;
      this.selectedChange.emit({ selectedIds: Array.from(next) });
    }
  };

  render() {
    const tags = this.limitedTags;

    if (!tags.length) return null;

    if (this.fullWidth) {
      this.classNames += ' ' + 'mnt-tag-selectable-group--full-width';
    }

    return (
      <Host>
        <div
          class={this.classNames}
          part="group"
        >
          {tags.map((tag: TagItem) => (
            <mnt-tag-selectable
              key={tag.id}
              tagId={tag.id}
              label={tag.label}
              icon={tag.icon}
              size={this.size}
              isSelected={this.internalSelected.has(tag.id)}
              onTagSelected={this.handleTagSelected}
            />
          ))}
        </div>
      </Host>
    );
  }
}
