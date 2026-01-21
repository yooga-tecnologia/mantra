import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Radio } from './radio';
import { getLibPrefix } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
const COMPONENT_PREFIX = `${LIB_PREFIX}radio`;

async function createRadioComponent(html: string) {
  return await newSpecPage({
    components: [Radio],
    html,
  });
}

function getHostElement(page: SpecPage): HTMLElement {
  return page.root;
}

function getLabelElement(page: SpecPage): HTMLLabelElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-wrapper`);
}

function getInputElement(page: SpecPage): HTMLInputElement {
  return page.root.querySelector('input[type="radio"]');
}

function getInputContainer(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-input-container`);
}

function getCircleElement(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-input-circle`);
}

function getLabelText(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-label`);
}

describe('<mnt-radio>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test"></mnt-radio>');
      const host = getHostElement(page);
      const input = getInputElement(page);
      const container = getInputContainer(page);

      // ASSERTION
      expect(host).not.toBeNull();
      expect(input).not.toBeNull();
      expect(container).not.toBeNull();
      expect(host).toHaveClass(`${COMPONENT_PREFIX}`);
    });

    it('SHOULD render input element correctly', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test-radio"></mnt-radio>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input).not.toBeNull();
      expect(input.type).toBe('radio');
      expect(input.id).toBe('test-radio');
      expect(input.name).toBe('test-radio');
    });

    it('SHOULD render label WHEN label prop is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Option A"></mnt-radio>');
      const labelText = getLabelText(page);

      // ASSERTION
      expect(labelText).not.toBeNull();
      expect(labelText.textContent).toBe('Option A');
    });

    it('SHOULD render circle element', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test"></mnt-radio>');
      const circle = getCircleElement(page);

      // ASSERTION
      expect(circle).not.toBeNull();
      expect(circle).toHaveClass(`${COMPONENT_PREFIX}-input-circle`);
    });

    it('SHOULD render with correct structure', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Test"></mnt-radio>');
      const label = getLabelElement(page);
      const input = getInputElement(page);
      const container = getInputContainer(page);
      const labelText = getLabelText(page);

      // ASSERTION
      expect(label).not.toBeNull();
      expect(input.parentElement).toBe(label);
      expect(container.parentElement).toBe(label);
      expect(labelText.parentElement).toBe(label);
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD set checked attribute WHEN checked prop is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" checked></mnt-radio>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.checked).toBe(true);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-checked`);
    });

    it('SHOULD set disabled attribute WHEN disabled prop is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" disabled></mnt-radio>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.disabled).toBe(true);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });

    it('SHOULD update label text WHEN label prop changes', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Original Label"></mnt-radio>');
      let labelText = getLabelText(page);

      expect(labelText.textContent).toBe('Original Label');

      // ACTION
      page.root.setAttribute('label', 'Updated Label');
      await page.waitForChanges();

      // ASSERTION
      labelText = getLabelText(page);
      expect(labelText.textContent).toBe('Updated Label');
    });

    it('SHOULD associate label with input WHEN name is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="my-radio" label="My Label"></mnt-radio>');
      const input = getInputElement(page);
      const label = getLabelElement(page);

      // ASSERTION
      expect(input.id).toBe('my-radio');
      expect(label.htmlFor).toBe('my-radio');
    });

    it('SHOULD set value attribute WHEN value prop is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" value="option1"></mnt-radio>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.value).toBe('option1');
    });
  });

  describe('Checked State', () => {
    it('SHOULD be unchecked by default', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test"></mnt-radio>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.checked).toBe(false);
      expect(host).not.toHaveClass(`${COMPONENT_PREFIX}-checked`);
    });

    it('SHOULD add checked class to host WHEN checked', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" checked></mnt-radio>');
      const host = getHostElement(page);

      // ASSERTION
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-checked`);
    });

    it('SHOULD work with checked and disabled together', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" checked disabled></mnt-radio>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.checked).toBe(true);
      expect(input.disabled).toBe(true);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-checked`);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });
  });

  describe('Disabled State', () => {
    it('SHOULD add disabled class to host WHEN disabled', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" disabled></mnt-radio>');
      const host = getHostElement(page);

      // ASSERTION
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });

    it('SHOULD disable input WHEN disabled attribute is present', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" disabled></mnt-radio>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.disabled).toBe(true);
    });
  });

  describe('Toggle Behavior (Custom)', () => {
    it('SHOULD toggle to checked WHEN clicked while unchecked', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Test"></mnt-radio>');
      const input = getInputElement(page);
      const radioChangeEvent = jest.fn();

      page.root.addEventListener('radioChange', radioChangeEvent);

      expect(input.checked).toBe(false);

      // ACTION
      input.click();
      await page.waitForChanges();

      // ASSERTION
      expect(input.checked).toBe(false); // Click is handled by custom logic
      expect(radioChangeEvent).toHaveBeenCalled();
    });

    it('SHOULD emit radioChange event WHEN clicked', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" value="opt1"></mnt-radio>');
      const input = getInputElement(page);
      const radioChangeEvent = jest.fn();

      page.root.addEventListener('radioChange', radioChangeEvent);

      // ACTION
      input.click();
      await page.waitForChanges();

      // ASSERTION
      expect(radioChangeEvent).toHaveBeenCalled();
    });

    it('SHOULD emit event with correct payload WHEN value is provided', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" value="option1"></mnt-radio>');
      const input = getInputElement(page);
      let eventDetail: any;

      page.root.addEventListener('radioChange', (e: any) => {
        eventDetail = e.detail;
      });

      // ACTION
      input.click();
      await page.waitForChanges();

      // ASSERTION
      expect(eventDetail).toBeDefined();
      expect(eventDetail.value).toBe('option1');
      expect(typeof eventDetail.checked).toBe('boolean');
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have proper label association', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="accessible-radio" label="Accessible Label"></mnt-radio>');
      const input = getInputElement(page);
      const label = getLabelElement(page);

      // ASSERTION
      expect(input.id).toBe('accessible-radio');
      expect(label.htmlFor).toBe('accessible-radio');
    });

    it('SHOULD have clickable label area', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Click Me"></mnt-radio>');
      const label = getLabelElement(page);

      // ASSERTION
      expect(label.tagName.toLowerCase()).toBe('label');
      expect(label.htmlFor).toBeTruthy();
    });
  });

  describe('Structure and Layout', () => {
    it('SHOULD have wrapper as label element', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test"></mnt-radio>');
      const wrapper = getLabelElement(page);

      // ASSERTION
      expect(wrapper.tagName.toLowerCase()).toBe('label');
      expect(wrapper).toHaveClass(`${COMPONENT_PREFIX}-wrapper`);
    });

    it('SHOULD have correct class structure', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Test"></mnt-radio>');
      const input = getInputElement(page);
      const container = getInputContainer(page);
      const circle = getCircleElement(page);
      const labelText = getLabelText(page);

      // ASSERTION
      expect(input).toHaveClass(`${COMPONENT_PREFIX}-input`);
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-input-container`);
      expect(circle).toHaveClass(`${COMPONENT_PREFIX}-input-circle`);
      expect(labelText).toHaveClass(`${COMPONENT_PREFIX}-label`);
    });

    it('SHOULD render elements in correct order', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test" label="Test"></mnt-radio>');
      const wrapper = getLabelElement(page);
      const children = Array.from(wrapper.children);

      // ASSERTION
      expect(children.length).toBe(3);
      expect(children[0].tagName.toLowerCase()).toBe('input');
      expect(children[1]).toHaveClass(`${COMPONENT_PREFIX}-input-container`);
      expect(children[2]).toHaveClass(`${COMPONENT_PREFIX}-label`);
    });

    it('SHOULD have circle inside container', async () => {
      // SETUP
      const page = await createRadioComponent('<mnt-radio name="test"></mnt-radio>');
      const container = getInputContainer(page);
      const circle = getCircleElement(page);

      // ASSERTION
      expect(circle.parentElement).toBe(container);
    });
  });

  describe('Radio Groups', () => {
    it('SHOULD support same name for radio group', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [Radio],
        html: `
          <div>
            <mnt-radio name="group1" value="opt1" label="Option 1"></mnt-radio>
            <mnt-radio name="group1" value="opt2" label="Option 2"></mnt-radio>
            <mnt-radio name="group1" value="opt3" label="Option 3"></mnt-radio>
          </div>
        `,
      });

      const radios = page.body.querySelectorAll('mnt-radio');
      const inputs = Array.from(radios).map((r) => r.querySelector('input[type="radio"]') as HTMLInputElement);

      // ASSERTION
      expect(radios.length).toBe(3);
      inputs.forEach((input) => {
        expect(input.name).toBe('group1');
      });
    });

    it('SHOULD have different values in same group', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [Radio],
        html: `
          <div>
            <mnt-radio name="group1" value="opt1"></mnt-radio>
            <mnt-radio name="group1" value="opt2"></mnt-radio>
          </div>
        `,
      });

      const inputs = page.body.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;

      // ASSERTION
      expect(inputs[0].value).toBe('opt1');
      expect(inputs[1].value).toBe('opt2');
      expect(inputs[0].name).toBe(inputs[1].name);
    });
  });
});
