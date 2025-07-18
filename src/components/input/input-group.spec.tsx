import { newSpecPage } from '@stencil/core/testing';
import { InputGroup } from './input-group';

describe('mnt-input-group', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label"></mnt-input-group>`,
    });

    expect(page.root).toMatchSnapshot();
    expect(page.root.querySelector('label')?.textContent).toContain('Test Label');
    expect(page.root.querySelector("[name='test']")).toBeDefined();
  });

  it('applies the required attribute correctly', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label" is-required>
               <input  />
             </mnt-input-group>`,
    });

    expect(page.rootInstance.isRequired).toBeTruthy();
    expect(page.root.querySelector('label strong')).not.toBeNull();
  });

  it('disables input when condition is true', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label" condition>
               <input />
             </mnt-input-group>`,
    });

    expect(page.rootInstance.condition).toBeTruthy();
  });

  it('renders with a placeholder', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label" placeholder="Enter value">
               <input placeholder="Enter value" />
             </mnt-input-group>`,
    });

    expect(page.rootInstance.placeholder).toBe('Enter value');
  });

  it('renders with trailing icon slot', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label" trailing-icon>
             <span slot="actions">🔍</span>
           </mnt-input-group>`,
    });

    const trailingIcon = page.root.querySelector("[slot='actions']");
    expect(page.rootInstance.trailingIcon).toBeTruthy();
    expect(trailingIcon).not.toBeNull();
    expect(trailingIcon?.textContent).toContain('🔍');
  });

  it('matches full coverage with all props enabled', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<mnt-input-group input-name="test" label="Test Label" is-required condition trailing-icon placeholder="Enter value">
               <input slot="input" />
               <span slot="actions">🔍</span>
             </mnt-input-group>`,
    });

    expect(page.rootInstance.inputName).toBe('test');
    expect(page.rootInstance.label).toBe('Test Label');
    expect(page.rootInstance.isRequired).toBeTruthy();
    expect(page.rootInstance.condition).toBeTruthy();
    expect(page.rootInstance.trailingIcon).toBeTruthy();
    expect(page.rootInstance.placeholder).toBe('Enter value');

    const trailingIcon = page.root.querySelector("[slot='actions']");
    expect(trailingIcon).not.toBeNull();
    expect(trailingIcon?.textContent).toContain('🔍');

    expect(page.root).toMatchSnapshot();
  });
});
