import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { Tag } from './tag';

const LIB_PREFIX = getLibPrefix();

async function createTagComponent(html: string) {
  return await newSpecPage({
    components: [Tag],
    html,
  });
}

function getTagElement(page: any) {
  return page.root.querySelector('tag');
}

describe('<mnt-tag>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      const page = await createTagComponent(`<mnt-tag></mnt-tag>`);
      const tag = getTagElement(page);

      expect(tag).not.toBeNull();
      expect(tag).toHaveClass(`${LIB_PREFIX}tag`);
    });
  });

  // describe('Size class', () => {
  // });

  // describe('Variant class', () => {
  // });
});
