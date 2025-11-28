import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { FieldTextArea } from './field-text-area';

async function createFieldTextAreaComponent(html: string) {
  return await newSpecPage({
    components: [FieldTextArea],
    html,
  });
}

function getTextareaElement(page: SpecPage) {
  return page.root.querySelector('textarea');
}

function getLabelElement(page: SpecPage) {
  return page.root.querySelector('label');
}

function getIconElement(page: SpecPage) {
  return page.root.querySelector('mnt-icon');
}

describe('mnt-field-text-area', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      const page = await createFieldTextAreaComponent(
        `<mnt-field-text-area
          input-name="exampleTextarea"
        ></mnt-field-text-area>`,
      );

      const baseElement = page.root;
      const textareaElement = getTextareaElement(page);
      const iconElement = getIconElement(page);

      expect(textareaElement.id).toBe('exampleTextarea');
      expect(baseElement).toHaveClass('mnt-field-text-area');
      expect(baseElement).toHaveClass('mnt-field-text-area-default');
      expect(iconElement).toBeNull();
    });

    it('SHOULD render label element WHEN label-text is provided', async () => {
      const page = await createFieldTextAreaComponent(
        `<mnt-field-text-area
          input-name="exampleTextarea"
          label-text="Label Example"
        ></mnt-field-text-area>`,
      );

      const labelElement = getLabelElement(page);

      expect(labelElement.textContent).toBe('Label Example');
    });

    it('SHOULD render required indicator WHEN required prop is provided', async () => {
      const page = await createFieldTextAreaComponent(
        `<mnt-field-text-area
          input-name="exampleTextarea"
          label-text="Label Example"
          required="true"
        ></mnt-field-text-area>`,
      );

      const baseElement = page.root;
      const labelElement = getLabelElement(page);

      expect(baseElement.innerHTML).toContain(`<span class="text-color-primary">*</span>`);
      expect(labelElement.textContent).toContain('Label Example');
    });
  });

  describe('Props and Attributes', () => {
    describe('State', () => {
      it('SHOULD render error state icon and class WHEN state is error', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" state="error"></mnt-field-text-area>`
        );
        const iconState = page.root.querySelector('.icon-state');
        expect(iconState).not.toBeNull();
        expect(iconState.getAttribute('icon')).toBe('signalingErrorCircle');
        expect(page.root).toHaveClass('mnt-field-text-area-error');
      });

      it('SHOULD render success state icon and class WHEN state is success', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" state="success"></mnt-field-text-area>`
        );
        const iconState = page.root.querySelector('.icon-state');
        expect(iconState).not.toBeNull();
        expect(iconState.getAttribute('icon')).toBe('signalingCheckCircle');
        expect(page.root).toHaveClass('mnt-field-text-area-success');
      });

      it('SHOULD render disabled class WHEN disabled is true', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" disabled="true"></mnt-field-text-area>`
        );
        expect(page.root).toHaveClass('mnt-field-text-area-disabled');
        const textareaElement = getTextareaElement(page);
        expect(textareaElement.disabled).toBe(true);
      });
    });

    describe('Buttons', () => {
      it('SHOULD render action button slot WHEN has-action-button is true', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" label-text="Label" has-action-button="true">
            <button slot="action-button">Ação</button>
          </mnt-field-text-area>`,
        );
        const actionBtn = page.root.querySelector('[slot="action-button"]');
        expect(actionBtn).not.toBeNull();
        expect(actionBtn.textContent).toBe('Ação');
      });

      it('SHOULD render info button slot WHEN has-info-button is true', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" label-text="Label" has-info-button="true">
            <button slot="info-button">Info</button>
          </mnt-field-text-area>`,
        );
        const infoBtn = page.root.querySelector('[slot="info-button"]');
        expect(infoBtn).not.toBeNull();
        expect(infoBtn.textContent).toBe('Info');
      });
    });

    describe('Inline Message', () => {
      it('SHOULD render inline message WHEN inline-message is provided', async () => {
        const msg = 'Mensagem de erro';
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" inline-message="${msg}" state="error"></mnt-field-text-area>`
        );
        const inlineMsg = page.root.querySelector('.mnt-field-text-area-inline-message');
        expect(inlineMsg).not.toBeNull();
        expect(inlineMsg.textContent).toContain(msg);
      });

      it('SHOULD render info icon in inline message WHEN state is default', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" inline-message="Info message" state="default"></mnt-field-text-area>`
        );
        const inlineMsg = page.root.querySelector('.mnt-field-text-area-inline-message');
        const icon = inlineMsg.querySelector('mnt-icon');
        expect(icon.getAttribute('icon')).toBe('info');
      });

      it('SHOULD render error icon in inline message WHEN state is error', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" inline-message="Error message" state="error"></mnt-field-text-area>`
        );
        const inlineMsg = page.root.querySelector('.mnt-field-text-area-inline-message');
        const icon = inlineMsg.querySelector('mnt-icon');
        expect(icon.getAttribute('icon')).toBe('signalingErrorCircle');
      });

      it('SHOULD render success icon in inline message WHEN state is success', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" inline-message="Success message" state="success"></mnt-field-text-area>`
        );
        const inlineMsg = page.root.querySelector('.mnt-field-text-area-inline-message');
        const icon = inlineMsg.querySelector('mnt-icon');
        expect(icon.getAttribute('icon')).toBe('signalingCheckCircle');
      });
    });

    describe('Character Counter', () => {
      it('SHOULD display character counter with default maxLength', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea"></mnt-field-text-area>`
        );
        const counter = page.root.querySelector('.mnt-field-text-area-counter');
        expect(counter.textContent).toBe('0/300');
      });

      it('SHOULD display character counter with custom maxLength', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" max-length="500"></mnt-field-text-area>`
        );
        const counter = page.root.querySelector('.mnt-field-text-area-counter');
        expect(counter.textContent).toBe('0/500');
      });

      it('SHOULD update character count when value changes', async () => {
        const page = await createFieldTextAreaComponent(
          `<mnt-field-text-area input-name="exampleTextarea" value="Hello"></mnt-field-text-area>`
        );
        const counter = page.root.querySelector('.mnt-field-text-area-counter');
        expect(counter.textContent).toBe('5/300');
      });
    });
  });

  describe('Native textarea attributes', () => {
    it('SHOULD propagate maxLength, rows, value, placeholder to textarea', async () => {
      const page = await createFieldTextAreaComponent(`
        <mnt-field-text-area
          input-name="nativeTest"
          max-length="200"
          rows="10"
          value="test content"
          placeholder="Enter text here"
        ></mnt-field-text-area>
      `);
      const textarea = getTextareaElement(page);
      expect(textarea.maxLength).toBe(200);
      expect(textarea.rows).toBe(10);
      expect(textarea.value).toBe('test content');
      expect(textarea.placeholder).toBe('Enter text here');
    });
  });

  describe('Events', () => {
    it('SHOULD emit valueChange event and update value on input', async () => {
      const page = await createFieldTextAreaComponent(`
        <mnt-field-text-area input-name="eventTest"></mnt-field-text-area>
      `);
      const textarea = getTextareaElement(page);
      const spy = jest.fn();
      page.root.addEventListener('valueChange', spy);
      textarea.value = 'novo valor';
      textarea.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe('novo valor');
    });

    it('SHOULD update charCount on input', async () => {
      const page = await createFieldTextAreaComponent(`
        <mnt-field-text-area input-name="countTest"></mnt-field-text-area>
      `);
      const textarea = getTextareaElement(page);
      const counter = page.root.querySelector('.mnt-field-text-area-counter');
      
      expect(counter.textContent).toBe('0/300');
      
      textarea.value = '12345';
      textarea.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      
      expect(counter.textContent).toBe('5/300');
    });
  });

  describe('Methods', () => {
    it('SHOULD return textarea element via getTextarea method', async () => {
      const page = await createFieldTextAreaComponent(`
        <mnt-field-text-area input-name="methodTest"></mnt-field-text-area>
      `);
      const component = page.rootInstance as FieldTextArea;
      const textarea = component.getTextarea();
      expect(textarea).toBe(getTextareaElement(page));
    });
  });
});

