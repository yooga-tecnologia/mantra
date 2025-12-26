import { newSpecPage } from '@stencil/core/testing';
import { DatePicker } from './date-picker';

describe('<mnt-date-picker>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('.mnt-date-picker')).toBeTruthy();
    });

    it('SHOULD render in single mode by default', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      expect(component.mode).toBe('single');
    });

    it('SHOULD render in range mode WHEN mode is range', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="range"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      expect(component.mode).toBe('range');
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply locale correctly', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker locale="en-US"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      expect(component.locale).toBe('en-US');
    });

    it('SHOULD be disabled WHEN disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker disabled></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      expect(component.disabled).toBe(true);
    });

    it('SHOULD be required WHEN required prop is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker required></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      expect(component.required).toBe(true);
    });
  });

  describe('Behavior - Single Mode', () => {
    it('SHOULD emit datePickerSelected event WHEN date is clicked in single mode', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="single"></mnt-date-picker>',
      });

      const dateSelectedHandler = jest.fn();
      page.root.addEventListener('datePickerSelected', dateSelectedHandler);

      const component = page.rootInstance as DatePicker;
      const today = new Date();

      // Simulate date click
      await component['handleDateClick'](today);
      await page.waitForChanges();

      expect(dateSelectedHandler).toHaveBeenCalledTimes(1);
      expect(dateSelectedHandler.mock.calls[0][0].detail.mode).toBe('single');
      expect(dateSelectedHandler.mock.calls[0][0].detail.date).toBeDefined();
    });

    it('SHOULD update selected date WHEN date is clicked', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="single"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const today = new Date();

      await component['handleDateClick'](today);
      await page.waitForChanges();

      const selectedDate = component.getSelectedDate() as Date;
      expect(selectedDate).toBeDefined();
      expect(selectedDate.getDate()).toBe(today.getDate());
    });
  });

  describe('Behavior - Range Mode', () => {
    it('SHOULD select start date on first click in range mode', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="range"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const startDate = new Date(2024, 0, 15);

      await component['handleDateClick'](startDate);
      await page.waitForChanges();

      const range = component.getSelectedDate() as any;
      expect(range.start).toBeDefined();
      expect(range.end).toBeNull();
    });

    it('SHOULD complete range on second click', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="range"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const startDate = new Date(2024, 0, 15);
      const endDate = new Date(2024, 0, 20);

      await component['handleDateClick'](startDate);
      await page.waitForChanges();

      await component['handleDateClick'](endDate);
      await page.waitForChanges();

      const range = component.getSelectedDate() as any;
      expect(range.start).toBeDefined();
      expect(range.end).toBeDefined();
    });

    it('SHOULD emit onDateSelected with range WHEN range is completed', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="range"></mnt-date-picker>',
      });

      const dateSelectedHandler = jest.fn();
      page.root.addEventListener('datePickerSelected', dateSelectedHandler);

      const component = page.rootInstance as DatePicker;
      const startDate = new Date(2024, 0, 15);
      const endDate = new Date(2024, 0, 20);

      await component['handleDateClick'](startDate);
      await component['handleDateClick'](endDate);
      await page.waitForChanges();

      expect(dateSelectedHandler).toHaveBeenCalledTimes(2);
      const lastCall = dateSelectedHandler.mock.calls[1][0];
      expect(lastCall.detail.mode).toBe('range');
      expect(lastCall.detail.range).toBeDefined();
      expect(lastCall.detail.range.start).toBeDefined();
      expect(lastCall.detail.range.end).toBeDefined();
    });
  });

  describe('Public Methods', () => {
    it('SHOULD return selected date WHEN getSelectedDate is called', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="single"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const today = new Date();

      await component['handleDateClick'](today);
      await page.waitForChanges();

      const selectedDate = component.getSelectedDate();
      expect(selectedDate).toBeDefined();
    });

    it('SHOULD set selected date WHEN setSelectedDate is called', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="single"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const testDate = new Date(2024, 5, 15);

      component.setSelectedDate(testDate);
      await page.waitForChanges();

      expect(component.selectedDate).toBeDefined();
    });

    it('SHOULD clear selection WHEN clearSelection is called', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker mode="single"></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const today = new Date();

      await component['handleDateClick'](today);
      await page.waitForChanges();

      component.clearSelection();
      await page.waitForChanges();

      const selectedDate = component.getSelectedDate();
      expect(selectedDate).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('SHOULD navigate to previous month', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const initialMonth = component['currentMonth'].month;

      await component['previousMonth']();
      await page.waitForChanges();

      const newMonth = component['currentMonth'].month;
      expect(newMonth).not.toBe(initialMonth);
    });

    it('SHOULD navigate to next month', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const initialMonth = component['currentMonth'].month;

      await component['nextMonth']();
      await page.waitForChanges();

      const newMonth = component['currentMonth'].month;
      expect(newMonth).not.toBe(initialMonth);
    });

    it('SHOULD emit datePickerMonthChange WHEN month changes', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      const monthChangeHandler = jest.fn();
      page.root.addEventListener('datePickerMonthChange', monthChangeHandler);

      const component = page.rootInstance as DatePicker;
      await component['nextMonth']();
      await page.waitForChanges();

      expect(monthChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Events', () => {
    it('SHOULD emit datePickerCancel event WHEN cancel button is clicked', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker></mnt-date-picker>',
      });

      const cancelHandler = jest.fn();
      page.root.addEventListener('datePickerCancel', cancelHandler);

      const component = page.rootInstance as DatePicker;
      await component['handleCancel']();
      await page.waitForChanges();

      expect(cancelHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Date Restrictions', () => {
    it('SHOULD not allow selection of dates before minDate', async () => {
      const minDate = new Date(2024, 5, 15);
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<mnt-date-picker min-date="${minDate.toISOString()}"></mnt-date-picker>`,
      });

      const component = page.rootInstance as DatePicker;
      const beforeMinDate = new Date(2024, 5, 10);

      const isSelectable = component['isDateSelectable'](beforeMinDate);
      expect(isSelectable).toBe(false);
    });

    it('SHOULD not allow selection of dates after maxDate', async () => {
      const maxDate = new Date(2024, 5, 15);
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<mnt-date-picker max-date="${maxDate.toISOString()}"></mnt-date-picker>`,
      });

      const component = page.rootInstance as DatePicker;
      const afterMaxDate = new Date(2024, 5, 20);

      const isSelectable = component['isDateSelectable'](afterMaxDate);
      expect(isSelectable).toBe(false);
    });

    it('SHOULD not allow selection of past dates WHEN disablePastDates is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker disable-past-dates></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const isSelectable = component['isDateSelectable'](yesterday);
      expect(isSelectable).toBe(false);
    });

    it('SHOULD allow selection of today WHEN disablePastDates is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker disable-past-dates></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const today = new Date();

      const isSelectable = component['isDateSelectable'](today);
      expect(isSelectable).toBe(true);
    });

    it('SHOULD allow selection of future dates WHEN disablePastDates is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: '<mnt-date-picker disable-past-dates></mnt-date-picker>',
      });

      const component = page.rootInstance as DatePicker;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const isSelectable = component['isDateSelectable'](tomorrow);
      expect(isSelectable).toBe(true);
    });
  });
});
