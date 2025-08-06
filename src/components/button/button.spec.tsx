import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { Button } from './button';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_LABEL = 'Click Me';
const ICON_LEFT = 'arrow-left';
const ICON_RIGHT = 'arrow-right';

async function createButtonComponent(html: string) {
  return await newSpecPage({
    components: [Button],
    html,
  });
}

function getButtonElement(page: any) {
  return page.root.querySelector('button');
}

describe('<mnt-button>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);
      const span = button.querySelector('span');

      // ASSERTION
      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD render slotted content WHEN NO label OR icons are provided', async () => {
      // SETUP
      const page = await createButtonComponent(`
        <mnt-button>
          <span class="slot-test">Hello Slot</span>
        </mnt-button>
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
        <mnt-button
          size="large"
          color="secondary"
          variant="stroke"
          label="${DEFAULT_LABEL}"
        ></mnt-button>
      `);
      const button = getButtonElement(page);

      // ASSERTION
      expect(button).toHaveClass(`${LIB_PREFIX}button-large`);
      expect(button).toHaveClass(`${LIB_PREFIX}button-secondary`);
      expect(button).toHaveClass(`${LIB_PREFIX}button-stroke`);
    });

    it('SHOULD disable the button WHEN disabled attribute is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button disabled="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      // ASSERTION
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass(`${LIB_PREFIX}button-disabled`);
    });

    it('SHOULD apply class button-full-width WHEN full-width attribute is set', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button full-width="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      // ASSERTION
      expect(button).toHaveClass(`${LIB_PREFIX}button-full-width`);
    });
  });

  describe('Icons', () => {
    it('SHOULD render an mnt-icon on the left WHEN icon-left is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button icon-left="${ICON_LEFT}" label="${DEFAULT_LABEL}"></mnt-button>`);
      const icon = page.root.querySelector('.icon-left');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_LEFT);
    });

    it('SHOULD render an mnt-icon on the right WHEN icon-right is provided', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button icon-right="${ICON_RIGHT}" label="${DEFAULT_LABEL}"></mnt-button>`);
      const icon = page.root.querySelector('.icon-right');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_RIGHT);
    });
  });

  describe('Events', () => {
    it('SHOULD emit click event WHEN button is clicked', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);
      
      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
    });

    it('SHOULD NOT emit click event WHEN button is disabled', async () => {
      // SETUP
      const page = await createButtonComponent(`<mnt-button disabled="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
