import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { Tag } from './tag';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_LABEL = 'Design System';

async function createTagComponent(html: string) {
  return await newSpecPage({
    components: [Tag],
    html,
  });
}

function getTagDiv(page: any): HTMLElement {
  return page.root.querySelector(`.${LIB_PREFIX}tag-common`);
}

describe('<mnt-tag>', () => {
  describe('Rendering', () => {
    it('SHOULD render the tag div with base class', async () => {
      const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}"></mnt-tag>`);
      const tag = getTagDiv(page);

      expect(tag).not.toBeNull();
      expect(tag).toHaveClass(`${LIB_PREFIX}tag`);
      expect(tag).toHaveClass(`${LIB_PREFIX}tag-common`);
    });

    it('SHOULD render the label WHEN label prop is provided', async () => {
      const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}"></mnt-tag>`);
      const span = getTagDiv(page).querySelector('span');

      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD NOT render icon WHEN icon prop is not provided', async () => {
      const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}"></mnt-tag>`);
      expect(getTagDiv(page).querySelector('mnt-icon')).toBeNull();
    });

    it('SHOULD render icon WHEN icon prop is provided', async () => {
      const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}" icon="check"></mnt-tag>`);
      const icon = getTagDiv(page).querySelector('mnt-icon');

      expect(icon).not.toBeNull();
      expect(icon.getAttribute('icon')).toBe('check');
    });
  });

  describe('Size class', () => {
    it('SHOULD apply default size class (medium) WHEN size is not provided', async () => {
      const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}"></mnt-tag>`);
      expect(getTagDiv(page)).toHaveClass(`${LIB_PREFIX}tag-medium`);
    });

    it.each(['tiny', 'small', 'medium', 'large'] as const)(
      'SHOULD apply mnt-tag-%s class WHEN size="%s"',
      async (size) => {
        const page = await createTagComponent(`<mnt-tag label="${DEFAULT_LABEL}" size="${size}"></mnt-tag>`);
        expect(getTagDiv(page)).toHaveClass(`${LIB_PREFIX}tag-${size}`);
      },
    );
  });
});
