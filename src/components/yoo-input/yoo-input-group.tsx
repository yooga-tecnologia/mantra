import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "yoo-input-group",
  styleUrl: "yoo-input-group.scss",
  shadow: false,
})
export class YooInputGroup {
  @Prop() inputName: string;
  @Prop() label: string;
  @Prop() placeholder?: string;
  @Prop() isRequired: boolean = false;
  @Prop() condition: boolean = false;
  @Prop() trailingIcon: boolean = false;

  private get inputClass() {
    const classes = ["input-group"];

    if (this.condition) {
      classes.push("input-condition");
    }

    if (this.isRequired) {
      classes.push("input-required");
    }

    return classes.join(" ");
  }

  render() {
    return (
      <Host class={this.inputClass}>
        <div class="label-wrapper">
          <label htmlFor={this.inputName} class="label-medium">
            {this.label}
            {this.isRequired && <strong>*</strong>}
          </label>
          <slot name="helperText" />
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
