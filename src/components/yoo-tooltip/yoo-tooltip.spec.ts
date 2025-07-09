import { newSpecPage } from '@stencil/core/testing';
import { YooTooltip } from './yoo-tooltip';
import { tooltipPositions } from './yoo-tooltip.types';

describe('yoo-tooltip', () => {
  it('renders tooltip with text', async () => {
    const page = await newSpecPage({
      components: [YooTooltip],
      html: `<yoo-tooltip text="Hello world"></yoo-tooltip>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot).toBeNull();
    expect(page.root.querySelector('.tooltip-content')?.textContent).toBe('Hello world');
  });

  it('shows tooltip on mouseenter and hides on mouseleave', async () => {
    const page = await newSpecPage({
      components: [YooTooltip],
      html: `<yoo-tooltip text="Hover me"></yoo-tooltip>`,
    });

    const wrapper = page.root?.querySelector('.tooltip-wrapper');
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
        components: [YooTooltip],
        html: `<yoo-tooltip text="Test" position="${position}"></yoo-tooltip>`,
      });

      const tooltip = page.root?.querySelector('.tooltip-content');
      expect(tooltip?.classList.contains(position)).toBe(true);
    });
  });

  it('shows tooltip on focusin and hides on focusout', async () => {
    const page = await newSpecPage({
      components: [YooTooltip],
      html: `<yoo-tooltip text="Focus me"></yoo-tooltip>`,
    });

    const tooltip = page.root!;
    const wrapper = tooltip.querySelector('.tooltip-wrapper')!;

    expect(wrapper.classList.contains('visible')).toBe(false);

    tooltip.dispatchEvent(new FocusEvent('focusin'));
    await page.waitForChanges();
    expect(wrapper.classList.contains('visible')).toBe(true);

    tooltip.dispatchEvent(new FocusEvent('focusout'));
    await page.waitForChanges();
    expect(wrapper.classList.contains('visible')).toBe(false);
  });
});
