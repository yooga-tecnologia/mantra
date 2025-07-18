import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';

describe('icon', () => {
  it('renders correctly with default props (without background)', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search"></mnt-icon>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('width')).toBe('24px');
    expect(svg.getAttribute('height')).toBe('24px');
    expect(svg.getAttribute('fill')).toBe('currentColor');
    expect(svg.getAttribute('transform')).toBe('rotate(0)');

    const span = page.root.querySelector('span');
    expect(span).toBeNull();
  });

  it('transform and base icon name mapping', async () => {
    const testCases = [
      { icon: 'arrow-up', expectedTransform: 'rotate(0)', expectedBase: 'arrow' },
      { icon: 'arrow-down', expectedTransform: 'rotate(180 0 0)', expectedBase: 'arrow' },
      { icon: 'arrow-right', expectedTransform: 'rotate(90 0 0)', expectedBase: 'arrow' },
      { icon: 'arrow-left', expectedTransform: 'rotate(-90 0 0)', expectedBase: 'arrow' },
      { icon: 'search', expectedTransform: 'rotate(0)', expectedBase: 'search' },
    ];

    for (const { icon, expectedTransform, expectedBase } of testCases) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="${icon}"></mnt-icon>`,
      });

      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('transform')).toBe(expectedTransform);
      expect(page.rootInstance.getBaseIconName(icon)).toBe(expectedBase);
    }
  });

  it('applies the correct transformation for a directional icon', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="arrow-down"></mnt-icon>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('transform')).toBe('rotate(180 0 0)');
  });

  it('renders with background and adjusts sizes correctly', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" size="large" background="red"></mnt-icon>`,
    });

    expect(page.root.getAttribute('style')).toContain('width: 32px');
    expect(page.root.getAttribute('style')).toContain('height: 32px');

    const span = page.root.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.classList.contains('icon-bg')).toBeTruthy();
    expect(span.classList.contains('border-circle')).toBeTruthy();
    expect(span.style.backgroundColor).toBe('red');
    expect(span.style.width).toBe('32px');
    expect(span.style.height).toBe('32px');

    const svg = page.root.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('16px');
    expect(svg.getAttribute('height')).toBe('16px');
  });

  it('respects numeric size prop', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" size=50></mnt-icon>`,
    });

    page.rootInstance.size = 50;

    page.rootInstance.componentWillLoad();
    page.rootInstance.componentDidLoad();
    await page.waitForChanges();

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('50px');
    expect(svg.getAttribute('height')).toBe('50px');
  });
});
