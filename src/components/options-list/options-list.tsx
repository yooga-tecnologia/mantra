import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import { classNames, setComponentClass } from '../../utils/utils';
import { renderFieldLabel } from '../../shared/form-field/form-field-label';
import { OptionsListItem, OptionsListProps, OptionsListRawItem, OptionsListSelectPayload, parseItems } from './options-list.types';

const COMPONENT_PREFIX = setComponentClass('options-list');
// ~41px per item (21px line-height + 20px padding) × 5 items + 8px container padding
const DROPDOWN_MAX_HEIGHT = 213;
const DROPDOWN_VIEWPORT_MARGIN = 8;

interface DropdownPosition {
  top?: string;
  bottom?: string;
  left: string;
  width: string;
  maxHeight: string;
  opensAbove: boolean;
}

@Component({
  tag: 'mnt-options-list',
  styleUrl: 'options-list.scss',
  shadow: false,
  formAssociated: true,
})
export class OptionsList {
  @Element() host: HTMLElement;

  @Prop() name?: OptionsListProps['name'];
  @Prop() labelText?: OptionsListProps['labelText'];
  @Prop() placeholder?: OptionsListProps['placeholder'];
  @Prop() items: string | OptionsListRawItem[] = '[]';
  @Prop() value?: OptionsListProps['value'];
  @Prop() fullWidth?: OptionsListProps['fullWidth'] = false;

  @State() parsedItems: OptionsListItem[] = [];
  @State() selectedValue: string | null = null;
  @State() isOpen: boolean = false;
  @State() focusedIndex: number = -1;
  @State() dropdownPosition: DropdownPosition | null = null;

  @Event() optionSelect: EventEmitter<OptionsListSelectPayload>;

  private hiddenInput!: HTMLInputElement;
  private headerEl!: HTMLElement;
  // Portal element rendered as direct child of document.body to avoid
  // position: fixed misalignment when ancestors have CSS transform applied.
  private portalEl: HTMLDivElement | null = null;
  private readonly componentPrefix = setComponentClass('options-list', '');
  private readonly listboxId = `${COMPONENT_PREFIX}-listbox-${Math.random().toString(36).slice(2, 7)}`;
  private readonly labelId = `${COMPONENT_PREFIX}-label-${Math.random().toString(36).slice(2, 7)}`;

  componentWillLoad() {
    this.parsedItems = parseItems(this.items);
    this.selectedValue = this.value ?? null;
  }

  // Sync portal content whenever Stencil re-renders (e.g. focusedIndex or selectedValue change)
  componentDidUpdate() {
    if (this.isOpen && this.dropdownPosition && this.portalEl) {
      this.renderPortal(this.dropdownPosition);
    }
  }

  disconnectedCallback() {
    this.closePortal();
  }

  @Watch('items')
  onItemsChange(newItems: string | OptionsListRawItem[]) {
    this.parsedItems = parseItems(newItems);
  }

  @Watch('value')
  onValueChange(newValue: string) {
    this.selectedValue = newValue ?? null;
  }

  @Listen('scroll', { target: 'window', passive: true })
  onWindowScroll() {
    if (this.isOpen) this.close();
  }

  @Listen('resize', { target: 'window', passive: true })
  onWindowResize() {
    if (this.isOpen) this.close();
  }

  private get selectedLabel(): string | null {
    if (!this.selectedValue) return null;
    return this.parsedItems.find((item) => item.value === this.selectedValue)?.label ?? null;
  }

  private get displayText(): string {
    return this.selectedLabel ?? this.placeholder ?? '';
  }

  private get activedescendant(): string | undefined {
    if (!this.isOpen || this.focusedIndex < 0) return undefined;
    return this.itemId(this.focusedIndex);
  }

  private itemId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  private escapeHTML(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  private computeDropdownPosition(): DropdownPosition | null {
    if (!this.headerEl) return null;

    const rect = this.headerEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom - DROPDOWN_VIEWPORT_MARGIN;
    const spaceAbove = rect.top - DROPDOWN_VIEWPORT_MARGIN;
    const opensAbove = spaceBelow < DROPDOWN_MAX_HEIGHT && spaceAbove > spaceBelow;

    if (opensAbove) {
      return {
        bottom: `${viewportHeight - rect.top + 1}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${Math.min(DROPDOWN_MAX_HEIGHT, spaceAbove)}px`,
        opensAbove: true,
      };
    }

    return {
      top: `${rect.bottom - 1}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      maxHeight: `${Math.min(DROPDOWN_MAX_HEIGHT, spaceBelow)}px`,
      opensAbove: false,
    };
  }

  private buildItemHTML(item: OptionsListItem, index: number): string {
    const isSelected = item.value === this.selectedValue;
    const isFocused = index === this.focusedIndex;
    const classes = [`${COMPONENT_PREFIX}-item`, isSelected && `${COMPONENT_PREFIX}-item-selected`, isFocused && `${COMPONENT_PREFIX}-item-focused`].filter(Boolean).join(' ');
    const checkIcon = isSelected ? `<mnt-icon class="${COMPONENT_PREFIX}-item-check" icon="check" size="small"></mnt-icon>` : '';
    return `<div id="${this.itemId(index)}" class="${classes}" role="option" aria-selected="${isSelected}" data-index="${index}">
      <span class="${COMPONENT_PREFIX}-item-label">${this.escapeHTML(item.label)}</span>${checkIcon}
    </div>`;
  }

  private renderPortal(position: DropdownPosition) {
    if (!this.portalEl) return;

    this.portalEl.id = this.listboxId;
    this.portalEl.setAttribute('role', 'listbox');
    this.portalEl.className = classNames(`${COMPONENT_PREFIX}-items`, position.opensAbove ? `${COMPONENT_PREFIX}-items-above` : `${COMPONENT_PREFIX}-items-below`);

    Object.assign(this.portalEl.style, {
      position: 'fixed',
      top: position.top ?? 'auto',
      bottom: position.bottom ?? 'auto',
      left: position.left,
      width: position.width,
      maxHeight: position.maxHeight,
    });

    this.portalEl.innerHTML = this.parsedItems.map((item, i) => this.buildItemHTML(item, i)).join('');
  }

  private openPortal(position: DropdownPosition) {
    if (!this.portalEl) {
      this.portalEl = document.createElement('div');

      // Prevent the header from losing focus when the user clicks an item
      this.portalEl.addEventListener('mousedown', (e: MouseEvent) => e.preventDefault());

      // Single delegated listener handles all item clicks
      this.portalEl.addEventListener('click', (e: MouseEvent) => {
        const itemEl = (e.target as Element).closest('[data-index]');
        if (!itemEl) return;
        const index = parseInt(itemEl.getAttribute('data-index')!, 10);
        if (!isNaN(index)) this.selectItem(this.parsedItems[index]);
      });

      document.body.appendChild(this.portalEl);
    }
    this.renderPortal(position);
  }

  private closePortal() {
    if (this.portalEl) {
      this.portalEl.remove();
      this.portalEl = null;
    }
  }

  private open() {
    const position = this.computeDropdownPosition();
    if (!position) return;
    this.dropdownPosition = position;
    this.openPortal(position);
    this.isOpen = true;
    this.focusedIndex = this.parsedItems.findIndex((item) => item.value === this.selectedValue);
  }

  private close() {
    this.closePortal();
    this.isOpen = false;
    this.focusedIndex = -1;
    this.dropdownPosition = null;
  }

  private handleHeaderClick() {
    this.isOpen ? this.close() : this.open();
  }

  private handleKeyDown(event: KeyboardEvent) {
    const { key } = event;

    if (!this.isOpen) {
      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        this.open();
      }
      return;
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.parsedItems.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const focused = this.parsedItems[this.focusedIndex];
        if (focused) this.selectItem(focused);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  private handleBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as Node | null;
    if (this.host.contains(relatedTarget)) return;
    if (this.portalEl?.contains(relatedTarget)) return;
    this.close();
  }

  private selectItem(item: OptionsListItem) {
    const isDeselecting = this.selectedValue === item.value;
    this.selectedValue = isDeselecting ? null : item.value;
    this.close();

    if (this.hiddenInput) {
      this.hiddenInput.value = this.selectedValue ?? '';
    }

    this.optionSelect.emit(isDeselecting ? null : { value: item.value, label: item.label });
  }

  render() {
    const isPlaceholder = !this.selectedLabel;

    const headerClass = classNames(
      `${COMPONENT_PREFIX}-header`,
      this.isOpen && `${COMPONENT_PREFIX}-header-open`,
      this.isOpen && this.dropdownPosition?.opensAbove && `${COMPONENT_PREFIX}-header-open-above`,
    );
    const caretClass = classNames(`${COMPONENT_PREFIX}-caret`, this.isOpen && `${COMPONENT_PREFIX}-caret-open`);
    const textClass = classNames(`${COMPONENT_PREFIX}-display-text`, isPlaceholder && `${COMPONENT_PREFIX}-display-text-placeholder`);

    return (
      <Host class={classNames(COMPONENT_PREFIX, !!this.fullWidth && `${COMPONENT_PREFIX}-full-width`)}>
        <input
          type="hidden"
          name={this.name}
          value={this.selectedValue ?? ''}
          ref={(el) => (this.hiddenInput = el as HTMLInputElement)}
        />

        {renderFieldLabel({
          labelText: this.labelText,
          prefix: this.componentPrefix,
          labelId: this.labelId,
          required: this.host.hasAttribute('required'),
        })}

        <div
          class={headerClass}
          role="combobox"
          tabindex="0"
          aria-haspopup="listbox"
          aria-expanded={String(this.isOpen)}
          aria-controls={this.listboxId}
          aria-labelledby={this.labelText ? this.labelId : undefined}
          aria-activedescendant={this.activedescendant}
          ref={(el) => (this.headerEl = el as HTMLElement)}
          onClick={() => this.handleHeaderClick()}
          onKeyDown={(e) => this.handleKeyDown(e)}
          onBlur={(e) => this.handleBlur(e)}
        >
          <span class={textClass}>{this.displayText}</span>
          <mnt-icon
            class={caretClass}
            icon="caret-down"
            size="small"
          />
        </div>
      </Host>
    );
  }
}
