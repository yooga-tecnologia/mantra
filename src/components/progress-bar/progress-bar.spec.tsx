import { newSpecPage } from '@stencil/core/testing';
import { ProgressBar } from './progress-bar';

async function renderComponent(html: string) {
  return newSpecPage({ components: [ProgressBar], html });
}

describe('mnt-progress-bar', () => {

  describe('type: percent', () => {
    it('renders fill at 50% when value=50', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar type="percent" value="50"></mnt-progress-bar>`);
      const fill = root.querySelector('.mnt-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('50%');
    });

    it('clamps value above 100 to 100%', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar type="percent" value="150"></mnt-progress-bar>`);
      const fill = root.querySelector('.mnt-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('100%');
    });

    it('clamps value below 0 to 0%', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar type="percent" value="-10"></mnt-progress-bar>`);
      const fill = root.querySelector('.mnt-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('0%');
    });
  });

  describe('type: steps', () => {
    it('renders 25% fill for [1,4] steps', async () => {
      const page = await newSpecPage({
        components: [ProgressBar],
        html: `<mnt-progress-bar type="steps"></mnt-progress-bar>`,
      });
      page.root.value = [1, 4];
      await page.waitForChanges();
      const fill = page.root.querySelector('.mnt-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('25%');
    });

    it('renders 100% fill when current equals total', async () => {
      const page = await newSpecPage({
        components: [ProgressBar],
        html: `<mnt-progress-bar type="steps"></mnt-progress-bar>`,
      });
      page.root.value = [4, 4];
      await page.waitForChanges();
      const fill = page.root.querySelector('.mnt-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('100%');
    });
  });

  describe('label', () => {
    it('renders label text above by default', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar label="Etapa 1 de 4"></mnt-progress-bar>`);
      const label = root.querySelector('.mnt-progress-bar__label');
      const track = root.querySelector('.mnt-progress-bar__track');
      expect(label).not.toBeNull();
      expect(label.nextElementSibling).toBe(track);
    });

    it('renders label below when label-position=below', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar label="Etapa 1" label-position="below"></mnt-progress-bar>`);
      const label = root.querySelector('.mnt-progress-bar__label');
      const track = root.querySelector('.mnt-progress-bar__track');
      expect(label).not.toBeNull();
      expect(track.nextElementSibling).toBe(label);
    });

    it('renders compact label (without prefix) when label-position=left for steps type', async () => {
      const page = await newSpecPage({
        components: [ProgressBar],
        html: `<mnt-progress-bar type="steps" label-position="left" label="Etapa 1 de 4"></mnt-progress-bar>`,
      });
      page.root.value = [1, 4];
      await page.waitForChanges();
      const label = page.root.querySelector('.mnt-progress-bar__label');
      expect(label.textContent).toBe('1 de 4');
    });

    it('renders compact percent label when label-position=right for percent type', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar type="percent" value="75" label-position="right"></mnt-progress-bar>`);
      const label = root.querySelector('.mnt-progress-bar__label');
      expect(label.textContent).toBe('75%');
    });

    it('applies inline class when label-position is left or right', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar label-position="left"></mnt-progress-bar>`);
      const container = root.querySelector('.mnt-progress-bar');
      expect(container.classList.contains('mnt-progress-bar--inline')).toBe(true);
    });

    it('does not render label element when label is not set', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar></mnt-progress-bar>`);
      const label = root.querySelector('.mnt-progress-bar__label');
      expect(label).toBeNull();
    });
  });

  describe('modifiers', () => {
    it('renders with full-width attribute present when fullWidth=true', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar full-width></mnt-progress-bar>`);
      expect(root.hasAttribute('full-width')).toBe(true);
    });

    it('renders with rounded attribute present when rounded=true', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar rounded></mnt-progress-bar>`);
      expect(root.hasAttribute('rounded')).toBe(true);
    });

    it('applies color class', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar color="success"></mnt-progress-bar>`);
      const container = root.querySelector('.mnt-progress-bar');
      expect(container.classList.contains('mnt-progress-bar--success')).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('track has role=progressbar with aria attributes', async () => {
      const { root } = await renderComponent(`<mnt-progress-bar type="percent" value="60" label="60%"></mnt-progress-bar>`);
      const track = root.querySelector('.mnt-progress-bar__track');
      expect(track.getAttribute('role')).toBe('progressbar');
      expect(track.getAttribute('aria-valuenow')).toBe('60');
      expect(track.getAttribute('aria-valuemin')).toBe('0');
      expect(track.getAttribute('aria-valuemax')).toBe('100');
    });
  });
});
