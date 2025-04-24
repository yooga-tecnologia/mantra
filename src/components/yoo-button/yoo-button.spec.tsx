import { newSpecPage } from '@stencil/core/testing';
import { YooButton } from './yoo-button';

describe('yoo-button', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button.textContent).toBe('Click Me');
  });

  it('applies the correct classes for size, color, and variant', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button size="large" color="secondary" variant="outlined" label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button).toHaveClass('button-large');
    expect(button).toHaveClass('button-secondary');
    expect(button).toHaveClass('button-outlined');
  });

  it('disables the button when disabled prop is true', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button disabled="true" label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveClass('button-disabled');
  });

  it('renders slotted content when no label or icons are provided', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `
        <yoo-button>
          <span class="slot-test">Hello Slot</span>
        </yoo-button>
      `,
    });
    expect(page.root.querySelector('.label')).toBeNull();
    expect(page.root.querySelector('yoo-icon')).toBeNull();

    const slotted = page.root.querySelector('.slot-test')!;
    expect(slotted).not.toBeNull();
    expect(slotted.textContent).toBe('Hello Slot');
  });

  it('applies the button-full-width class when full-width attribute is set', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button full-width="true" label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button).toHaveClass('button-full-width');
  });

  it('renders with an icon on the left', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button icon-left="search" label="Buscar"></yoo-button>`,
    });

    const icon = page.root.querySelector('.icon-left');
    expect(icon).not.toBeNull();
    expect(icon.tagName.toLowerCase()).toBe('yoo-icon');
    expect(icon.getAttribute('icon')).toBe('search');
  });

  it('renders with an icon on the right', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button icon-right="arrow-right" label="Avançar"></yoo-button>`,
    });

    const icon = page.root.querySelector('.icon-right');
    expect(icon).not.toBeNull();
    expect(icon.getAttribute('icon')).toBe('arrow-right');
  });
});
