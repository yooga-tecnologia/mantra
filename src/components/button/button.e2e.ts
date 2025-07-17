import { newE2EPage } from '@stencil/core/testing';

describe('Button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mnt-button></mnt-button>');

    const element = await page.find('mnt-button');
    expect(element).toHaveClass('hydrated');
  });
});
