import { newSpecPage } from '@stencil/core/testing';

import { OptionsList } from './options-list';
import { parseItems, normalizeItem } from './options-list.types';

async function createComponent(html: string) {
  return newSpecPage({ components: [OptionsList], html });
}

// Items live in the portal (document.body), not inside page.root
function getItems(page: ReturnType<typeof newSpecPage> extends Promise<infer T> ? T : never) {
  return page.body.querySelectorAll('.mnt-options-list-item');
}

describe('normalizeItem()', () => {
  it('SHOULD normalize a string into value and label', () => {
    expect(normalizeItem('item1')).toEqual({ value: 'item1', label: 'item1' });
  });

  it('SHOULD normalize a key-value object {key: label} format', () => {
    expect(normalizeItem({ es: 'Espírito Santo' })).toEqual({ value: 'es', label: 'Espírito Santo' });
  });

  it('SHOULD normalize an explicit {value, label} object format', () => {
    expect(normalizeItem({ value: '1', label: 'Option 1' })).toEqual({ value: '1', label: 'Option 1' });
  });

  it('SHOULD return empty strings for an empty object', () => {
    expect(normalizeItem({})).toEqual({ value: '', label: '' });
  });
});

describe('parseItems()', () => {
  it('SHOULD parse a JSON string array', () => {
    const result = parseItems('["item1", "item2"]');
    expect(result).toEqual([
      { value: 'item1', label: 'item1' },
      { value: 'item2', label: 'item2' },
    ]);
  });

  it('SHOULD parse a JSON key-value object array', () => {
    const result = parseItems('[{"es": "Espírito Santo"}, {"sp": "São Paulo"}]');
    expect(result).toEqual([
      { value: 'es', label: 'Espírito Santo' },
      { value: 'sp', label: 'São Paulo' },
    ]);
  });

  it('SHOULD parse an explicit {value, label} array', () => {
    const result = parseItems('[{"value": "1", "label": "Option 1"}, {"value": "2", "label": "Option 2"}]');
    expect(result).toEqual([
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ]);
  });

  it('SHOULD return empty array for invalid JSON', () => {
    expect(parseItems('invalid json')).toEqual([]);
  });

  it('SHOULD return empty array for non-array JSON', () => {
    expect(parseItems('{"key": "value"}')).toEqual([]);
  });

  it('SHOULD return empty array for empty string', () => {
    expect(parseItems('')).toEqual([]);
  });

  it('SHOULD parse a direct array of strings (Angular property binding)', () => {
    const result = parseItems(['item1', 'item2']);
    expect(result).toEqual([
      { value: 'item1', label: 'item1' },
      { value: 'item2', label: 'item2' },
    ]);
  });

  it('SHOULD parse a direct array of key-value objects (Angular property binding)', () => {
    const result = parseItems([{ es: 'Espírito Santo' }, { sp: 'São Paulo' }]);
    expect(result).toEqual([
      { value: 'es', label: 'Espírito Santo' },
      { value: 'sp', label: 'São Paulo' },
    ]);
  });

  it('SHOULD parse a direct array of explicit {value, label} objects (Angular property binding)', () => {
    const result = parseItems([{ value: '1', label: 'Option 1' }]);
    expect(result).toEqual([{ value: '1', label: 'Option 1' }]);
  });
});

describe('mnt-options-list', () => {
  describe('Label', () => {
    it('SHOULD NOT render a label element when labelText is not provided', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      expect(page.root.querySelector('.mnt-options-list-label')).toBeNull();
    });

    it('SHOULD render a label element when labelText is provided', async () => {
      const page = await createComponent(`<mnt-options-list label-text="Impressora"></mnt-options-list>`);
      const label = page.root.querySelector('.mnt-options-list-label label');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('Impressora');
    });

    it('SHOULD render required asterisk when labelText and required attribute are set', async () => {
      const page = await createComponent(`<mnt-options-list label-text="Impressora" required></mnt-options-list>`);
      const asterisk = page.root.querySelector('.text-color-primary');
      expect(asterisk).not.toBeNull();
    });

    it('SHOULD NOT render required asterisk when required attribute is absent', async () => {
      const page = await createComponent(`<mnt-options-list label-text="Impressora"></mnt-options-list>`);
      expect(page.root.querySelector('.text-color-primary')).toBeNull();
    });

    it('SHOULD set aria-labelledby on header when labelText is provided', async () => {
      const page = await createComponent(`<mnt-options-list label-text="Impressora"></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');
      expect(header.getAttribute('aria-labelledby')).toBeTruthy();
    });

    it('SHOULD NOT set aria-labelledby on header when labelText is absent', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');
      expect(header.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('Array property binding (e.g. Angular [items]="array")', () => {
    it('SHOULD render items when items prop is set as a direct array', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);

      // Simulate Angular property binding: sets the JS property directly (not attribute)
      (page.root as any).items = [{ es: 'Espírito Santo' }, { sp: 'São Paulo' }];
      await page.waitForChanges();

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(2);
    });

    it('SHOULD emit correct value and label when item from array binding is selected', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      const spy = jest.fn();
      page.root.addEventListener('optionSelect', spy);

      (page.root as any).items = [{ es: 'Espírito Santo' }, { sp: 'São Paulo' }];
      await page.waitForChanges();

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[1] as HTMLElement).click();
      await page.waitForChanges();

      const detail = spy.mock.calls[0][0].detail;
      expect(detail.value).toBe('sp');
      expect(detail.label).toBe('São Paulo');
    });
  });

  describe('Rendering', () => {
    it('SHOULD render with no items in portal initially (closed state)', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b","c"]'></mnt-options-list>`);
      expect(getItems(page).length).toBe(0);
    });

    it('SHOULD render items in portal after header is clicked', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b","c"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(3);
    });

    it('SHOULD render the correct number of items from a string array when open', async () => {
      const page = await createComponent(`<mnt-options-list items='["item1","item2","item3"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(3);
    });

    it('SHOULD render the correct number of items from a key-value array when open', async () => {
      const page = await createComponent(
        `<mnt-options-list items='[{"es":"Espírito Santo"},{"sp":"São Paulo"}]'></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(2);
    });

    it('SHOULD render the correct number of items from explicit {value,label} format when open', async () => {
      const page = await createComponent(
        `<mnt-options-list items='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(2);
    });
  });

  describe('Toggle behavior', () => {
    it('SHOULD NOT have open class on host initially', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);
      expect(page.root).not.toHaveClass('mnt-options-list-open');
    });

    it('SHOULD close the portal after clicking an item', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const item = getItems(page)[0] as HTMLElement;
      item.click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(0);
    });

    it('SHOULD toggle closed when header is clicked again', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(getItems(page).length).toBe(0);
    });

    it('SHOULD set aria-expanded="true" on header when open', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');

      expect(header.getAttribute('aria-expanded')).toBe('false');

      (header as HTMLElement).click();
      await page.waitForChanges();

      expect(header.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Placeholder', () => {
    it('SHOULD display placeholder text when no item is selected', async () => {
      const page = await createComponent(`<mnt-options-list placeholder="Selecione uma opção"></mnt-options-list>`);
      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text.textContent).toBe('Selecione uma opção');
    });

    it('SHOULD apply placeholder class when no item is selected', async () => {
      const page = await createComponent(`<mnt-options-list placeholder="Placeholder"></mnt-options-list>`);
      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text).toHaveClass('mnt-options-list-display-text-placeholder');
    });

    it('SHOULD replace placeholder with selected item label after selection', async () => {
      const page = await createComponent(
        `<mnt-options-list placeholder="Selecione" items='["a","b"]'></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[0] as HTMLElement).click();
      await page.waitForChanges();

      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text.textContent).toBe('a');
      expect(text).not.toHaveClass('mnt-options-list-display-text-placeholder');
    });
  });

  describe('Pre-selected value', () => {
    it('SHOULD display selected item label in header when value is pre-set', async () => {
      const page = await createComponent(
        `<mnt-options-list placeholder="Selecione" items='[{"es":"Espírito Santo"},{"sp":"São Paulo"}]' value="sp"></mnt-options-list>`,
      );
      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text.textContent).toBe('São Paulo');
    });

    it('SHOULD apply selected class to pre-selected item when list is opened', async () => {
      const page = await createComponent(
        `<mnt-options-list items='["a","b","c"]' value="b"></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const items = getItems(page);
      expect(items[1]).toHaveClass('mnt-options-list-item-selected');
      expect(items[0]).not.toHaveClass('mnt-options-list-item-selected');
    });

    it('SHOULD fall back to placeholder when value does not match any item', async () => {
      const page = await createComponent(
        `<mnt-options-list placeholder="Fallback" items='["item1"]' value="nonexistent"></mnt-options-list>`,
      );
      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text.textContent).toBe('Fallback');
    });
  });

  describe('Selection', () => {
    it('SHOULD render checkmark icon only on selected item', async () => {
      const page = await createComponent(
        `<mnt-options-list items='["a","b"]' value="a"></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const checkIcons = page.body.querySelectorAll('.mnt-options-list-item-check');
      expect(checkIcons.length).toBe(1);
    });

    it('SHOULD update selected item when clicked', async () => {
      const page = await createComponent(
        `<mnt-options-list items='["a","b","c"]'></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[1] as HTMLElement).click();
      await page.waitForChanges();

      // Re-open to verify selection
      (header as HTMLElement).click();
      await page.waitForChanges();

      const updatedItems = getItems(page);
      expect(updatedItems[1]).toHaveClass('mnt-options-list-item-selected');
      expect(updatedItems[0]).not.toHaveClass('mnt-options-list-item-selected');
    });

    it('SHOULD deselect item when clicking the already-selected item', async () => {
      const page = await createComponent(
        `<mnt-options-list items='["a","b"]' value="a"></mnt-options-list>`,
      );

      const spy = jest.fn();
      page.root.addEventListener('optionSelect', spy);

      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;
      header.click();
      await page.waitForChanges();

      (getItems(page)[0] as HTMLElement).click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toBeNull();
    });

    it('SHOULD show placeholder again after deselecting', async () => {
      const page = await createComponent(
        `<mnt-options-list placeholder="Selecione" items='["a","b"]' value="a"></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;
      header.click();
      await page.waitForChanges();

      (getItems(page)[0] as HTMLElement).click();
      await page.waitForChanges();

      const text = page.root.querySelector('.mnt-options-list-display-text');
      expect(text.textContent).toBe('Selecione');
      expect(text).toHaveClass('mnt-options-list-display-text-placeholder');
    });
  });

  describe('Events', () => {
    it('SHOULD emit optionSelect with value and label when item is clicked', async () => {
      const page = await createComponent(
        `<mnt-options-list items='[{"es":"Espírito Santo"},{"sp":"São Paulo"}]'></mnt-options-list>`,
      );

      const spy = jest.fn();
      page.root.addEventListener('optionSelect', spy);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[1] as HTMLElement).click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.value).toBe('sp');
      expect(detail.label).toBe('São Paulo');
    });

    it('SHOULD emit optionSelect with value and label for {value,label} format item', async () => {
      const page = await createComponent(
        `<mnt-options-list items='[{"value":"1","label":"Option 1"}]'></mnt-options-list>`,
      );

      const spy = jest.fn();
      page.root.addEventListener('optionSelect', spy);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[0] as HTMLElement).click();
      await page.waitForChanges();

      const detail = spy.mock.calls[0][0].detail;
      expect(detail.value).toBe('1');
      expect(detail.label).toBe('Option 1');
    });
  });

  describe('Accessibility', () => {
    it('SHOULD have role="combobox" on the header', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');
      expect(header.getAttribute('role')).toBe('combobox');
    });

    it('SHOULD have tabindex="0" on the header', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');
      expect(header.getAttribute('tabindex')).toBe('0');
    });

    it('SHOULD have aria-haspopup="listbox" on the header', async () => {
      const page = await createComponent(`<mnt-options-list></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header');
      expect(header.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('SHOULD have role="listbox" on the portal container when open', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const listbox = page.body.querySelector('.mnt-options-list-items');
      expect(listbox.getAttribute('role')).toBe('listbox');
    });

    it('SHOULD have role="option" on each item when open', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const options = page.body.querySelectorAll('[role="option"]');
      expect(options.length).toBe(2);
    });

    it('SHOULD set aria-selected="true" on the selected item', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]' value="a"></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      const options = page.body.querySelectorAll('[role="option"]');
      expect(options[0].getAttribute('aria-selected')).toBe('true');
      expect(options[1].getAttribute('aria-selected')).toBe('false');
    });

    it('SHOULD update aria-activedescendant when navigating with keyboard', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b","c"]'></mnt-options-list>`);

      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;
      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const activedescendant = header.getAttribute('aria-activedescendant');
      expect(activedescendant).toBeTruthy();
    });
  });

  describe('Keyboard navigation', () => {
    it('SHOULD open the portal when Enter is pressed while focused', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();

      expect(getItems(page).length).toBe(2);
    });

    it('SHOULD open the portal when Space is pressed while focused', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await page.waitForChanges();

      expect(getItems(page).length).toBe(2);
    });

    it('SHOULD close the portal when Escape is pressed', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await page.waitForChanges();

      expect(getItems(page).length).toBe(0);
    });

    it('SHOULD close the portal when Tab is pressed', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      await page.waitForChanges();

      expect(getItems(page).length).toBe(0);
    });

    it('SHOULD navigate down with ArrowDown when list is open', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b","c"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const focusedItems = page.body.querySelectorAll('.mnt-options-list-item-focused');
      expect(focusedItems.length).toBe(1);
    });

    it('SHOULD select item with Enter when keyboard-focused', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b","c"]'></mnt-options-list>`);
      const spy = jest.fn();
      page.root.addEventListener('optionSelect', spy);

      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.value).toBe('a');
      expect(detail.label).toBe('a');
    });

    it('SHOULD close portal and reset focus after selecting item with keyboard', async () => {
      const page = await createComponent(`<mnt-options-list items='["a","b"]'></mnt-options-list>`);
      const header = page.root.querySelector('.mnt-options-list-header') as HTMLElement;

      header.click();
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();

      expect(getItems(page).length).toBe(0);
      expect(page.body.querySelectorAll('.mnt-options-list-item-focused').length).toBe(0);
    });
  });

  describe('Full width', () => {
    it('SHOULD NOT apply full-width class by default', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);
      expect(page.root).not.toHaveClass('mnt-options-list-full-width');
    });

    it('SHOULD apply full-width class when full-width="true" is set', async () => {
      const page = await createComponent(`<mnt-options-list full-width="true" items='["a"]'></mnt-options-list>`);
      expect(page.root).toHaveClass('mnt-options-list-full-width');
    });

    it('SHOULD apply full-width class after setting full-width attribute to true', async () => {
      const page = await createComponent(`<mnt-options-list items='["a"]'></mnt-options-list>`);
      page.root.setAttribute('full-width', 'true');
      await page.waitForChanges();
      expect(page.root).toHaveClass('mnt-options-list-full-width');
    });
  });

  describe('Form integration', () => {
    it('SHOULD render a hidden input with the provided name', async () => {
      const page = await createComponent(
        `<mnt-options-list name="state" items='["a"]'></mnt-options-list>`,
      );
      const hiddenInput = page.root.querySelector('input[type="hidden"]');
      expect(hiddenInput).not.toBeNull();
      expect(hiddenInput.getAttribute('name')).toBe('state');
    });

    it('SHOULD update hidden input value when item is selected', async () => {
      const page = await createComponent(
        `<mnt-options-list name="state" items='["a","b"]'></mnt-options-list>`,
      );

      const header = page.root.querySelector('.mnt-options-list-header');
      (header as HTMLElement).click();
      await page.waitForChanges();

      (getItems(page)[1] as HTMLElement).click();
      await page.waitForChanges();

      const hiddenInput = page.root.querySelector('input[type="hidden"]') as HTMLInputElement;
      expect(hiddenInput.value).toBe('b');
    });
  });
});
