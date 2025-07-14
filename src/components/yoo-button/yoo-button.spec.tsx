import { newSpecPage } from '@stencil/core/testing';
import { YooButton } from './yoo-button';

const DEFAULT_LABEL = 'Click Me';
const ICON_LEFT = 'arrow-left';
const ICON_RIGHT = 'arrow-right';

async function createButtonComponent(html: string) {
  return await newSpecPage({
    components: [YooButton],
    html,
  });
}

function getButtonElement(page: any) {
  return page.root.querySelector('button');
}

describe('<yoo-button>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button label="${DEFAULT_LABEL}"></yoo-button>`);
      const button = getButtonElement(page);
      const span = button.querySelector('span');

      // ASSERTION
      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD render slotted content WHEN NO label OR icons are provided', async () => {
      // SETUP
      const page = await createButtonComponent(`
        <yoo-button>
          <span class="slot-test">Hello Slot</span>
        </yoo-button>
      `);
      const slotted = page.root.querySelector('.slot-test')!;

      // ASSERTION
      expect(slotted).not.toBeNull();
      expect(slotted.textContent).toBe('Hello Slot');
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct classes WHEN size, color, and variant are provided', async () => {
      // SETUP
      const page = await createButtonComponent(`
        <yoo-button
          size="large"
          color="secondary"
          variant="outlined"
          label="${DEFAULT_LABEL}"
        ></yoo-button>
      `);
      const button = getButtonElement(page);

      // ASSERTION
      expect(button).toHaveClass('button-large');
      expect(button).toHaveClass('button-secondary');
      expect(button).toHaveClass('button-outlined');
    });

    it('SHOULD disable the button WHEN disabled attribute is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button disabled="true" label="${DEFAULT_LABEL}"></yoo-button>`);
      const button = getButtonElement(page);

      console.log(button)
      
      // ASSERTION
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('button-disabled');
    });

    it('SHOULD apply class button-full-width WHEN full-width attribute is set', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button full-width="true" label="${DEFAULT_LABEL}"></yoo-button>`);
      const button = getButtonElement(page);

      // ASSERTION
      expect(button).toHaveClass('button-full-width');
    });
  });

  describe('Icons', () => {
    it('SHOULD render an yoo-icon on the left WHEN icon-left is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button icon-left="${ICON_LEFT}" label="${DEFAULT_LABEL}"></yoo-button>`);
      const icon = page.root.querySelector('.icon-left');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('yoo-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_LEFT);
    });

    it('SHOULD render an yoo-icon on the right WHEN icon-right is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button icon-right="${ICON_RIGHT}" label="${DEFAULT_LABEL}"></yoo-button>`);
      const icon = page.root.querySelector('.icon-right');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('yoo-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_RIGHT);
    });
  });

  describe('Events', () => {
    it('SHOULD emit click event WHEN button is clicked', async () => {
      const spy = jest.fn();

      // SETUP
      const page = await createButtonComponent(`<yoo-button label="${DEFAULT_LABEL}"></yoo-button>`);
      const button = getButtonElement(page);
      
      page.root.addEventListener('onClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
    });

    it('SHOULD NOT emit click event WHEN button is disabled', async () => {
      // SETUP
      const page = await createButtonComponent(`<yoo-button disabled="true" label="${DEFAULT_LABEL}"></yoo-button>`);
      const button = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('onClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
