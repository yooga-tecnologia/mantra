import { getLibPrefix } from 'src/utils/utils';

export const COMPONENT_PREFIX = getLibPrefix() + 'switch';

export type SwitchType = 'checkbox' | 'radio';

export interface SwitchBaseProps {
  /**
   * Unique identifier for the input element.
   * Use the native 'id' attribute on the component instead.
   * @example <mnt-switch id="my-switch" />
   */
  inputId?: string;

  /**
   * Name attribute for form submission (required for radio groups)
   */
  name?: string;

  /**
   * Value attribute for form submission
   */
  value?: string;

  /**
   * Type of switch behavior: 'checkbox' (default) or 'radio'
   */
  type?: SwitchType;

  /**
   * Label text displayed next to the switch
   */
  label?: string;

  /**
   * Description text displayed below the label
   */
  description?: string;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * Whether the switch is checked by default
   */
  checked?: boolean;

  /**
   * Whether the switch is required for form validation
   */
  required?: boolean;
}

export interface SwitchChangeEventDetail {
  checked: boolean;
  value: string;
  id: string;
  name?: string;
}
