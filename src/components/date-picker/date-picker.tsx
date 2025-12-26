import { Component, Host, Prop, Event, EventEmitter, h, State, Watch, Element } from '@stencil/core';
import { AttachInternals } from '@stencil/core/internal';
import {
  COMPONENT_PREFIX,
  // DatePickerBaseProps,
  DateSelectedEventDetail,
  DatePickerMode,
  DateRange,
  MonthYear,
} from './date-picker.types';

@Component({
  tag: 'mnt-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: false,
  formAssociated: true,
})
export class DatePicker {
  @Element() el: HTMLElement;
  @AttachInternals() internals: ElementInternals;

  // Props
  @Prop({ mutable: true, reflect: true }) mode?: DatePickerMode = 'single';
  @Prop({ mutable: true }) selectedDate?: Date | string | null = null;
  @Prop({ mutable: true }) selectedRange?: DateRange | null = null;
  @Prop() minDate?: Date | string | null = null;
  @Prop() maxDate?: Date | string | null = null;
  @Prop() initialMonth?: Date | string | null = null;
  @Prop() locale?: string = 'pt-BR';
  @Prop() disabled?: boolean = false;
  @Prop() required?: boolean = false;
  @Prop() placeholder?: string;
  @Prop() firstDayOfWeek?: number = 0; // 0 = Sunday
  @Prop() disablePastDates?: boolean = false; // Desabilita datas anteriores ao dia atual

  // State
  @State() private currentMonth: MonthYear;
  @State() private internalSelectedDate: Date | null = null;
  @State() private internalSelectedRange: DateRange = { start: null, end: null };
  @State() private hoverDate: Date | null = null;
  // @State() private isOpen: boolean = false;

  // Events
  @Event({ eventName: 'datePickerSelected' }) datePickerSelected: EventEmitter<DateSelectedEventDetail>;
  @Event({ eventName: 'datePickerCancel' }) datePickerCancel: EventEmitter<void>;
  @Event({ eventName: 'datePickerMonthChange' }) datePickerMonthChange: EventEmitter<MonthYear>;

  private today: Date = new Date();

  componentWillLoad() {
    // Initialize dates
    this.initializeDates();

    // Initialize current month
    const initDate = this.getInitialMonthDate();
    this.currentMonth = {
      month: initDate.getMonth(),
      year: initDate.getFullYear(),
    };

    this.updateFormValue();
  }

  @Watch('selectedDate')
  watchSelectedDate(newValue: Date | string | null) {
    this.internalSelectedDate = this.parseDate(newValue);
    this.updateFormValue();
  }

  @Watch('selectedRange')
  watchSelectedRange(newValue: DateRange | null) {
    if (newValue) {
      this.internalSelectedRange = {
        start: this.parseDate(newValue.start),
        end: this.parseDate(newValue.end),
      };
    }
    this.updateFormValue();
  }

  private initializeDates(): void {
    if (this.mode === 'single') {
      this.internalSelectedDate = this.parseDate(this.selectedDate);
    } else {
      if (this.selectedRange) {
        this.internalSelectedRange = {
          start: this.parseDate(this.selectedRange.start),
          end: this.parseDate(this.selectedRange.end),
        };
      }
    }
  }

  private getInitialMonthDate(): Date {
    if (this.initialMonth) {
      const parsed = this.parseDate(this.initialMonth);
      if (parsed) return parsed;
    }

    if (this.mode === 'single' && this.internalSelectedDate) {
      return this.internalSelectedDate;
    }

    if (this.mode === 'range' && this.internalSelectedRange.start) {
      return this.internalSelectedRange.start;
    }

    return new Date();
  }

  private parseDate(date: Date | string | null | undefined): Date | null {
    if (!date) return null;
    if (date instanceof Date) return date;
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private updateFormValue(): void {
    if (this.mode === 'single') {
      const value = this.internalSelectedDate ? this.internalSelectedDate.toISOString() : null;
      this.internals.setFormValue(value);
    } else {
      const value =
        this.internalSelectedRange.start && this.internalSelectedRange.end
          ? JSON.stringify({
              start: this.internalSelectedRange.start.toISOString(),
              end: this.internalSelectedRange.end.toISOString(),
            })
          : null;
      this.internals.setFormValue(value);
    }

    // Update validity
    if (this.required) {
      const hasValue = this.mode === 'single' ? this.internalSelectedDate !== null : this.internalSelectedRange.start !== null && this.internalSelectedRange.end !== null;

      if (!hasValue) {
        this.internals.setValidity({ valueMissing: true }, 'Please select a date.');
      } else {
        this.internals.setValidity({});
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private handleDateClick = (date: Date): void => {
    if (this.disabled || !this.isDateSelectable(date)) return;

    if (this.mode === 'single') {
      this.internalSelectedDate = date;
      this.selectedDate = date;
      this.updateFormValue();

      this.datePickerSelected.emit({
        date: date,
        formattedDate: this.formatDate(date),
        mode: 'single',
      });
    } else {
      // Range mode
      if (!this.internalSelectedRange.start || (this.internalSelectedRange.start && this.internalSelectedRange.end)) {
        // Start new range
        this.internalSelectedRange = { start: date, end: null };
      } else {
        // Complete range
        if (date < this.internalSelectedRange.start) {
          this.internalSelectedRange = { start: date, end: this.internalSelectedRange.start };
        } else {
          this.internalSelectedRange = { ...this.internalSelectedRange, end: date };
        }

        this.selectedRange = this.internalSelectedRange;
        this.updateFormValue();

        this.datePickerSelected.emit({
          date: null,
          range: this.internalSelectedRange,
          formattedDate: this.formatRange(this.internalSelectedRange.start, this.internalSelectedRange.end),
          mode: 'range',
        });
      }
    }

    // Emit native events for framework compatibility
    this.el.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          date: this.mode === 'single' ? this.internalSelectedDate : null,
          range: this.mode === 'range' ? this.internalSelectedRange : null,
        },
      }),
    );
  };

  // private handleCancel = (): void => {
  //   this.datePickerCancel.emit();
  //   console.log('cancel')
  //   // this.isOpen = false;
  // };

  private isDateSelectable(date: Date): boolean {
    const minDate = this.parseDate(this.minDate);
    const maxDate = this.parseDate(this.maxDate);

    // Verifica se deve desabilitar datas passadas
    if (this.disablePastDates) {
      const todayStart = this.getStartOfDay(new Date());
      const dateStart = this.getStartOfDay(date);
      if (dateStart.getTime() < todayStart.getTime()) return false;
    }

    if (minDate && this.isBefore(date, minDate)) return false;
    if (maxDate && this.isAfter(date, maxDate)) return false;

    return true;
  }

  private isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  private isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < this.getStartOfDay(date2).getTime();
  }

  private isAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > this.getEndOfDay(date2).getTime();
  }

  private getStartOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private getEndOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString(this.locale);
  }

  private formatRange(start: Date | null, end: Date | null): string {
    if (!start || !end) return '';
    return `${this.formatDate(start)} - ${this.formatDate(end)}`;
  }

  private previousMonth = (): void => {
    const newMonth = this.currentMonth.month === 0 ? 11 : this.currentMonth.month - 1;
    const newYear = this.currentMonth.month === 0 ? this.currentMonth.year - 1 : this.currentMonth.year;

    this.currentMonth = { month: newMonth, year: newYear };
    this.datePickerMonthChange.emit(this.currentMonth);
  };

  private nextMonth = (): void => {
    const newMonth = this.currentMonth.month === 11 ? 0 : this.currentMonth.month + 1;
    const newYear = this.currentMonth.month === 11 ? this.currentMonth.year + 1 : this.currentMonth.year;

    this.currentMonth = { month: newMonth, year: newYear };
    this.datePickerMonthChange.emit(this.currentMonth);
  };

  private getDaysInMonth(month: number, year: number): Date[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add padding days from previous month
    const firstDayOfWeek = firstDay.getDay();
    const paddingDays = (firstDayOfWeek - this.firstDayOfWeek + 7) % 7;

    for (let i = paddingDays; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push(date);
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Adiciona apenas os dias necessários para completar a última semana
    const lastDayOfWeek = lastDay.getDay();
    const remainingDays = (6 - lastDayOfWeek + this.firstDayOfWeek) % 7;

    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }

  private getWeekDayNames(): string[] {
    const baseDate = new Date(2024, 0, this.firstDayOfWeek); // A Sunday
    const names: string[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      names.push(date.toLocaleDateString(this.locale, { weekday: 'narrow' }));
    }

    return names;
  }

  private getMonthName(): string {
    const date = new Date(this.currentMonth.year, this.currentMonth.month);
    return date
      .toLocaleDateString(this.locale, { month: 'long', year: 'numeric' })
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace('.', '')
      .replace(' de ', ' ');
  }

  private isInRange(date: Date): boolean {
    if (this.mode !== 'range') return false;
    const { start, end } = this.internalSelectedRange;
    if (!start) return false;

    if (end) {
      return date >= start && date <= end;
    }

    // Hover effect
    if (this.hoverDate && this.hoverDate > start) {
      return date >= start && date <= this.hoverDate;
    }

    return false;
  }

  /**
   * Public method to get the selected date(s)
   */
  public getSelectedDate(): Date | DateRange | null {
    if (this.mode === 'single') {
      return this.internalSelectedDate;
    }
    return this.internalSelectedRange;
  }

  /**
   * Public method to set the selected date
   */
  public setSelectedDate(date: Date | null): void {
    if (this.mode === 'single') {
      this.selectedDate = date;
    }
  }

  /**
   * Public method to set the selected range
   */
  public setSelectedRange(range: DateRange): void {
    if (this.mode === 'range') {
      this.selectedRange = range;
    }
  }

  /**
   * Public method to clear selection
   */
  public clearSelection(): void {
    if (this.mode === 'single') {
      this.internalSelectedDate = null;
      this.selectedDate = null;
    } else {
      this.internalSelectedRange = { start: null, end: null };
      this.selectedRange = null;
    }
    this.updateFormValue();
  }

  render() {
    const days = this.getDaysInMonth(this.currentMonth.month, this.currentMonth.year);
    const weekDays = this.getWeekDayNames();
    const isCurrentMonth = (date: Date) => date.getMonth() === this.currentMonth.month;

    return (
      <Host class={`${COMPONENT_PREFIX}-container`}>
        <div class={`${COMPONENT_PREFIX}`}>
          {/* Header */}
          <div class={`${COMPONENT_PREFIX}-header`}>
            <mnt-button-icon
              variant="plain"
              color="neutral"
              icon="caret-left"
              size="tiny"
              onClick={() => this.previousMonth()}
              disabled={this.disabled}
              aria-label="Previous month"
            ></mnt-button-icon>

            <div class={`${COMPONENT_PREFIX}-title`}>{this.getMonthName()}</div>

            <mnt-button-icon
              variant="plain"
              color="neutral"
              icon="caret-right"
              size="tiny"
              onClick={() => this.nextMonth()}
              disabled={this.disabled}
              aria-label="Previous month"
            ></mnt-button-icon>
          </div>

          {/* Weekday headers */}
          <div class={`${COMPONENT_PREFIX}-weekdays`}>
            {weekDays.map((day) => (
              <div class={`${COMPONENT_PREFIX}-weekday`}>{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div class={`${COMPONENT_PREFIX}-days`}>
            {days.map((date) => {
              const isRangeStart = this.mode === 'range' && this.isSameDay(date, this.internalSelectedRange.start);
              const isRangeEnd = this.mode === 'range' && this.isSameDay(date, this.internalSelectedRange.end);
              const isSelected = this.mode === 'single' ? this.isSameDay(date, this.internalSelectedDate) : isRangeStart || isRangeEnd;

              const isInRange = this.isInRange(date);
              const isToday = this.isSameDay(date, this.today);
              const isSelectable = this.isDateSelectable(date);
              const isOtherMonth = !isCurrentMonth(date);

              return (
                <button
                  type="button"
                  class={{
                    [`${COMPONENT_PREFIX}-day`]: true,
                    [`${COMPONENT_PREFIX}-day--selected`]: isSelected,
                    [`${COMPONENT_PREFIX}-day--range-start`]: isRangeStart,
                    [`${COMPONENT_PREFIX}-day--range-end`]: isRangeEnd,
                    [`${COMPONENT_PREFIX}-day--in-range`]: isInRange,
                    [`${COMPONENT_PREFIX}-day--today`]: isToday,
                    [`${COMPONENT_PREFIX}-day--disabled`]: !isSelectable,
                    [`${COMPONENT_PREFIX}-day--other-month`]: isOtherMonth,
                  }}
                  onClick={() => this.handleDateClick(date)}
                  onMouseEnter={() => (this.hoverDate = date)}
                  onMouseLeave={() => (this.hoverDate = null)}
                  disabled={!isSelectable || this.disabled}
                  aria-label={this.formatDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer with Cancel button */}
          {/* <div class={`${COMPONENT_PREFIX}-footer`}>
            <button
              type="button"
              class={`${COMPONENT_PREFIX}-cancel-button`}
              onClick={this.handleCancel}
            >
              Cancelar
            </button>
          </div> */}
        </div>
      </Host>
    );
  }
}
