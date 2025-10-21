import { Component, Host, Prop, Event, EventEmitter, h, State, Watch } from '@stencil/core';

import { setComponentClass } from '../../utils/utils';
import { TabItem } from './tab-item-group.types';
import { TabItemGroupProps } from './tab-item-group.types';

@Component({
  tag: 'mnt-tab-item-group',
  styleUrl: 'tab-item-group.scss',
  shadow: false,
})
export class TabItemGroup {
  @Prop() tabs!: TabItem[] | string;
  @Prop() selectedId?: string;
  @Prop() orientation: TabItemGroupProps['orientation'] = 'horizontal';

  private get parsedTabs(): TabItem[] {
    if (typeof this.tabs === 'string') {
      try {
        return JSON.parse(this.tabs);
      } catch (e) {
        console.error('Failed to parse tabs:', e);
        return [];
      }
    }
    return this.tabs || [];
  }

  @Event() tabChange: EventEmitter<string>;

  @State() internalSelectedId: string = '';

  componentWillLoad() {
    this.updateSelectedId();
  }

  @Watch('tabs')
  @Watch('selectedId')
  onTabsOrSelectedIdChange() {
    this.updateSelectedId();
  }

  private updateSelectedId() {
    const tabs = this.parsedTabs;
    if (this.selectedId !== undefined) {
      this.internalSelectedId = this.selectedId;
    } else if (tabs && tabs.length > 0) {
      // Select first non-disabled tab, or first tab if all are disabled
      const firstEnabledTab = tabs.find((tab: TabItem) => !tab.disabled);
      this.internalSelectedId = firstEnabledTab ? firstEnabledTab.id : tabs[0].id;
    }
  }

  private handleTabClick = (event: CustomEvent<string>) => {
    const tabId = event.detail;
    this.internalSelectedId = tabId;
    this.tabChange.emit(tabId);
  };

  get groupClass() {
    return setComponentClass('tab-item-group', this.orientation);
  }

  private renderTabItem(tab: TabItem) {
    return (
      <mnt-tab-item
        tabId={tab.id}
        label={tab.label}
        icon={tab.icon}
        selected={this.internalSelectedId === tab.id}
        disabled={tab.disabled}
        orientation={this.orientation}
        onTabItemClick={this.handleTabClick}
      />
    );
  }

  render() {
    const tabs = this.parsedTabs;
    if (!tabs || tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div
          class={this.groupClass}
          part="tab-group"
        >
          {tabs.map((tab: TabItem) => this.renderTabItem(tab))}
        </div>
      </Host>
    );
  }
}
