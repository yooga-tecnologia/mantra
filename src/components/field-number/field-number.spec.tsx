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
      expect(fieldNumber.outerHTML).toContain(`mnt-field-number-${variant}`);
      if (variant === 'plain') {
        const actions = page.root.querySelector('.mnt-field-number-actions');
        expect(actions).not.toBeNull();
      } else {
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

      expect(component.value).toBe('5');

      component.incrementValue();
      await page.waitForChanges();

      expect(component.value).toBe('6');
      const inputAfter = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      expect(inputAfter.value).toBe('6');
    });

    it('decrements value when minus button is clicked', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="1"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;

      expect(component.value).toBe('5');
      expect(input.value).toBe('5');

      component.decrementValue();
      await page.waitForChanges();

      expect(component.value).toBe('4');
      expect(input.value).toBe('4');
    });

    it('respects step value for increment/decrement operations', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.5"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;

      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('0.5');
      expect(input.value).toBe('0.5');

      component.decrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('0');
      expect(input.value).toBe('0');
    });

    it('handles decimal values correctly in increment/decrement operations', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.333"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;

      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('0.333');
      expect(input.value).toBe('0.333');

      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('0.666');
      expect(input.value).toBe('0.666');
    });

    it('disables decrement button when value reaches minimum', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" min="0" step="1"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const decrementButton = actionButtons.querySelector('mnt-button-icon[icon="minus"]');

      expect(decrementButton.hasAttribute('disabled')).toBeTruthy();
    });

    it('disables increment button when value reaches maximum', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="10" max="10" step="1"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const incrementButton = actionButtons.querySelector('mnt-button-icon[icon="plus"]');

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

      expect(decrementButton.hasAttribute('disabled')).toBeFalsy();
      expect(incrementButton.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('Events', () => {
    it('emits change event when input value changes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      let emittedValue: string;

      page.root.addEventListener('change', (event: CustomEvent) => {
        emittedValue = event.detail.value;
      });

      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      input.value = '10';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      await page.waitForChanges();
      expect(emittedValue).toBe('10');
    });

    it('emits change event when increment button is clicked', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="1"></mnt-field-number>`,
      });

      let emittedValue: string;

      page.root.addEventListener('change', (event: CustomEvent) => {
        emittedValue = event.detail.value;
      });

      const component = page.rootInstance;
      component.incrementValue();
      await page.waitForChanges();

      expect(emittedValue).toBe('6');
    });

    it('emits change event when decrement button is clicked', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="1"></mnt-field-number>`,
      });

      let emittedValue: string;

      page.root.addEventListener('change', (event: CustomEvent) => {
        emittedValue = event.detail.value;
      });

      const component = page.rootInstance;
      component.decrementValue();
      await page.waitForChanges();

      expect(emittedValue).toBe('4');
    });
  });

  describe('Size Property', () => {
    it('applies size classes correctly', async () => {
      const sizes = ['small', 'medium', 'large'] as const;

      for (const size of sizes) {
        const page = await newSpecPage({
          components: [FieldNumber],
          html: `<mnt-field-number input-name="test-field" variant="default" size="${size}"></mnt-field-number>`,
        });

        const container = page.root.querySelector('.mnt-field-number-input-container');
        expect(container).not.toBeNull();
        expect(container.classList.contains(`mnt-field-number-size-${size}`)).toBeTruthy();
      }
    });

    it('applies size attribute to input', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" size="large"></mnt-field-number>`,
      });

      const input = page.root.querySelector('input[type="number"]');
      expect(input.getAttribute('data-size')).toBe('large');
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" disabled></mnt-field-number>`,
      });

      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      expect(input.hasAttribute('disabled')).toBeTruthy();
      expect(input.disabled).toBeTruthy();
    });

    it('disables increment and decrement buttons when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" disabled value="5" min="0" max="10"></mnt-field-number>`,
      });

      const actionButtons = page.root.querySelector('.mnt-field-number-actions');
      const buttons = actionButtons.querySelectorAll('mnt-button-icon');

      buttons.forEach((button) => {
        expect(button.hasAttribute('disabled')).toBeTruthy();
      });
    });

    it('prevents value change when disabled', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" disabled value="5" step="1"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const initialValue = component.value;

      component.incrementValue();
      await page.waitForChanges();

      expect(component.value).toBe(initialValue);
    });
  });

  describe('Simple Variant', () => {
    it('renders simple variant correctly', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="simple"></mnt-field-number>`,
      });

      const fieldNumber = page.root;
      expect(fieldNumber.outerHTML).toContain('mnt-field-number-variant-simple');

      const container = page.root.querySelector('.mnt-field-number-input-container');
      expect(container).not.toBeNull();
    });
  });

  describe('Form Association', () => {
    it('sets form value on componentWillLoad', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<form id="test-form"><mnt-field-number input-name="test-field" value="42"></mnt-field-number></form>`,
      });

      const component = page.rootInstance;
      expect(component.internals).toBeDefined();
    });

    it('updates form value when value changes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="10"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;

      input.value = '20';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await page.waitForChanges();

      expect(component.value).toBe('20');
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

    it('handles numeric values correctly when set programmatically', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field"></mnt-field-number>`,
      });

      const component = page.rootInstance;
      component.value = '42';
      await page.waitForChanges();

      const input = page.root.querySelector('input[type="number"]') as HTMLInputElement;
      expect(input.value).toBe('42');
      expect(component.value).toBe('42');
    });

    it('handles decimal step values correctly', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="0" step="0.333"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('0.333');
    });

    it('handles zero step value', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" value="5" step="0"></mnt-field-number>`,
      });

      const component = page.rootInstance;

      component.incrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('5');

      component.decrementValue();
      await page.waitForChanges();
      expect(component.value).toBe('5');
    });
  });

  describe('CSS Classes and Structure', () => {
    it('applies correct container classes', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="default"></mnt-field-number>`,
      });

      const container = page.root;
      expect(container.outerHTML).toContain('mnt-field-number');
      expect(container.outerHTML).toContain('mnt-field-number-default');

      const input = page.root.querySelector('input[type="number"]');
      expect(input).not.toBeNull();
    });

    it('renders correct structure for default variant', async () => {
      const page = await newSpecPage({
        components: [FieldNumber],
        html: `<mnt-field-number input-name="test-field" variant="default" label="Test"></mnt-field-number>`,
      });

      const label = page.root.querySelector('.mnt-field-number-label');
      expect(label).not.toBeNull();

      const inputContainer = page.root.querySelector('.mnt-field-number-input-container');
      expect(inputContainer).not.toBeNull();

      const input = inputContainer.querySelector('input[type="number"]');
      expect(input).not.toBeNull();

      const actions = inputContainer.querySelector('.mnt-field-number-actions');
      expect(actions).not.toBeNull();
    });
  });
});
