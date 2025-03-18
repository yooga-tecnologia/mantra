import { newE2EPage } from '@stencil/core/testing';

describe('yoo-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<yoo-button></yoo-button>');

    const element = await page.find('yoo-button');
    expect(element).toHaveClass('hydrated');
  });
});
