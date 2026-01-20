import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { FilterSearch } from './filter-search';
import { getLibPrefix } from 'src/utils/utils';

const LIB_PREFIX = getLibPrefix();
const COMPONENT_PREFIX = `${LIB_PREFIX}filter-search`;

async function createFilterSearchComponent(html: string) {
  return await newSpecPage({
    components: [FilterSearch],
    html,
  });
}

function getInputElement(page: SpecPage): HTMLInputElement {
  return page.root.querySelector('input');
}

function getContainerElement(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}`);
}

function getSearchIcon(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-search-icon`);
}

function getClearIcon(page: SpecPage): HTMLElement {
  return page.root.querySelector(`.${COMPONENT_PREFIX}-clear-icon`);
}

describe('<mnt-filter-search>', () => {
  describe('Rendering', () => {
    it('SHOULD render correctly WHEN has default props', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const container = getContainerElement(page);
      const input = getInputElement(page);

      // ASSERTION
      expect(container).not.toBeNull();
      expect(input).not.toBeNull();
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-medium`);
    });

    it('SHOULD render input element correctly', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search name="searchInput"></mnt-filter-search>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
      expect(input.name).toBe('searchInput');
    });

    it('SHOULD render search icon WHEN input is empty', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const searchIcon = getSearchIcon(page);
      const clearIcon = getClearIcon(page);

      // ASSERTION
      expect(searchIcon).not.toBeNull();
      expect(searchIcon.getAttribute('icon')).toBe('magnifyingGlass');
      expect(clearIcon).toBeNull();
    });

    it('SHOULD render all sizes correctly', async () => {
      const sizes = ['small', 'medium', 'large'];
      
      for (const size of sizes) {
        // SETUP
        const page = await createFilterSearchComponent(`<mnt-filter-search size="${size}"></mnt-filter-search>`);
        const container = getContainerElement(page);

        // ASSERTION
        expect(container).toHaveClass(`${COMPONENT_PREFIX}-${size}`);
      }
    });

    it('SHOULD apply full-width class WHEN full-width is true', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search full-width="true"></mnt-filter-search>');
      const container = getContainerElement(page);

      // ASSERTION
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-full-width`);
    });

    it('SHOULD set default name attribute WHEN name is not provided', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      await page.waitForChanges();
      const input = getInputElement(page);

      // ASSERTION
      expect(input.name).toBe('mnt-filter-search');
    });
  });

  describe('Icon Toggle', () => {
    it('SHOULD show search icon WHEN input is empty', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const searchIcon = getSearchIcon(page);
      const clearIcon = getClearIcon(page);

      // ASSERTION
      expect(searchIcon).not.toBeNull();
      expect(clearIcon).toBeNull();
    });

    it('SHOULD show clear icon WHEN input has value', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // ACTION
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ASSERTION
      const searchIcon = getSearchIcon(page);
      const clearIcon = getClearIcon(page);
      expect(searchIcon).toBeNull();
      expect(clearIcon).not.toBeNull();
    });

    it('SHOULD toggle between icons WHEN typing and clearing', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // ACTION: Type
      input.value = 'search';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ASSERTION: Clear icon visible
      expect(getSearchIcon(page)).toBeNull();
      expect(getClearIcon(page)).not.toBeNull();

      // ACTION: Clear
      input.value = '';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ASSERTION: Search icon visible
      expect(getSearchIcon(page)).not.toBeNull();
      expect(getClearIcon(page)).toBeNull();
    });

    it('SHOULD maintain correct icon WHEN blur occurs', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // ACTION: Type and blur
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();

      // ASSERTION
      expect(getClearIcon(page)).not.toBeNull();
      expect(getSearchIcon(page)).toBeNull();
    });
  });

  describe('Props and Attributes', () => {
    it('SHOULD propagate placeholder to input', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search placeholder="Search here..."></mnt-filter-search>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.placeholder).toBe('Search here...');
    });

    it('SHOULD propagate disabled to input', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search disabled></mnt-filter-search>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.disabled).toBe(true);
    });

    it('SHOULD propagate required to input', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search required></mnt-filter-search>');
      const input = getInputElement(page);

      // ASSERTION
      expect(input.required).toBe(true);
    });

    it('SHOULD update value WHEN value prop changes', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search value="initial"></mnt-filter-search>');
      const input = getInputElement(page);

      expect(input.value).toBe('initial');

      // ACTION
      page.root.setAttribute('value', 'updated');
      await page.waitForChanges();

      // ASSERTION
      expect(input.value).toBe('updated');
    });

    it('SHOULD apply correct classes WHEN size and state are provided', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search size="large" state="error"></mnt-filter-search>');
      const container = getContainerElement(page);

      // ASSERTION
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-large`);
      expect(container).toHaveClass(`${COMPONENT_PREFIX}-error`);
    });
  });

  describe('Events', () => {
    it('SHOULD emit valueChange event WHEN input changes', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('valueChange', spy);

      // ACTION
      input.value = 'test value';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail.value).toBe('test value');
    });

    it('SHOULD emit filterApplied event WHEN blur occurs', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('filterApplied', spy);

      // ACTION
      input.value = 'filter text';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail.value).toBe('filter text');
    });

    it('SHOULD emit filterApplied event WHEN clear is clicked', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('filterApplied', spy);

      // ACTION: Type to show clear icon
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ACTION: Click clear icon
      const clearIcon = getClearIcon(page);
      clearIcon.click();
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail.value).toBe('');
    });

    it('SHOULD NOT emit events WHEN disabled', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search disabled></mnt-filter-search>');
      const input = getInputElement(page);
      const valueChangeSpy = jest.fn();
      const filterAppliedSpy = jest.fn();
      page.root.addEventListener('valueChange', valueChangeSpy);
      page.root.addEventListener('filterApplied', filterAppliedSpy);

      // ACTION
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();

      // ASSERTION
      expect(valueChangeSpy).not.toHaveBeenCalled();
      expect(filterAppliedSpy).not.toHaveBeenCalled();
    });

    it('SHOULD emit correct value in events', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const valueChangeSpy = jest.fn();
      const filterAppliedSpy = jest.fn();
      page.root.addEventListener('valueChange', valueChangeSpy);
      page.root.addEventListener('filterApplied', filterAppliedSpy);

      // ACTION
      input.value = 'correct value';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();

      // ASSERTION
      expect(valueChangeSpy.mock.calls[0][0].detail.value).toBe('correct value');
      expect(filterAppliedSpy.mock.calls[0][0].detail.value).toBe('correct value');
    });
  });

  describe('Clear Functionality', () => {
    it('SHOULD clear input WHEN clear icon is clicked', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // ACTION: Type to show clear icon
      input.value = 'text to clear';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(input.value).toBe('text to clear');

      // ACTION: Click clear icon
      const clearIcon = getClearIcon(page);
      clearIcon.click();
      await page.waitForChanges();

      // ASSERTION
      expect(input.value).toBe('');
    });

    it('SHOULD focus input WHEN clear icon is clicked', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const focusSpy = jest.spyOn(input, 'focus');

      // ACTION: Type to show clear icon
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // ACTION: Click clear icon
      const clearIcon = getClearIcon(page);
      clearIcon.click();
      await page.waitForChanges();

      // ASSERTION
      expect(focusSpy).toHaveBeenCalled();
    });

    it('SHOULD hide clear icon WHEN clear is clicked', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // ACTION: Type to show clear icon
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(getClearIcon(page)).not.toBeNull();

      // ACTION: Click clear icon
      const clearIcon = getClearIcon(page);
      clearIcon.click();
      await page.waitForChanges();

      // ASSERTION
      expect(getClearIcon(page)).toBeNull();
      expect(getSearchIcon(page)).not.toBeNull();
    });

    it('SHOULD emit both valueChange and filterApplied WHEN clear is clicked', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const valueChangeSpy = jest.fn();
      const filterAppliedSpy = jest.fn();
      page.root.addEventListener('valueChange', valueChangeSpy);
      page.root.addEventListener('filterApplied', filterAppliedSpy);

      // ACTION: Type to show clear icon
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      // Clear previous spy calls
      valueChangeSpy.mockClear();
      filterAppliedSpy.mockClear();

      // ACTION: Click clear icon
      const clearIcon = getClearIcon(page);
      clearIcon.click();
      await page.waitForChanges();

      // ASSERTION
      expect(valueChangeSpy).toHaveBeenCalled();
      expect(valueChangeSpy.mock.calls[0][0].detail.value).toBe('');
      expect(filterAppliedSpy).toHaveBeenCalled();
      expect(filterAppliedSpy.mock.calls[0][0].detail.value).toBe('');
    });
  });

  describe('Focus/Blur Behavior', () => {
    it('SHOULD update showClearButton WHEN focus occurs', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search value="existing"></mnt-filter-search>');
      const input = getInputElement(page);
      await page.waitForChanges();

      // ACTION
      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // ASSERTION
      expect(getClearIcon(page)).not.toBeNull();
    });

    it('SHOULD apply filter WHEN blur occurs', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);
      const spy = jest.fn();
      page.root.addEventListener('filterApplied', spy);

      // ACTION
      input.value = 'search term';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();

      // ASSERTION
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail.value).toBe('search term');
    });

    it('SHOULD maintain correct state WHEN multiple focus/blur cycles', async () => {
      // SETUP
      const page = await createFilterSearchComponent('<mnt-filter-search></mnt-filter-search>');
      const input = getInputElement(page);

      // CYCLE 1: Type and blur
      input.value = 'first';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(getClearIcon(page)).not.toBeNull();

      // CYCLE 2: Focus, clear, blur
      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      input.value = '';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(getSearchIcon(page)).not.toBeNull();

      // CYCLE 3: Focus, type, blur
      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      input.value = 'second';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(getClearIcon(page)).not.toBeNull();
    });
  });
});
