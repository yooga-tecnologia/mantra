import { newSpecPage } from '@stencil/core/testing';
import { IconLarge } from './icon-large';

describe('<mnt-icon-large>', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="placeholder"></mnt-icon-large>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('width')).toBe('64px');
    expect(svg.getAttribute('height')).toBe('64px');
    expect(svg.getAttribute('fill')).toBe('currentColor');

    const span = page.root.querySelector('span');
    expect(span).toBeNull();
  });

  it('respects numeric size prop', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="gear"></mnt-icon-large>`,
    });

    // Simular uma prop number diretamente
    page.rootInstance.size = 50;
    page.rootInstance.calculateSizes();
    await page.waitForChanges();

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('50px');
    expect(svg.getAttribute('height')).toBe('50px');
  });

  it('respects numeric string size prop', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="gear" size="400"></mnt-icon-large>`,
    });

    await page.waitForChanges();

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('400px');
    expect(svg.getAttribute('height')).toBe('400px');
  });

  it('respects different predefined sizes', async () => {
    const sizeTestCases = [
      { size: 'tiny', expectedSize: '32px' },
      { size: 'small', expectedSize: '48px' },
      { size: 'medium', expectedSize: '64px' },
      { size: 'large', expectedSize: '96px' },
      { size: 'doubleLarge', expectedSize: '128px' },
    ];

    for (const { size, expectedSize } of sizeTestCases) {
      const page = await newSpecPage({
        components: [IconLarge],
        html: `<mnt-icon-large icon="gear" size="${size}"></mnt-icon-large>`,
      });

      const svg = page.root.querySelector('svg')!;
      expect(svg.getAttribute('width')).toBe(expectedSize);
      expect(svg.getAttribute('height')).toBe(expectedSize);
    }
  });

  it('respects custom color prop', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="gear" color="#ff0000"></mnt-icon-large>`,
    });

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('fill')).toBe('#ff0000');
  });

  it('handles invalid size gracefully', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="gear" size="invalid"></mnt-icon-large>`,
    });

    // Should fallback to default 'medium' size (64px) when invalid size is provided
    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('64px');
    expect(svg.getAttribute('height')).toBe('64px');
  });

  it('renders correctly with viewBox 64x64', async () => {
    const page = await newSpecPage({
      components: [IconLarge],
      html: `<mnt-icon-large icon="gear"></mnt-icon-large>`,
    });

    const svg = page.root.querySelector('svg')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 64 64');
  });
});
