import { Component, Element, EventEmitter, Host, Prop, Event, Watch, h, State } from '@stencil/core';
import { classNames, setComponentClass } from 'src/utils/utils';
import { FieldTextProps } from './filter-search.types';

@Component({
  tag: 'mnt-filter-search',
  styleUrl: 'filter-search.scss',
  shadow: false,
  formAssociated: true,
})
export class FilterSearch {
  @Element() host: HTMLElement;

  // Base styles
  @Prop({ mutable: true }) name: string;
  @Prop() fullWidth?: boolean = false;
  @Prop() size?: FieldTextProps['size'] = 'medium';
  @Prop() placeholder?: FieldTextProps['placeholder'];
  @Prop({ mutable: true, reflect: true }) state?: FieldTextProps['state'] = 'default';
  private readonly iconSizeMap = { small: 16, medium: 20, large: 24 };

  // Input Props
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Watch('value')
  watchValueProp(newValue: string) {
    if (this.inputRef) {
      this.inputRef.value = newValue || '';
    }
  }

  // Structure
  @Prop() labelText?: FieldTextProps['labelText'];
  @Prop() hasActionButton?: FieldTextProps['hasActionButton'];
  @Prop() hasInfoButton?: FieldTextProps['hasInfoButton'];
  @Prop({ mutable: true, reflect: true }) inlineMessage?: FieldTextProps['inlineMessage'];

  // Events
  @Event() valueChange: EventEmitter<{ value: string }>;
  @Event() filterApplied: EventEmitter<{ value: string }>;

  @State() showClearButton: boolean = false;

  private readonly componentPrefix = setComponentClass('filter-search', '');
  private inputRef?: HTMLInputElement;

  getValue(): string {
    return this.value;
  }

  componentWillLoad() {
    if (this.value && this.inputRef) {
      this.inputRef.value = this.value;
      this.showClearButton = this.value.length > 0;
    }

    if (!this.name) {
      this.name = 'mnt-filter-search';
    }
  }

  private get componentClass() {
    return classNames(
      this.componentPrefix,
      this.size && `${this.componentPrefix}-${this.size}`,
      this.state && `${this.componentPrefix}-${this.state}`,
      this.fullWidth && `${this.componentPrefix}-full-width`,
    );
  }

  private get inputClass() {
    return classNames(`${this.componentPrefix}-input`, this.fullWidth && `${this.componentPrefix}-full-width`, this.value && `${this.componentPrefix}-filled`);
  }

  onInput(event: any) {
    const inputEl = event.target as HTMLInputElement;
    const inputValue = inputEl.value;

    this.value = inputValue;
    this.showClearButton = inputValue.length > 0;
    this.valueChange.emit({ value: inputValue });
  }

  onBlur(event: any) {
    const inputEl = event.target as HTMLInputElement;
    const inputValue = inputEl.value;

    this.showClearButton = inputValue.length > 0;
    this.filterApplied.emit({ value: inputValue });
  }

  onFocus(event: any) {
    const inputEl = event.target as HTMLInputElement;
    const inputValue = inputEl.value;

    this.showClearButton = inputValue.length > 0;
  }

  onClear() {
    if (this.inputRef) {
      this.inputRef.value = '';
      this.inputRef.focus();
    }

    this.value = '';
    this.showClearButton = false;
    this.valueChange.emit({ value: '' });
    this.filterApplied.emit({ value: '' });
  }

  // RENDER METHODS

  render() {
    return (
      <Host class={this.componentClass}>
        <input
          ref={(el) => (this.inputRef = el)}
          type={this.host.getAttribute('type') || 'text'}
          id={this.name + '-input'}
          name={this.name}
          class={this.inputClass}
          placeholder={this.host.getAttribute('placeholder') || undefined}
          disabled={this.host.hasAttribute('disabled')}
          required={this.host.hasAttribute('required')}
          autocomplete={this.host.getAttribute('autocomplete') || 'off'}
          autoFocus={this.host.hasAttribute('autofocus') || false}
          value={this.value}
          onInput={(e) => this.onInput(e)}
          onBlur={(e) => this.onBlur(e)}
          onFocus={(e) => this.onFocus(e)}
        />

        {this.showClearButton ? (
          <mnt-icon
            class={`${this.componentPrefix}-clear-icon`}
            icon="signalingErrorCircle"
            color="#0A639A"
            size={this.iconSizeMap[this.size]}
            onClick={() => this.onClear()}
          />
        ) : (
          <mnt-icon
            class={`${this.componentPrefix}-search-icon`}
            icon="magnifyingGlass"
            color="#4B5053"
            size={this.iconSizeMap[this.size]}
          />
        )}
      </Host>
    );
  }
}
