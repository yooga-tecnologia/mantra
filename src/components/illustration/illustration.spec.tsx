import { newSpecPage } from '@stencil/core/testing';

import { Illustration } from './illustration';
import { ILLUSTRATIONS } from './illustration-base';

function createSvgGElement(content: string): SVGElement {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.innerHTML = content;
  return g;
}

function normalizeSVG(svg: string): string {
  return svg.replace(/\s+/g, ' ').trim();
}

describe('<mnt-illustration>', () => {
  it('should render the component', async () => {
    const page = await newSpecPage({
      components: [Illustration],
      html: `<mnt-illustration name="crying"></mnt-illustration>`,
    });
    expect(page.root).toBeTruthy();

    const svg = page.root.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('should inject the SVG content into the <g> element', async () => {
    const illustrationContent = ILLUSTRATIONS['crying'] || '';
    const page = await newSpecPage({
      components: [Illustration],
      html: `<mnt-illustration name="crying"></mnt-illustration>`,
    });

    await page.waitForChanges();

    const gElement = page.root.querySelector('g');
    expect(gElement).not.toBeNull();

    const expectedG = createSvgGElement(illustrationContent);
    expect(normalizeSVG(gElement.innerHTML)).toBe(normalizeSVG(expectedG.innerHTML));
  });

  it('should update the illustration when the "name" property is changed', async () => {
    const page = await newSpecPage({
      components: [Illustration],
      html: `<mnt-illustration name="crying"></mnt-illustration>`,
    });

    page.root.setAttribute('name', 'happy');
    await page.waitForChanges();

    const gElement = page.root.querySelector('g');
    expect(gElement).not.toBeNull();

    const illustrationContent = ILLUSTRATIONS['happy'] || '';
    const expectedG = createSvgGElement(illustrationContent);
    expect(normalizeSVG(gElement.innerHTML)).toBe(normalizeSVG(expectedG.innerHTML));
  });
});
