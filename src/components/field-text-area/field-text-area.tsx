import { Component, EventEmitter, Host, Prop, Event, h, State, Watch } from '@stencil/core';
import { classNames, setComponentClass } from 'src/utils/utils';
import { FieldTextAreaProps } from './field-text-area.types';

@Component({
  tag: 'mnt-field-text-area',
  styleUrl: 'field-text-area.scss',
  shadow: false,
})
export class FieldTextArea {
  @Prop({ reflect: true }) inputName: string;

  // Base styles
  @Prop() state?: FieldTextAreaProps['state'] = 'default';
  @Prop() disabled?: FieldTextAreaProps['disabled'] = false;
  @Prop() required?: FieldTextAreaProps['required'] = false;
  @Prop() placeholder?: FieldTextAreaProps['placeholder'];

  // Textarea Props
  @Prop() maxLength?: number = 300;
  @Prop() rows?: number = 5;
  @Prop({ mutable: true, reflect: true }) value?: string = '';

  // Structure
  @Prop() labelText?: FieldTextAreaProps['labelText'];
  @Prop() inlineMessage?: FieldTextAreaProps['inlineMessage'];
  @Prop() hasActionButton?: FieldTextAreaProps['hasActionButton'];
  @Prop() hasInfoButton?: FieldTextAreaProps['hasInfoButton'];

  // Internal state
  @State() charCount: number = 0;

  // Events
  @Event() valueChange: EventEmitter<string>;

  private textareaEl?: HTMLTextAreaElement;

  public getTextarea(): HTMLTextAreaElement | undefined {
    return this.textareaEl;
  }

  private readonly componentPrefix = setComponentClass('field-text-area', '');

  @Watch('value')
  watchValueHandler(newValue: string) {
    this.charCount = newValue?.length || 0;
  }

  componentWillLoad() {
    this.charCount = this.value?.length || 0;
  }

  private get fieldTextAreaClass() {
    return classNames(
      this.componentPrefix,
      `${this.componentPrefix}-${this.state}`,
      this.disabled && `${this.componentPrefix}-disabled`
    );
  }

  private get textareaClass() {
    return classNames(`${this.componentPrefix}-textarea`);
  }

  private handleInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;

    this.value = value;
    this.charCount = value.length;
    this.valueChange.emit(this.value);
  }

  // Render Methods

  private renderLabel() {
    if (!this.labelText) return null;
    return (
      <div class={`${this.componentPrefix}-label`}>
        <label htmlFor={this.inputName}>
          {this.labelText}
          {this.required && <span class="text-color-primary">*</span>}
        </label>

        {this.hasInfoButton && (
          <div class={`${this.componentPrefix}-info-button`}>
            <slot name="info-button"></slot>
          </div>
        )}

        {this.hasActionButton && (
          <div class={`${this.componentPrefix}-action-button`}>
            <slot name="action-button"></slot>
          </div>
        )}
      </div>
    );
  }

  private renderTextarea() {
    return (
      <div class={this.textareaClass}>
        <textarea
          id={this.inputName}
          placeholder={this.placeholder}
          required={this.required}
          maxLength={this.maxLength}
          rows={this.rows}
          value={this.value}
          disabled={this.disabled}
          onInput={(e) => this.handleInput(e)}
          ref={(el) => (this.textareaEl = el)}
        />

        {this.state === 'error' && (
          <mnt-icon
            class="icon-state"
            icon="signalingErrorCircle"
            size={20}
          ></mnt-icon>
        )}
        {this.state === 'success' && (
          <mnt-icon
            class="icon-state"
            icon="signalingCheckCircle"
            size={20}
          ></mnt-icon>
        )}

        <div class={`${this.componentPrefix}-bottom`}>
          <span class={`${this.componentPrefix}-counter`}>
            {this.charCount}/{this.maxLength}
          </span>
        </div>
      </div>
    );
  }

  private renderInlineMessage() {
    if (!this.inlineMessage) return null;
    return (
      <div class={this.componentPrefix + '-inline-message'}>
        {this.state === 'error' ? (
          <mnt-icon
            icon="signalingErrorCircle"
            size="small"
          ></mnt-icon>
        ) : this.state === 'success' ? (
          <mnt-icon
            icon="signalingCheckCircle"
            size="small"
          ></mnt-icon>
        ) : (
          <mnt-icon
            icon="info"
            size="small"
          ></mnt-icon>
        )}
        <span>{this.inlineMessage}</span>
      </div>
    );
  }

  render() {
    return (
      <Host class={this.fieldTextAreaClass}>
        {this.renderLabel()}
        {this.renderTextarea()}
        {this.renderInlineMessage()}
      </Host>
    );
  }
}

