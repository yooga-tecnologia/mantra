import { newSpecPage } from '@stencil/core/testing';
import { Steps } from './steps';
import { StepItem } from './steps.types';

describe('mnt-steps', () => {
  it('renders with default props', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
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
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
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
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
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
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const stepElements = page.root?.querySelectorAll('button.mnt-steps-item');
    expect(stepElements?.length).toBe(3);
  });

  it('renders done step with correct class', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Done Step', status: 'done' },
      { id: 'step-2', label: 'Active Step', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const doneStep = page.root?.querySelector('button.mnt-steps-item-done');
    expect(doneStep).toBeTruthy();
  });

  it('renders active step with correct class', async () => {
    const steps: StepItem[] = [{ id: 'step-1', label: 'Active Step', status: 'active' }];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const activeStep = page.root?.querySelector('button.mnt-steps-item-active');
    expect(activeStep).toBeTruthy();
  });

  it('renders disabled step with correct class', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'active' },
      { id: 'step-2', label: 'Disabled Step', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-1"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const disabledStep = page.root?.querySelector('button.mnt-steps-item-disabled');
    expect(disabledStep).toBeTruthy();
  });

  it('renders dividers between steps but not after last step', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
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

    expect(consoleSpy).toHaveBeenCalledWith('[MANTRA] The "steps" property is required and should contain at least one step.');

    consoleSpy.mockRestore();
  });

  it('renders step labels correctly', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'First Step', status: 'done' },
      { id: 'step-2', label: 'Second Step', status: 'active' },
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

  it('renders check icon for done steps', async () => {
    const steps: StepItem[] = [{ id: 'step-1', label: 'Done Step', status: 'done' }];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const icon = page.root?.querySelector('mnt-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('icon')).toBe('check');
  });

  it('renders custom icon when provided', async () => {
    const steps: StepItem[] = [{ id: 'step-1', label: 'Custom Step', status: 'active', icon: 'star' }];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const icon = page.root?.querySelector('mnt-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('icon')).toBe('star');
  });

  it('renders number when icon is a number', async () => {
    const steps: StepItem[] = [{ id: 'step-1', label: 'Number Step', status: 'active', icon: 1 }];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const numberElement = page.root?.querySelector('.mnt-steps-number');
    expect(numberElement).toBeTruthy();
    expect(numberElement?.textContent).toBe('1');
  });

  it('initializes maxAccessedIndex based on activeStepId', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'done' },
      { id: 'step-3', label: 'Step 3', status: 'active' },
      { id: 'step-4', label: 'Step 4', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-3"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.rootInstance.maxAccessedIndex).toBe(2); // Index of step-3
  });

  it('initializes maxAccessedIndex to 0 when no activeStepId provided', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'active' },
      { id: 'step-2', label: 'Step 2', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.rootInstance.maxAccessedIndex).toBe(0); // First step index
  });

  it('disables steps with index greater than maxAccessedIndex', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
      { id: 'step-4', label: 'Step 4', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const stepElements = page.root?.querySelectorAll('button.mnt-steps-item');
    const step3Button = stepElements?.[2] as HTMLButtonElement;
    const step4Button = stepElements?.[3] as HTMLButtonElement;

    // Debug: verificar se os elementos foram encontrados
    expect(stepElements?.length).toBe(4);
    expect(step3Button).toBeTruthy();
    expect(step4Button).toBeTruthy();

    // Verificar se têm a propriedade disabled
    expect(step3Button?.hasAttribute('disabled')).toBe(true);
    expect(step4Button?.hasAttribute('disabled')).toBe(true);
  });

  it('allows clicking on steps with index less than or equal to maxAccessedIndex', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const stepElements = page.root?.querySelectorAll('button.mnt-steps-item');
    const step1Button = stepElements?.[0] as HTMLButtonElement;
    const step2Button = stepElements?.[1] as HTMLButtonElement;

    // Debug: verificar se os elementos foram encontrados
    expect(stepElements?.length).toBe(3);
    expect(step1Button).toBeTruthy();
    expect(step2Button).toBeTruthy();

    // Verificar se NÃO têm a propriedade disabled
    expect(step1Button?.hasAttribute('disabled')).toBe(false);
    expect(step2Button?.hasAttribute('disabled')).toBe(false);
  });

  it('emits stepClick event when step is clicked', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const stepClickSpy = jest.fn();
    page.root?.addEventListener('stepClick', stepClickSpy);

    const stepElements = page.root?.querySelectorAll('button.mnt-steps-item');
    const step1Button = stepElements?.[0] as HTMLButtonElement;

    step1Button.click();
    await page.waitForChanges();

    expect(stepClickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          stepId: 'step-1',
          stepIndex: 0,
          status: 'done',
          step: expect.objectContaining({
            id: 'step-1',
            label: 'Step 1',
            status: 'done',
          }),
        }),
      }),
    );
  });

  it('updates maxAccessedIndex when step is clicked', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const initialMaxIndex = page.rootInstance.maxAccessedIndex;
    expect(initialMaxIndex).toBe(1); // Index of step-2

    // Click on step-1 (index 0)
    const stepElements = page.root?.querySelectorAll('button.mnt-steps-item');
    const step1Button = stepElements?.[0] as HTMLButtonElement;

    step1Button.click();
    await page.waitForChanges();

    // maxAccessedIndex should remain the same (Math.max(1, 0) = 1)
    expect(page.rootInstance.maxAccessedIndex).toBe(1);
  });

  it('nextStep method advances to next step and marks current as done', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.nextStep();
    await page.waitForChanges();

    expect(result).toBe(true);
    expect(page.rootInstance.activeStepId).toBe('step-3');
    expect(page.rootInstance.steps[1].status).toBe('done'); // step-2 should be done
  });

  it('nextStep method returns false when already at last step', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.nextStep();
    await page.waitForChanges();

    expect(result).toBe(false);
    expect(page.rootInstance.activeStepId).toBe('step-2'); // Should remain unchanged
  });

  it('previousStep method goes back to previous step', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.previousStep();
    await page.waitForChanges();

    expect(result).toBe(true);
    expect(page.rootInstance.activeStepId).toBe('step-1');
  });

  it('previousStep method returns false when already at first step', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'active' },
      { id: 'step-2', label: 'Step 2', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-1"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.previousStep();
    await page.waitForChanges();

    expect(result).toBe(false);
    expect(page.rootInstance.activeStepId).toBe('step-1'); // Should remain unchanged
  });

  it('resetToFirstStep method resets to first step and updates all statuses', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'done' },
      { id: 'step-3', label: 'Step 3', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-3"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    page.rootInstance.resetToFirstStep();
    await page.waitForChanges();

    expect(page.rootInstance.activeStepId).toBe('step-1');
    expect(page.rootInstance.steps[0].status).toBe('active');
    expect(page.rootInstance.steps[1].status).toBe('disabled');
    expect(page.rootInstance.steps[2].status).toBe('disabled');
  });

  it('goToStep method navigates to specific step and marks intermediate steps as done', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
      { id: 'step-4', label: 'Step 4', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.goToStep('step-4');
    await page.waitForChanges();

    expect(result).toBe(true);
    expect(page.rootInstance.activeStepId).toBe('step-4');
    expect(page.rootInstance.steps[1].status).toBe('done'); // step-2 should be done
    expect(page.rootInstance.steps[2].status).toBe('done'); // step-3 should be done
  });

  it('goToStep method returns false for non-existent step', async () => {
    const steps: StepItem[] = [{ id: 'step-1', label: 'Step 1', status: 'active' }];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-1"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const result = page.rootInstance.goToStep('non-existent');
    await page.waitForChanges();

    expect(result).toBe(false);
    expect(page.rootInstance.activeStepId).toBe('step-1'); // Should remain unchanged
  });

  it('getCurrentStepIndex method returns correct index', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.rootInstance.getCurrentStepIndex()).toBe(1);
  });

  it('getCurrentStep method returns correct step object', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const currentStep = page.rootInstance.getCurrentStep();
    expect(currentStep).toEqual({
      id: 'step-2',
      label: 'Step 2',
      status: 'active',
    });
  });

  it('isFirstStep method returns correct boolean', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'active' },
      { id: 'step-2', label: 'Step 2', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-1"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.rootInstance.isFirstStep()).toBe(true);

    page.rootInstance.activeStepId = 'step-2';
    await page.waitForChanges();

    expect(page.rootInstance.isFirstStep()).toBe(false);
  });

  it('isLastStep method returns correct boolean', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    expect(page.rootInstance.isLastStep()).toBe(true);

    page.rootInstance.activeStepId = 'step-1';
    await page.waitForChanges();

    expect(page.rootInstance.isLastStep()).toBe(false);
  });

  it('exposes maxAccessedIndex via data attribute', async () => {
    const steps: StepItem[] = [
      { id: 'step-1', label: 'Step 1', status: 'done' },
      { id: 'step-2', label: 'Step 2', status: 'active' },
      { id: 'step-3', label: 'Step 3', status: 'disabled' },
    ];

    const page = await newSpecPage({
      components: [Steps],
      html: `<mnt-steps active-step-id="step-2"></mnt-steps>`,
    });

    page.rootInstance.steps = steps;
    await page.waitForChanges();

    const maxAccessedIndex = page.root?.getAttribute('data-max-accessed-index');
    expect(maxAccessedIndex).toBe('1'); // Index of step-2
  });
});
