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
  describe('Events', () => {
    it('SHOULD emit valueChange with formattedValue and rawValue', async () => {
      const page = await createFieldTextComponent(`
        <mnt-field-text input-name="eventTest"></mnt-field-text>
      `);
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('valueChange', spy);

      input.value = 'test value';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
      const eventDetail = spy.mock.calls[0][0].detail;
      expect(eventDetail).toHaveProperty('formattedValue');
      expect(eventDetail).toHaveProperty('rawValue');
    });
  });

  describe('Methods', () => {
    describe('getRawValue()', () => {
      it('SHOULD return raw currency value when mask is currency', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="currencyTest"
            mask="currency"
            value="1000.50"
          ></mnt-field-text>
        `);

        const component = page.rootInstance as FieldText;
        const rawValue = component.getRawValue();

        expect(rawValue).toBeTruthy();
        expect(typeof rawValue).toBe('string');
      });

      it('SHOULD return regular value when no mask is applied', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="noMaskTest"
            value="test"
          ></mnt-field-text>
        `);

        const component = page.rootInstance as FieldText;
        const rawValue = component.getRawValue();

        expect(rawValue).toBe('test');
      });
    });
  });

  describe('Currency Mask', () => {
    describe('Initial value formatting (from backend/prop)', () => {
      it('SHOULD format numeric values with decimals correctly', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="currencyTest"
            mask="currency"
            value="1000.50"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        await page.waitForChanges();

        // Deve formatar como R$ 1.000,50
        expect(input.value).toContain('1.000');
        expect(input.value).toContain(',50');
      });

      it('SHOULD accept both comma and dot as decimal separator', async () => {
        // Teste com ponto
        const pageDot = await createFieldTextComponent(`
          <mnt-field-text
            input-name="currencyDot"
            mask="currency"
            value="1000.50"
          ></mnt-field-text>
        `);

        // Teste com vírgula
        const pageComma = await createFieldTextComponent(`
          <mnt-field-text
            input-name="currencyComma"
            mask="currency"
            value="1000,50"
          ></mnt-field-text>
        `);

        const inputDot = getInputElement(pageDot);
        const inputComma = getInputElement(pageComma);

        await pageDot.waitForChanges();
        await pageComma.waitForChanges();

        // Ambos devem resultar no mesmo formato
        expect(inputDot.value).toBe(inputComma.value);
      });

      it('SHOULD handle large values with proper thousand separators', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="currencyLarge"
            mask="currency"
            value="1000000.99"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        await page.waitForChanges();

        expect(input.value).toContain('1.000.000');
        expect(input.value).toContain(',99');
      });
    });

    describe('Real-time input behavior (calculator-like)', () => {
      it('SHOULD format "1" as R$ 0,01', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '1';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 0,01');
      });

      it('SHOULD format "11" as R$ 0,11', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '11';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 0,11');
      });

      it('SHOULD format "111" as R$ 1,11', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '111';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 1,11');
      });

      it('SHOULD format "1111" as R$ 11,11', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '1111';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 11,11');
      });

      it('SHOULD format "11111" as R$ 111,11', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '11111';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 111,11');
      });

      it('SHOULD format "111111" as R$ 1.111,11', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '111111';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(input.value).toBe('R$ 1.111,11');
      });

      it('SHOULD strip non-numeric characters during input', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="realtimeTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        // Simula usuário digitando "R$ 1.000,00" (colando valor formatado)
        input.value = 'R$ 1.000,00';
        component.onInput({ target: input });
        await page.waitForChanges();

        // Deve extrair apenas os dígitos (100000) e formatar como centavos
        expect(input.value).toContain('1.000,00');
      });

      it('SHOULD NOT contain non-breaking space (&nbsp;) in formatted value', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="nbspTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '12345';
        component.onInput({ target: input });
        await page.waitForChanges();

        // Não deve conter &nbsp; (U+00A0)
        expect(input.value).not.toContain('\u00A0');
        // Deve conter espaço comum entre R$ e o valor
        expect(input.value).toBe('R$ 123,45');
        expect(input.value.charCodeAt(2)).toBe(32); // Espaço comum (não U+00A0)
      });
    });

    describe('Value emission', () => {
      it('SHOULD emit both formatted and raw values during input', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="emitTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;
        const spy = jest.fn();

        page.root.addEventListener('valueChange', spy);

        // Simula digitação
        input.value = '12345';
        component.onInput({ target: input });
        await page.waitForChanges();

        expect(spy).toHaveBeenCalled();
        const eventDetail = spy.mock.calls[spy.mock.calls.length - 1][0].detail;

        // Deve emitir valor formatado e raw
        expect(eventDetail.formattedValue).toContain('R$');
        expect(eventDetail.formattedValue).toBe('R$ 123,45');
        expect(eventDetail.rawValue).toBe('123.45');
      });
    });

    describe('getRawValue() method', () => {
      it('SHOULD return raw decimal value after formatting', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="rawValueTest"
            mask="currency"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        const component = page.rootInstance as FieldText;

        input.value = '12345';
        component.onInput({ target: input });
        await page.waitForChanges();

        const rawValue = component.getRawValue();
        expect(rawValue).toBe('123.45');
      });
    });

    describe('Edge cases', () => {
      it('SHOULD handle empty value', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="emptyTest"
            mask="currency"
            value=""
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        expect(input.value).toBe('');
      });

      it('SHOULD handle zero value', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="zeroTest"
            mask="currency"
            value="0"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        await page.waitForChanges();

        expect(input.value).toBe('R$ 0,00');
      });

      it('SHOULD handle invalid input gracefully', async () => {
        const page = await createFieldTextComponent(`
          <mnt-field-text
            input-name="invalidTest"
            mask="currency"
            value="abc"
          ></mnt-field-text>
        `);

        const input = getInputElement(page);
        await page.waitForChanges();

        // Não deve quebrar, deve retornar string vazia
        expect(input.value).toBeDefined();
      });
    });
  });

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
  });
});
