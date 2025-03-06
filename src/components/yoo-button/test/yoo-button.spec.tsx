import { newSpecPage } from '@stencil/core/testing';
import { YooButton } from '../yoo-button';

describe('yoo-button', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button label="Click Me"></yoo-button>`,
    });

    expect(page.root).toMatchSnapshot();
    expect(page.root.querySelector('button')?.textContent).toBe('Click Me');
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
      html: `<yoo-button disabled label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('applies the fullWidth class when fullWidth prop is true', async () => {
    const page = await newSpecPage({
      components: [YooButton],
      html: `<yoo-button full-width label="Click Me"></yoo-button>`,
    });

    const button = page.root.querySelector('button');
    expect(button).toHaveClass('button-full-width');
  });

  // it('renders with an icon on the left', async () => { // TODO: Ajustar teste quando for implementado o icone no button
  //   const page = await newSpecPage({
  //     components: [YooButton],
  //     html: `<yoo-button icon-left="🔍" label="Search"></yoo-button>`,
  //   });

  //   const button = page.root.querySelector("button");
  //   const icon = button.querySelector(".icon-left");
  //   expect(icon).not.toBeNull();
  //   expect(icon.textContent).toBe("🔍");
  //   expect(button.textContent).toContain("Search");
  // });

  // it('renders with an icon on the right', async () => {
  //   const page = await newSpecPage({
  //     components: [YooButton],
  //     html: `<yoo-button icon-right="👉" label="Next"></yoo-button>`,
  //   });

  //   const button = page.root.querySelector("button");
  //   const icon = button.querySelector(".icon-right");
  //   expect(icon).not.toBeNull();
  //   expect(icon.textContent).toBe("👉");
  //   expect(button.textContent).toContain("Next");
  // });

  // it('matches full coverage with all props enabled', async () => {
  //   const page = await newSpecPage({
  //     components: [YooButton],
  //     html: `<yoo-button label="Click Me" size="small" color="primary" variant="regular" block disabled icon-left="🔍" icon-right="👉"></yoo-button>`,
  //   });

  //   const button = page.root.querySelector("button");

  //   expect(page.rootInstance.size).toBe("small");
  //   expect(page.rootInstance.color).toBe("primary");
  //   expect(page.rootInstance.variant).toBe("regular");
  //   expect(page.rootInstance.block).toBeTruthy();
  //   expect(page.rootInstance.disabled).toBeTruthy();
  //   expect(page.rootInstance.iconLeft).toBe("🔍");
  //   expect(page.rootInstance.iconRight).toBe("👉");

  //   expect(button).toHaveClass("button-small");
  //   expect(button).toHaveClass("button-primary");
  //   expect(button).toHaveClass("button-regular");
  //   expect(button).toHaveClass("button-block");
  //   expect(button).toHaveAttribute("disabled");
  //   expect(button.querySelector(".icon-left").textContent).toBe("🔍");
  //   expect(button.querySelector(".icon-right").textContent).toBe("👉");

  //   expect(page.root).toMatchSnapshot();
  // });
});
