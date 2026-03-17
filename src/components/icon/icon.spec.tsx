import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';

describe('<mnt-icon>', () => {
  describe('default rendering', () => {
    it('renders svg with medium size and currentColor fill', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search"></mnt-icon>`,
      });

      await page.waitForChanges();

      const svg = page.root.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg.getAttribute('width')).toBe('24px');
      expect(svg.getAttribute('height')).toBe('24px');
      expect(svg.getAttribute('fill')).toBe('currentColor');
    });

    it('wraps svg in a div with direction class', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search"></mnt-icon>`,
      });

      const wrapper = page.root.querySelector('.mnt-icon');
      expect(wrapper).not.toBeNull();
      expect(wrapper.tagName.toLowerCase()).toBe('div');

      const directionWrapper = page.root.querySelector('.mnt-icon-d-up');
      expect(directionWrapper).not.toBeNull();
    });

    it('does not render span without background', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search"></mnt-icon>`,
      });

      const span = page.root.querySelector('span');
      expect(span).toBeNull();
    });

    it('sets host element size to icon size when no background', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large"></mnt-icon>`,
      });

      await page.waitForChanges();

      expect(page.root.style.width).toBe('32px');
      expect(page.root.style.height).toBe('32px');
    });
  });

  describe('icon direction', () => {
    it('resolves base icon name and applies direction class', async () => {
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

        const wrapper = page.root.querySelector(`.mnt-icon-d-${expectedDirection}`);
        expect(wrapper).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((page.rootInstance as any).getBaseIconName(icon)).toBe(expectedBase);
      }
    });

    it('applies mnt-icon-d-down for arrow-down', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="arrow-down"></mnt-icon>`,
      });

      const wrapper = page.root.querySelector('.mnt-icon-d-down');
      expect(wrapper).not.toBeNull();
    });
  });

  describe('size prop', () => {
    it('applies all predefined sizes to svg dimensions', async () => {
      const testCases = [
        { size: 'tiny', expectedSize: '12px' },
        { size: 'small', expectedSize: '16px' },
        { size: 'medium', expectedSize: '24px' },
        { size: 'large', expectedSize: '32px' },
        { size: 'doubleLarge', expectedSize: '64px' },
      ];

      for (const { size, expectedSize } of testCases) {
        const page = await newSpecPage({
          components: [Icon],
          html: `<mnt-icon icon="search" size="${size}"></mnt-icon>`,
        });

        const svg = page.root.querySelector('svg');
        expect(svg.getAttribute('width')).toBe(expectedSize);
        expect(svg.getAttribute('height')).toBe(expectedSize);
      }
    });

    it('accepts numeric size as string', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="50"></mnt-icon>`,
      });

      await page.waitForChanges();

      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('width')).toBe('50px');
      expect(svg.getAttribute('height')).toBe('50px');
    });
  });

  describe('color prop', () => {
    it('uses currentColor as default fill', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search"></mnt-icon>`,
      });

      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('fill')).toBe('currentColor');
    });

    it('applies custom color to svg fill', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" color="#ff0000"></mnt-icon>`,
      });

      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('fill')).toBe('#ff0000');
    });
  });

  describe('background prop', () => {
    it('renders span element when background is provided', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="red"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
    });

    it('adds mnt-icon-with-background class when background is provided', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="red"></mnt-icon>`,
      });

      await page.waitForChanges();

      const wrapper = page.root.querySelector('.mnt-icon-with-background');
      expect(wrapper).not.toBeNull();
    });

    it('sets span and host to bgSize (iconSize + gap) and svg to iconSize', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="red"></mnt-icon>`,
      });

      await page.waitForChanges();

      // large: iconSize=32px, gap=16px → bgSize=48px
      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('width')).toBe('32px');
      expect(svg.getAttribute('height')).toBe('32px');

      const span = page.root.querySelector('span');
      expect(span.classList.contains('mnt-icon-bg')).toBeTruthy();
      expect(span.classList.contains('mnt-border-circle')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('red');
      expect(span.style.width).toBe('48px');
      expect(span.style.height).toBe('48px');

      expect(page.root.style.width).toBe('48px');
      expect(page.root.style.height).toBe('48px');
    });

    it('calculates bgSize as iconSize + gap for each predefined size', async () => {
      const testCases = [
        { size: 'tiny', iconSize: '12px', bgSize: '16px' },        // 12 + 4
        { size: 'small', iconSize: '16px', bgSize: '24px' },       // 16 + 8
        { size: 'medium', iconSize: '24px', bgSize: '36px' },      // 24 + 12
        { size: 'large', iconSize: '32px', bgSize: '48px' },       // 32 + 16
        { size: 'doubleLarge', iconSize: '64px', bgSize: '88px' }, // 64 + 24
      ];

      for (const { size, iconSize, bgSize } of testCases) {
        const page = await newSpecPage({
          components: [Icon],
          html: `<mnt-icon icon="search" size="${size}" background="blue"></mnt-icon>`,
        });

        await page.waitForChanges();

        const svg = page.root.querySelector('svg');
        expect(svg.getAttribute('width')).toBe(iconSize);

        const span = page.root.querySelector('span');
        expect(span.style.width).toBe(bgSize);
        expect(page.root.style.width).toBe(bgSize);
      }
    });

    it('defaults to circle shape when no bgShape is provided', async () => {
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

  describe('bgShape prop', () => {
    it('applies rounded shape', async () => {
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

    it('applies square shape', async () => {
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

    it('applies circle shape', async () => {
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
  });

  describe('background retrocompatibility', () => {
    it('supports JSON string format ["color", "shape"] from HTML attribute', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background='["#FFE1E1", "rounded"]'></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-rounded')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#FFE1E1');
    });

    it('supports JSON string format ["color", "shape"]', async () => {
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

    it('prioritizes bgShape over shape from JSON string format', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background="#E1F1FD" bg-shape="square"></mnt-icon>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('span');
      expect(span).not.toBeNull();
      expect(span.classList.contains('mnt-border-square')).toBeTruthy();
      expect(span.style.backgroundColor).toBe('#E1F1FD');
    });

    it('falls back to simple color with circle shape on invalid JSON', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      const page = await newSpecPage({
        components: [Icon],
        html: `<mnt-icon icon="search" size="large" background='[invalid json]'></mnt-icon>`,
      });

      await page.waitForChanges();

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
