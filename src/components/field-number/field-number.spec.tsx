import { newSpecPage } from '@stencil/core/testing';
import { FieldNumber } from './field-number';

describe('<mnt-field-number>', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
    });

    const fieldNumber = page.root;
    expect(fieldNumber).not.toBeNull();
    // Verificar se o componente contém a classe base
    expect(fieldNumber.outerHTML).toContain('mnt-field-number');

    const input = page.root.querySelector('input[type="number"]');
    expect(input).not.toBeNull();
    expect(input.getAttribute('id')).toBe('test-field');
    expect(input.getAttribute('value')).toBe('0');
    expect(input.getAttribute('step')).toBe('0.1');
  });

  it('applies custom value correctly', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number input-name="test-field" value="5"></mnt-field-number>`,
    });

    const input = page.root.querySelector('input[type="number"]');
    expect(input.getAttribute('value')).toBe('5');
  });

  it('applies custom step correctly', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number input-name="test-field" step="1"></mnt-field-number>`,
    });

    const input = page.root.querySelector('input[type="number"]');
    expect(input.getAttribute('step')).toBe('1');
  });

  it('applies min and max constraints correctly', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number input-name="test-field" min="0" max="100"></mnt-field-number>`,
    });

    const input = page.root.querySelector('input[type="number"]');
    expect(input.getAttribute('min')).toBe('0');
    expect(input.getAttribute('max')).toBe('100');
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number label="Test Label" input-name="test-field"></mnt-field-number>`,
    });

    const label = page.root.querySelector('label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Test Label');

    // Verificar se o label está associado ao input
    const input = page.root.querySelector('input[type="number"]');
    expect(input).not.toBeNull();
    expect(input.getAttribute('id')).toBe('test-field');
  });

  it('renders required asterisk when required is true', async () => {
    const page = await newSpecPage({
      components: [FieldNumber],
      html: `<mnt-field-number input-name="test-field" label="Test Label" required="true"></mnt-field-number>`,
    });

    const label = page.root.querySelector('.mnt-field-number-label');
    const asterisk = label.querySelector('span.text-color-primary');
    expect(asterisk).not.toBeNull();
    expect(asterisk.textContent).toBe('*');

    const input = page.root.querySelector('input[type="number"]');
    expect(input.hasAttribute('required')).toBeTruthy();
  });

  it('renders different variants correctly', async () => {
    const variants = ['default', 'plain'] as const;

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number variant="${variant}" input-name="test-field"></mnt-field-number>`,
      });

      const fieldNumber = page.root;
      // Verificar se o HTML contém a classe do variant
      expect(fieldNumber.outerHTML).toContain(`mnt-field-number-${variant}`);

      // if (variant === 'simple') {
      //   // Simple variant should render input without action buttons
      //   const actions = page.root.querySelector('.mnt-field-number-actions');
      //   expect(actions).toBeNull();
      // }
      if (variant === 'plain') {
        // Plain variant should have action buttons (as per current implementation)
        const actions = page.root.querySelector('.mnt-field-number-actions');
        expect(actions).not.toBeNull();
      } else {
        // Default variant should have action buttons
        const actions = page.root.querySelector('.mnt-field-number-actions');
        expect(actions).not.toBeNull();
      }
    }
  });

  describe('Action Buttons (Add/Remove)', () => {
    it('renders increment and decrement buttons for default variant', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="default"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      expect(actionButtons).not.toBeNull();

      const buttons = actionButtons.querySelectorAll('mnt-button-icon');
      expect(buttons.length).toBe(2);

      // First button should be minus (decrement)
      const decrementButton = buttons[0];
      expect(decrementButton.getAttribute('icon')).toBe('minus');
      expect(decrementButton.getAttribute('variant')).toBe('regular');
      expect(decrementButton.getAttribute('color')).toBe('neutral');
      expect(decrementButton.getAttribute('size')).toBe('small');

      // Second button should be plus (increment)
      const incrementButton = buttons[1];
      expect(incrementButton.getAttribute('icon')).toBe('plus');
      expect(incrementButton.getAttribute('variant')).toBe('regular');
      expect(incrementButton.getAttribute('color')).toBe('neutral');
      expect(incrementButton.getAttribute('size')).toBe('small');
    });

    it('renders increment and decrement buttons for plain variant', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="plain"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      expect(actionButtons).not.toBeNull();

      const buttons = actionButtons.querySelectorAll('mnt-button-icon');
      expect(buttons.length).toBe(2);

      // For plain variant, buttons should have 'plain' variant
      const decrementButton = buttons[0];
      expect(decrementButton.getAttribute('variant')).toBe('plain');

      const incrementButton = buttons[1];
      expect(incrementButton.getAttribute('variant')).toBe('plain');
    });

    it('increments value when plus button is clicked', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="1"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // Initial value should be 5
      expect(component.value).toBe('5');

      // Call increment method
      component.incrementValue();
      await page.waitForChanges();

      // Value should be incremented by step (1)
      expect(component.value).toBe(6);
    });

    it('decrements value when minus button is clicked', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="1"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // Initial value should be 5
      expect(component.value).toBe('5');

      // Call decrement method
      component.decrementValue();
      await page.waitForChanges();

      // Value should be decremented by step (1)
      expect(component.value).toBe(4);
    });

    it('respects step value for increment/decrement operations', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.5"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // Test increment with step 0.5
      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(0.5);

      // Test decrement with step 0.5
      component.decrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(0);
    });

    it('applies toFixed formatting when incrementing/decrementing', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.333" to-fixed="2"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // Test increment with toFixed formatting
      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(0.33); // Should be rounded to 2 decimal places

      component.incrementValue();
      await page.waitForChanges();
      // Use tolerance for floating-point precision
      const expectedValue = 0.66;
      const actualValue = parseFloat(component.value);
      expect(Math.abs(actualValue - expectedValue)).toBeLessThanOrEqual(0.01);
    });

    it('disables decrement button when value reaches minimum', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" min="0" step="1"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const decrementButton = actionButtons.querySelector('mnt-button-icon[icon="minus"]');

      // Button should be disabled when value equals min
      expect(decrementButton.hasAttribute('disabled')).toBeTruthy();
    });

    it('disables increment button when value reaches maximum', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="10" max="10" step="1"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const incrementButton = actionButtons.querySelector('mnt-button-icon[icon="plus"]');

      // Button should be disabled when value equals max
      expect(incrementButton.hasAttribute('disabled')).toBeTruthy();
    });

    it('enables buttons when value is within min/max range', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" min="0" max="10" step="1"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const decrementButton = actionButtons.querySelector('mnt-button-icon[icon="minus"]');
      const incrementButton = actionButtons.querySelector('mnt-button-icon[icon="plus"]');

      // Both buttons should be enabled when value is within range
      expect(decrementButton.hasAttribute('disabled')).toBeFalsy();
      expect(incrementButton.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('Events', () => {
    it('emits valueChange event when input value changes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      let emittedValue: string;

      page.root.addEventListener('valueChange', (event: CustomEvent) => {
        emittedValue = event.detail;
      });

      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      input.value = '10';
      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();
      expect(emittedValue).toBe('10');
    });

    it('emits rawValueChange event when input value changes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      let emittedRawValue: string;

      page.root.addEventListener('rawValueChange', (event: CustomEvent) => {
        emittedRawValue = event.detail;
      });

      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      input.value = '10.5';
      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();
      expect(emittedRawValue).toBe('10.5');
    });
  });

  describe('Public Methods', () => {
    it('provides access to input element through getInput method', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const inputElement = component.getInput();

      expect(inputElement).not.toBeNull();
      expect(inputElement.tagName).toBe('INPUT');
      expect(inputElement.type).toBe('number');
      expect(inputElement.id).toBe('test-field');
    });
  });

  describe('Edge Cases', () => {
    it('handles string values correctly', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="10.5"></mnt-field-number>`,
      });

      const input = page.root.querySelector('input[type="number"]');
      expect(input.getAttribute('value')).toBe('10.5');
    });

    it('handles numeric values correctly', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      component.value = 42;
      await page.waitForChanges();

      const input = page.root.querySelector('input[type="number"]');
      expect(input.getAttribute('value')).toBe('42');
    });

    it('handles undefined toFixed gracefully', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.333"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // When toFixed is undefined, value should not be formatted
      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(0.333);
    });

    it('handles zero step value', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="0"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      // With step 0, value should remain unchanged
      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(5);

      component.decrementValue();
      await page.waitForChanges();
      expect(component.value).toBe(5);
    });
  });

  describe('CSS Classes and Structure', () => {
    it('applies correct container classes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="default"></mnt-field-number>`,
      });

      const container = page.root;
      // Verificar se o HTML contém as classes corretas
      expect(container.outerHTML).toContain('mnt-field-number');
      expect(container.outerHTML).toContain('mnt-field-number-default');

      // Verificar se o input existe
      const input = page.root.querySelector('input[type="number"]');
      expect(input).not.toBeNull();
    });

    it('renders correct structure for default variant', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="default" label="Test"></mnt-field-number>`,
      });

      // Should have label
      const label = page.root.querySelector('.mnt-field-number-label');
      expect(label).not.toBeNull();

      // Should have input container
      const inputContainer = page.root.querySelector('.mnt-field-number-input-container');
      expect(inputContainer).not.toBeNull();

      // Should have input inside container
      const input = inputContainer.querySelector('input[type="number"]');
      expect(input).not.toBeNull();

      // Should have action buttons inside container
      const actions = inputContainer.querySelector('.mnt-field-number-actions');
      expect(actions).not.toBeNull();
    });
  });
});
