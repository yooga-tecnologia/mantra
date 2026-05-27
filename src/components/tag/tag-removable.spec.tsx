import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { TagRemovable } from './tag-removable';
import { TAG_REMOVE_ANIMATION_DURATION_MS } from './tag.types';

const LIB_PREFIX = getLibPrefix();

const DEFAULT_TAG_ID = 'tag-1';
const DEFAULT_LABEL = 'Frontend';

async function createTagRemovable(html: string) {
  return await newSpecPage({
    components: [TagRemovable],
    html,
  });
}

function getButtonElement(page: any): HTMLButtonElement {
  return page.root.querySelector('button');
}

describe('<mnt-tag-removable>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN required props are provided', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const button = getButtonElement(page);

      expect(button).not.toBeNull();
      expect(button).toHaveClass(`${LIB_PREFIX}tag-removable`);
    });

    it('SHOULD render the label WHEN label prop is provided', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const span = getButtonElement(page).querySelector('span');

      expect(span.textContent).toBe(DEFAULT_LABEL);
    });

    it('SHOULD always render the close icon', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const icons = getButtonElement(page).querySelectorAll('mnt-icon');
      const closeIcon = Array.from(icons).find((el) => el.getAttribute('icon') === 'close');

      expect(closeIcon).not.toBeNull();
    });

    it('SHOULD render an additional icon BEFORE the label WHEN icon prop is provided', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" icon="check"></mnt-tag-removable>`);
      const icons = getButtonElement(page).querySelectorAll('mnt-icon');

      expect(icons.length).toBe(2);
      expect(icons[0].getAttribute('icon')).toBe('check');
      expect(icons[1].getAttribute('icon')).toBe('close');
    });

    it('SHOULD warn and render null WHEN tagId is not provided', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const page = await createTagRemovable(`<mnt-tag-removable label="${DEFAULT_LABEL}"></mnt-tag-removable>`);

      expect(page.root.querySelector('button')).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('"id" is required'));

      warnSpy.mockRestore();
    });

    it('SHOULD apply aria-label with label text for accessibility', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      expect(getButtonElement(page).getAttribute('aria-label')).toBe(`Remover ${DEFAULT_LABEL}`);
    });
  });

  describe('Disabled state', () => {
    it('SHOULD disable the button WHEN disabled=true', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" disabled="true"></mnt-tag-removable>`);
      expect(getButtonElement(page)).toHaveAttribute('disabled');
    });

    it('SHOULD NOT emit tagRemoved WHEN disabled and clicked', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" disabled="true"></mnt-tag-removable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagRemoved', spy);

      getButtonElement(page).click();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Remove animation', () => {
    // Pages are created with REAL timers, then fake timers are activated only
    // inside each test that controls time. This avoids deadlock where
    // jest.useFakeTimers() in beforeEach blocks page.waitForChanges() because
    // Stencil's scheduler uses timers internally.

    it('SHOULD apply mnt-tag-removing class immediately on click', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);

      getButtonElement(page).click();
      await page.waitForChanges();

      expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}tag-removing`);
    });

    it('SHOULD NOT emit tagRemoved immediately on click', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagRemoved', spy);

      jest.useFakeTimers();
      getButtonElement(page).click();
      expect(spy).not.toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('SHOULD emit tagRemoved after animation duration', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagRemoved', spy);

      jest.useFakeTimers();
      getButtonElement(page).click();
      jest.advanceTimersByTime(TAG_REMOVE_ANIMATION_DURATION_MS);
      jest.useRealTimers();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('SHOULD emit tagRemoved with correct tagId and label', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagRemoved', spy);

      jest.useFakeTimers();
      getButtonElement(page).click();
      jest.advanceTimersByTime(TAG_REMOVE_ANIMATION_DURATION_MS);
      jest.useRealTimers();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { tagId: DEFAULT_TAG_ID, label: DEFAULT_LABEL },
        }),
      );
    });

    it('SHOULD NOT trigger a second removal WHEN clicked again while already removing', async () => {
      const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}"></mnt-tag-removable>`);
      const spy = jest.fn();
      page.root.addEventListener('tagRemoved', spy);

      jest.useFakeTimers();
      getButtonElement(page).click();
      getButtonElement(page).click();
      jest.advanceTimersByTime(TAG_REMOVE_ANIMATION_DURATION_MS * 2);
      jest.useRealTimers();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Size variants', () => {
    it.each(['tiny', 'small', 'medium', 'large'] as const)(
      'SHOULD apply mnt-tag-%s class WHEN size="%s"',
      async (size) => {
        const page = await createTagRemovable(`<mnt-tag-removable tag-id="${DEFAULT_TAG_ID}" label="${DEFAULT_LABEL}" size="${size}"></mnt-tag-removable>`);
        expect(getButtonElement(page)).toHaveClass(`${LIB_PREFIX}tag-${size}`);
      },
    );
  });
});
