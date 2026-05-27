import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { TagSelectable } from './tag-selectable';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_TAG_ID = 'tag-1';
const DEFAULT_LABEL = 'Backend';

async function createTagSelectable(html: string) {
  return await newSpecPage({
    components: [TagSelectable],
    html,
  });
}

function getButtonElement(page: any): HTMLButtonElement {
  return page.root.querySelector('button');
}

describe('<mnt-tag-selectable>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN required props are provided', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      const button = getButtonElement(page);

      expect(button).not.toBeNull();
      expect(button).toHaveClass(`${LIB_PREFIX}tag-selectable`);
    });

    it('SHOULD render the label WHEN label prop is provided', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      const span = getButtonElement(page).querySelector('span');

      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD NOT render icon WHEN icon prop is not provided', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      expect(getButtonElement(page).querySelector('mnt-icon')).toBeNull();
    });

    it('SHOULD render icon WHEN icon prop is provided', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" icon="check"></mnt-tag-selectable>`);
      const icon = getButtonElement(page).querySelector('mnt-icon');

      expect(icon).not.toBeNull();
      expect(icon.getAttribute('icon')).toBe('check');
    });

    it('SHOULD warn and render null WHEN tagId is not provided', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const page = await createTagSelectable(`<mnt-tag-selectable label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);

      expect(page.root.querySelector('button')).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('"tagId" is required'));

      warnSpy.mockRestore();
    });

    it('SHOULD apply aria-label with label text for accessibility', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      expect(getButtonElement(page).getAttribute('aria-label')).toBe(`Selecionar ${DEFAULT_LABEL}`);
    });
  });

  describe('Selection behavior', () => {
    it('SHOULD NOT have mnt-tag-selected class by default', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      expect(getButtonElement(page)).not.toHaveClass(`${LIB_PREFIX}tag-selected`);
    });

    it('SHOULD apply mnt-tag-selected class WHEN clicked', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);

      getButtonElement(page).click();
      await page.waitForChanges();

      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}tag-selected`);
    });

    it('SHOULD remove mnt-tag-selected class WHEN clicked again (toggle)', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);

      getButtonElement(page).click();
      await page.waitForChanges();
      getButtonElement(page).click();
      await page.waitForChanges();

      expect(getButtonElement(page)).not.toHaveClass(`${LIB_PREFIX}tag-selected`);
    });

    it('SHOULD emit tagSelected event WHEN clicked', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagSelected', spy);

      getButtonElement(page).click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('SHOULD emit tagSelected with correct tagId and label', async () => {
      const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-selectable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagSelected', spy);

      getButtonElement(page).click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { tagId: DEFAULT_TAG_ID, label: DEFAULT_LABEL },
        }),
      );
    });
  });

  describe('Size variants', () => {
    it.each(['tiny', 'small', 'medium', 'large'] as const)(
      'SHOULD apply mnt-tag-%s class WHEN size="%s"',
      async (size) => {
        const page = await createTagSelectable(`<mnt-tag-selectable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" size="${size}"></mnt-tag-selectable>`);
        expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}tag-${size}`);
      },
    );
  });
});
