import { Component, Host, Prop, h } from "@stencil/core";
import { getLibPrefix } from 'src/utils/utils';

// @todo - Review / Improve component classes and styles following https://m3.material.io/components/text-fields/specs guidelines

@Component({
  tag: "mnt-input-group",
  styleUrl: "input-group.scss",
  shadow: false,
})
export class InputGroup {
  @Prop({ reflect: true }) inputName: string;
  @Prop() label: string;
  @Prop() placeholder?: string;
  @Prop() isRequired: boolean = false;

  // @todo - Review behavior / styles (the component isnt rendering it properly)
  @Prop() condition: boolean = false;
  @Prop() trailingIcon: boolean = false;

  private readonly libPrefix = getLibPrefix();
  private readonly componentPrefix = this.libPrefix + 'input-group';

  private get inputClass() {
    const classes = [this.componentPrefix];

    if (this.condition) {
      classes.push(`${this.libPrefix}input-condition`);
    }

    if (this.isRequired) {
      classes.push(`${this.libPrefix}input-required`);
    }

    return classes.join(" ");
  }

  render() {
    return (
      <Host class={this.inputClass}>
        <div class="label-wrapper">
          <label htmlFor="teste" class="label-medium-medium">
            {this.label}
            {this.isRequired && <strong>*</strong>}
          </label>
          <slot name="helper-text" />
        </div>

        <div class="field-wrapper">
          <div class="input-container">
            <slot name="input" />
            
            {this.trailingIcon && (
              <span class="trailing-icon">
                <slot name="icon"></slot>
              </span>
            )}
          </div>
        </div>

        <slot />
      </Host>
    );
  }
}
