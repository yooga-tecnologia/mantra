import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';

describe('<mnt-icon>', () => {
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

    // Verifica que o wrapper tem a classe de direção padrão
    const wrapper = page.root.querySelector('.mnt-icon-d-up');
    expect(wrapper).not.toBeNull();

    const span = page.root.querySelector('span');
    expect(span).toBeNull();
  });

  it('transform and base icon name mapping', async () => {
    const testCases = [
      { icon: 'arrow-up', expectedDirection: 'up', expectedBase: 'arrow' },
      { icon: 'arrow-down', expectedDirection: 'down', expectedBase: 'arrow' },
      { icon: 'arrow-right', expectedDirection: 'right', expectedBase: 'arrow' },
      { icon: 'arrow-left', expectedDirection: 'left', expectedBase: 'arrow' },
      { icon: 'search', expectedDirection: 'up', expectedBase: 'search' },
    ];

    for (const { icon, expectedDirection, expectedBase } of testCases) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="${icon}"></mnt-icon>`,
      });

      // Verifica que o wrapper tem a classe de direção correta
      const wrapper = page.root.querySelector(`.mnt-icon-d-${expectedDirection}`);
      expect(wrapper).not.toBeNull();
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
    
    // Verifica que o wrapper tem a classe de direção 'down'
    const wrapper = page.root.querySelector('.mnt-icon-d-down');
    expect(wrapper).not.toBeNull();
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
    expect(span.classList.contains('mnt-icon-bg')).toBeTruthy();
    expect(span.classList.contains('mnt-border-circle')).toBeTruthy();
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
      html: `<mnt-icon icon="search" size="50"></mnt-icon>`,
    });

    await page.waitForChanges();

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('50px');
    expect(svg.getAttribute('height')).toBe('50px');
  });

  it('shows warning when using background with small sizes', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" size="small" background="red"></mnt-icon>`,
    });

    await page.waitForChanges();

    expect(consoleSpy).toHaveBeenCalledWith(
      `[mnt-icon] Background property is not recommended for sizes smaller than 'large' (32px). ` +
        `Current size: 16px. Consider using 'large' or 'doubleLarge' for better visual results.`,
    );

    consoleSpy.mockRestore();
  });

  it('respects different predefined sizes', async () => {
    const sizeTestCases = [
      { size: 'tiny', expectedSize: '12px' },
      { size: 'small', expectedSize: '16px' },
      { size: 'medium', expectedSize: '24px' },
      { size: 'large', expectedSize: '32px' },
      { size: 'doubleLarge', expectedSize: '64px' },
    ];

    for (const { size, expectedSize } of sizeTestCases) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="${size}"></mnt-icon>`,
      });

      const svg = page.root.querySelector('svg')!;
      expect(svg.getAttribute('width')).toBe(expectedSize);
      expect(svg.getAttribute('height')).toBe(expectedSize);
    }
  });

  it('respects custom color prop', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" color="#ff0000"></mnt-icon>`,
    });

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('fill')).toBe('#ff0000');
  });

  it('does not show warning when using background with large sizes', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" size="large" background="blue"></mnt-icon>`,
    });

    await page.waitForChanges();

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('handles background without proper size gracefully', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<mnt-icon icon="search" size="medium" background="green"></mnt-icon>`,
    });

    // Should render without crashing even though background won't work optimally
    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('width')).toBe('24px');

    // Background span IS created but without proper sizing since size <= medium
    const span = page.root.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.style.width).toBe(''); // No width/height set for medium size
  });

  describe('bgShape property', () => {
    it('should apply bgShape correctly when provided with background', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="#E1F1FD" bg-shape="rounded"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-rounded')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#E1F1FD');
    });

    it('should apply square shape when bgShape is square', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="#DCFCEA" bg-shape="square"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-square')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#DCFCEA');
    });

    it('should apply circle shape when bgShape is circle', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="#E5E7E8" bg-shape="circle"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-circle')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#E5E7E8');
    });

    it('should default to circle when background is provided without bgShape', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="#E5E7E8"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-circle')).toBeTruthy();
    });
  });

  describe('background retrocompatibility', () => {
    it('should still support array format for background', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large"></mnt-icon>`,
      });

      // Simulate array format
      page.rootInstance.background = ['#FFE1E1', 'rounded'];
      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-rounded')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#FFE1E1');
    });

    it('should still support JSON string format for background', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background='["#DCFCEA", "square"]'></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-square')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#DCFCEA');
    });

    it('should prioritize bgShape over array format', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large"></mnt-icon>`,
      });

      // Set both bgShape and background as array
      page.rootInstance.background = ['#E1F1FD', 'circle'];
      page.rootInstance.bgShape = 'square';
      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      // bgShape should take priority
      expect(span.classList.contains('mnt-border-square')).toBeTruthy();
      // But color should come from background (first element of array in this case is ignored)
      expect(span.style.backgroundColor).toBe('#E1F1FD');
    });

    it('should handle invalid JSON gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background='[invalid json]'></mnt-icon>`,
      });

      await page.waitForChanges();

      // Should fallback to treating as simple color with circle shape
      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-circle')).toBeTruthy();
      expect(consoleSpy).toHaveBeenCalledWith(
        '[MANTRA][mnt-icon] Error parsing background:',
        expect.any(SyntaxError),
      );

      consoleSpy.mockRestore();
    });
  });
});
