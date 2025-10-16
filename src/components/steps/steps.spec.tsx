import { newSpecPage } from '@stencil/core/testing';
import { Steps } from './steps';
import { StepItem } from './steps.types';

describe('mnt-steps', () => {
  it('renders with default props', async () => {
    const steps: StepItem[] = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.root).toBeTruthy();
    expect(page.root?.querySelector('.mnt-steps-container')).toBeTruthy();
  });

  it('renders horizontal orientation by default', async () => {
    const steps: StepItem[] = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const container = page.root?.querySelector('.mnt-steps-horizontal');
    expect(container).toBeTruthy();
  });

  it('renders vertical orientation when specified', async () => {
    const steps: StepItem[] = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps orientation="vertical"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const container = page.root?.querySelector('.mnt-steps-vertical');
    expect(container).toBeTruthy();
  });

  it('renders correct number of steps', async () => {
    const steps: StepItem[] = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
      { label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const stepElements = page.root?.querySelectorAll('.mnt-steps-step');
    expect(stepElements?.length).toBe(3);
  });

  it('renders completed step with correct class', async () => {
    const steps: StepItem[] = [
      { label: 'Completed Step', status: 'completed' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const completedCircle = page.root?.querySelector('.mnt-steps-circle-completed');
    expect(completedCircle).toBeTruthy();
  });

  it('renders active step with correct class', async () => {
    const steps: StepItem[] = [
      { label: 'Active Step', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const activeCircle = page.root?.querySelector('.mnt-steps-circle-active');
    expect(activeCircle).toBeTruthy();
  });

  it('renders disabled step with correct class', async () => {
    const steps: StepItem[] = [
      { label: 'Disabled Step', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const disabledCircle = page.root?.querySelector('.mnt-steps-circle-disabled');
    expect(disabledCircle).toBeTruthy();
  });

  it('renders dividers between steps but not after last step', async () => {
    const steps: StepItem[] = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
      { label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const dividers = page.root?.querySelectorAll('.mnt-steps-divider');
    // Should have 2 dividers for 3 steps
    expect(dividers?.length).toBe(2);
  });

  it('shows warning when steps array is empty', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = [];
    await page.waitForChanges();

    expect(consoleSpy).toHaveBeenCalledWith(
      '[MANTRA] The "steps" property is required and should contain at least one step.'
    );

    consoleSpy.mockRestore();
  });

  it('renders step labels correctly', async () => {
    const steps: StepItem[] = [
      { label: 'First Step', status: 'completed' },
      { label: 'Second Step', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const labels = page.root?.querySelectorAll('.mnt-steps-label');
    expect(labels?.[0].textContent).toBe('First Step');
    expect(labels?.[1].textContent).toBe('Second Step');
  });
});

