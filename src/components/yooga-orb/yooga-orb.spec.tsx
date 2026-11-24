import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { YOOGA_ICON_PATH } from '../brand/brand-base';
import { YoogaOrb } from './yooga-orb';
import { YOOGA_ORB_BLOOM_DURATION_MS } from './yooga-orb.types';

const renderOrb = (attributes = ''): Promise<SpecPage> =>
  newSpecPage({
    components: [YoogaOrb],
    html: `<mnt-yooga-orb ${attributes}></mnt-yooga-orb>`,
  });

const getBloom = (page: SpecPage) => page.root!.querySelector('.mnt-yooga-orb-bloom');

const waitBloomEnd = async (page: SpecPage): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, YOOGA_ORB_BLOOM_DURATION_MS + 50));
  await page.waitForChanges();
};

describe('<mnt-yooga-orb>', () => {
  describe('default rendering', () => {
    it('renders idle state with sm size', async () => {
      const page = await renderOrb();
      const svg = page.root!.querySelector('svg');

      expect(page.root!.getAttribute('data-state')).toBe('idle');
      expect(svg!.getAttribute('width')).toBe('32px');
      expect(svg!.getAttribute('height')).toBe('32px');
    });

    it('uses the official yoogaIcon geometry in a 32x32 viewBox', async () => {
      const page = await renderOrb();
      const svg = page.root!.querySelector('svg');
      const logoPaths = svg!.querySelectorAll('.mnt-yooga-orb-base, .mnt-yooga-orb-lit');

      expect(svg!.getAttribute('viewBox')).toBe('0 0 32 32');
      expect(logoPaths).toHaveLength(2);
      logoPaths.forEach((path) => expect(path.getAttribute('d')).toBe(YOOGA_ICON_PATH));
    });

    it('renders the reveal mask with 3 links and 4 molecules', async () => {
      const page = await renderOrb();
      const mask = page.root!.querySelector('mask');

      expect(mask!.querySelectorAll('.mnt-yooga-orb-link')).toHaveLength(3);
      expect(mask!.querySelectorAll('.mnt-yooga-orb-core')).toHaveLength(4);
    });
  });

  describe('size', () => {
    it.each([
      ['sm', '32px'],
      ['md', '40px'],
      ['lg', '64px'],
      ['48', '48px'],
      ['invalid', '32px'],
    ])('size="%s" renders %s', async (size, expected) => {
      const page = await renderOrb(`size="${size}"`);
      const svg = page.root!.querySelector('svg');

      expect(svg!.getAttribute('width')).toBe(expected);
      expect(svg!.getAttribute('height')).toBe(expected);
    });

    it('accepts a numeric size property', async () => {
      const page = await renderOrb();
      page.root!.size = 80;
      await page.waitForChanges();

      expect(page.root!.querySelector('svg')!.getAttribute('width')).toBe('80px');
    });
  });

  describe('unique ids', () => {
    it('gives each instance its own mask and gradient ids', async () => {
      const page = await newSpecPage({
        components: [YoogaOrb],
        html: `<mnt-yooga-orb></mnt-yooga-orb><mnt-yooga-orb></mnt-yooga-orb>`,
      });
      const [first, second] = Array.from(page.body.querySelectorAll('mnt-yooga-orb'));

      const firstMaskId = first.querySelector('mask')!.id;
      const secondMaskId = second.querySelector('mask')!.id;
      const firstGradientId = first.querySelector('linearGradient')!.id;
      const secondGradientId = second.querySelector('linearGradient')!.id;

      expect(firstMaskId).not.toBe(secondMaskId);
      expect(firstGradientId).not.toBe(secondGradientId);
      expect(first.querySelector('.mnt-yooga-orb-lit')!.getAttribute('mask')).toBe(`url(#${firstMaskId})`);
      expect(second.querySelector('.mnt-yooga-orb-lit')!.getAttribute('mask')).toBe(`url(#${secondMaskId})`);
      expect(first.querySelector('.mnt-yooga-orb-base')!.getAttribute('fill')).toBe(`url(#${firstGradientId})`);
      expect(second.querySelector('.mnt-yooga-orb-base')!.getAttribute('fill')).toBe(`url(#${secondGradientId})`);
    });
  });

  describe('halo', () => {
    it.each([
      ['idle', false],
      ['thinking', true],
      ['settled', false],
    ])('state="%s" renders halo: %s', async (state, hasHalo) => {
      const page = await renderOrb(`state="${state}"`);

      expect(!!page.root!.querySelector('.mnt-yooga-orb-halo')).toBe(hasHalo);
    });
  });

  describe('bloom', () => {
    it('does not bloom when mounted already settled', async () => {
      const page = await renderOrb('state="settled"');

      expect(getBloom(page)).toBeNull();
    });

    it('blooms once when going from thinking to settled and clears after 1s', async () => {
      const page = await renderOrb('state="thinking"');

      page.root!.state = 'settled';
      await page.waitForChanges();
      expect(getBloom(page)).not.toBeNull();

      await waitBloomEnd(page);
      expect(getBloom(page)).toBeNull();
    });

    it('does not bloom when going from idle to settled', async () => {
      const page = await renderOrb('state="idle"');

      page.root!.state = 'settled';
      await page.waitForChanges();

      expect(getBloom(page)).toBeNull();
    });

    it('blooms when the bloom prop is activated', async () => {
      const page = await renderOrb('state="settled"');

      page.root!.bloom = true;
      await page.waitForChanges();

      expect(getBloom(page)).not.toBeNull();
    });

    it('blooms when mounted with the bloom prop active', async () => {
      const page = await renderOrb('state="settled" bloom');

      expect(getBloom(page)).not.toBeNull();
    });

    it('does not bloom again when the bloom prop is deactivated', async () => {
      const page = await renderOrb('state="settled" bloom');
      await waitBloomEnd(page);

      page.root!.bloom = false;
      await page.waitForChanges();

      expect(getBloom(page)).toBeNull();
    });

    it('clears the pending bloom timer when disconnected', async () => {
      const page = await renderOrb('state="thinking"');
      page.root!.state = 'settled';
      await page.waitForChanges();
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      page.root!.remove();
      await page.waitForChanges();

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('accessibility', () => {
    it.each([
      ['idle', 'Maya'],
      ['thinking', 'Maya está pensando'],
      ['settled', 'Maya'],
    ])('state="%s" has default label "%s"', async (state, label) => {
      const page = await renderOrb(`state="${state}"`);

      expect(page.root!.getAttribute('role')).toBe('img');
      expect(page.root!.getAttribute('aria-label')).toBe(label);
    });

    it('uses a custom label when provided', async () => {
      const page = await renderOrb('state="thinking" label="Assistente"');

      expect(page.root!.getAttribute('aria-label')).toBe('Assistente');
    });

    it('hides from screen readers when decorative', async () => {
      const page = await renderOrb('decorative');

      expect(page.root!.getAttribute('aria-hidden')).toBe('true');
      expect(page.root!.hasAttribute('role')).toBe(false);
      expect(page.root!.hasAttribute('aria-label')).toBe(false);
    });

    it('always hides the inner svg', async () => {
      const page = await renderOrb();

      expect(page.root!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
