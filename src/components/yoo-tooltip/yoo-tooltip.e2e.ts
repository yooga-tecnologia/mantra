import { newE2EPage } from '@stencil/core/testing';

describe('yoo-tooltip', () => {
  it('shows tooltip on hover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <yoo-tooltip text="Dica interativa">
        <button slot="trigger">Hover aqui</button>
      </yoo-tooltip>
    `);

    const wrapper = await page.find('yoo-tooltip >>> .tooltip-wrapper');
    const tooltip = await page.find('yoo-tooltip >>> .tooltip-content');
    expect(await tooltip.isVisible()).toBe(false);

    await wrapper.hover();
    await page.waitForChanges();

    expect(await tooltip.isVisible()).toBe(true);
  });
});
