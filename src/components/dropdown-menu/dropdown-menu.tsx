import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import { classNames, setComponentClass } from '../../utils/utils';
import type { ButtonStyle, ButtonStateVariants } from '../button/button.types';
import type { ExtendedIconName } from '../icon/icon.types';
import type { SizeVariants, ThemePalette } from '@theme/theme.types';
import { DropdownMenuItem, DropdownMenuRawItem, DropdownMenuSelectPayload, parseMenuItems } from './dropdown-menu.types';

const COMPONENT_PREFIX = setComponentClass('dropdown-menu');
// ~41px per item × 8 items + 8px container padding
const DROPDOWN_MAX_HEIGHT = 336;
const DROPDOWN_VIEWPORT_MARGIN = 8;

interface DropdownPosition {
  top?: string;
  bottom?: string;
  left: string;
  minWidth: string;
  maxHeight: string;
  opensAbove: boolean;
}

@Component({
  tag: 'mnt-dropdown-menu',
  styleUrl: 'dropdown-menu.scss',
  shadow: false,
})
export class DropdownMenu {
  @Element() host!: HTMLElement;

  /** Items to display in the menu. Accepts a JSON string or a direct array. */
  @Prop() items: string | DropdownMenuRawItem[] = '[]';

  // ── mnt-button trigger props ──────────────────────────────────────────────

  /** Button label (passed to mnt-button). */
  @Prop() label?: string;

  /** Icon on the left side of the button label. */
  @Prop() iconLeft?: ExtendedIconName;

  /** Icon on the right side of the button label (defaults to caret-down when no iconLeft is provided). */
  @Prop() iconRight?: ExtendedIconName;

  /** Button color variant. */
  @Prop() color?: ThemePalette = 'neutral';

  /** Button style variant. */
  @Prop() variant?: ButtonStyle = 'stroke';

  /** Button size. */
  @Prop() size?: SizeVariants = 'medium';

  /** Disables the trigger button. */
  @Prop() disabled?: boolean = false;

  /** Button state. */
  @Prop() state?: ButtonStateVariants = 'default';

  /** Makes the trigger button fill 100% of its container width. */
  @Prop() fullWidth?: boolean = false;

  /** When true, clicking anywhere outside the menu closes it. Default: true. */
  @Prop() closeOnOutsideClick?: boolean = true;

  /** Value of the currently selected item. When set, that item shows a check icon. */
  @Prop() selectedValue?: string;

  // ─────────────────────────────────────────────────────────────────────────

  @State() parsedItems: DropdownMenuItem[] = [];
  @State() isOpen: boolean = false;
  @State() focusedIndex: number = -1;
  @State() dropdownPosition: DropdownPosition | null = null;
  @State() hasCustomTrigger: boolean = false;

  @Event() menuSelect!: EventEmitter<DropdownMenuSelectPayload>;

  private triggerEl!: HTMLElement;
  private portalEl: HTMLDivElement | null = null;
  private readonly menuId = `${COMPONENT_PREFIX}-menu-${Math.random().toString(36).slice(2, 7)}`;
  private outsideClickHandler: ((e: MouseEvent) => void) | null = null;

  componentWillLoad() {
    this.parsedItems = parseMenuItems(this.items);
    // Detect slot before first render — light DOM children are available at this point
    this.hasCustomTrigger = !!this.host.querySelector('[slot="trigger"]');
  }

  componentDidUpdate() {
    if (this.isOpen && this.dropdownPosition && this.portalEl) {
      this.renderPortal(this.dropdownPosition);
    }
  }

  disconnectedCallback() {
    this.close();
  }

  @Watch('items')
  onItemsChange(newItems: string | DropdownMenuRawItem[]) {
    this.parsedItems = parseMenuItems(newItems);
  }

  @Listen('scroll', { target: 'window', passive: true })
  onWindowScroll() {
    if (this.isOpen) this.close();
  }

  @Listen('resize', { target: 'window', passive: true })
  onWindowResize() {
    if (this.isOpen) this.close();
  }

  private get activedescendant(): string | undefined {
    if (!this.isOpen || this.focusedIndex < 0) return undefined;
    return this.itemId(this.focusedIndex);
  }

  private itemId(index: number): string {
    return `${this.menuId}-item-${index}`;
  }

  private escapeHTML(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  private computeDropdownPosition(): DropdownPosition | null {
    if (!this.triggerEl) return null;

    const rect = this.triggerEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom - DROPDOWN_VIEWPORT_MARGIN;
    const spaceAbove = rect.top - DROPDOWN_VIEWPORT_MARGIN;
    const opensAbove = spaceBelow < DROPDOWN_MAX_HEIGHT && spaceAbove > spaceBelow;

    if (opensAbove) {
      return {
        bottom: `${viewportHeight - rect.top + 4}px`,
        left: `${rect.left}px`,
        minWidth: `${rect.width}px`,
        maxHeight: `${Math.min(DROPDOWN_MAX_HEIGHT, spaceAbove)}px`,
        opensAbove: true,
      };
    }

    return {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      minWidth: `${rect.width}px`,
      maxHeight: `${Math.min(DROPDOWN_MAX_HEIGHT, spaceBelow)}px`,
      opensAbove: false,
    };
  }

  private buildItemHTML(item: DropdownMenuItem, index: number): string {
    const isFocused = index === this.focusedIndex;
    const isSelected = this.selectedValue !== undefined && item.value === this.selectedValue;
    const separatorHTML = item.separator ? `<div class="${COMPONENT_PREFIX}-separator" role="separator"></div>` : '';
    const iconHTML = item.icon
      ? `<mnt-icon class="${COMPONENT_PREFIX}-item-icon" icon="${this.escapeHTML(item.icon)}" size="small"></mnt-icon>`
      : '';
    const checkHTML = isSelected
      ? `<mnt-icon class="${COMPONENT_PREFIX}-item-check" icon="check" size="small"></mnt-icon>`
      : '';
    const classes = [
      `${COMPONENT_PREFIX}-item`,
      isSelected && `${COMPONENT_PREFIX}-item-selected`,
      item.disabled && `${COMPONENT_PREFIX}-item-disabled`,
      isFocused && `${COMPONENT_PREFIX}-item-focused`,
    ]
      .filter(Boolean)
      .join(' ');

    return `${separatorHTML}<div
      id="${this.itemId(index)}"
      class="${classes}"
      role="menuitemradio"
      aria-checked="${isSelected}"
      aria-disabled="${item.disabled ?? false}"
      data-index="${index}"
    >${iconHTML}<span class="${COMPONENT_PREFIX}-item-label">${this.escapeHTML(item.label)}</span>${checkHTML}</div>`;
  }

  private renderPortal(position: DropdownPosition) {
    if (!this.portalEl) return;

    this.portalEl.id = this.menuId;
    this.portalEl.setAttribute('role', 'menu');
    this.portalEl.className = classNames(`${COMPONENT_PREFIX}-list`, position.opensAbove ? `${COMPONENT_PREFIX}-list-above` : `${COMPONENT_PREFIX}-list-below`);

    Object.assign(this.portalEl.style, {
      position: 'fixed',
      top: position.top ?? 'auto',
      bottom: position.bottom ?? 'auto',
      left: position.left,
      minWidth: position.minWidth,
      maxHeight: position.maxHeight,
    });

    this.portalEl.innerHTML = this.parsedItems.map((item, i) => this.buildItemHTML(item, i)).join('');
  }

  private openPortal(position: DropdownPosition) {
    if (!this.portalEl) {
      this.portalEl = document.createElement('div');

      this.portalEl.addEventListener('mousedown', (e: MouseEvent) => e.preventDefault());

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
    this.focusedIndex = -1;

    if (this.closeOnOutsideClick) {
      this.outsideClickHandler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (this.host.contains(target)) return;
        if (this.portalEl?.contains(target)) return;
        this.close();
      };
      // Defer to avoid catching the same click that opened the menu
      setTimeout(() => document.addEventListener('click', this.outsideClickHandler!), 0);
    }
  }

  private close() {
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }
    this.closePortal();
    this.isOpen = false;
    this.focusedIndex = -1;
    this.dropdownPosition = null;
  }

  private handleTriggerClick() {
    if (this.disabled) return;
    this.isOpen ? this.close() : this.open();
  }

  private handleKeyDown(event: KeyboardEvent) {
    const { key } = event;

    if (!this.isOpen) {
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown') {
        event.preventDefault();
        this.open();
      }
      return;
    }

    const navigableIndices = this.parsedItems
      .map((item, i) => (item.disabled ? null : i))
      .filter((i): i is number => i !== null);

    switch (key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = navigableIndices.find((i) => i > this.focusedIndex);
        if (next !== undefined) this.focusedIndex = next;
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = [...navigableIndices].reverse().find((i) => i < this.focusedIndex);
        if (prev !== undefined) this.focusedIndex = prev;
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const focused = this.parsedItems[this.focusedIndex];
        if (focused && !focused.disabled) this.selectItem(focused);
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

  private selectItem(item: DropdownMenuItem) {
    if (item.disabled) return;
    this.close();
    this.menuSelect.emit({ value: item.value, label: item.label });
  }

  render() {
    // Use iconRight as caret by default; if consumer sets iconLeft, the caret
    // goes to iconRight automatically. If they explicitly pass iconRight, we respect it.
    const resolvedIconRight = this.iconRight ?? 'caret-down';

    return (
      <Host
        class={classNames(COMPONENT_PREFIX, this.fullWidth && `${COMPONENT_PREFIX}-full-width`)}
      >
        {/*
          The wrapper is the measurement anchor for dropdown positioning.
          It carries ARIA attributes and keyboard handling for both trigger modes.

          onClick is only set for custom triggers — when using mnt-button, the
          button's onButtonClick handles the toggle to avoid double-firing
          (click on mnt-button bubbles up and would trigger the wrapper too).
        */}
        <div
          ref={(el) => (this.triggerEl = el as HTMLElement)}
          class={classNames(
            `${COMPONENT_PREFIX}-trigger-anchor`,
            this.fullWidth && `${COMPONENT_PREFIX}-trigger-anchor-full-width`,
          )}
          role={this.hasCustomTrigger ? 'button' : undefined}
          tabindex={this.hasCustomTrigger ? '0' : undefined}
          aria-haspopup="menu"
          aria-expanded={String(this.isOpen)}
          aria-controls={this.menuId}
          aria-activedescendant={this.activedescendant}
          onClick={this.hasCustomTrigger ? () => this.handleTriggerClick() : undefined}
          onKeyDown={(e) => this.handleKeyDown(e)}
          onBlur={(e) => this.handleBlur(e)}
        >
          {this.hasCustomTrigger ? (
            // Custom trigger via slot — consumer is responsible for visual styling
            <slot name="trigger" />
          ) : (
            // Default trigger: mnt-button handles its own click via onButtonClick
            <mnt-button
              label={this.label}
              icon-left={this.iconLeft}
              icon-right={resolvedIconRight}
              color={this.color}
              variant={this.variant}
              size={this.size}
              disabled={this.disabled}
              state={this.state}
              full-width={this.fullWidth}
              onButtonClick={() => this.handleTriggerClick()}
            />
          )}
        </div>
      </Host>
    );
  }
}
