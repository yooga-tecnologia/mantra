import { newSpecPage } from '@stencil/core/testing';
import { Tooltip } from './tooltip';
import { tooltipPositions } from './tooltip.types';

const TOOLTIP_CONTAINER_CLASS = '.mnt-tooltip-container';
const TOOLTIP_CONTENT_CLASS = '.mnt-tooltip-content';

describe('mnt-tooltip', () => {
  it('renders tooltip with text', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      html: `<mnt-tooltip text="Hello world"></mnt-tooltip>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot).toBeNull();
    expect(page.root.querySelector(TOOLTIP_CONTENT_CLASS)?.textContent).toBe('Hello world');
  });

  it('shows tooltip on mouseenter and hides on mouseleave', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      html: `<mnt-tooltip text="Hover me"></mnt-tooltip>`,
    });

    const wrapper = page.root?.querySelector(TOOLTIP_CONTAINER_CLASS);
    expect(wrapper?.classList.contains('visible')).toBe(false);

    page.root?.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();
    expect(wrapper?.classList.contains('visible')).toBe(true);

    page.root?.dispatchEvent(new MouseEvent('mouseleave'));
    await page.waitForChanges();
    expect(wrapper?.classList.contains('visible')).toBe(false);
  });

  tooltipPositions.forEach(position => {
    it(`applies correct position class "${position}"`, async () => {
      const page = await newSpecPage({
        components: [Tooltip],
        html: `<mnt-tooltip text="Test" position="${position}"></mnt-tooltip>`,
      });

      const tooltip = page.root?.querySelector(TOOLTIP_CONTENT_CLASS);
      expect(tooltip?.classList.contains(position)).toBe(true);
    });
  });

  it('shows tooltip on focusin and hides on focusout', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      html: `<mnt-tooltip text="Focus me"></mnt-tooltip>`,
    });

    const tooltip = page.root!;
    const wrapper = tooltip.querySelector(TOOLTIP_CONTAINER_CLASS)!;

    expect(wrapper.classList.contains('visible')).toBe(false);

    tooltip.dispatchEvent(new FocusEvent('focusin'));
    await page.waitForChanges();
    expect(wrapper.classList.contains('visible')).toBe(true);

    tooltip.dispatchEvent(new FocusEvent('focusout'));
    await page.waitForChanges();
    expect(wrapper.classList.contains('visible')).toBe(false);
  });
});
