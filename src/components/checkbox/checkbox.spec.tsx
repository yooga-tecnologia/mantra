import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Checkbox } from './checkbox';
import { getLibPrefix } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
const COMPONENT_PREFIX = `${LIB_PREFIX}checkbox`;

async function createCheckboxComponent(html: string) {
  return await newSpecPage({
    components: [Checkbox],
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
  return page.root.querySelector('input[type="checkbox"]');
}

function getInputContainer(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-input-container`);
}

function getIconElement(page: SpecPage): HTMLElement {
  return page.root.querySelector('mnt-icon');
}

function getLabelText(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-label`);
}

describe('<mnt-checkbox>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const host = getHostElement(page);
      const input = getInputElement(page);
      const container = getInputContainer(page);

      // ASSERTION
      expect(host).not.toBeNull();
      expect(input).not.toBeNull();
      expect(container).not.toBeNull();
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-check`);
    });

    it('SHOULD render input element correctly', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test-checkbox"></mnt-checkbox>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input).not.toBeNull();
      expect(input.type).toBe('checkbox');
      expect(input.id).toBe('test-checkbox');
      expect(input.name).toBeUndefined(); // O componente não define name no input
    });

    it('SHOULD render label WHEN label prop is provided', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Accept Terms"></mnt-checkbox>');
      const labelText = getLabelText(page);

      // ASSERTION
      expect(labelText).not.toBeNull();
      expect(labelText.textContent).toBe('Accept Terms');
    });

    it('SHOULD render icon element', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const icon = getIconElement(page);

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
    });

    it('SHOULD render with correct structure', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Test"></mnt-checkbox>');
      const label = getLabelElement(page);
      const input = getInputElement(page);
      const container = getInputContainer(page);
      const labelWrapper = page.root.querySelector(`.${COMPONENT_PREFIX}-label-wrapper`);

      // ASSERTION
      expect(label).not.toBeNull();
      expect(input.parentElement).toBe(label);
      expect(container.parentElement).toBe(label);
      expect(labelWrapper.parentElement).toBe(label);
    });
  });

  describe('Variants', () => {
    it('SHOULD display check icon WHEN variant is check', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" variant="check"></mnt-checkbox>');
      const icon = getIconElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(icon.getAttribute('icon')).toBe('check');
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-check`);
    });

    it('SHOULD display minus icon WHEN variant is indeterminate', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" variant="indeterminate"></mnt-checkbox>');
      const icon = getIconElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(icon.getAttribute('icon')).toBe('minus');
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-indeterminate`);
    });

    it('SHOULD default to check variant WHEN no variant is provided', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const icon = getIconElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(icon.getAttribute('icon')).toBe('check');
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-check`);
    });

    it('SHOULD update icon WHEN variant changes', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" variant="check"></mnt-checkbox>');
      let icon = getIconElement(page);

      expect(icon.getAttribute('icon')).toBe('check');

      // ACTION
      page.root.setAttribute('variant', 'indeterminate');
      await page.waitForChanges();

      // ASSERTION
      icon = getIconElement(page);
      expect(icon.getAttribute('icon')).toBe('minus');
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD set checked attribute WHEN checked prop is provided', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" checked></mnt-checkbox>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.checked).toBe(true);
    });

    it('SHOULD set disabled attribute WHEN disabled prop is provided', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" disabled></mnt-checkbox>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.disabled).toBe(true);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });

    it('SHOULD update label text WHEN label prop changes', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Original Label"></mnt-checkbox>');
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
      const page = await createCheckboxComponent('<mnt-checkbox name="my-checkbox" label="My Label"></mnt-checkbox>');
      const input = getInputElement(page);
      const label = getLabelElement(page);

      // ASSERTION
      expect(input.id).toBe('my-checkbox');
      expect(label.htmlFor).toBe('my-checkbox');
    });
  });

  describe('Disabled State', () => {
    it('SHOULD add disabled class to host WHEN disabled', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" disabled></mnt-checkbox>');
      const host = getHostElement(page);

      // ASSERTION
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });

    it('SHOULD disable input WHEN disabled attribute is present', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" disabled></mnt-checkbox>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.disabled).toBe(true);
    });

    it('SHOULD work with checked and disabled together', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" checked disabled></mnt-checkbox>');
      const input = getInputElement(page);
      const host = getHostElement(page);

      // ASSERTION
      expect(input.checked).toBe(true);
      expect(input.disabled).toBe(true);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
    });

    it('SHOULD work with indeterminate and disabled together', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" variant="indeterminate" disabled></mnt-checkbox>');
      const host = getHostElement(page);
      const icon = getIconElement(page);

      // ASSERTION
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-indeterminate`);
      expect(host).toHaveClass(`${COMPONENT_PREFIX}-disabled`);
      expect(icon.getAttribute('icon')).toBe('minus');
    });
  });

  describe('Icon Rendering', () => {
    it('SHOULD render icon with correct size', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const icon = getIconElement(page);

      // ASSERTION
      expect(icon.getAttribute('size')).toBe('small');
    });

    it('SHOULD render icon with currentColor', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const icon = getIconElement(page);

      // ASSERTION
      expect(icon.getAttribute('color')).toBe('currentColor');
    });

    it('SHOULD always render icon regardless of checked state', async () => {
      // SETUP - unchecked
      const page1 = await createCheckboxComponent('<mnt-checkbox name="test1"></mnt-checkbox>');
      const icon1 = getIconElement(page1);

      // SETUP - checked
      const page2 = await createCheckboxComponent('<mnt-checkbox name="test2" checked></mnt-checkbox>');
      const icon2 = getIconElement(page2);

      // ASSERTION
      expect(icon1).not.toBeNull();
      expect(icon2).not.toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have proper label association', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="accessible-checkbox" label="Accessible Label"></mnt-checkbox>');
      const input = getInputElement(page);
      const label = getLabelElement(page);

      // ASSERTION
      expect(input.id).toBe('accessible-checkbox');
      expect(label.htmlFor).toBe('accessible-checkbox');
    });

    it('SHOULD have clickable label area', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Click Me"></mnt-checkbox>');
      const label = getLabelElement(page);

      // ASSERTION
      expect(label.tagName.toLowerCase()).toBe('label');
      expect(label.htmlFor).toBeTruthy();
    });
  });

  describe('Structure and Layout', () => {
    it('SHOULD have wrapper as label element', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test"></mnt-checkbox>');
      const wrapper = getLabelElement(page);

      // ASSERTION
      expect(wrapper.tagName.toLowerCase()).toBe('label');
      expect(wrapper).toHaveClass(`${COMPONENT_PREFIX}-wrapper`);
    });

    it('SHOULD have correct class structure', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Test"></mnt-checkbox>');
      const input = getInputElement(page);
      const container = getInputContainer(page);
      const labelWrapper = page.root.querySelector(`.${COMPONENT_PREFIX}-label-wrapper`);
      const labelText = getLabelText(page);

      // ASSERTION
      expect(input).toHaveClass(`${COMPONENT_PREFIX}-input`);
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-input-container`);
      expect(labelWrapper).toHaveClass(`${COMPONENT_PREFIX}-label-wrapper`);
      expect(labelText).toHaveClass(`${COMPONENT_PREFIX}-label`);
    });

    it('SHOULD render elements in correct order', async () => {
      // SETUP
      const page = await createCheckboxComponent('<mnt-checkbox name="test" label="Test"></mnt-checkbox>');
      const wrapper = getLabelElement(page);
      const children = Array.from(wrapper.children);

      // ASSERTION
      expect(children.length).toBe(3);
      expect(children[0].tagName.toLowerCase()).toBe('input');
      expect(children[1]).toHaveClass(`${COMPONENT_PREFIX}-input-container`);
      expect(children[2]).toHaveClass(`${COMPONENT_PREFIX}-label-wrapper`);
    });
  });
});
