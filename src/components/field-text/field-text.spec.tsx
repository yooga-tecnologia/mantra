import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { FieldText } from './field-text';

async function createFieldTextComponent(html: string) {
  return await newSpecPage({
    components: [FieldText],
    html,
  });
}

function getInputElement(page: SpecPage) {
  return page.root.querySelector('input');
}

function getLabelElement(page: SpecPage) {
  return page.root.querySelector('label');
}

function getIconElement(page: SpecPage) {
  return page.root.querySelector('mnt-icon');
}

describe('mnt-field-text', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createFieldTextComponent(
        `<mnt-field-text
          input-name="exampleInput"
        ></mnt-field-text>`,
      );

      const baseElement = page.root;
      const inputElement = getInputElement(page);
      const iconElement = getIconElement(page);

      // ASSERTION
      expect(inputElement.type).toBe('text');
      expect(inputElement.id).toBe('exampleInput');
      expect(baseElement).toHaveClass('mnt-field-text-medium');
      expect(iconElement).toBeNull();
    });
    it('SHOULD render label element WHEN label-text is provided', async () => {
      // SETUP
      const page = await createFieldTextComponent(
        `<mnt-field-text
          input-name="exampleInput"
          label-text="Label Example"
        ></mnt-field-text>`,
      );

      const baseElement = page.root;
      const labelElement = getLabelElement(page);

      // ASSERTION
      expect(baseElement).toHaveClass('mnt-field-text-medium');
      expect(labelElement.textContent).toBe('Label Example');
    });
    it('SHOULD render required indicator WHEN required prop is provided', async () => {
      // SETUP
      const page = await createFieldTextComponent(
        `<mnt-field-text
          input-name="exampleInput"
          label-text="Label Example"
          required="true"
        ></mnt-field-text>`,
      );

      const baseElement = page.root;
      const labelElement = getLabelElement(page);

      // ASSERTION
      expect(baseElement.innerHTML).toContain(`<span class=\"text-color-primary\">*</span>`);
      expect(labelElement.textContent).toContain('Label Example');
    });
    it('SHOULD render all sizes correctly', async () => {
      const sizes = ['small', 'medium', 'large'];
      for (const size of sizes) {
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" size="${size}"></mnt-field-text>`);
        expect(page.root).toHaveClass(`mnt-field-text-${size}`);
      }
    });
  });

  describe('Props and Attributes', () => {
    describe('State', () => {
      it('SHOULD render error state icon and class WHEN state is error', async () => {
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" state="error"></mnt-field-text>`);
        const iconState = page.root.querySelector('.icon-state');
        expect(iconState).not.toBeNull();
        expect(iconState.getAttribute('icon')).toBe('signalingErrorCircle');
        expect(page.root).toHaveClass('mnt-field-text-error');
      });
      it('SHOULD render success state icon and class WHEN state is success', async () => {
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" state="success"></mnt-field-text>`);
        const iconState = page.root.querySelector('.icon-state');
        expect(iconState).not.toBeNull();
        expect(iconState.getAttribute('icon')).toBe('signalingCheckCircle');
        expect(page.root).toHaveClass('mnt-field-text-success');
      });
    });

    describe('Icons', () => {
      it('SHOULD render right icon WHEN icon-right prop is provided', async () => {
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" icon-right="plus"></mnt-field-text>`);
        const iconRight = page.root.querySelector('.icon-right');
        expect(iconRight).not.toBeNull();
        expect(iconRight.getAttribute('icon')).toBe('plus');
      });
      it('SHOULD render left icon WHEN icon-left prop is provided', async () => {
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" icon-left="minus"></mnt-field-text>`);
        const iconLeft = page.root.querySelector('.icon-left');
        expect(iconLeft).not.toBeNull();
        expect(iconLeft.getAttribute('icon')).toBe('minus');
      });
    });

    describe('Buttons', () => {
      it('SHOULD render action button slot WHEN has-action-button is true', async () => {
        const page = await createFieldTextComponent(
          `<mnt-field-text input-name="exampleInput" has-action-button="true">
            <button slot="action-button">Ação</button>
          </mnt-field-text>`,
        );
        const actionBtn = page.root.querySelector('[slot="action-button"]');
        expect(actionBtn).not.toBeNull();
        expect(actionBtn.textContent).toBe('Ação');
      });
      it('SHOULD render info button slot WHEN has-info-button is true', async () => {
        const page = await createFieldTextComponent(
          `<mnt-field-text input-name="exampleInput" has-info-button="true">
            <button slot="info-button">Info</button>
          </mnt-field-text>`,
        );
        const infoBtn = page.root.querySelector('[slot="info-button"]');
        expect(infoBtn).not.toBeNull();
        expect(infoBtn.textContent).toBe('Info');
      });
    });

    describe('Inline Message', () => {
      it('SHOULD render inline message WHEN inline-message is provided', async () => {
        const msg = 'Mensagem de erro';
        const page = await createFieldTextComponent(`<mnt-field-text input-name="exampleInput" inline-message="${msg}" state="error"></mnt-field-text>`);
        const inlineMsg = page.root.querySelector('.mnt-field-text-inline-message');
        expect(inlineMsg).not.toBeNull();
        expect(inlineMsg.textContent).toContain(msg);
      });
    });
  });
  describe('Events', () => {});
  describe('Methods', () => {});

  describe('Native input attributes and events', () => {
    it('SHOULD propagate maxLength, minLength, max, min, value to input', async () => {
      const page = await createFieldTextComponent(`
        <mnt-field-text
          input-name="nativeTest"
          max-length="10"
          min-length="2"
          max="100"
          min="10"
          value="abc"
        ></mnt-field-text>
      `);
      const input = getInputElement(page);
      expect(input.maxLength).toBe(10);
      expect(input.minLength).toBe(2);
      expect(input.max).toBe('100');
      expect(input.min).toBe('10');
      expect(input.value).toBe('abc');
    });

    it('SHOULD emit valueChange event and update value on input', async () => {
      const page = await createFieldTextComponent(`
        <mnt-field-text input-name="eventTest"></mnt-field-text>
      `);
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('valueChange', spy);
      input.value = 'novo valor';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe('novo valor');
    });
  });
});
