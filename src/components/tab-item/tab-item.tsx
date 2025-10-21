import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

import { classNames, setComponentClass } from '../../utils/utils';
import type { TabItemProps } from './tab-item.types';

const COMPONENT_PREFIX = setComponentClass('tab-item');

@Component({
  tag: 'mnt-tab-item',
  styleUrl: 'tab-item.scss',
  shadow: false,
})
export class TabItem {
  @Prop() tabId!: string;
  @Prop() label!: string;
  @Prop() icon?: TabItemProps['icon'];
  @Prop() selected: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() orientation: TabItemProps['orientation'] = 'horizontal';

  @Event() tabItemClick: EventEmitter<string>;

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.tabItemClick.emit(this.tabId);
  }

  get tabItemClass() {
    const orientationClass = setComponentClass('tab-item', this.orientation);
    const iconClass = this.icon ? `${COMPONENT_PREFIX}-icon` : '';
    const selectedClass = this.selected ? `${COMPONENT_PREFIX}-selected` : '';
    const disabledClass = this.disabled ? `${COMPONENT_PREFIX}-disabled` : '';

    return classNames(COMPONENT_PREFIX, orientationClass, iconClass, selectedClass, disabledClass);
  }

  private renderIcon() {
    if (!this.icon) return null;

    return (
      <mnt-icon
        icon={this.icon}
        size="small"
        class={`${COMPONENT_PREFIX}-icon`}
      />
    );
  }

  render() {
    return (
      <Host>
        <button
          class={this.tabItemClass}
          disabled={this.disabled}
          onClick={(event) => this.handleClick(event)}
          part="tab-item"
        >
          {this.renderIcon()}
          <span class={`${COMPONENT_PREFIX}-label`}>{this.label}</span>
        </button>
      </Host>
    );
  }
}
