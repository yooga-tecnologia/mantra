/**
 * Base props shared across all form field components (field-text, field-date,
 * filter-search, options-list, etc.). Extend this interface instead of
 * declaring these props individually in each component.
 */
export interface FormFieldBaseProps {
  /** Field name used in form submissions. */
  name?: string;
  /** Label displayed above the field. */
  labelText?: string;
  /** Placeholder shown when the field has no value. */
  placeholder?: string;
  /** When true, the field expands to 100% of its container width. */
  fullWidth?: boolean;
}
