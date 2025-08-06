import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { ButtonIcon } from './button-icon';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_ICON = 'plus';

async function createButtonIconComponent(html: string) {
  return await newSpecPage({
    components: [ButtonIcon],
    html,
  });
}

function getButtonElement(page: any) {
  return page.root.querySelector('button');
}

describe('<mnt-button-icon>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createButtonIconComponent(`<mnt-button-icon icon="${DEFAULT_ICON}"></mnt-button-icon>`);
      const buttonIcon = getButtonElement(page);

      // ASSERTION
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-medium`);
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-primary`);
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-regular`);
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct classes WHEN size, color, and variant are provided', async () => {
      // SETUP
      const page = await createButtonIconComponent(`
        <mnt-button-icon
          size="tiny"
          color="secondary"
          variant="stroke"
          icon="${DEFAULT_ICON}"
        ></mnt-button-icon>
      `);
      const buttonIcon = getButtonElement(page);

      // ASSERTION
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-tiny`);
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-secondary`);
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-stroke`);
    });

    it('SHOULD disable the button WHEN disabled attribute is provided', async () => {
      // SETUP
      const page = await createButtonIconComponent(`<mnt-button-icon disabled="true" label="${DEFAULT_ICON}"></mnt-button-icon>`);
      const buttonIcon = getButtonElement(page);

      // ASSERTION
      expect(buttonIcon).toHaveAttribute('disabled');
      expect(buttonIcon).toHaveClass(`${LIB_PREFIX}button-disabled`);
    });
  });

  describe('Events', () => {
    it('SHOULD emit click event WHEN button is clicked', async () => {
      // SETUP
      const page = await createButtonIconComponent(`<mnt-button-icon label="${DEFAULT_ICON}"></mnt-button-icon>`);
      const buttonIcon = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      // ACTION
      buttonIcon.click();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
    });

    it('SHOULD NOT emit click event WHEN button is disabled', async () => {
      // SETUP
      const page = await createButtonIconComponent(`<mnt-button-icon disabled="true" label="${DEFAULT_ICON}"></mnt-button-icon>`);
      const buttonIcon = getButtonElement(page);

      const spy = jest.fn();
      page.root.addEventListener('buttonClick', spy);

      // ACTION
      buttonIcon.click();

      // ASSERTION
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
