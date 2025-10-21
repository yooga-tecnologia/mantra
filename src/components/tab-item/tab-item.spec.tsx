import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { TabItem } from './tab-item';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_TAB_ID = 'tab-1';
const DEFAULT_LABEL = 'Tab Label';
const DEFAULT_ICON = 'plus';

async function createTabItemComponent(html: string) {
  return await newSpecPage({
    components: [TabItem],
    html,
  });
}

function getTabItemElement(page: any) {
  return page.root.querySelector('button');
}

describe('<mnt-tab-item>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has required props', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}"></mnt-tab-item>`);
      const button = getTabItemElement(page);
      const label = button.querySelector('.tab-item-label');

      // ASSERTION
      expect(label.textContent).toBe(DEFAULT_LABEL);
      expect(button).toHaveClass(`${LIB_PREFIX}tab-item-horizontal`);
    });

    it('SHOULD render with icon WHEN icon prop is provided', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}" icon="${DEFAULT_ICON}"></mnt-tab-item>`);
      const icon = page.root.querySelector('.tab-item-icon');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(DEFAULT_ICON);
    });

    it('SHOULD NOT render icon WHEN icon prop is not provided', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}"></mnt-tab-item>`);
      const icon = page.root.querySelector('.tab-item-icon');

      // ASSERTION
      expect(icon).toBeNull();
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct classes WHEN orientation is provided', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}" orientation="vertical"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      // ASSERTION
      expect(button).toHaveClass(`${LIB_PREFIX}tab-item-vertical`);
    });

    it('SHOULD apply selected class WHEN selected is true', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}" selected="true"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      // ASSERTION
      expect(button).toHaveClass(`${LIB_PREFIX}tab-item-selected`);
    });

    it('SHOULD apply disabled class WHEN disabled is true', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}" disabled="true"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      // ASSERTION
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass(`${LIB_PREFIX}tab-item-disabled`);
    });

    it('SHOULD use horizontal orientation as default', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      // ASSERTION
      expect(button).toHaveClass(`${LIB_PREFIX}tab-item-horizontal`);
    });
  });

  describe('Events', () => {
    it('SHOULD emit tabItemClick event WHEN button is clicked', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      const spy = jest.fn();
      page.root.addEventListener('tabItemClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: DEFAULT_TAB_ID,
        }),
      );
    });

    it('SHOULD NOT emit tabItemClick event WHEN disabled', async () => {
      // SETUP
      const page = await createTabItemComponent(`<mnt-tab-item tab-id="${DEFAULT_TAB_ID}" label="${DEFAULT_LABEL}" disabled="true"></mnt-tab-item>`);
      const button = getTabItemElement(page);

      const spy = jest.fn();
      page.root.addEventListener('tabItemClick', spy);

      // ACTION
      button.click();

      // ASSERTION
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
