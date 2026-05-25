import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { Button } from './button';
import { buttonColorVariantsArray, buttonSizeVariantsArray, buttonStyleArray } from './button.types';

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
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);
      const span = button.querySelector('span');

      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD render slotted content WHEN NO label OR icons are provided', async () => {
      const page = await createButtonComponent(`
        <mnt-button>
          <span class="slot-test">Hello Slot</span>
        </mnt-button>
      `);
      const slotted = page.root.querySelector('.slot-test')!;

      expect(slotted).not.toBeNull();
      expect(slotted.textContent).toBe('Hello Slot');
    });
  });

  describe('Size class', () => {
    it.each(buttonSizeVariantsArray)('SHOULD apply mnt-button-%s class WHEN matching size is provided', async (size) => {
      const page = await createButtonComponent(`<mnt-button size="${size}" label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-${size}`);
    });

    it('SHOULD apply default size class (medium) WHEN size is not provided', async () => {
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-medium`);
    });

    it('SHOULD fallback to small size class WHEN size is invalid', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const page = await createButtonComponent(`<mnt-button size="extra-large" label="${DEFAULT_LABEL}"></mnt-button>`);

      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-small`);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('size is not supported'));

      warnSpy.mockRestore();
    });
  });

  describe('Variant class', () => {
    it.each(buttonStyleArray)('SHOULD apply mnt-button-%s class WHEN matching variant is provided', async (variant) => {
      const page = await createButtonComponent(`<mnt-button variant="${variant}" color="primary" label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-${variant}`);
    });

    it('SHOULD force primary color WHEN variant="filter" is used with non-primary color', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const page = await createButtonComponent(`<mnt-button variant="filter" color="critical" label="${DEFAULT_LABEL}"></mnt-button>`);

      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-primary`);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('"primary" color is the only supported color'));

      warnSpy.mockRestore();
    });

    it('SHOULD fallback to primary color WHEN variant="emphasis" is used with neutral color', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const page = await createButtonComponent(`<mnt-button variant="emphasis" color="neutral" label="${DEFAULT_LABEL}"></mnt-button>`);

      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-primary`);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('"neutral" color is not supported'));

      warnSpy.mockRestore();
    });
  });

  describe('Color class', () => {
    it.each(buttonColorVariantsArray)('SHOULD apply mnt-button-%s class WHEN matching color is provided', async (color) => {
      const page = await createButtonComponent(`<mnt-button color="${color}" label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-${color}`);
    });
  });

  describe('State class', () => {
    it('SHOULD apply mnt-button-default class by default', async () => {
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-default`);
    });

    it('SHOULD apply mnt-button-pressed class WHEN state="pressed"', async () => {
      const page = await createButtonComponent(`<mnt-button state="pressed" label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-pressed`);
    });
  });

  describe('Disabled state', () => {
    it('SHOULD disable the button WHEN disabled attribute is provided', async () => {
      const page = await createButtonComponent(`<mnt-button disabled="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass(`${LIB_PREFIX}button-disabled`);
    });
  });

  describe('Full width', () => {
    it('SHOULD apply mnt-button-full-width class WHEN full-width attribute is set', async () => {
      const page = await createButtonComponent(`<mnt-button full-width="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}button-full-width`);
    });
  });

  describe('Icon size mapping', () => {
    it.each([
      [14, 'tiny'],
      [16, 'small'],
      [18, 'medium'],
      [20, 'large'],
    ] as const)('SHOULD render icon with %i px WHEN button size is "%s"', async (expectedIconSize, size) => {
      const page = await createButtonComponent(`<mnt-button size="${size}" icon-left="${ICON_LEFT}" label="${DEFAULT_LABEL}"></mnt-button>`);
      const icon = page.root.querySelector('.icon-left');

      expect(icon.getAttribute('size')).toBe(String(expectedIconSize));
    });
  });

  describe('Icons', () => {
    it('SHOULD render an mnt-icon on the left WHEN icon-left is provided', async () => {
      const page = await createButtonComponent(`<mnt-button icon-left="${ICON_LEFT}" label="${DEFAULT_LABEL}"></mnt-button>`);
      const icon = page.root.querySelector('.icon-left');

      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_LEFT);
    });

    it('SHOULD render an mnt-icon on the right WHEN icon-right is provided', async () => {
      const page = await createButtonComponent(`<mnt-button icon-right="${ICON_RIGHT}" label="${DEFAULT_LABEL}"></mnt-button>`);
      const icon = page.root.querySelector('.icon-right');

      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(ICON_RIGHT);
    });
  });

  describe('Events', () => {
    it('SHOULD emit click event WHEN button is clicked', async () => {
      const page = await createButtonComponent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      button.click();

      expect(spy).toHaveBeenCalled();
    });

    it('SHOULD NOT emit click event WHEN button is disabled', async () => {
      const page = await createButtonComponent(`<mnt-button disabled="true" label="${DEFAULT_LABEL}"></mnt-button>`);
      const button = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      button.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
