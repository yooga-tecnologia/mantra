import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { Badge } from './badge';
import { colorTonesArray, sizeVariantsArray, themePalettesArray } from '@theme/theme.types';

const COMPONENT_PREFIX = getLibPrefix() + 'badge';

const DEFAULT_LABEL = 'Feedback message';
const DEFAULT_ICON = 'arrow-left';

async function createBadgeComponent(html: string) {
  return await newSpecPage({
    components: [Badge],
    html,
  });
}

function getBadgeElement(page: any) {
  return page.root.firstElementChild;
}

describe('<mnt-badge>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createBadgeComponent(`<mnt-badge label="${DEFAULT_LABEL}"></mnt-badge>`);
      const span = page.root.querySelector('span');
      const badge = getBadgeElement(page);

      // ASSERTION
      expect(span.textContent).toBe(DEFAULT_LABEL);
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-primary`);
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-medium`);
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct classes WHEN size, color, and variant are provided', async () => {
      // SETUP
      const page = await createBadgeComponent(`
        <mnt-badge
          size="tiny"
          color="secondary"
          tone="emphasis"
          label="${DEFAULT_LABEL}"
        ></mnt-badge>
      `);
      const badge = getBadgeElement(page);

      // ASSERTION
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-tiny`);
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-secondary`);
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-emphasis`);
    });

    it('SHOULD apply correct size class WHEN size is provided', async () => {
      for (const size of sizeVariantsArray) {
        const page = await createBadgeComponent(`<mnt-badge size="${size}" label="${DEFAULT_LABEL}"></mnt-badge>`);
        const badge = getBadgeElement(page);

        expect(badge).toHaveClass(`${COMPONENT_PREFIX}-${size}`);
      }
    });

    it('SHOULD apply correct color class WHEN color is provided', async () => {
      for (const color of themePalettesArray) {
        const page = await createBadgeComponent(`<mnt-badge color="${color}" label="${DEFAULT_LABEL}"></mnt-badge>`);
        const badge = getBadgeElement(page);

        expect(badge).toHaveClass(`${COMPONENT_PREFIX}-${color}`);
      }
    });

    it('SHOULD apply correct tone class WHEN tone is provided', async () => {
      for (const tone of colorTonesArray) {
        const page = await createBadgeComponent(`<mnt-badge tone="${tone}" label="${DEFAULT_LABEL}"></mnt-badge>`);
        const badge = getBadgeElement(page);

        expect(badge).toHaveClass(`${COMPONENT_PREFIX}-${tone}`);
      }
    });
  });

  describe('Icons', () => {
    it('SHOULD render an mnt-icon on the left WHEN icon property is provided', async () => {
      // SETUP
      const page = await createBadgeComponent(`<mnt-badge icon="${DEFAULT_ICON}" label="${DEFAULT_LABEL}"></mnt-badge>`);
      const icon = page.root.querySelector('mnt-icon');

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('mnt-icon');
      expect(icon.getAttribute('icon')).toBe(DEFAULT_ICON);
    });

    it('SHOULD NOT render an mnt-icon WHEN icon property is not provided', async () => {
      const page = await createBadgeComponent(`<mnt-badge label="${DEFAULT_LABEL}"></mnt-badge>`);
      const icon = page.root.querySelector('mnt-icon');

      expect(icon).toBeNull();
    });

    it('SHOULD render badge with icon only WHEN only icon property is provided', async () => {
      // SETUP
      const page = await createBadgeComponent(`<mnt-badge icon="${DEFAULT_ICON}"></mnt-badge>`);
      const icon = page.root.querySelector('mnt-icon');
      const span = page.root.querySelector('span');
      const badge = getBadgeElement(page);

      // ASSERTION
      expect(icon).not.toBeNull();
      expect(icon.getAttribute('icon')).toBe(DEFAULT_ICON);
      expect(span).toBeNull();
      expect(badge).toHaveClass(`${COMPONENT_PREFIX}-icon-only`);
    });

    it('SHOULD NOT render label span WHEN label is not provided', async () => {
      const page = await createBadgeComponent(`<mnt-badge icon="${DEFAULT_ICON}"></mnt-badge>`);
      const span = page.root.querySelector('span');

      expect(span).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have accessible attributes WHEN rendered', async () => {
      const page = await createBadgeComponent(`<mnt-badge label="${DEFAULT_LABEL}"></mnt-badge>`);
      const badge = getBadgeElement(page);

      expect(badge.getAttribute('role')).toBe('status');
      expect(badge.getAttribute('aria-label')).toBe(DEFAULT_LABEL);
    });

    it('SHOULD update aria-label WHEN label changes', async () => {
      const newMessage = 'Updated message';
      const page = await createBadgeComponent(`<mnt-badge label="${DEFAULT_LABEL}"></mnt-badge>`);
      const span = page.root.querySelector('span');
      const badge = getBadgeElement(page);

      expect(span.textContent).toBe(DEFAULT_LABEL);
      expect(badge.getAttribute('aria-label')).toBe(DEFAULT_LABEL);

      page.root.setAttribute('label', newMessage);
      await page.waitForChanges();

      expect(span.textContent).toBe(newMessage);
      expect(badge.getAttribute('aria-label')).toBe(newMessage);
    });
  });
});
