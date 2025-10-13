import { newSpecPage } from '@stencil/core/testing';
import { Brand } from './brand';

describe('<mnt-brand>', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('height')).toBe('35');
    expect(svg.getAttribute('fill')).toBe('#31A3E1');
    expect(svg.getAttribute('viewBox')).toBe('0 0 128 32');

    // Verifica se o conteúdo SVG foi renderizado
    const g = svg.querySelector('g');
    expect(g).not.toBeNull();
    expect(g.innerHTML).toContain('path');
  });

  it('applies custom height correctly', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga" height="50"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('height')).toBe('50');
  });

  it('applies custom color correctly', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga" color="#ff0000"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('fill')).toBe('#ff0000');
  });

  it('uses default brand color when no color is provided', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="ifood"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('fill')).toBe('#E8222A');
  });

  it('renders different brands with correct properties', async () => {
    const brandTestCases = [
      {
        name: 'yooga',
        expectedViewBox: '0 0 128 32',
        expectedColor: '#31A3E1',
      },
      {
        name: 'yoogaIcon',
        expectedViewBox: '0 0 32 32',
        expectedColor: '#31A3E1',
      },
      {
        name: 'ifood',
        expectedViewBox: '0 0 96 48',
        expectedColor: '#E8222A',
      },
    ];

    for (const { name, expectedViewBox, expectedColor } of brandTestCases) {
      const page = await newSpecPage({
        components: [Brand],
        html: `<mnt-brand name="${name}"></mnt-brand>`,
      });

      const svg = page.root.querySelector('svg');
      expect(svg.getAttribute('viewBox')).toBe(expectedViewBox);
      expect(svg.getAttribute('fill')).toBe(expectedColor);
    }
  });

  it('overrides default brand color with custom color', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="ifood" color="#00ff00"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('fill')).toBe('#00ff00');
  });

  it('applies correct CSS classes', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga"></mnt-brand>`,
    });

    const wrapper = page.root.querySelector('div');
    expect(wrapper).not.toBeNull();
    expect(wrapper.classList.contains('mnt-illustration-wrapper')).toBeTruthy();

    const svg = page.root.querySelector('svg');
    expect(svg.classList.contains('d-flex')).toBeTruthy();
  });

  it('renders SVG with correct attributes', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga" height="40" color="#123456"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 128 32');
    expect(svg.getAttribute('height')).toBe('40');
    expect(svg.getAttribute('fill')).toBe('#123456');
  });

  it('maintains SVG content consistency', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga" height="60"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    const g = svg.querySelector('g');
    expect(g).not.toBeNull();
    expect(g.innerHTML).toContain('path');
    expect(svg.getAttribute('height')).toBe('60');
  });

  it('handles invalid brand name gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="invalidBrand"></mnt-brand>`,
    });

    expect(consoleSpy).toHaveBeenCalledWith('[Mantra]: Illustration with name "invalidBrand" does not exist.');

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('viewBox')).toBeNull();

    consoleSpy.mockRestore();
  });

  it('respects numeric height prop', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga" height="100"></mnt-brand>`,
    });

    await page.waitForChanges();

    const svg = page.root.querySelector('svg');
    expect(svg.getAttribute('height')).toBe('100');
  });

  it('uses default height when not specified', async () => {
    const page = await newSpecPage({
      components: [Brand],
      html: `<mnt-brand name="yooga"></mnt-brand>`,
    });

    const svg = page.root.querySelector('svg');
    expect(svg.getAttribute('height')).toBe('35');
  });
});
