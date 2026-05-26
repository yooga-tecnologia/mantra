import { newE2EPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
const DEFAULT_LABEL = 'Click me to confirm';

describe('Button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mnt-button></mnt-button>');

    const element = await page.find('mnt-button');
    expect(element).toHaveClass('hydrated');
  });

  describe('Loading state', () => {
    it('SHOULD apply mnt-button-loading class WHEN loading=true', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button loading="true" label="${DEFAULT_LABEL}"></mnt-button>`);

      const button = await page.find('mnt-button button');
      expect(button).toHaveClass(`${LIB_PREFIX}button-loading`);
    });

    it('SHOULD apply aria-busy="true" WHEN loading=true', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button loading="true" label="${DEFAULT_LABEL}"></mnt-button>`);

      const button = await page.find('mnt-button button');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('SHOULD render only the loading icon WHEN loading=true', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <mnt-button loading="true" icon-left="check" icon-right="arrow-right" label="${DEFAULT_LABEL}"></mnt-button>
      `);

      const loadingIcon = await page.find('mnt-button .icon-loading');
      const label = await page.find('mnt-button .label');
      const iconLeft = await page.find('mnt-button .icon-left');
      const iconRight = await page.find('mnt-button .icon-right');

      expect(loadingIcon).not.toBeNull();
      expect(label).toBeNull();
      expect(iconLeft).toBeNull();
      expect(iconRight).toBeNull();
    });

    it('SHOULD apply spin animation via CSS on the loading icon', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button loading="true" label="${DEFAULT_LABEL}"></mnt-button>`);

      const animationName = await page.evaluate(() => {
        const icon = document.querySelector('mnt-button .icon-loading');
        return icon ? window.getComputedStyle(icon).animationName : null;
      });

      expect(animationName).not.toBeNull();
      expect(animationName).not.toBe('none');
    });

    it('SHOULD freeze button width WHEN transitioning from idle to loading', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);

      const button = await page.find('mnt-button button');
      const idleBox = await button.getComputedStyle();
      const idleWidth = parseFloat(idleBox.width);

      await page.evaluate(() => {
        const el = document.querySelector('mnt-button') as HTMLElement & { loading: boolean };
        el.loading = true;
      });
      await page.waitForChanges();

      const loadingButton = await page.find('mnt-button button');
      const loadingBox = await loadingButton.getComputedStyle();
      const loadingWidth = parseFloat(loadingBox.width);

      expect(loadingWidth).toBe(idleWidth);
    });

    it('SHOULD release frozen width WHEN transitioning back from loading to idle', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button label="${DEFAULT_LABEL}"></mnt-button>`);

      await page.evaluate(() => {
        const el = document.querySelector('mnt-button') as HTMLElement & { loading: boolean };
        el.loading = true;
      });
      await page.waitForChanges();

      let button = await page.find('mnt-button button');
      expect(button.getAttribute('style')).toMatch(/min-width:\s*\d+(\.\d+)?px/);

      await page.evaluate(() => {
        const el = document.querySelector('mnt-button') as HTMLElement & { loading: boolean };
        el.loading = false;
      });
      await page.waitForChanges();

      button = await page.find('mnt-button button');
      const styleAfter = button.getAttribute('style') ?? '';
      expect(styleAfter).not.toMatch(/min-width:\s*\d+(\.\d+)?px/);
    });

    it('SHOULD NOT emit buttonClick event WHEN loading=true', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mnt-button loading="true" label="${DEFAULT_LABEL}"></mnt-button>`);

      const buttonClickSpy = await page.spyOnEvent('buttonClick');
      const button = await page.find('mnt-button button');
      await button.click();

      expect(buttonClickSpy).not.toHaveReceivedEvent();
    });
  });
});
