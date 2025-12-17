import { newSpecPage } from '@stencil/core/testing';
import { Switch } from './switch';
import { getLibPrefix } from 'src/utils/utils';

const COMPONENT_PREFIX = getLibPrefix() + 'switch';

async function createSwitchComponent(html: string) {
  return await newSpecPage({
    components: [Switch],
    html,
  });
}

describe('<mnt-switch>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has only required props', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="test-switch"></mnt-switch>');

      expect(page.root).toBeTruthy();
      const input = page.root.querySelector('input');
      expect(input).toBeTruthy();
      expect(input.id).toBe('test-switch');
      expect(input.type).toBe('checkbox'); // default type
    });

    it('SHOULD render with label and description WHEN those props are provided', async () => {
      const page = await createSwitchComponent('<mnt-switch label="Accept terms" description="You must accept to continue"></mnt-switch>');

      const labelWrapper = page.root.querySelector(`.${COMPONENT_PREFIX}-label-wrapper`);
      expect(labelWrapper).toBeTruthy();

      const label = page.root.querySelector(`.${COMPONENT_PREFIX}-label`);
      expect(label.textContent).toBe('Accept terms');

      const description = page.root.querySelector(`.${COMPONENT_PREFIX}-description`);
      expect(description.textContent).toBe('You must accept to continue');
    });

    it('SHOULD NOT render label wrapper WHEN no label or description provided', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');

      const labelWrapper = page.root.querySelector(`.${COMPONENT_PREFIX}-label-wrapper`);
      expect(labelWrapper).toBeFalsy();
    });

    it('SHOULD auto-generate id WHEN inputId is not provided', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.id).toMatch(/^mnt-switch-\d+$/);
    });

    it('SHOULD use component id WHEN inputId prop is not provided', async () => {
      const page = await createSwitchComponent('<mnt-switch id="component-id"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.id).toBe('component-id');
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply inputId attribute correctly', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="my-custom-id"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.id).toBe('my-custom-id');
    });

    it('SHOULD apply name attribute WHEN provided', async () => {
      const page = await createSwitchComponent('<mnt-switch name="agreement"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.name).toBe('agreement');
    });

    it('SHOULD apply value attribute WHEN provided', async () => {
      const page = await createSwitchComponent('<mnt-switch value="yes"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.value).toBe('yes');
    });

    it('SHOULD render as checkbox WHEN type is checkbox', async () => {
      const page = await createSwitchComponent('<mnt-switch type="checkbox"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.type).toBe('checkbox');
    });

    it('SHOULD render as radio WHEN type is radio', async () => {
      const page = await createSwitchComponent('<mnt-switch type="radio" name="group"></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.type).toBe('radio');
    });

    it('SHOULD be disabled WHEN disabled prop is true', async () => {
      const page = await createSwitchComponent('<mnt-switch disabled></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.disabled).toBe(true);
    });

    it('SHOULD be checked WHEN checked prop is true', async () => {
      const page = await createSwitchComponent('<mnt-switch checked></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.checked).toBe(true);
    });

    it('SHOULD be required WHEN required prop is true', async () => {
      const page = await createSwitchComponent('<mnt-switch required></mnt-switch>');

      const input = page.root.querySelector('input');
      expect(input.required).toBe(true);
    });
  });

  describe('Behavior - Checkbox', () => {
    it('SHOULD toggle checked state WHEN input is clicked', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      expect(input.checked).toBe(false);

      input.click();
      await page.waitForChanges();

      expect(input.checked).toBe(true);

      input.click();
      await page.waitForChanges();

      expect(input.checked).toBe(false);
    });

    it('SHOULD emit onChange event WHEN checked state changes', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="test" value="testValue"></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      const changeHandler = jest.fn();
      page.root.addEventListener('onChange', changeHandler);

      input.click();
      await page.waitForChanges();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        checked: true,
        value: 'testValue',
        id: 'test',
        name: undefined,
      });
    });
  });

  describe('Behavior - Radio', () => {
    it('SHOULD work as radio button WHEN type is radio', async () => {
      const page = await newSpecPage({
        components: [Switch],
        html: `
          <div>
            <mnt-switch input-id="radio1" type="radio" name="choice" value="option1"></mnt-switch>
            <mnt-switch input-id="radio2" type="radio" name="choice" value="option2"></mnt-switch>
          </div>
        `,
      });

      const radio1 = page.body.querySelector('#radio1') as HTMLInputElement;
      const radio2 = page.body.querySelector('#radio2') as HTMLInputElement;

      radio1.click();
      await page.waitForChanges();
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);

      radio2.click();
      await page.waitForChanges();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
    });

    it('SHOULD emit onChange event with name WHEN radio changes', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="test" type="radio" name="group1" value="option1"></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      const changeHandler = jest.fn();
      page.root.addEventListener('onChange', changeHandler);

      input.click();
      await page.waitForChanges();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        checked: true,
        value: 'option1',
        id: 'test',
        name: 'group1',
      });
    });
  });

  describe('Public Methods', () => {
    it('SHOULD return input element WHEN getInput is called', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="test"></mnt-switch>');
      const component = page.rootInstance as Switch;

      const input = component.getInput();
      expect(input).toBeTruthy();
      expect(input.id).toBe('test');
    });

    it('SHOULD return checked state WHEN getChecked is called', async () => {
      const page = await createSwitchComponent('<mnt-switch checked></mnt-switch>');
      const component = page.rootInstance as Switch;

      expect(component.getChecked()).toBe(true);
    });

    it('SHOULD update checked state WHEN setChecked is called', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');
      const component = page.rootInstance as Switch;
      const input = page.root.querySelector('input') as HTMLInputElement;

      expect(input.checked).toBe(false);

      component.setChecked(true);
      await page.waitForChanges();

      expect(input.checked).toBe(true);
      expect(component.getChecked()).toBe(true);
    });
  });

  describe('Events', () => {
    it('SHOULD emit onFocus event WHEN input receives focus', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      const focusHandler = jest.fn();
      page.root.addEventListener('onFocus', focusHandler);

      input.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();

      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it('SHOULD emit onBlur event WHEN input loses focus', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      const blurHandler = jest.fn();
      page.root.addEventListener('onBlur', blurHandler);

      input.dispatchEvent(new FocusEvent('blur'));
      await page.waitForChanges();

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have proper ARIA attributes', async () => {
      const page = await createSwitchComponent('<mnt-switch checked></mnt-switch>');
      const input = page.root.querySelector('input');

      expect(input.getAttribute('role')).toBe('switch');
      expect(input.getAttribute('aria-checked')).toBe('true');
      expect(input.getAttribute('aria-disabled')).toBe('false');
    });

    it('SHOULD update aria-checked WHEN state changes', async () => {
      const page = await createSwitchComponent('<mnt-switch></mnt-switch>');
      const input = page.root.querySelector('input') as HTMLInputElement;

      expect(input.getAttribute('aria-checked')).toBe('false');

      input.click();
      await page.waitForChanges();

      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('SHOULD have aria-disabled true WHEN disabled', async () => {
      const page = await createSwitchComponent('<mnt-switch disabled></mnt-switch>');
      const input = page.root.querySelector('input');

      expect(input.getAttribute('aria-disabled')).toBe('true');
    });

    it('SHOULD link label to input via htmlFor', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="my-switch" label="My Label"></mnt-switch>');

      const label = page.root.querySelector('label');
      const input = page.root.querySelector('input');

      expect(label.getAttribute('for')).toBe('my-switch');
      expect(input.id).toBe('my-switch');
    });
  });

  describe('Form Integration', () => {
    it('SHOULD participate in form submission as checkbox', async () => {
      const page = await createSwitchComponent('<mnt-switch input-id="test" name="terms" value="accepted" checked></mnt-switch>');
      const component = page.rootInstance as Switch;

      // Check that form value is set via internals
      const internals = (component as any).internals;
      expect(internals.setFormValue).toHaveBeenCalled();
    });
  });
});
