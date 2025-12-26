import { getLibPrefix } from 'src/utils/utils';

export const COMPONENT_PREFIX = getLibPrefix() + 'date-picker';

export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePickerBaseProps {
  /**
   * Mode of the date picker: 'single' for single date selection, 'range' for date range selection
   */
  mode?: DatePickerMode;

  /**
   * Selected date (for single mode)
   */
  selectedDate?: Date | string | null;

  /**
   * Selected date range (for range mode)
   */
  selectedRange?: DateRange | null;

  /**
   * Minimum selectable date
   */
  minDate?: Date | string | null;

  /**
   * Maximum selectable date
   */
  maxDate?: Date | string | null;

  /**
   * Initial month to display (defaults to selected date or current month)
   */
  initialMonth?: Date | string | null;

  /**
   * Locale for date formatting (e.g., 'pt-BR', 'en-US')
   */
  locale?: string;

  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;

  /**
   * Whether the date picker is required for form validation
   */
  required?: boolean;

  /**
   * Custom placeholder text
   */
  placeholder?: string;

  /**
   * First day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  firstDayOfWeek?: number;

  /**
   * Disable selection of dates before today
   */
  disablePastDates?: boolean;
}

export interface DateSelectedEventDetail {
  date: Date | null;
  range?: DateRange | null;
  formattedDate?: string;
  mode: DatePickerMode;
}

export interface MonthYear {
  month: number; // 0-11
  year: number;
}
