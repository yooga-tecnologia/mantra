import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { FieldDate } from './field-date';
import { DatePicker } from '../date-picker/date-picker';

async function createFieldDateComponent(html: string) {
  return await newSpecPage({
    components: [FieldDate, DatePicker],
    html,
  });
}

function getInputElement(page: SpecPage): HTMLInputElement {
  return page.root.querySelector('input');
}

function getLabelElement(page: SpecPage): HTMLLabelElement {
  return page.root.querySelector('label');
}

function getDatePickerElement(page: SpecPage): HTMLElement {
  return page.root.querySelector('mnt-date-picker');
}

function getDatePickerDropdown(page: SpecPage): HTMLElement {
  return page.root.querySelector('.mnt-field-date-picker-dropdown');
}

describe('mnt-field-date', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createFieldDateComponent(
        `<mnt-field-date
          input-name="exampleInput"
        ></mnt-field-date>`,
      );

      const baseElement = page.root;
      const inputElement = getInputElement(page);
      const datePickerElement = getDatePickerElement(page);

      // ASSERTION
      expect(inputElement.type).toBe('text');
      expect(inputElement.id).toBe('exampleInput');
      expect(inputElement.readOnly).toBe(true);
      expect(baseElement).toHaveClass('mnt-field-date-medium');
      expect(datePickerElement).toBeNull(); // Should not be visible initially
    });

    it('SHOULD render label element WHEN label-text is provided', async () => {
      // SETUP
      const page = await createFieldDateComponent(
        `<mnt-field-date
          input-name="exampleInput"
          label-text="Data de Nascimento"
        ></mnt-field-date>`,
      );

      const labelElement = getLabelElement(page);

      // ASSERTION
      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toBe('Data de Nascimento');
    });

    it('SHOULD render required indicator WHEN required prop is provided', async () => {
      // SETUP
      const page = await createFieldDateComponent(
        `<mnt-field-date
          input-name="exampleInput"
          label-text="Data"
          required="true"
        ></mnt-field-date>`,
      );

      const baseElement = page.root;
      const labelElement = getLabelElement(page);

      // ASSERTION
      expect(baseElement.innerHTML).toContain(`<span class="text-color-primary">*</span>`);
      expect(labelElement.textContent).toContain('Data');
    });

    it('SHOULD render all sizes correctly', async () => {
      const sizes = ['small', 'medium', 'large'];
      for (const size of sizes) {
        const page = await createFieldDateComponent(`<mnt-field-date input-name="exampleInput" size="${size}"></mnt-field-date>`);
        expect(page.root).toHaveClass(`mnt-field-date-${size}`);
      }
    });

    it('SHOULD render calendar icon', async () => {
      const page = await createFieldDateComponent(`<mnt-field-date input-name="exampleInput"></mnt-field-date>`);
      const iconElement = page.root.querySelector('mnt-icon.icon-right');
      expect(iconElement).not.toBeNull();
      expect(iconElement.getAttribute('icon')).toBe('calendar');
    });
  });

  describe('Date Picker Interaction', () => {
    it('SHOULD show date picker WHEN input is clicked', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="dateInput"></mnt-field-date>`);
      const inputElement = getInputElement(page);

      // ACTION
      inputElement.click();
      await page.waitForChanges();

      // ASSERTION
      const datePickerDropdown = getDatePickerDropdown(page);
      const datePickerElement = getDatePickerElement(page);
      expect(datePickerDropdown).not.toBeNull();
      expect(datePickerElement).not.toBeNull();
    });

    it('SHOULD toggle date picker WHEN input is clicked multiple times', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="dateInput"></mnt-field-date>`);
      const inputElement = getInputElement(page);

      // ACTION: First click - open
      inputElement.click();
      await page.waitForChanges();
      let datePickerElement = getDatePickerElement(page);
      expect(datePickerElement).not.toBeNull();

      // ACTION: Second click - close
      inputElement.click();
      await page.waitForChanges();
      datePickerElement = getDatePickerElement(page);
      expect(datePickerElement).toBeNull();

      // ACTION: Third click - open again
      inputElement.click();
      await page.waitForChanges();
      datePickerElement = getDatePickerElement(page);
      expect(datePickerElement).not.toBeNull();
    });

    it('SHOULD pass mode to date picker WHEN datePickerConfig is provided', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="dateInput"></mnt-field-date>`);
      const component = page.rootInstance as FieldDate;
      component.datePickerConfig = { mode: 'range' };
      const inputElement = getInputElement(page);

      // ACTION
      inputElement.click();
      await page.waitForChanges();

      // ASSERTION
      const datePickerElement = getDatePickerElement(page);
      expect(datePickerElement).not.toBeNull();
      expect(datePickerElement.getAttribute('mode')).toBe('range');
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD propagate placeholder to input', async () => {
      const page = await createFieldDateComponent(`
        <mnt-field-date
          input-name="test"
          placeholder="dd/mm/yyyy"
        ></mnt-field-date>
      `);
      const input = getInputElement(page);
      expect(input.placeholder).toBe('dd/mm/yyyy');
    });

    it('SHOULD propagate required to input', async () => {
      const page = await createFieldDateComponent(`
        <mnt-field-date
          input-name="test"
          required="true"
        ></mnt-field-date>
      `);
      const input = getInputElement(page);
      expect(input.required).toBe(true);
    });

    it('SHOULD display value in input', async () => {
      const page = await createFieldDateComponent(`
        <mnt-field-date
          input-name="test"
          value="25/12/2024"
        ></mnt-field-date>
      `);
      const input = getInputElement(page);
      expect(input.value).toBe('25/12/2024');
    });
  });

  describe('Events', () => {
    it('SHOULD emit valueChange event WHEN date is selected', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="eventTest"></mnt-field-date>`);
      const inputElement = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('valueChange', spy);

      // ACTION: Open picker
      inputElement.click();
      await page.waitForChanges();

      // Simulate date selection
      const datePickerElement = getDatePickerElement(page);
      const dateSelectedEvent = new CustomEvent('datePickerSelected', {
        detail: {
          formattedDate: '26/12/2024',
          date: new Date(2024, 11, 26),
        },
      });
      datePickerElement.dispatchEvent(dateSelectedEvent);
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe('26/12/2024');
    });

    it('SHOULD emit rawValueChange event WHEN date is selected', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="eventTest"></mnt-field-date>`);
      const inputElement = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('rawValueChange', spy);

      // ACTION: Open picker
      inputElement.click();
      await page.waitForChanges();

      // Simulate date selection
      const datePickerElement = getDatePickerElement(page);
      const dateSelectedEvent = new CustomEvent('datePickerSelected', {
        detail: {
          formattedDate: '26/12/2024',
          date: new Date(2024, 11, 26),
        },
      });
      datePickerElement.dispatchEvent(dateSelectedEvent);
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe('26/12/2024');
    });

    it('SHOULD close date picker WHEN date is selected', async () => {
      // SETUP
      const page = await createFieldDateComponent(`<mnt-field-date input-name="eventTest"></mnt-field-date>`);
      const inputElement = getInputElement(page);

      // ACTION: Open picker
      inputElement.click();
      await page.waitForChanges();
      expect(getDatePickerElement(page)).not.toBeNull();

      // Simulate date selection
      const datePickerElement = getDatePickerElement(page);
      const dateSelectedEvent = new CustomEvent('datePickerSelected', {
        detail: {
          formattedDate: '26/12/2024',
          date: new Date(2024, 11, 26),
        },
      });
      datePickerElement.dispatchEvent(dateSelectedEvent);
      await page.waitForChanges();

      // ASSERTION
      expect(getDatePickerElement(page)).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have proper input attributes for accessibility', async () => {
      const page = await createFieldDateComponent(`
        <mnt-field-date
          input-name="accessibleInput"
          label-text="Data"
        ></mnt-field-date>
      `);
      const input = getInputElement(page);
      const label = getLabelElement(page);

      expect(input.id).toBe('accessibleInput');
      expect(label.htmlFor).toBe('accessibleInput');
    });

    it('SHOULD be readonly to prevent manual input', async () => {
      const page = await createFieldDateComponent(`<mnt-field-date input-name="test"></mnt-field-date>`);
      const input = getInputElement(page);
      expect(input.readOnly).toBe(true);
    });
  });
});
