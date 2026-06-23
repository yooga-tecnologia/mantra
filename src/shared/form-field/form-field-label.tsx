import { h } from '@stencil/core';

export interface FieldLabelOptions {
  /** Label text to display. Returns null when empty. */
  labelText: string | undefined;
  /** CSS class prefix of the host component (e.g. "mnt-options-list"). */
  prefix: string;
  /** id applied to the <label> element — used with aria-labelledby on the control. */
  labelId: string;
  /** When true, appends a required asterisk (*). */
  required?: boolean;
}

/**
 * Renders the shared label markup used by form field components.
 * Returns null when labelText is falsy, so callers don't need to guard.
 *
 * Usage in a Stencil component:
 *   {renderFieldLabel({ labelText: this.labelText, prefix: COMPONENT_PREFIX, labelId: this.labelId, required: this.host.hasAttribute('required') })}
 */
export function renderFieldLabel({ labelText, prefix, labelId, required }: FieldLabelOptions) {
  if (!labelText) return null;

  return (
    <div class={`${prefix}-label`}>
      <label id={labelId}>
        {labelText}
        {required && <span class="text-color-primary">*</span>}
      </label>
    </div>
  );
}
