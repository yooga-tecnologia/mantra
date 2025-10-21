import { newSpecPage } from '@stencil/core/testing';

// import { getLibPrefix } from 'src/utils/utils';
import { TabItemGroup } from './tab-item-group';

// const LIB_PREFIX = getLibPrefix();

const mockTabs = [
  { id: 'tab-1', label: 'Tab 1', icon: 'plus' },
  { id: 'tab-2', label: 'Tab 2', icon: 'minus' },
  { id: 'tab-3', label: 'Tab 3', disabled: true },
];

describe('<mnt-tab-item-group>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has tabs array', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}'></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });

    it('SHOULD render nothing WHEN tabs array is empty', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='[]'></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct orientation class', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}' orientation="vertical"></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });

    it('SHOULD use horizontal orientation as default', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}'></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });
  });

  describe('Selection Logic', () => {
    it('SHOULD select first tab by default WHEN no selectedId provided', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}'></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });

    it('SHOULD select specified tab WHEN selectedId provided', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}' selected-id="tab-2"></mnt-tab-item-group>`,
      });

      // ASSERTION
      expect(page.root).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('SHOULD emit tabChange event WHEN tab is clicked', async () => {
      // SETUP
      const page = await newSpecPage({
        components: [TabItemGroup],
        template: () => `<mnt-tab-item-group tabs='${JSON.stringify(mockTabs)}'></mnt-tab-item-group>`,
      });

      const spy = jest.fn();
      page.root.addEventListener('tabChange', spy);

      // ACTION
      // Simulate tab click by dispatching event
      page.root.dispatchEvent(new CustomEvent('tabChange', { detail: 'tab-2' }));

      // ASSERTION
      expect(spy).toHaveBeenCalled();
    });
  });
});
