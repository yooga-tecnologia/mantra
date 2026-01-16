import { newSpecPage } from '@stencil/core/testing';

import { getLibPrefix } from 'src/utils/utils';
import { LoadingState } from './loading-state';

const LIB_PREFIX = getLibPrefix();
const COMPONENT_PREFIX = `${LIB_PREFIX}loading-state`;

const DEFAULT_LABEL = 'Carregando...';

async function createLoadingStateComponent(html: string) {
  return await newSpecPage({
    components: [LoadingState],
    html,
  });
}

function getContainerElement(page: any) {
  return page.root;
}

function getSpinnerElement(page: any) {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-spinner`);
}

function getLabelElement(page: any) {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-label`);
}

describe('<mnt-loading-state>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state></mnt-loading-state>`);
      const container = getContainerElement(page);
      const spinner = getSpinnerElement(page);

      // ASSERTION
      expect(container).not.toBeNull();
      expect(spinner).not.toBeNull();
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-container`);
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-neutral`);
    });

    it('SHOULD render spinner element WHEN component is rendered', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state></mnt-loading-state>`);
      const spinner = getSpinnerElement(page);

      // ASSERTION
      expect(spinner).not.toBeNull();
      expect(spinner).toHaveClass(`${COMPONENT_PREFIX}-spinner`);
    });

    it('SHOULD render label WHEN label prop is provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state label="${DEFAULT_LABEL}"></mnt-loading-state>`);
      const label = getLabelElement(page);

      // ASSERTION
      expect(label).not.toBeNull();
      expect(label.textContent).toBe(DEFAULT_LABEL);
      expect(label.tagName.toLowerCase()).toBe('p');
    });

    it('SHOULD NOT render label WHEN label prop is not provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state></mnt-loading-state>`);
      const label = getLabelElement(page);

      // ASSERTION
      expect(label).toBeNull();
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD apply correct color class WHEN color prop is provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state color="primary"></mnt-loading-state>`);
      const container = getContainerElement(page);

      // ASSERTION
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-primary`);
    });

    it('SHOULD apply correct color class WHEN each color variant is provided', async () => {
      const colors = ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'];

      for (const color of colors) {
        // SETUP
        const page = await createLoadingStateComponent(`<mnt-loading-state color="${color}"></mnt-loading-state>`);
        const container = getContainerElement(page);

        // ASSERTION
        expect(container).toHaveClass(`${COMPONENT_PREFIX}-${color}`);
      }
    });

    it('SHOULD apply neutral color by default WHEN color prop is not provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state></mnt-loading-state>`);
      const container = getContainerElement(page);

      // ASSERTION
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-neutral`);
    });

    it('SHOULD update label WHEN label prop changes', async () => {
      // SETUP
      const newLabel = 'Novo carregamento...';
      const page = await createLoadingStateComponent(`<mnt-loading-state label="${DEFAULT_LABEL}"></mnt-loading-state>`);
      let label = getLabelElement(page);

      expect(label.textContent).toBe(DEFAULT_LABEL);

      // ACTION
      page.root.setAttribute('label', newLabel);
      await page.waitForChanges();

      // ASSERTION
      label = getLabelElement(page);
      expect(label.textContent).toBe(newLabel);
    });

    it('SHOULD update color class WHEN color prop changes', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state color="neutral"></mnt-loading-state>`);
      let container = getContainerElement(page);

      expect(container).toHaveClass(`${COMPONENT_PREFIX}-neutral`);

      // ACTION
      page.root.setAttribute('color', 'success');
      await page.waitForChanges();

      // ASSERTION
      container = getContainerElement(page);
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-success`);
      expect(container).not.toHaveClass(`${COMPONENT_PREFIX}-neutral`);
    });
  });

  describe('Structure', () => {
    it('SHOULD have spinner as first child WHEN rendered', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state label="${DEFAULT_LABEL}"></mnt-loading-state>`);
      const container = getContainerElement(page);
      const firstChild = container.children[0];

      // ASSERTION
      expect(firstChild).toHaveClass(`${COMPONENT_PREFIX}-spinner`);
      expect(firstChild.tagName.toLowerCase()).toBe('span');
    });

    it('SHOULD have label as second child WHEN label is provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state label="${DEFAULT_LABEL}"></mnt-loading-state>`);
      const container = getContainerElement(page);
      const secondChild = container.children[1];

      // ASSERTION
      expect(secondChild).toHaveClass(`${COMPONENT_PREFIX}-label`);
      expect(secondChild.tagName.toLowerCase()).toBe('p');
    });

    it('SHOULD only have spinner child WHEN label is not provided', async () => {
      // SETUP
      const page = await createLoadingStateComponent(`<mnt-loading-state></mnt-loading-state>`);
      const container = getContainerElement(page);

      // ASSERTION
      expect(container.children.length).toBe(1);
      expect(container.children[0]).toHaveClass(`${COMPONENT_PREFIX}-spinner`);
    });
  });
});
